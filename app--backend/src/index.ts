import express, { Request, Response } from "express";
import dotenv from "dotenv"
import cors from "cors";
import { json } from "body-parser";


//Fore env file
dotenv.config();

const port = process.env.PORT || 1000
const app = express();
app.use(cors());
app.use(json());
let idCounter = 0;

function generateUniqueId(): string {
    idCounter++;
    return idCounter.toString();
}
let todos = [
    {
        id: generateUniqueId(),
        title: 'Hey todo from the backend',
        completed: true,
    },
    {
        id: generateUniqueId(),
        title: 'todo 2',
        completed: false,
    },
    {
        id: generateUniqueId(),
        title: 'todo 3',
        completed: false,
    },
    {
        id: generateUniqueId(),
        title: 'todo 4',
        completed: false,
    },
    {
        id: generateUniqueId(),
        title: 'todo 5',
        completed: false,
    },
];
app.get('/', (req, res) => res.send('Hey go to /todos'));
app.get('/todos', (req, res) => res.send(todos));
app.post('/todos', (req, res) => {
    const todo = { title: req.body.title, id: generateUniqueId(), completed: false };
    todos.push(todo);
    return res.send(todo);
});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex((todo) => todo.id == id);
    const completed = Boolean(req.body.completed);
    if (index > -1) {
        todos[index].completed = completed;
    }
    return res.send(todos[index]);
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex((todo) => todo.id == id);
    if (index > -1) {
        todos.splice(index, 1);
    }

    res.send(todos);
});
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
})