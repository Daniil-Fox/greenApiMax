export const chatIdSearchParam = 'chatId';

export const getChatLocation = (chatId: string) => ({
    pathname: '/',
    search: `?${new URLSearchParams({ [chatIdSearchParam]: chatId }).toString()}`,
});
