import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ITodo {
    id: string;
    title: string;
    state: "pending" | "completed"
}

interface ITodoAction {
    addTodo: (todo: ITodo) => void
}

const todoStore = create<{todos: ITodo[]} & ITodoAction>((store) => (
    {
        todos: [],
        addTodo(todo) {
            this.todos = [...this.todos, todo]
        },
    }
));


const xStore = create(persist((store) => ({

}), {
    name: "something",
}))