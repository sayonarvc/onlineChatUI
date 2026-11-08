import {getCookieToken} from "../helpers/cookie";

const urlGetCode: string = `https://edu.strada.one/api/user`;
const urlUserData: string = 'https://edu.strada.one/api/user/me';
const urlChangeName: string = 'https://edu.strada.one/api/user';
const urlHistoryChat: string = 'https://edu.strada.one/api/messages/';

export async function fetchCodeMail(email: string) {
    try {
        const response = await fetch(urlGetCode, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({email: email})
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Код успешно отправлен на почту:', data);
            return data;
        } else {
            console.error('Ошибка:', response.status, response.statusText);
            new Error(`HTTP ${response.status}, ${response.statusText}`);
        }
    } catch (error) {
        console.log('Ошибка запроса:', error);
        throw error;
    }
}

export async function fetchUserData() {
    const token = getCookieToken();

    try {
        const response = await fetch(urlUserData, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Данные успешно получены:', data);
            return data;
        } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Ошибка запроса:', error);
        throw error;
    }
}


export async function fetchChangeNameUser(newName: string) {
    const token = getCookieToken();

    try {
        const response = await fetch(urlChangeName, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: newName
            }),
        });

        if (response.ok) {
            console.log('Имя успешно изменено');
        } else {
            console.error('Ошибка', response.status, response.statusText);
            throw new Error(`HTTP ${response.status}, ${response.statusText}`);
        }
    } catch (error) {
        console.log('Ошибка запроса:', error);
        throw error;
    }
}

export async function fetchChatHistory() {
    const token = getCookieToken();

    try {
        const response = await fetch(urlHistoryChat, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Данные истории успешно получены:', data);
            return data;
        } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Ошибка запроса:', error);
        throw error;
    }
}