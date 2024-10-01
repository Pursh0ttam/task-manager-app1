const todoModel = require("../model/todoSchema")
const userModel = require("../model/userModel")
const nodemailer = require('nodemailer');
const { sendmail } = require("../sendNotification/sendnotification");


const createTodo = async (req, res) => {
    console.log(req.body)
    try {
        let values = req.body
        if (!values.title || !values.description || !values.dueDate || !values.status) {
            return res.status(500).send({
                success: false,
                message: "please fill all the input fields"
            })
        }
        //setting priority
        // if(values.todotype===)
        let newTodo = new todoModel({ ...values })
        await newTodo.save()
        res.status(201).send({
            success: true,
            message: "new todo created successfully",
            newTodo
        })
    } catch (error) {
        return res.status(500).send({
            success: true,
            message: error.message
        })
    }

}

const insertManyTodo = async (req, res) => {
    try {
        let tasks = req.body
        if (!tasks) {
            return res.status(500).send({
                success: true,
                message: error.message
            })
        }
        let insertedItem = await todoModel.insertMany(tasks)
        insertedItem.save()
        return res.status(201).send({
            success: true,
            message: "multiple todo created successfully",
            insertedItem
        })


    } catch (error) {
        return res.status(500).send({
            success: true,
            message: error.message
        })

    }
}

const getAllTodos = async (req, res) => {
    try {

        let todos = await todoModel.find({})
        if (!todos) {
            return res.send({
                success: false,
                message: "no tasks found"
            })
        }
        return res.status(200).send({
            success: true,
            TotalCount: todos.length,
            todos
        })
    } catch (error) {
        return res.status(500).send({
            success: true,
            message: error.message
        })
    }
}

const updateTodoStatus = async (req, res) => {
    console.log(req.params.id);
    try {
        let TodoId = req.params.id
        if (!TodoId) {
            return res.status(404).send({
                success: false,
                message: "please provide task id"
            })
        }
        let todo = await todoModel.findById(TodoId)
        console.log("this is todo", todo);
        if (!todo) {
            return res.status(500).send({
                success: false,
                message: "no tasks found"
            })
        }
        //updating status
        console.log("this is from body", req.body);
        let { status } = req.body
        todo.status = status
        console.log("this is updated status", todo);
        todo.save()
        return res.status(200).send({
            success: true,
            message: "task founded", task
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}
const getTodoById = async (req, res) => {
    console.log(req.params.id);
    try {
        let TodoId = req.params.id
        if (!TodoId) {
            return res.status(404).send({
                success: false,
                message: "please provide todo id"
            })
        }
        let task = await todoModel.findById(TodoId)
        if (!task) {
            return res.status(500).send({
                success: false,
                message: "no task found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "task founded", task
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const deleteTodo = async (req, res) => {
    try {
        let todoId = req.params.id
        if (!todoId) {
            res.status(404).send({
                success: false,
                message: "please provide id of task"
            })
        }

        let task = await todoModel.findByIdAndDelete(todoId)
        if (!task) {
            return res.status(404).send({
                success: false,
                message: "task not deleted due to wrong task id"
            })
        }

        return res.status(200).send({
            success: true,
            message: "task deleted successfully",
            task
        })

    } catch (error) {
        return res.status(500).send({
            success: true,
            message: error.message,

        })
    }

}

const sortTodo = async (req, res) => {
    console.log("this is query for sort", req.query);

    let { sort = "high" } = req.query

    console.log("this are values", sort)
    try {
        //   if (1) {
        // let sort = {}
        // if (req.query.sort) {
        const parts = req.query.sort.split(':')
        //   console.log("this is parts",parts[0])
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        // sort=parts[0]
        // }
        // req.query = {}
        console.log("this is query", req.query)
        let filteredData = await items.find(req.query).sort()
        console.log(filteredData)
        // if (filteredData) {
        //   res.status(200).send(filteredData)
        // }
    }
    //   else if (1) {
    //     console.log("from two");
    //     let filteredData2 = await items.find(req.query)
    //     // console.log(filteredData2);
    //     res.status(200).send(filteredData2)
    //   }
    //   else {
    //     res.send("there is no user")
    //   }

    catch (error) {
        return res.status(500).send(error)
    }

}

let pendingTask = async (req, res) => {
    try {
        let pendingTask = await todoModel.find({ status: "pending" })
        res.status(201).send({
            success: true,
            message: "todo fetched successfully",
            size: pendingTask.length,
            pendingTask
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const notificationForSingleTAsk = async (req, res) => {
    let todoId = req.params.id
    let userId = req.body.id
    let pendingTask = await todoModel.findById(todoId)
    let user = await userModel.findById(userId)
    console.log(user);
    // sending notification
    sendmail(user.Email, pendingTask)
}

const AllPendingTodoNotification = async (req, res) => {
    try {
        const { id } = req.body
        // console.log("this is id",id);
        let user = await userModel.findById(id)
        if (!user) {
            return res.send({
                success: false,
                message: "user not found"
            })
        }
        let pendingTask = await todoModel.find({ status: "pending" })
        sendmail(user.Email, pendingTask)
        res.status(201).send({
            success: true,
            message: "todo fetched successfully",
            size: pendingTask.length,
            pendingTask
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })

    }

}

//time Taken to complete the task
const timeTakenOfSingleTask = async (req, res) => {
    try {
        let todoId = req.params.id
        if (!todoId) {
            return res.send({
                success: false,
                message: "please provid id"
            })
        }
        let { createdAt, status, updatedAt } = await todoModel.findById(todoId)
        console.log("this is status", status);
        if (status === "completed") {
            time = new Date(updatedAt) - new Date(createdAt)
            let hours = Math.floor(time / 3600000);
            return res.send({
                success: true,
                message: "time taken to complete the task",
                hours: hours, status
            })
        }
        else if (status === "in-process") {
            time = new Date(updatedAt) - new Date(createdAt)
            let hours = Math.floor(time / 3600000);
            return res.send({
                success: true,
                message: "time taken to complete the task",
                hours: hours
            })
        }
        else {
            let time = new Date() - new Date(createdAt);
            let hours = Math.floor(time / 3600000);
            return res.send({
                success: true,
                message: "time taken to complete the task",
                hours: hours
            })
        }


    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }

}
//^ repeating task at very-day ||week ||month
const repeatTask = async (req, res) => {
    let current = new Date()
    let hours = current.getHours()
    let weekday = current.getDay()
    let month = current.getMonth() + 1

    try {
        const { id } = req.body
        let user = await userModel.findById(id)
        if (!user) {
            return res.send({
                success: false,
                message: "user not found"
            })
        }

        if (hours === 24) {
            sendmail(user.Email, pendingTask, "create your daily task")
            createTodo()
        }
        if (weekday === 7) {
            sendmail(user.Email, pendingTask, "create your weekly task")
            createTodo()
        }
        if (month === 12) {
            sendmail(user.Email, pendingTask, "create your yearly task")
            createTodo()
        }

    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })

    }
}

const AddLable = async (req, res) => {
    try {
        let lable = req.body
        let todoId = req.params.id
        let task = await todoModel.findById(todoId)
        console.log("this is task", task);
            task.newval = lable
           console.log("this is label",task);


    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
}



module.exports = {
    createTodo, insertManyTodo, getAllTodos, getTodoById, updateTodoStatus,
    AllPendingTodoNotification, notificationForSingleTAsk,
    deleteTodo, pendingTask, timeTakenOfSingleTask, repeatTask, AddLable}