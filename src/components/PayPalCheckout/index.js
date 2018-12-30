import React from 'react';
import swal from 'sweetalert';

class PayPalCheckout extends React.Component {
    componentWillMount() {
        window.paypal.Button.render({
            // Configure environment
            env: 'sandbox',
            client: {
              sandbox: 'AaJNf3KNzwZbv_0Wd51AYdq_7t-QpvBw4kP4xp2c6Xbehr5xj0kApOlAKa7SdNWJqBhOCa4waFp5Ijb-',
              production: 'demo_production_client_id'
            },
            // Customize button (optional)
            locale: 'en_US',
            style: {
                label: 'paypal',
                size:  'medium',    // small | medium | large | responsive
                shape: 'rect',     // pill | rect
                color: 'blue',     // gold | blue | silver | black
                tagline: false 
            },
        
            // Enable Pay Now checkout flow (optional)
            commit: true,
        
            // Set up a payment
            payment: (data, actions) => {
              return actions.payment.create({
                transactions: [{
                  amount: {
                    total: '20',
                    currency: 'USD'
                  }
                }]
              });
            },
            // Execute the payment
            onAuthorize: (data, actions) => {
              return actions.payment.execute().then(() => {
                // Show a confirmation message to the buyer
                swal('Purchase succeeded', 'Thank you for your purchase!', 'success');
              });
            }
          }, '#paypal-button');
    }

    render() {
        return (
            <div id="paypal-button"></div>
        );
    }
}

export default PayPalCheckout;