let defaultUrl = 'http://localhost:3001';

if(process.env.NODE_ENV === 'production') {
    defaultUrl = 'https://instalyzer-api.herokuapp.com';
}

export const _fetch = function (path, init) {
    return fetch(defaultUrl + path, init);
}