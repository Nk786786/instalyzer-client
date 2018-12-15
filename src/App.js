import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import SearchUserTextBox from './components/SearchUserTextBox/SearchUserTextBox';
import RecentSearchedUsers from './components/RecentSearchedUsers/RecentSearchedUsers';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <div className='heading'>
          <div className='logo-image-container'>
            <img className='logo-image' src={logo} alt='logo'></img>
          </div>
          <div>
            <ul className='main-menu' style={{ listStyleType: 'none' }}>
              <li>עלינו</li>
              <li>מחירון</li>
              <li>חיפושים נפוצים</li>
            </ul>
          </div>
          <div>USER</div>
        </div>
        <div id='check-user' style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>TEXT</h3>
          <SearchUserTextBox />
        </div>
        <RecentSearchedUsers />
      </div>
    );
  }
}

export default App;
