import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: String,
    completed: {
        type: Boolean, default: false
    }
}, {
    timestamps: true
})

const TodoModel = mongoose.model("TodoModel", todoSchema)
export default TodoModel