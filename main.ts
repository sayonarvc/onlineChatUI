import {addMessage, loadHistoryChat, renderBackMessage} from "./app/messageManager";
import {
    BUTTON_CHANGE_SETTINGS,
    BUTTON_CHANGE_THEME,
    BUTTON_ENTER_CODE,
    BUTTON_GET_CODE,
    BUTTON_LOG_IN,
    BUTTON_SETTINGS,
    CHAT_MESSAGE,
    CLOSE_MODAL_AUTH,
    CLOSE_MODAL_CONFIRM,
    CLOSE_MODAL_SETTINGS,
    FORM,
    GENERAL_WINDOW,
    MODAL_AUTH,
    MODAL_CONFIRM,
    MODAL_SETTINGS
} from "./data/constans";
import {clearInputMessage} from "./helpers/DOMMessages";
import {getCode} from "./app/authorization";
import {clearInputEmail} from "./helpers/DOMModalAuth";
import {getUserData, saveCodeInCookies} from "./app/confirmation";
import {changeName} from "./app/settings";
import {clearInputNewName} from "./helpers/DOMSettings";
import {getCookieToken} from "./helpers/cookie";


const token = getCookieToken();
export const socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`);

export function sendMessageSocket(text: string) {
    socket.send(JSON.stringify({text: text}));
}

function updateChat() {
    return setInterval(loadHistoryChat, 10000);
}


socket.onmessage = function (event) {
    console.log('Получено:', event.data);
};

socket.onopen = function () {
    console.log('Соединение установлено');
};

socket.onclose = function (event) {
    console.log('Соединение закрыто:', event.code, event.reason);
    setTimeout(() => {
        location.reload();
    }, 3000);
};

socket.onerror = function (error) {
    console.error('Ошибка:', error);
};

function handleAddMessage(e: Event) {
    e.preventDefault();
    addMessage();
    clearInputMessage();
}

function closeModalAuth(e: Event) {
    if (!(MODAL_AUTH instanceof HTMLDivElement)) {
        console.error('Элемент не найден или не является div');
        return;
    }

    e.preventDefault();
    MODAL_AUTH.style.display = 'none';
}

function closeModalConfirmation(e: Event) {
    if (!(MODAL_CONFIRM instanceof HTMLDivElement)) {
        console.error('Элемент не найден или не является div');
        return;
    }

    e.preventDefault();
    MODAL_CONFIRM.style.display = 'none';
}

function closeModalSettings(e: Event) {
    if (!(MODAL_SETTINGS instanceof HTMLDivElement)) {
        console.error('Элемент не найден или не является div');
        return;
    }

    e.preventDefault();
    MODAL_SETTINGS.style.display = 'none';
}

function openModalSettings(e: Event) {
    if (!(MODAL_SETTINGS instanceof HTMLDivElement)) {
        console.error('Элемент не найден или не является div');
        return;
    }

    e.preventDefault();
    MODAL_SETTINGS.style.display = 'flex';
}

function handleGetCode(e: Event) {
    e.preventDefault();
    getCode();
    clearInputEmail();
}

function handleEnterCode(e: Event) {
    if (!(MODAL_CONFIRM instanceof HTMLDivElement)) {
        console.error('Элемент не найден или не является div');
        return;
    }

    e.preventDefault();
    MODAL_CONFIRM.style.display = 'flex';
}

function handleConfirmationLogIn(e: Event) {
    if (!(MODAL_CONFIRM instanceof HTMLDivElement)) {
        console.error('Элемент не найден или не является div');
        return;
    }

    if (!(MODAL_AUTH instanceof HTMLDivElement)) {
        console.error('Элемент не найден или не является div');
        return;
    }

    e.preventDefault();

    if (!saveCodeInCookies()) {
        return;
    }
    getUserData();
    MODAL_CONFIRM.style.display = 'none';
    MODAL_AUTH.style.display = 'none';
}

function handleChangeNewNameUser(e: Event) {
    if (!(MODAL_SETTINGS instanceof HTMLDivElement)) {
        console.error('Элемент не найден или не является div');
        return;
    }

    e.preventDefault();
    changeName();
    clearInputNewName();
    getUserData();
    MODAL_SETTINGS.style.display = 'none';
}

function handleChangeTheme(e: Event) {
    if (!(BUTTON_CHANGE_THEME instanceof HTMLButtonElement)) {
        console.log('Элемент не найден или не является button');
        return;
    }

    if (!(GENERAL_WINDOW instanceof HTMLDivElement)) {
        console.log('Элемент не найден или не является button');
        return;
    }

    e.preventDefault();
    GENERAL_WINDOW.style.backgroundColor = '#7aada5';
}

window.addEventListener('DOMContentLoaded', () => {
    try {
        updateChat();
    } catch (error) {
        console.error('Не удалось загрузить историю сообщений:', error);
    }
});

FORM?.addEventListener('submit', handleAddMessage);

CLOSE_MODAL_AUTH?.addEventListener('click', closeModalAuth);
CLOSE_MODAL_CONFIRM?.addEventListener('click', closeModalConfirmation);
CLOSE_MODAL_SETTINGS?.addEventListener('click', closeModalSettings);

BUTTON_SETTINGS?.addEventListener('click', openModalSettings);

BUTTON_GET_CODE?.addEventListener('click', handleGetCode);

BUTTON_ENTER_CODE?.addEventListener('click', handleEnterCode);

BUTTON_LOG_IN?.addEventListener('click', handleConfirmationLogIn);

BUTTON_CHANGE_SETTINGS?.addEventListener('click', handleChangeNewNameUser);

CHAT_MESSAGE?.addEventListener('scroll', renderBackMessage)

BUTTON_CHANGE_THEME?.addEventListener('click', handleChangeTheme);