import React, { Component } from 'react';
import './Preview.css';
import Modal from 'react-responsive-modal';

class Preview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
        }

        this.toggleModalOpen = this.toggleModalOpen.bind(this);
    }

    toggleModalOpen() {
        const modalOpen = !this.state.modalOpen;
        this.setState({ modalOpen });
    }

    render() {
        return (
            <div>
                <div className='preview-container'>
                    <img className='account-img' src='https://instagram.fsdv2-1.fna.fbcdn.net/vp/e92c5f2249bdab612f069bf9332fd125/5CB2BE92/t51.2885-19/s150x150/44773425_340372686748138_3620105840763076608_n.jpg?_nc_ht=instagram.fsdv2-1.fna.fbcdn.net' alt='' />
                    <div className='preview-data-container'>
                        <div className='preview-account-details-container'>
                            <span className='preview-account-username'>eyalgolan1@</span>
                            <span className='preview-account-displayname'>Eyal Golan</span>
                        </div>
                        <div className='preview-account-social-container'>
                            <span className='preview-account-social-item'><b>1244</b> פוסטים</span>
                            <span className='preview-account-social-item'><b>584K</b> עוקבים</span>
                            <span className='preview-account-social-item'><b>1449</b> עוקב</span>
                        </div>
                        <div className='preview-check-account-button' onClick={this.toggleModalOpen}>בדוק משתמש</div>
                    </div>
                </div>
                <Modal open={this.state.modalOpen} onClose={this.toggleModalOpen} center>
                    <div style={{ borderBottom: '1px solid black', height: '30px', paddingRight: '30px' }}>המשך ביצוע סריקת משתמש</div>
                    <div style={{ width: '500px', marginTop: '10px' }}>כדי שנוכל להמשיך לבדוק את המשתמש eyalgolan1 אנא הזינו כתובת אימייל תקינה שאליה יישלח הדו"ח</div>
                    <input dir="ltr" type='text' placeholder='example@mail.com' style={{ marginTop: '15px', height: '40px', width: '93%', padding: '0 15px 0 15px' }} />
                    <div style={{ width: '100%', backgroundColor: '#3897f0', color: '#fff', padding: '10px 0 10px 0', marginTop: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>שלח</div>
                </Modal>
            </div>
        );
    }
}

export default Preview;