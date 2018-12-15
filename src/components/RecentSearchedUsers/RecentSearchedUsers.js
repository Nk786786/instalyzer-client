import React, { Component } from 'react';
import './RecentSearchedUsers.css';

const mockListJson = [
    {
        userName: 'sentoavara',
        displayName: 'Sento a vara',
        imageUrl: 'https://instagram.fsdv2-1.fna.fbcdn.net/vp/a2456a2058249082a83a097cfe53b2e0/5C8D7A1C/t51.2885-19/s150x150/42520772_1738277276298322_5117355504850436096_n.jpg?_nc_ht=instagram.fsdv2-1.fna.fbcdn.net',
    }, {
        userName: 'arianagrande',
        displayName: 'Ariana Grande',
        imageUrl: 'https://instagram.fsdv2-1.fna.fbcdn.net/vp/b29a95e06395c15848c1d615ae735a5e/5C9DA9F9/t51.2885-19/s150x150/46202793_1797285160382597_428877640129052672_n.jpg?_nc_ht=instagram.fsdv2-1.fna.fbcdn.net',
    }, {
        userName: 'anthonyswordsofwisdomforwomen',
        displayName: 'Anthony\'s Words of Wisdom',
        imageUrl: 'https://instagram.fsdv2-1.fna.fbcdn.net/vp/80bf01952853f6d693b6bd63cc661d31/5CA8DE70/t51.2885-19/11325728_1615882565337343_222066734_a.jpg?_nc_ht=instagram.fsdv2-1.fna.fbcdn.net',
    }, {
        userName: 'maisa',
        displayName: '+A',
        imageUrl: 'https://instagram.fsdv2-1.fna.fbcdn.net/vp/d2edf4652f5c2da488f92446af087654/5CABBE15/t51.2885-19/s150x150/43778296_287131682132323_3621305815970873344_n.jpg?_nc_ht=instagram.fsdv2-1.fna.fbcdn.net',
    },
]

class RecentSearchedUsers extends Component {
    render() {
        return (
            <div className='recent-searched-users-container'>
                {mockListJson.map((item) => (
                    <div key={item.userName} className='recent-searched-users-item'>
                        <img className='recent-searched-users-item-image' src={item.imageUrl} />
                        <div dir="ltr" >{item.displayName}</div>
                        <div dir="ltr" >{item.userName}</div>
                    </div>
                ))}
            </div>
        );
    }
}

export default RecentSearchedUsers;