import React, { Component } from 'react';
import './RecentSearchedUsers.css';
import { numberWithUnit } from '../../utils';
import { _fetch } from '../../HttpService';

class RecentSearchedUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            popularSearches: [],
        }
    }

    componentDidMount() {
        _fetch('/popular')
            .then((response) => {
                return response.json();
            })
            .then((jsonResponse) => {
                const popularSearches = jsonResponse.map(function (popUser) {
                    return ({
                        userName: popUser.username,
                        displayName: popUser.full_name,
                        imageUrl: popUser.avatar_url,
                        posts: popUser.mediaPosts,
                        followers: popUser.followerCount,
                        following: popUser.followingCount,
                    });
                });

                this.setState({ popularSearches });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        return (
            <div>
                {this.state.popularSearches.length > 0 &&
                    <div>
                        <span style={{ color: '#777777', marginRight: '4px', fontSize: '17px' }}>חיפושים נפוצים</span>

                        <div className='recent-searched-users-container'>
                            {this.state.popularSearches.map((item) => (
                                <div key={item.userName} className='recent-searched-users-item'>
                                    <img className='recent-searched-users-item-image' src={item.imageUrl} alt="" />
                                    <div dir="ltr" className='recent-searched-users-item-text recent-searched-users-item-displayname'>{item.displayName}</div>
                                    <a dir="ltr" href={'/preview/' + item.userName} className='recent-searched-users-item-text recent-searched-users-item-username'>@{item.userName}</a>
                                    <div className='recent-searched-users-item-account-details'>
                                        <div className='recent-searched-users-item-account-details-item'>
                                            <span className='recent-searched-users-detail-name'>פוסטים</span>
                                            <span className='recent-searched-users-detail-value'>{numberWithUnit(item.posts)}</span>
                                        </div>
                                        <div className='recent-searched-users-item-account-details-item'>
                                            <span className='recent-searched-users-detail-name'>עוקב</span>
                                            <span className='recent-searched-users-detail-value'>{numberWithUnit(item.following)}</span>
                                        </div>

                                        <div className='recent-searched-users-item-account-details-item'>
                                            <span className='recent-searched-users-detail-name'>עוקבים</span>
                                            <span className='recent-searched-users-detail-value'>{numberWithUnit(item.followers)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                }
            </div>
        );
    }
}

export default RecentSearchedUsers;