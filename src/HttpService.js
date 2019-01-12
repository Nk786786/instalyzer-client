export const _fetch = function (path, init) {
    return fetch(process.env.REACT_APP_API_URL + path, init);
}