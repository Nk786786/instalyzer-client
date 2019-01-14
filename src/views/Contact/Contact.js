import React from 'react';
import { validateEmailAddress } from '../../utils';
import { _fetch } from '../../HttpService';

const fieldInputStyle = {
    marginBottom: '15px',
}

const EMPTY_FIELDS_ERROR_MESSAGE = 'כל השדות חייבים להיות מלאים.';
const EMAIL_NO_VALID_ERROR_MESSAGE = 'כתובת האימייל אינה תקינה.';
const SEND_CONTACT_ERROR_MESSAGE = 'היתה שגיאה בעת שליחת הנתונים.';
const SUCCESS_MESSSAGE = 'ההודעה נשלחה בהצלחה.';

export class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fullname: '',
            email: '',
            message: '',
            error: '',
            success: '',
        }

        this.setFullname = this.setFullname.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.sendForm = this.sendForm.bind(this);
        this.setError = this.setError.bind(this);
        this.setSuccess = this.setSuccess.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    setFullname = (fullname) => {
        this.setState({ fullname });
    }

    setEmail = (email) => {
        this.setState({ email });
    }

    setMessage = (message) => {
        this.setState({ message });
    }

    setError = (error) => {
        this.setError({ error });
    }

    setSuccess = (success) => {
        this.setState({ success });
    }

    validateForm = () => {
        const { fullname, email, message } = this.state;
        const success = '';
        if (!fullname || !email || !message) {
            const error = EMPTY_FIELDS_ERROR_MESSAGE;
            this.setState({ error, success });

            return false;
        } else if (email && !validateEmailAddress(email)) {
            const error = EMAIL_NO_VALID_ERROR_MESSAGE;
            this.setState({ error, success });

            return false;
        }

        return true;
    }

    sendForm = () => {
        const { fullname, email, message } = this.state;
        if (this.validateForm()) {
            this.setState({ error: '' });

            _fetch('/contact', {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8", },
                body: JSON.stringify({ email, message, fullname }),
            }).then(res => {
                if (res.status === 200) {
                    this.setState({
                        fullname: '',
                        email: '',
                        message: '',
                        error: '',
                        success: SUCCESS_MESSSAGE,
                    });
                } else {
                    this.setState({ success: '', error: SEND_CONTACT_ERROR_MESSAGE });
                }
            }).catch((err) => {
                this.setState({ success: '', error: SEND_CONTACT_ERROR_MESSAGE });
            });
        }
    }

    render() {
        return <div style={{ marginBottom: '70px' }}>
            <h3>יצירת קשר</h3>{/* <form action={backendUrl + '/contact'} method='post' style={{ width: '407px', display: 'flex', flexDirection: 'column' }}> */}
            <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column' }}>
                <span>שם מלא</span>
                <input value={this.state.fullname} onChange={(e) => this.setFullname(e.target.value)} style={fieldInputStyle} type='text' name='fullname' />
                <span>אימייל</span>
                <input value={this.state.email} onChange={(e) => this.setEmail(e.target.value)} style={fieldInputStyle} type='email' name='email' />
                <span>תוכן</span>
                <textarea value={this.state.message} onChange={(e) => this.setMessage(e.target.value)} style={{ ...fieldInputStyle, height: '150px' }} name='message' />
                {this.state.error &&
                    <div style={{ color: 'red', marginBottom: '10px', }}>{this.state.error}</div>
                }
                {this.state.success &&
                    <div style={{ marginBottom: '10px', }}>{this.state.success}</div>
                }
                <button style={{ cursor: 'pointer', border: 'none', backgroundColor: '#3897f0', padding: '10px', color: 'white', fontWeight: 'bold', }}
                    onClick={this.sendForm}>שלח</button>
            </div>
        </div >;
    }
}

export default Contact;