export function removeItemById<T extends { id: string | number }>(list: T[], id: string | number): boolean {
    const index = list.findIndex(item => item.id === id);
    if (index !== -1) {
        list.splice(index, 1); // splice 会修改原数组，保持 reactive 响应式
        return true;
    }
    return false;
}
