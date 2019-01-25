import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';

import SearchUserTextBox from '../../components/SearchUserTextBox';
import RecentSearchedUsers from '../../components/RecentSearchedUsers';
import exampleReportImage from '../../images/example-report.jpg';

import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            enlargePreview: false,
        }

        this.toggleEnlargePreview = this.toggleEnlargePreview.bind(this);
    }

    toggleEnlargePreview() {
        const enlargePreview = !this.state.enlargePreview;
        this.setState({ enlargePreview });
    }

    render() {
        const { enlargePreview } = this.state;
        return (
            <div>
                <div className='home-search-search-and-preview-container'>
                    <div className='home-search-container'>
                        <h3 className='search-header-text'>חפשו חשבון אינסטגרם וקבלו פירוט על אמינות עוקביו באמצעות מנגנון חכם ומתקדם</h3>
                        <div className='search-box-container'>
                            <SearchUserTextBox />
                        </div>
                    </div>
                    <div className='home-preview-report-conatiner'>
                        <h5>דו"ח לדוגמא - לחצו להגדלה</h5>
                        <img onClick={this.toggleEnlargePreview} className='home-preview-report-img' src={exampleReportImage} alt='example-report' />
                        {enlargePreview && (
                            <Lightbox
                                mainSrc={exampleReportImage}
                                onCloseRequest={this.toggleEnlargePreview}
                                enableZoom={false}
                                imagePadding={60}
                            />
                        )}
                    </div>
                </div>
                <RecentSearchedUsers />
            </div>
        );
    }
}

export default Home;