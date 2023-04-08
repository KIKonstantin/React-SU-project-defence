import { requestFactory } from "./requester";
import { Navigate } from "react-router-dom";
const host = 'http://localhost:3030';
const url = `${host}/data/books`;
export const bookServiceFactory = (token) => {
    const request = requestFactory(token);
    const getAll = async () => {
        const result = await request.get(url);
        const books = Object.values(result);
        return books;
    };
    const lastAdded = async () => {
        const searchQuery = encodeURIComponent(`_createdOn desc`);
        try {
            console.log(`${url}?sortBy=${searchQuery}`);
          const result = await request.get(`${url}?sortBy=${searchQuery}`);
          console.log(result)
          const lastThreeBooks = result.slice(0, 3);
          return lastThreeBooks;
        } catch (error) {
          return error.message;
        }
      };
      
      
    const getOne = async(bookId) => {
        try {
            const result = await request.get(`${url}/${bookId}`);
            return result;
            
        } catch (error) {
            return error;
        }
    
    };
    const create = async(bookData) => {
        try {
            const result = await request.post(url, bookData);
            return result;
        } catch (error) {
            alert(error.message)
        }

    };

    const edit = (bookId, data) => request.put(`${url}/${bookId}`, data);
    const deleteBook = (bookId) => request.delete(`${url}/${bookId}`);
    return{
        getAll,
        getOne,
        create,
        edit,
        deleteBook,
        lastAdded
    }
}