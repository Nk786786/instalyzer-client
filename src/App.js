import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './views/Home/Home';
import Preview from './views/Preview/Preview';
import Contact from './views/Contact/Contact';
import ExampleReport from './views/ExampleReport/ExampleReport';

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
                <li><Link className='menu-link-item' to="/example-report">דו"ח לדוגמא</Link></li>
                <li><Link className='menu-link-item' to="/contact">צור קשר</Link></li>
                  {/* <li><Link className='menu-link-item' to="/about">עלינו</Link></li>
                  <li><Link className='menu-link-item' to="/pricing">מחירון</Link></li>
                  <li><Link className='menu-link-item' to="/popular">חיפושים נפוצים</Link></li> */}
                </ul>
              </div>
              {/* <div>USER</div> */}
            </div>
          </div>
          <div className='app-body'>
            <Route exact path="/" component={Home} />
            <Route path="/contact" component={Contact} />
            <Route path="/example-report" component={ExampleReport} />
            {/* <Route path="/about" component={About} /> */}
            {/* <Route path="/pricing" component={Topics} /> */}
            {/* <Route path="/popular" component={Topics} /> */}
            <Route path="/preview" component={Preview} />
          </div>
          {/* <div style={{ fontSize: '11px', fontWeight: '0', color: '#aaa', borderTop: '1px solid rgba(0,0,0,.0975)', width: '1000px', bottom: '0', position: 'absolute', padding: '10px 0 10px 0' }}>
            כל הזכויות שמורות <span style={{ fontFamily: 'Open Sans' }}>© Instalyzer</span>
          </div> */}
        </div>
      </Router>
    );
  }
}

export default App;
