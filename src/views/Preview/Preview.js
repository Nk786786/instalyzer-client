import React, { Component } from 'react';
import './Preview.css';
import spinner from './spinner.svg';
import { numberWithUnit, connectionFailedEvent, uncaughtException } from '../../utils';
import PayPalCheckout from '../../components/PayPalCheckout/PayPalCheckout';
import { _fetch } from '../../HttpService';

class Preview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            userName: '',
            fullName: '',
            posts: 0,
            following: 0,
            followers: 0,
            avatarUrl: '',
        }

        this.toggleModalOpen = this.toggleModalOpen.bind(this);
        this.getAccountName = this.getAccountName.bind(this);
    }

    getAccountName() {
        const urlpath = window.location.pathname;
        return (urlpath.endsWith('/')
            ? urlpath.split('/').slice(-2)
            : urlpath.split('/').slice(-1))[0];
    }

    componentDidMount() {
        const me = this;
        const accountName = this.getAccountName();

        _fetch('/account/' + accountName + '/data')
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
                const userName = jsonResponse.username;
                const posts = jsonResponse.mediaPosts;
                const following = jsonResponse.followingCount;
                const followers = jsonResponse.followerCount;
                const avatarUrl = jsonResponse.avatar_url;
                const fullName = jsonResponse.full_name;
                me.setState({ userName, posts, following, followers, avatarUrl, fullName });
            })
            .catch(err => {
                uncaughtException(err.message, err.stack);
            });
    }

    toggleModalOpen() {
        const modalOpen = !this.state.modalOpen;
        this.setState({ modalOpen });
    }

    render() {
        const accountName = this.getAccountName();

        return (
            <div style={{ marginBottom: '30px' }}>
                {this.state.userName !== ''
                    ? (
                        <div>
                            <div className='preview-container'>
                                <img className='account-img' src={this.state.avatarUrl} alt='' />
                                <div className='preview-data-container'>
                                    <div className='preview-account-details-container'>
                                        <a className='preview-account-username' rel="noopener noreferrer" target="_blank" href={'https://www.instagram.com/' + this.state.userName}>{this.state.userName}@</a>
                                        <span className='preview-account-displayname'>{this.state.fullName}</span>
                                    </div>
                                    <div className='preview-account-social-container'>
                                        <span className='preview-account-social-item'><b>{numberWithUnit(this.state.posts)}</b> פוסטים</span>
                                        <span className='preview-account-social-item'><b>{numberWithUnit(this.state.followers)}</b> עוקבים</span>
                                        <span className='preview-account-social-item'><b>{numberWithUnit(this.state.following)}</b> עוקב</span>
                                    </div>
                                    {this.state.followers < 1000
                                        ? <div style={{ marginTop: '30px', border: '1px solid black', padding: '10px' }}>לא ניתן לבדוק משתמשים עם מתחת ל-1000 עוקבים</div>
                                        : <div className='preview-check-account-button' onClick={this.toggleModalOpen}>בדוק משתמש</div>
                                    }
                                </div>
                            </div>
                            {this.state.modalOpen &&
                                <PayPalCheckout userName={this.state.userName} />
                            }
                        </div>
                    )
                    : (
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <span>טוען נתונים עבור {accountName}</span>
                            <img src={spinner} alt='' />
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Preview;