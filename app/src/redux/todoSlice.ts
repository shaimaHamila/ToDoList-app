import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
type Todo = {
    id: string,
    title: string,
    completed: boolean
}
type InitialState = {
    loading: boolean,
    todos: Todo[],
    error: string | undefined
}
const initialState: InitialState = {
    loading: false,
    todos: [],
    error: '',
};
let idCounter = 0;
function generateUniqueId(): string {
    idCounter++;
    return idCounter.toString();
}
const API = "http://localhost:1000/todos";
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
        return axios.get(API).then((response) => response.data)
    }
);

export const addTodoAsync = createAsyncThunk(
    "todos/addTodoAsync",
    async (payload: { title: string }) => {

        const newTodo = await axios.post(API, { title: payload.title })
        return newTodo
    }
)

export const toggleCompleteAsync = createAsyncThunk(
    "todos/toggleCompleteAsync",
    async (payload: Todo) => {
        const data = await axios.patch(`${API}/${payload.id}`, {
            completed: payload.completed
        })
        return data
    }
)

export const deleteTodoAsync = createAsyncThunk(
    "todos/deleteTodoAsync",
    async (payload: { id: any }) => {
        const deletedTodo = await axios.delete(`${API}/${payload.id}`)
        return deletedTodo
    },

)
const todoSlice = createSlice({
    name: "todos",
    initialState: initialState,
    reducers: {
        addToDo: (state, action) => {
            const newTodo: Todo = {
                id: generateUniqueId(),
                title: action.payload.title,
                completed: false
            };
            state.todos.push(newTodo)
        },
        toggleComplete: (state, action) => {
            const index = state.todos.findIndex((todo) => todo.id == action.payload.id)
            state.todos[index].completed = action.payload.completed
        },
        deleteToDo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
            console.log(action.payload.id)

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.todos = action.payload;
            state.error = '';

        })
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false
            state.todos = []
            state.error = action.error.message
        })
        builder.addCase(addTodoAsync.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addTodoAsync.fulfilled, (state, action) => {
            state.loading = false
            state.todos.push(action.payload.data)
        })
        builder.addCase(addTodoAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(toggleCompleteAsync.pending, (state) => {
            state.loading = true
        })
        builder.addCase(toggleCompleteAsync.fulfilled, (state, action) => {
            state.loading = false
            const index = state.todos.findIndex((todo) => todo.id == action.payload.data.id)
            state.todos[index].completed = action.payload.data.completed

        })
        builder.addCase(toggleCompleteAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(deleteTodoAsync.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteTodoAsync.fulfilled, (state, action) => {
            state.loading = false
            state.todos = action.payload.data;
        })
        builder.addCase(deleteTodoAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})
export const { addToDo, toggleComplete, deleteToDo } = todoSlice.actions;
export default todoSlice.reducer