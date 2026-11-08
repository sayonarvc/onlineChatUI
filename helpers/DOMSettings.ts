import {INPUT_NEW_NAME} from "../data/constans";

export const clearInputNewName = () => {
    if (!(INPUT_NEW_NAME instanceof HTMLInputElement)) {
        console.error('Элемент не найден или не является input');
        return;
    }

    INPUT_NEW_NAME.value = "";
};
