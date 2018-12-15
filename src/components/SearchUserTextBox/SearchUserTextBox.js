import React, { Component } from 'react';
import './SearchUserTextBox.css';

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

class SearchUserTextBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textboxValue: '',
            foundUsers: [],
        };

        this.setTextboxValue = this.setTextboxValue.bind(this);
        this.checkUser = this.checkUser.bind(this);
    }

    setTextboxValue(value) {
        const textboxValue = value.target.value;
        const foundUsers = textboxValue != '' ? mockListJson : [];
        this.setState({ textboxValue, foundUsers });
    }

    checkUser(username) {
        console.log('Fetching ' + username);
        fetch('http://localhost:3001/account/' + username)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                console.log(json);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        return (
            <div className='search-user-textbox-container'>
                <div className='search-user-textbox-input-container'>
                    <input className='search-user-textbox-container-input' onChange={this.setTextboxValue} type='text' placeholder='שם משתמש אינסטגרם'></input>
                    <div className='search-user-textbox-container-button' onClick={() => this.checkUser(this.state.textboxValue)}>חיפוש</div>
                </div>
                {!!this.state.foundUsers.length &&
                    <div className='search-user-textbox-list-container'>
                        {mockListJson.map((item) => (
                            <div onClick={() => this.checkUser(item.userName)} key={item.userName} className='search-user-textbox-list-item'>
                                <div className='search-user-textbox-list-item-image'>
                                    <img src={item.imageUrl} />
                                </div>
                                <div className='search-user-textbox-list-item-user'>
                                    <div className='search-user-textbox-list-item-user-username'>{item.userName}</div>
                                    <div className='search-user-textbox-list-item-user-displayname'>{item.displayName}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        );
    }
}

export default SearchUserTextBox;