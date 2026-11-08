import {setCookieToken} from "../helpers/cookie";
import {CODE_INPUT} from "../data/constans";
import {fetchUserData} from "../API/API";
import {isValidToken} from "../validation/validateConfirmation";

export function saveCodeInCookies() {
    if (!(CODE_INPUT instanceof HTMLInputElement)) {
        console.error('Элемент не найден или не является input');
        return
    }

    const code = CODE_INPUT.value.trim();

    if (!isValidToken(code)) {
        return false;
    }

    setCookieToken(code);
    return true;
}

export function getUserData() {
    fetchUserData().then(() => {
        alert('Вы авторизованы');
    })
        .catch(error => {
            alert('Вы не авторизованы' + error.message)
        })
}