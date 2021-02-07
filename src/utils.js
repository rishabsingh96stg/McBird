export function logOut(userType) {
    return new Promise((res, rej) => {
        window.localStorage.removeItem(userType);
        res(true);
    });
}

export function isLoggedIn(userType) {
    let session = getObject(userType) || {};
    session = Object.keys(session).length && JSON.parse(session)
    let accessToken = session && session.data && session.data['user-token'] || "";
    return accessToken;
}

export function getObject(key) {
    if (window && window.localStorage) {
        return window.localStorage.getItem(key);
    }
}

export function saveObject(key, value) {
    if (window && window.localStorage) {
        return window.localStorage.setItem(key, value);
    }
}