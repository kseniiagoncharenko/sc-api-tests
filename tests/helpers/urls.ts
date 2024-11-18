export function getApiUrl(dataName: string) {
    return `/api/${dataName}`;
}
export function getSingleItemApiUrl(apiUrl: string, id: number) {
    return `${apiUrl}/${id}`;
}