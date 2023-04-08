import { requestFactory } from "./requester";

const baseUrl = 'http://localhost:3030/data/likes';
const request = requestFactory();

export const checkIfLikedByUser = async (userId, bookId) => {
    const searchQuery = encodeURIComponent(`_ownerId="${userId}" AND bookId="${bookId}"`);
    const result = await request.get(`${baseUrl}?where=${searchQuery}?count`);
    return result.length > 0
};
export const countLikes = async (bookId) => {
    const searchQuery = encodeURIComponent(`bookId="${bookId}"`);
    const result = await request.get(`${baseUrl}?where=${searchQuery}&count`);
    return result;
};
export const addLike = async (bookId) => {
    const result = await request.post(baseUrl, { bookId });
    return result;
}