import {CHAT_MESSAGE, DATA_MESSAGE, MESSAGE_TEMPLATE} from "../data/constans";
import {format} from "date-fns";
import {isValidMessage} from "../validation/validateMessage";
import {IMessage} from "../data/interfaces";

const createMessageInDOM = (message: IMessage) => {
    if (!(MESSAGE_TEMPLATE instanceof HTMLTemplateElement)) {
        console.error('Элемент не найден или не является template');
        return;
    }

    const messageCopy = MESSAGE_TEMPLATE.content.cloneNode(true) as DocumentFragment;

    const containerMyMessage = document.createElement("div");
    containerMyMessage.className =
        message.isMyMessage === "you"
            ? "container-my-message"
            : "container-other-message";

    const personElement = document.createElement("span");
    personElement.className =
        message.isMyMessage === "you" ? "you-message" : "other-message";

    const nameElement = document.createElement("span");
    nameElement.className = "user-name";
    nameElement.textContent = message.user.name.slice(0, 10) + `...`;

    const textElement = document.createElement("span");
    textElement.className = "text";
    textElement.textContent = message.text.trim();

    const dateElement = document.createElement("span");
    dateElement.className = "date";
    dateElement.textContent = `отправлено: ${format(
        message.createdAt,
        "HH:mm:ss",
    )}`;

    containerMyMessage.append(personElement, nameElement, textElement, dateElement);
    messageCopy.append(containerMyMessage);

    return [containerMyMessage, messageCopy, textElement, dateElement];
};

export const addMessageInDOMAndScrollHeight = (messageData: IMessage) => {
    if (!(CHAT_MESSAGE instanceof HTMLDivElement)) {
        console.error('Элемент не найден или не является div');
        return;
    }

    const result = createMessageInDOM(messageData);
    if (!result) return;
    const [messageCopy] = result;

    if (!isValidMessage(messageData.text)) {
        return;
    }

    CHAT_MESSAGE.append(messageCopy);
    CHAT_MESSAGE.scrollTop = CHAT_MESSAGE.scrollHeight;
};

export const clearInputMessage = () => {
    if (!(DATA_MESSAGE instanceof HTMLInputElement)) {
        console.error('Элемент не найден или не является input');
        return;
    }

    DATA_MESSAGE.value = "";
};