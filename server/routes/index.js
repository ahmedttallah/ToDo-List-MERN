const router = require("express").Router();

const {viewAll, addTodo, updateTodo, deleteTodo} = require("../controllers/index");

// View All Todo path => /todos/
router.get('/', viewAll);

// Add new Todo path => /todos/
router.post('/', addTodo);

// Update Todo path => /todos/:id
router.put('/:id', updateTodo);

// Delete Todo path => /todos/:id
router.delete('/:id', deleteTodo);

module.exports = router;