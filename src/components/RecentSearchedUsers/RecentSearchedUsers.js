import React, { Component } from 'react';
import './RecentSearchedUsers.css';
import { numberWithUnit } from '../../utils';

// const mockListJson = [
//     {
//         userName: 'sentoavara',
//         displayName: 'Sento a vara',
//         imageUrl: 'https://instagram.fsdv2-1.fna.fbcdn.net/vp/a2456a2058249082a83a097cfe53b2e0/5C8D7A1C/t51.2885-19/s150x150/42520772_1738277276298322_5117355504850436096_n.jpg?_nc_ht=instagram.fsdv2-1.fna.fbcdn.net',
//     }, {
//         userName: 'arianagrande',
//         displayName: 'Ariana Grande',
//         imageUrl: 'https://instagram.fsdv2-1.fna.fbcdn.net/vp/b29a95e06395c15848c1d615ae735a5e/5C9DA9F9/t51.2885-19/s150x150/46202793_1797285160382597_428877640129052672_n.jpg?_nc_ht=instagram.fsdv2-1.fna.fbcdn.net',
//     }, {
//         userName: 'anthonyswordsofwisdomforwomen',
//         displayName: 'Anthony\'s Words of Wisdom',
//         imageUrl: 'https://instagram.fsdv2-1.fna.fbcdn.net/vp/80bf01952853f6d693b6bd63cc661d31/5CA8DE70/t51.2885-19/11325728_1615882565337343_222066734_a.jpg?_nc_ht=instagram.fsdv2-1.fna.fbcdn.net',
//     }, {
//         userName: 'maisa',
//         displayName: '+A',
//         imageUrl: 'https://instagram.fsdv2-1.fna.fbcdn.net/vp/d2edf4652f5c2da488f92446af087654/5CABBE15/t51.2885-19/s150x150/43778296_287131682132323_3621305815970873344_n.jpg?_nc_ht=instagram.fsdv2-1.fna.fbcdn.net',
//     },
// ]

class RecentSearchedUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            popularSearches: [],
        }
    }

    render() {
        fetch('http://localhost:3001/popular')
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

        return (
            <div>
                {this.state.popularSearches.length > 0 &&
                    <div>
                        <span style={{ color: '#bbb', marginRight: '4px', fontSize: '16px', fontWeight: 'bold' }}>חיפושים נפוצים</span>

                        <div className='recent-searched-users-container'>
                            {this.state.popularSearches.map((item) => (
                                <div key={item.userName} className='recent-searched-users-item'>
                                    <img className='recent-searched-users-item-image' src={item.imageUrl} alt="" />
                                    <div dir="ltr" className='recent-searched-users-item-text recent-searched-users-item-displayname'>{item.displayName}</div>
                                    <a dir="ltr" rel="noopener noreferrer" target="_blank" href={'https://www.instagram.com/' + item.userName + '/'} className='recent-searched-users-item-text recent-searched-users-item-username'>@{item.userName}</a>
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