import express from "express"
import { createTodo, deleteTodo, getTitle, toggleTodo, updateTodo } from "../controller/todo.controller.js";
const router = express.Router();


router.get('/', getTitle)
router.post('/', createTodo)
router.patch('/:id', updateTodo)
router.patch('/:id/toggle', toggleTodo)
router.delete('/:id', deleteTodo)


export default router;