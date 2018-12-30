import React, { Component } from 'react';
import SearchUserTextBox from '../../components/SearchUserTextBox';
import RecentSearchedUsers from '../../components/RecentSearchedUsers';
import './Home.css';

class Home extends Component {
    render() {
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3 className='search-header-text'>בדקו כמה עוקבים מזוייפים יש למשתמשי אינסטגרם באמצעות מנגנון חכם ומתקדם</h3>
                    <div className='search-box-container'>
                        <SearchUserTextBox />
                    </div>
                </div>
                <RecentSearchedUsers />
            </div>
        );
    }
}

export default Home;