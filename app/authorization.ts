import {fetchCodeMail} from "../API/API";
import {EMAIL_INPUT} from "../data/constans";
import {isValidEmail} from "../validation/validateEmail";

export function getCode() {
    if (!(EMAIL_INPUT instanceof HTMLInputElement)) {
        console.error('Элемент не найден или не является input');
        return;
    }

    const email = EMAIL_INPUT.value.trim();
    if (!isValidEmail(email)) {
        return;
    }

    fetchCodeMail(email)
        .then(() => {
            alert('Код отправлен!');
        })
        .catch(error => {
            alert('Ошибка: ' + error.message);
        });
}