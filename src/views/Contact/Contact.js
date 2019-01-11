import React from 'react';
import { backendUrl } from '../../HttpService';

const fieldKeyStyle = {
    minWidth: '100px',
}

const fieldInputStyle = {
    width: '400px',
    marginBottom: '15px',
}

export const Contact = () =>
    <div>
        <h3>יצירת קשר</h3>
        <form action={backendUrl + '/contact'} method='post' style={{ width: '407px', display: 'flex', flexDirection: 'column' }}>
            <span style={fieldKeyStyle}>שם מלא</span>
            <input style={fieldInputStyle} type='text' name='fullname' />
            <span style={fieldKeyStyle}>אימייל</span>
            <input style={fieldInputStyle} type='email' name='email' />
            <span style={fieldKeyStyle}>תוכן</span>
            <textarea style={{ ...fieldInputStyle, height: '150px' }} name='message' />
            <input type='submit' value='שלח' />
        </form>
    </div>

export default Contact;