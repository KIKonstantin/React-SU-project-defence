import { requestFactory } from "./requester";

const baseUrl = 'http://localhost:3030/data/favorites';
const request = requestFactory();

export const getAll = async (userId) => {
    const searchQuery = encodeURIComponent(`_ownerId="${userId}"`);
    const result = await request.get(`${baseUrl}?where=${searchQuery}`);
    const userFavoritesList = Object.values(result);
    return userFavoritesList
};
export const getAllAndFetch = async (userId) => {
    const searchQuery = encodeURIComponent(`_ownerId="${userId}"`);
    const relationQuery = encodeURIComponent(`book=bookId:books`);

    const result = await request.get(`${baseUrl}?where=${searchQuery}&load=${relationQuery}`);
    const favoriteBooks = Object.values(result);

    return favoriteBooks;
};


export const checkIfAdded = async (userId, bookId) => {
    const userFavoritesList = await getAll(userId);
    console.log(`checkIfAdded  ${userFavoritesList.some(f => f.bookId === bookId)}`);

  };

export const addFavorite = async (bookId) => {
    const result = await request.post(baseUrl, {bookId});
    return result;
};