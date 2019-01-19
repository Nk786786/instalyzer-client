import React, { Component } from 'react';
import logo from './logo.png';
import hamburgerIcon from './hamburger-icon.png';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './views/Home/Home';
import Preview from './views/Preview/Preview';
import Contact from './views/Contact/Contact';
import ExampleReport from './views/ExampleReport/ExampleReport';
import Faqs from './views/Faqs/Faqs';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mobileMenuOpen: false,
        };

        this.toggleMobileMenuOpen = this.toggleMobileMenuOpen.bind(this);
    }

    toggleMobileMenuOpen = () => {
        const mobileMenuOpen = !this.state.mobileMenuOpen;
        this.setState({ mobileMenuOpen });
    }

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

                            <div className='main-menu-desktop-container'>
                                <ul className='main-menu' style={{ listStyleType: 'none' }}>
                                    <li><Link className='menu-link-item' to="/example-report">דו"ח לדוגמא</Link></li>
                                    <li><Link className='menu-link-item' to="/faqs">שאלות ותשובות</Link></li>
                                    <li><Link className='menu-link-item' to="/contact">צור קשר</Link></li>
                                </ul>
                            </div>
                            <div onClick={this.toggleMobileMenuOpen} className='main-menu-mobile-container'>
                                <img alt='' style={{ width: '35px' }} src={hamburgerIcon} />
                            </div>
                        </div>
                    </div>
                    <div className='app-body-container'>
                        {this.state.mobileMenuOpen &&
                            <div className='mobile-menu-container'>
                                <Link className='menu-link-item' to="/example-report" onClick={this.toggleMobileMenuOpen}>דו"ח לדוגמא</Link>
                                <Link className='menu-link-item' to="/faqs" onClick={this.toggleMobileMenuOpen}>שאלות ותשובות</Link>
                                <Link className='menu-link-item' to="/contact" onClick={this.toggleMobileMenuOpen}>צור קשר</Link>
                            </div>
                        }
                        <div className='app-body'>
                            <Route exact path="/" component={Home} />
                            <Route path="/contact" component={Contact} />
                            <Route path="/example-report" component={ExampleReport} />
                            <Route path="/faqs" component={Faqs} />
                            <Route path="/preview" component={Preview} />
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
