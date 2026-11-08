import Cookies from 'js-cookie';

export function setCookieToken(token: string, minutes = 20) {
    Cookies.set('token', token, {expires: minutes / 1440});
}

export function getCookieToken() {
    return Cookies.get('token');
}