import {CHAT_MESSAGE, DATA_MESSAGE} from "../data/constans";
import {addMessageInDOMAndScrollHeight} from "../helpers/DOMMessages";
import {fetchChatHistory} from "../API/API";
import {IMessage} from "../data/interfaces";
import {sendMessageSocket} from "../main";

export function addMessage() {
    if (!(DATA_MESSAGE instanceof HTMLInputElement)) {
        console.error('Элемент не найден или не является input');
        return;
    }

    const dataText: string = DATA_MESSAGE.value.trim();

    sendMessageSocket(dataText);
}


export async function loadHistoryChat() {
    fetchChatHistory()
        .then((data) => {
            if (data && data.messages) {
                const messages = data.messages.reverse();

                messages.forEach((message: IMessage) => {
                    const isMyMessage = message.user.email === 'vladimir.perminov.99@mail.ru' ? 'you' : 'other';

                    addMessageInDOMAndScrollHeight({
                        text: message.text,
                        createdAt: new Date(message.createdAt),
                        isMyMessage,
                        user: {
                            email: message.user.email,
                            name: message.user.name
                        }
                    });
                });
            }
        })
        .catch(error => {
            console.error('Ошибка загрузки сообщений:', error);
        });
}

export async function renderBackMessage() {
    if (!(CHAT_MESSAGE instanceof HTMLDivElement)) {
        console.error('Элемент не найден или не является Div');
        return;
    }

    if (CHAT_MESSAGE.scrollTop === 0) {
        await loadHistoryChat();
    }
}