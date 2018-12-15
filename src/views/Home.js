import React, { Component } from 'react';
import SearchUserTextBox from '../components/SearchUserTextBox/SearchUserTextBox';
import RecentSearchedUsers from '../components/RecentSearchedUsers/RecentSearchedUsers';

class Home extends Component {
    render() {
        return (
            <div>
                <div id='check-user' style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '30px', fontWeight: '100', width: '600px' }}>בדקו כמה עוקבים מזוייפים יש למשתמשי אינסטגרם באמצעות מנגנון חכם ומתקדם</h3>
                    <div style={{ width: '600px', marginBottom: '200px' }}>
                        <SearchUserTextBox />
                    </div>
                </div>
                <RecentSearchedUsers />
            </div>
        );
    }
}

export default Home;