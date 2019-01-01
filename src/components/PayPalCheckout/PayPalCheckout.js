import React from 'react';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';
import { validateEmailAddress } from '../../utils';
import { _fetch } from '../../HttpService';

const PayPalButton = window.paypal.Button.driver('react', { React, ReactDOM });

const paypalClient = {
    sandbox: 'AaJNf3KNzwZbv_0Wd51AYdq_7t-QpvBw4kP4xp2c6Xbehr5xj0kApOlAKa7SdNWJqBhOCa4waFp5Ijb-',
    production: 'demo_production_client_id'
};

class PayPalCheckout extends React.Component {
    constructor(props) {
        super(props);

        this.toggleAcceptMails = this.toggleAcceptMails.bind(this);
        this.updateEmailAddressTextbox = this.updateEmailAddressTextbox.bind(this);

        this.state = {
            emailAddress: '',
            emailError: '',
            acceptMails: true,
            paypalValidateActions: null,
            emailValid: false,
        };

        this.validate = this.validate.bind(this);
        this.onAuthorize = this.onAuthorize.bind(this);
        this.payment = this.payment.bind(this);
        this.updateEmailAddressTextbox = this.updateEmailAddressTextbox.bind(this);
        this.toggleAcceptMails = this.toggleAcceptMails.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    payment(data, actions) {
        return actions.payment.create({
            transactions: [{
                amount: {
                    total: '20',
                    currency: 'ILS'
                }
            }]
        });
    }

    onAuthorize(data, actions) {
        _fetch('/report', {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8", },
            body: JSON.stringify({
                mail: this.state.emailAddress,
                acceptMails: this.state.acceptMails,
                account: this.props.userName,
                paymentId: data.paymentID,
            }),
        }).then(() => {
            console.log('success');
            // successMessage = 'הבקשה נשלחה בהצלחה והדו"ח יישלח למייל בדקות הקרובות.'
            // me.setState({ successMessage });
        }).catch((err) => {
            console.error(err);
        });

        return actions.payment.execute().then(() => {
            swal('הידד!', 'העסקה בוצעה בהצלחה.', 'success');
        });
    }

    updateEmailAddressTextbox(value) {
        const emailAddress = value.target.value;
        this.setState({ emailAddress });

        if (this.state.paypalValidateActions) {
            this.validatePayPalClicable(this.state.paypalValidateActions, emailAddress);
        }
    }

    toggleAcceptMails() {
        const acceptMails = !this.state.acceptMails;
        this.setState({ acceptMails });
    }

    validatePayPalClicable = (actions, emailAddress) => {
        const emailValid = validateEmailAddress(emailAddress);
        emailValid ? actions.enable() : actions.disable();

        this.setState({ emailValid });

        return emailValid;
    }

    validate(actions) {
        this.validatePayPalClicable(actions, this.state.emailAddress);

        this.setState({ paypalValidateActions: actions })
    }

    onClick() {
        if (!this.state.emailValid) {
            const emailError = 'כתובת אימייל אינה תקינה';

            this.setState({ emailError });
        }
    }

    render() {
        return (
            <div>
                <div style={{ marginTop: '20px' }}>לבדיקת החשבון {this.props.userName} בעלות של 20 ש"ח בלבד יש להזין כתובת אימייל תקינה שאליה יישלח הדו"ח המפורט.</div>
                <input style={{ marginTop: '20px' }} type="checkbox" checked={this.state.acceptMails} onChange={this.toggleAcceptMails} /><span style={{ fontSize: '12px' }}>אני מעוניין להצטרף לרשימת התפוצה ומאשר קבלת הודעות פרסומיות בדוא"ל</span>
                <div>
                    <input onBlur={this.updateEmailAddressTextbox} dir="ltr" type='text' placeholder='example@mail.com' className='preview-email-input' />
                    {this.state.emailError &&
                        <div style={{ color: 'red', fontSize: '13px', marginTop: '3px' }}>{this.state.emailError}</div>
                    }
                    <div style={{ marginTop: '10px' }}>
                        <PayPalButton
                            commit={true}
                            env={'sandbox'}
                            client={paypalClient}
                            payment={this.payment}
                            onAuthorize={this.onAuthorize}
                            onClick={this.onClick}
                            validate={this.validate}
                            locale='he_IL'
                            style={{
                                label: 'paypal',
                                size: 'medium',    // small | medium | large | responsive
                                shape: 'rect',     // pill | rect
                                color: 'gold',     // gold | blue | silver | black
                                tagline: false
                            }}
                        />
                    </div>
                </div>
            </div>

        );
    }
}

export default PayPalCheckout;