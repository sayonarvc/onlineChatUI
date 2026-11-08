export function isValidNewName(newName: string) {
    if (newName.length === 0) {
        alert(`Введите новое имя, оно не может быть пустым`)
        return false;
    }
    return true;
}