export function isValidMessage(textMessage: string) {
    if (textMessage.length === 0) {
        alert(`Сообщение не может быть пустым`);
        return false;
    }
    return true;
}