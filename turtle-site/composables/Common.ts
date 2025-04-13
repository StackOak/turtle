export function removeItemById<T extends { id: string | number }>(list: T[], id: string | number): boolean {
    const index = list.findIndex(item => item.id === id);
    if (index !== -1) {
        list.splice(index, 1); // splice 会修改原数组，保持 reactive 响应式
        return true;
    }
    return false;
}
export const formatDateTime = (date: any) => {
    return new Date(date).toLocaleString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false // 使用 24 小时制
    })
}
