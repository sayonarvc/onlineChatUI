export function isValidEmail(email: string) {
    if (email.length === 0) {
        alert(`Введите email`)
        return false;
    }
    return true;
}