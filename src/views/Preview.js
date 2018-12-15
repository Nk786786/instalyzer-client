import React, { Component } from 'react';

class Preview extends Component {
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <img style={{ borderRadius: '80px', marginLeft: '80px' }} src='https://instagram.fsdv2-1.fna.fbcdn.net/vp/e92c5f2249bdab612f069bf9332fd125/5CB2BE92/t51.2885-19/s150x150/44773425_340372686748138_3620105840763076608_n.jpg?_nc_ht=instagram.fsdv2-1.fna.fbcdn.net' />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <span style={{ cursor: 'pointer', marginLeft: '30px', fontSize: '28px', color: '#3897f0', fontFamily: 'Open Sans' }}>eyalgolan1@</span>
                        <span style={{ fontSize: '28px', color: '#262626', fontFamily: 'Open Sans', fontWeight: 'bold' }}>Eyal Golan</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '15px' }}>
                        <span style={{ marginLeft: '40px' }}><b>1244</b> פוסטים</span>
                        <span style={{ marginLeft: '40px' }}><b>584K</b> עוקבים</span>
                        <span style={{ marginLeft: '40px' }}><b>1449</b> עוקב אחר</span>
                    </div>
                    <div style={{ fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', marginTop: '20px', fontSize: '20px', border: '1px solid #3897f0', color: '#3897f0', padding: '5px' }}>בדוק משתמש</div>
                </div>
            </div>
        );
    }
}

export default Preview;