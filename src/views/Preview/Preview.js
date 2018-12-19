import React, { Component } from 'react';
import './Preview.css';
import spinner from './spinner.svg';
import { numberWithUnit, validateEmailAddress } from '../../utils';
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
            emailAddress: '',
            emailError: '',
            successMessage: '',
        }

        this.updateEmailAddressTextbox = this.updateEmailAddressTextbox.bind(this);
        this.toggleModalOpen = this.toggleModalOpen.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
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
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonResponse) {
                const userName = jsonResponse.username;
                const posts = jsonResponse.mediaPosts;
                const following = jsonResponse.followingCount;
                const followers = jsonResponse.followerCount;
                const avatarUrl = jsonResponse.avatar_url;
                const fullName = jsonResponse.full_name;
                me.setState({ userName, posts, following, followers, avatarUrl, fullName });
            })
            .catch(function (err) {
                console.error(err);
            });
    }

    toggleModalOpen() {
        const modalOpen = !this.state.modalOpen;
        this.setState({ modalOpen });
    }

    sendEmail() {
        const { emailAddress } = this.state;
        if (emailAddress === '' || emailAddress === null || !validateEmailAddress(emailAddress)) {
            const emailError = 'יש להזין כתובת מייל תקינה.';
            this.setState({ emailError });
        } else {
            const emailError = '';
            const modalOpen = false;
            let successMessage = 'שולח בקשה ...'
            this.setState({ emailError, modalOpen, successMessage });

            const me = this;

            _fetch('/report', {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8", },
                body: JSON.stringify({ mail: emailAddress, account: this.state.userName }),
            })
                .then(function () {
                    successMessage = 'הבקשה נשלחה בהצלחה והדו"ח יישלח למייל בדקות הקרובות.'
                    me.setState({ successMessage });
                })
                .catch(function (err) {
                    console.error(err);
                });
        }
    }

    updateEmailAddressTextbox(value) {
        const emailAddress = value.target.value;
        this.setState({ emailAddress });
    }

    render() {
        const accountName = this.getAccountName();

        return (
            <div>
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
                                    <div className='preview-check-account-button' onClick={this.toggleModalOpen}>בדוק משתמש</div>
                                </div>
                            </div>
                            {this.state.modalOpen && !this.state.successMessage &&
                                <div>
                                    <div style={{ marginTop: '20px' }}>כדי שנוכל להמשיך לבדוק את המשתמש {this.state.userName} אנא הזינו כתובת אימייל תקינה שאליה יישלח הדו"ח</div>
                                    <div style={{ marginTop: '20px', fontWeight: 'bold' }}>** השירות ניתן זמנית בגרסאת בטא בחינם עד ה-31 בינואר 2019</div>
                                    <div>
                                        <input onChange={this.updateEmailAddressTextbox} dir="ltr" type='text' placeholder='example@mail.com' className='preview-email-input' />
                                        {this.state.emailError &&
                                            <div style={{ color: 'red', fontSize: '13px', marginTop: '3px' }}>{this.state.emailError}</div>
                                        }
                                        <div onClick={this.sendEmail} style={{ width: '100%', backgroundColor: '#3897f0', color: '#fff', padding: '10px 0 10px 0', marginTop: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>שלח</div>
                                    </div>
                                </div>
                            }
                            {this.state.successMessage &&
                                <div style={{ marginTop: '40px', fontWeight: 'bold' }}>{this.state.successMessage}</div>
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