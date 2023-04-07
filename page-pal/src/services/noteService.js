import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/notes';
const request = requestFactory();

export const getAll = async (bookId) => {
    const searchQuery = encodeURIComponent(`bookId="${bookId}"`);
    const relationQuery = encodeURIComponent(`author=_ownerId:users`);

    const result = await request.get(`${baseUrl}?where=${searchQuery}&load=${relationQuery}`);
    const notes = Object.values(result);

    return notes;
};

export const uploadNote = async (bookId, note) => {
    const result = await request.post(baseUrl, { bookId, note });

    return result;
};