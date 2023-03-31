const { hasUser } = require('../middlewares/guards');
const { getAll, create, getOne, update, deleteById } = require('../services/bookService');
const { parseError } = require('../util/parser');

const bookController = require('express').Router();

bookController.get('/', async (req, res) => {
    let books = [];
// check query for favorite books
    if(req.query.where){
        const userId = JSON.parse(req.query.where.split('=')[1]);
        books = await getByUserId(userId)
    }else{
        books = await getAll(); 
    }
    res.json();
});


bookController.post('/', hasUser(), async (req, res) => {
    try {
        const data = Object.assign({ _ownerId: req.user._id }, req.body);
        console.log(data);
        const book = await create(data);
        res.json(book);
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({ message });
    }
});

bookController.get('/:id', async (req, res, next) => {
    const book = await getOne(req.params.id);
    res.json(book);
});

bookController.put('/:id', hasUser(),async (req, res, next) => {
    const book = await getOne(req.params.id);
    if(req.user._id !== book._ownerId){
        return res.status(403).json({message: 'You are not authorized to edit this book'});
    }
    try {
        const result = await update(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

bookController.delete('/:id', hasUser(), async (req, res) => {
    const book = await getOne(req.params.id);
    if(req.user._id !== book._ownerId){
        return res.status(403).json({message: 'You are not authorized to delete this book!'})
    }
    try {
        const result = await deleteById(req.params.id);
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }

});
    module.exports = bookController;