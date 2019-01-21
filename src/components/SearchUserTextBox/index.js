import React, { Component } from 'react';
import './SearchUserTextBox.css';
import { Route } from 'react-router-dom'
import { debounce } from 'throttle-debounce';
import { _fetch } from '../../HttpService';
import { connectionFailedEvent, uncaughtException, event } from '../../utils';

class SearchUserTextBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textboxValue: '',
            foundUsers: [],
            textboxFocused: false,
        };

        this.setTextboxValue = this.setTextboxValue.bind(this);
        this.previewUser = this.previewUser.bind(this);
        this.searchUsers = debounce(500, this.searchUsers);
        this.toggleTextboxFocus = this.toggleTextboxFocus.bind(this);
    }

    toggleTextboxFocus() {
        const textboxFocused = !this.state.textboxFocused;
        setTimeout(() => this.setState({ textboxFocused }), 200);
    }

    searchUsers(account) {
        _fetch('/accounts?query=' + account)
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    if (res.data) {
                        connectionFailedEvent(res.status, res.data);
                    } else {
                        connectionFailedEvent(res.status, res.statusText);
                    }
                    return;
                }
            })
            .then(jsonResponse => {
                const foundUsers = jsonResponse.map(function (userData) {
                    return ({
                        userName: userData.username,
                        displayName: userData.full_name, // change to display name
                        imageUrl: userData.avatar_url,
                    });
                });
                this.setState({ foundUsers });
            })
            .catch(err => {
                uncaughtException(err.message, err.stack);
            });
    }

    setTextboxValue(value) {
        const textboxValue = value.target.value;
        this.setState({ textboxValue });

        this.searchUsers(textboxValue);
    }

    previewUser(username, history) {
        if (username) {
            event(`user has searched an account ${username}`, { event_category: 'flow', event_label: 'search account' });
            history.push('/preview/' + username);
        }
    }

    render() {
        return (
            <Route render={({ history }) => (
                <div onFocus={this.toggleTextboxFocus} onBlur={this.toggleTextboxFocus} className='search-user-textbox-container'>
                    <div className='search-user-textbox-input-container'>
                        <input className='search-user-textbox-container-input' onChange={this.setTextboxValue} type='text' placeholder='שם משתמש אינסטגרם'></input>
                        <div className='search-user-textbox-container-button' onClick={() => this.previewUser(this.state.textboxValue, history)}>חיפוש</div>
                    </div>
                    {!!this.state.foundUsers.length && this.state.textboxFocused &&
                        <div className='search-user-textbox-list-container'>
                            {this.state.foundUsers.map((item) => (
                                <div key={item.userName} onClick={() => this.previewUser(item.userName, history)} className='search-user-textbox-list-item'>
                                    <div className='search-user-textbox-list-item-image'>
                                        <img src={item.imageUrl} alt="" />
                                    </div>
                                    <div className='search-user-textbox-list-item-user'>
                                        <div className='search-user-textbox-list-item-user-username'>{item.userName}</div>
                                        <div className='search-user-textbox-list-item-user-displayname'>{item.displayName}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>)}>
            </Route>
        );
    }
}

export default SearchUserTextBox;