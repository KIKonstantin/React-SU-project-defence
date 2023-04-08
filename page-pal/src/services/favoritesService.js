import { requestFactory } from "./requester";

const baseUrl = 'http://localhost:3030/data/favorites';
const request = requestFactory();

export const checkIfAdded = async (userId, bookId) => {
    const searchQuery = encodeURIComponent(`_ownerId="${userId}" AND bookId="${bookId}"`);
    const result = await request.get(`${baseUrl}?where=${searchQuery}?count`);
    return result.length > 0
};
export const getAllAndFetch = async (userId) => {
    const searchQuery = encodeURIComponent(`_ownerId="${userId}"`);
    const relationQuery = encodeURIComponent(`book=bookId:books`);

    const result = await request.get(`${baseUrl}?where=${searchQuery}&load=${relationQuery}`);
    const favoriteBooks = Object.values(result);
    return favoriteBooks;
};

export const addFavorite = async (bookId) => {
    const result = await request.post(baseUrl, {bookId});
    return result;
};

