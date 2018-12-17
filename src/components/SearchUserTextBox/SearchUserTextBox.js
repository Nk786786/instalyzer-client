import React, { Component } from 'react';
import './SearchUserTextBox.css';
import { Route } from 'react-router-dom'
import { debounce } from 'throttle-debounce';

class SearchUserTextBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textboxValue: '',
            foundUsers: [],
        };

        this.setTextboxValue = this.setTextboxValue.bind(this);
        this.previewUser = this.previewUser.bind(this);
        this.searchUsers = debounce(500, this.searchUsers);
    }

    searchUsers(account) {
        fetch('http://localhost:3001/accounts?query=' + account)
            .then((response) => {
                return response.json();
            })
            .then((jsonResponse) => {
                const foundUsers = jsonResponse.map(function (userData) {
                    return ({
                        userName: userData.username,
                        displayName: userData.full_name, // change to display name
                        imageUrl: userData.avatar_url,
                    });
                }).slice(0, 6);
                this.setState({ foundUsers });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    setTextboxValue(value) {
        const textboxValue = value.target.value;
        // const foundUsers = textboxValue !== '' ? mockListJson : [];
        this.setState({ textboxValue });

        this.searchUsers(textboxValue);
    }

    previewUser(username, history) {
        history.push('/preview/' + username);
    }

    render() {
        return (
            <Route render={({ history }) => (
                <div className='search-user-textbox-container'>
                    <div className='search-user-textbox-input-container'>
                        <input className='search-user-textbox-container-input' onChange={this.setTextboxValue} type='text' placeholder='שם משתמש אינסטגרם'></input>
                        <div className='search-user-textbox-container-button' onClick={() => this.previewUser(this.state.textboxValue, history)}>חיפוש</div>
                    </div>
                    {!!this.state.foundUsers.length &&
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