export function isValidToken(textToken: string) {
    if (textToken.length === 0) {
        alert(`Введите токен`);
        return false;
    }
    return true;
}