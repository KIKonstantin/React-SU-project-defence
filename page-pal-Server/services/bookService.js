const Book = require('../models/Book');

async function getAll() {
  return Book.find({});
}
async function getByUserId(userId){
    return Book.find({_ownerId: userId});
}
async function getOne(id){
  return Book.findById(id);
}

async function create(book){
  return Book.create(book);
}

async function update(id, book){
    const existing = await item.findById(id);
    
    existing.bookName = book.bookName;
    existing.author = book.author;
    existing.imgCover = book.imgCover;
    existing.year = book.year;
    existing.resume = book.resume;
    existing.price = book.price;

    return existing.save();
}

async function deleteById(id){
    return Book.findByIdAndDelete(id)
}

module.exports = {
    getAll,
    getOne,
    getByUserId,
    create,
    update,
    deleteById,
}