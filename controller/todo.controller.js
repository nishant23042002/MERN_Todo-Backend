import TodoModel from "../model/Todo.model.js";



export const getTitle = async (req, res) => {
    try {
        const data = await TodoModel.find()
        res.status(201).json(data)
    }
    catch (err) {
        res.status(404).json({ err })
    }
}

export const createTodo = async (req, res) => {
    try {
        let { title } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }
        const data = await TodoModel.create({ title })
        data.save();
        res.status(201).json({ message: "Title Added" })
    }
    catch (err) {
        return res.status(404).json({ error: "Failed to add Title", err })
    }
}

export const updateTodo = async (req, res) => {
    try {
        let { id } = req.params;
        const { title } = req.body;
        console.log(req)
        const updateTitle = await TodoModel.findByIdAndUpdate(id, {title}, { new: true })
        res.status(201).json(updateTitle)
    }
    catch (err) {
        return res.status(404).json({ error: "Failed to update the Title", details: err.message });
    }
}


export const deleteTodo = async (req, res) => {
    try {
        console.log("DELETE route hit:", req.params);
        let { id } = req.params;
        await TodoModel.findByIdAndDelete(id)
        return res.status(201).json({ message: "Deleted Successfully" })
    }
    catch (err) {
        return res.status(500).json({ error: "Failed to Delete", details: err.message });
    }
}

export const toggleTodo = async (req, res) => {
    try{
        let {id} = req.params;
        const data = await TodoModel.findById(id)
        if (!data) return res.status(404).json({ error: "Todo not found" });
        data.completed = !data.completed
        const updated = await data.save()

        res.status(201).json(updated);
    }
    catch(err){
        return res.status(500).json({ error: "Failed to toggle TODO", details: err.message });
    }
}