import React from 'react';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';
import { validateEmailAddress, connectionFailedEvent, uncaughtException } from '../../utils';
import { _fetch } from '../../HttpService';

const PAYPAL_SANDBOX_CLIENT = process.env.PAYPAL_SANDBOX_CLIENT;
const PAYPAL_PROD_CLIENT = process.env.PAYPAL_PROD_CLIENT;
const PAYPAL_ENV = process.env.PAYPAL_ENV;

const PayPalButton = window.paypal.Button.driver('react', { React, ReactDOM });

const paypalClient = {
    sandbox: PAYPAL_SANDBOX_CLIENT,
    production: PAYPAL_PROD_CLIENT,
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
        const paymentExecute = process.env.NODE_ENV === 'development'
            ? () => new Promise((resolve, reject) => resolve())
            : actions.payment.execute;

        // return actions.payment.execute().then(() => {
        return paymentExecute().then(() => {
            _fetch('/report', {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8", },
                body: JSON.stringify({
                    mail: this.state.emailAddress,
                    acceptMails: this.state.acceptMails,
                    account: this.props.userName,
                    paymentId: data.paymentID,
                }),
            }).then(res => {
                if (res.status === 200) {
                    swal('הידד!', 'הדו"ח יישלח אליך בדקות הקרובות.', 'success');
                } else {
                    if (res.data) {
                        connectionFailedEvent(res.status, res.data);
                    } else {
                        connectionFailedEvent(res.status, res.statusText);
                    }

                    swal('אופס', 'היתה תקלה, נסה שוב מאוחר יותר', 'error');
                }
            }).catch(err => {
                uncaughtException(err.message, err.stack);
            });
        }).catch(err => {
            uncaughtException(err.message, err.stack);
            swal('אופס', 'היתה תקלה ב- PayPal', 'error');
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
        const paypalButton = <PayPalButton
            commit={true}
            env={PAYPAL_ENV}
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

        const devButton = <button onClick={() => this.onAuthorize('dummy')} style={{
            width: '300px', padding: '8px', backgroundColor: '#ffc439', fontWeight: 'bold', border: 'none', cursor: 'pointer',
        }}>מעבר לתשלום</button>

        return (
            <div>
                <div style={{ marginTop: '20px' }}>לבדיקת החשבון {this.props.userName} בעלות של 20 ש"ח בלבד יש להזין כתובת אימייל תקינה שאליה יישלח הדו"ח המפורט.</div>
                <span>כתובת המייל תתווסף לרשימת התפוצה לצורך קבלת תוכן שיווקי.</span>
                <div>
                    <input onBlur={this.updateEmailAddressTextbox} dir="ltr" type='text' placeholder='example@mail.com' className='preview-email-input' />
                    {this.state.emailError &&
                        <div style={{ color: 'red', fontSize: '13px', marginTop: '3px' }}>{this.state.emailError}</div>
                    }
                    <div style={{ marginTop: '10px' }}>
                        {process.env.NODE_ENV === 'development'
                            ? devButton
                            : paypalButton
                        }
                    </div>
                </div>
            </div>

        );
    }
}

export default PayPalCheckout;