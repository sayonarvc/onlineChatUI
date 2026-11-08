import {EMAIL_INPUT} from "../data/constans";

export const clearInputEmail = () => {
    if (!(EMAIL_INPUT instanceof HTMLInputElement)) {
        console.error('Элемент не найден или не является input');
        return;
    }

    EMAIL_INPUT.value = "";
};