const Todo = require("../models/Todo");


module.exports = {
    viewAll : async (req, res) => {
        try {
            const allTodo = await Todo.find();
            res.status(200).json(allTodo);
        } catch (err) {
            res.status(400).json({error : `Can't find the Todo List in the Database => ${err}`});
        }
    }, // View All Todo List

    addTodo : async (req, res) => {
        try {
            const {title} = req.body;
            const completed = false;
            if(!title) res.status(400).json({error : "Please Enter the title"});
            const newTodo = new Todo({title : title, completed : completed});
            await newTodo.save();
            const addedTodo = await Todo.findOne({title : title});
            res.status(200).json(addedTodo);
        } catch (err) {
            res.status(400).json({error : `Can't add the Todo to the Database => ${err}`});
        }
    }, // Add new Todo

    updateTodo : async (req, res) => {
        try {
            const {id} = req.params;
            const {title, completed} = req.body;
            const todo = await Todo.findById({"_id" : id});
            if(!todo) res.status(400).json({error : `Can't Find the Todo please check the Id`});
            if(!title) res.status(400).json({error : "Please Enter the Updated title"});
            if(completed === undefined) res.status(400).json({error : "Please set the completed State"});
            await Todo.findByIdAndUpdate({"_id" : id}, {$set : {
                "title" : title,
                "completed" : completed
            }});
            const UpdatedTodo = await Todo.findById({"_id" : id});
            res.status(200).json(UpdatedTodo);
        } catch (err) {
            res.status(400).json({error : `Can't Update the Todo => ${err}`});
        }
    }, // Update Todo

    deleteTodo : async (req, res) => {
        try {
            const {id} = req.params;
            const todo = await Todo.findById({"_id" : id});
            if(!todo) res.status(400).json({error : `Can't Find the Todo please check the Id`});
            await Todo.findByIdAndDelete({"_id" : id});
            res.status(200).json({msg : "Todo Deleted"});
        } catch (err) {
            res.status(400).json({error : `Can't Delete the Todo => ${err}`});
        }
    }, // Delete Todo
};