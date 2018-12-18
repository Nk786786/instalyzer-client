const defaultUrl = 'http://localhost:3001';

export const _fetch = function (path, init) {
    return fetch(defaultUrl + path, init);
}