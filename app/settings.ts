import {INPUT_NEW_NAME} from "../data/constans";
import {fetchChangeNameUser} from "../API/API";
import {isValidNewName} from "../validation/validateSettings";

export function changeName() {
    if (!(INPUT_NEW_NAME instanceof HTMLInputElement)) {
        console.error('Элемент не найден или не является input');
        return;
    }
    const newNames = INPUT_NEW_NAME.value.trim();

    if (!isValidNewName(newNames)) {
        return;
    }

    fetchChangeNameUser(newNames).then(() => {
        alert(`Имя успешно изменено на: ${newNames}`)
    }).catch(error => {
        alert('Ошибка:' + error.message)
    })
}