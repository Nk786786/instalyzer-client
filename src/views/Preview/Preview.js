import React, { Component } from 'react';
import './Preview.css';
import Modal from 'react-responsive-modal';
import spinner from './spinner.svg';
import { numberWithUnit, validateEmailAddress } from '../../utils';

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
        }

        this.updateEmailAddressTextbox = this.updateEmailAddressTextbox.bind(this);
        this.toggleModalOpen = this.toggleModalOpen.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
    }

    toggleModalOpen() {
        const modalOpen = !this.state.modalOpen;
        this.setState({ modalOpen });
    }

    sendEmail() {
        const { emailAddress } = this.state;
        console.log(emailAddress);
        console.log(validateEmailAddress(emailAddress));
        if (emailAddress === '' || emailAddress === null || !validateEmailAddress(emailAddress)) {
            const emailError = 'יש להזין כתובת מייל תקינה';
            this.setState({ emailError });
        } else {
            console.log(emailAddress);
            this.setState({ emailError: '' });
        }
    }

    updateEmailAddressTextbox(value) {
        const emailAddress = value.target.value;
        this.setState({ emailAddress });
    }

    render() {
        const urlpath = window.location.pathname;
        const accountName = (urlpath.endsWith('/')
            ? urlpath.split('/').slice(-2)
            : urlpath.split('/').slice(-1))[0];

        const me = this;

        fetch('http://localhost:3001/account/' + accountName + '/data')
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
                            <Modal open={this.state.modalOpen} onClose={this.toggleModalOpen} center>
                                <div style={{ borderBottom: '1px solid rgba(0,0,0,.0975)', height: '30px', paddingRight: '30px' }}>המשך ביצוע סריקת משתמש</div>
                                <div style={{ width: '500px', marginTop: '10px' }}>כדי שנוכל להמשיך לבדוק את המשתמש {this.state.userName} אנא הזינו כתובת אימייל תקינה שאליה יישלח הדו"ח</div>
                                <input onChange={this.updateEmailAddressTextbox} dir="ltr" type='text' placeholder='example@mail.com' style={{ marginTop: '15px', height: '40px', width: '93%', padding: '0 15px 0 15px' }} />
                                {this.state.emailError &&
                                    <div style={{ color: 'red', fontSize: '13px', marginTop: '3px' }}>{this.state.emailError}</div>
                                }
                                <div onClick={this.sendEmail} style={{ width: '100%', backgroundColor: '#3897f0', color: '#fff', padding: '10px 0 10px 0', marginTop: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>שלח</div>
                            </Modal>
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