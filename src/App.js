import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
// import SearchUserTextBox from './components/SearchUserTextBox/SearchUserTextBox';
// import RecentSearchedUsers from './components/RecentSearchedUsers/RecentSearchedUsers';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import Preview from './views/Preview/Preview';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='app'>
          <div className='heading-container'>
            <div className='heading'>
              <div className='logo-image-container'>
                <Link to="/"><img className='logo-image' src={logo} alt='logo'></img></Link>
                <div style={{ height: '33px', borderRight: '1px solid black', margin: '0 15px 0 15px' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'Open Sans', fontSize: '20px' }}>Instalyzer</span>
                  <span style={{ fontSize: '12px', color: '#777777' }}>בדיקה מקצועית של חשבונות אינסטגרם</span>
                </div>
              </div>
              <div>
                <ul className='main-menu' style={{ listStyleType: 'none' }}>
                  {/* <li><Link className='menu-link-item' to="/about">עלינו</Link></li>
                  <li><Link className='menu-link-item' to="/pricing">מחירון</Link></li>
                  <li><Link className='menu-link-item' to="/popular">חיפושים נפוצים</Link></li> */}
                </ul>
              </div>
              {/* <div>USER</div> */}
            </div>
          </div>
          {/* <div id='check-user' style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '30px', fontWeight: '100', width: '600px' }}>בדקו כמה עוקבים מזוייפים יש למשתמשי אינסטגרם באמצעות מנגנון חכם ומתקדם</h3>
            <div style={{ width: '600px', marginBottom: '200px' }}>
              <SearchUserTextBox />
            </div>
          </div>
          <RecentSearchedUsers /> */}
          <div className='app-body'>
            <Route exact path="/" component={Home} />
            {/* <Route path="/about" component={About} /> */}
            {/* <Route path="/pricing" component={Topics} /> */}
            {/* <Route path="/popular" component={Topics} /> */}
            <Route path="/preview" component={Preview} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
