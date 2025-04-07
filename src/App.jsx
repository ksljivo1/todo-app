import {Header} from "./components/Header.jsx";
import {Tabs} from "./components/Tabs.jsx";
import {TodoList} from "./components/TodoList.jsx";
import {TodoInput} from "./components/TodoInput.jsx";
import {AIHelperButton} from "./components/AIHelperButton.jsx";

import "./fanta.css"

import {useState, useEffect} from "react";


function App() {
    const [todos, setTodos] = useState([
        { input: "Hello! Add your first todo!", complete: true }
    ]);

    const [selectedTab, setSelectedTab] = useState("Open");

    function handleAddTodo(newTodo) {
        setTodos(prevTodos => {
            const newTodoList = [...prevTodos, { input: newTodo, complete: false }];
            handleSaveData(newTodoList);
            return newTodoList;
        });
    }

    function handleCompleteTodo(index) {
        let newTodoList = [...todos]
        let completedTodo = todos[index]
        completedTodo['complete'] = true
        newTodoList[index] = completedTodo
        setTodos(newTodoList)
        handleSaveData(newTodoList)
    }

    function handleEditTodo(editedTodo, index) {
        let newTodoList = todos.map((val, valIndex) => {
            return index === valIndex ? { input: editedTodo, complete: false } : val
        })
        setTodos(newTodoList)
        handleSaveData(newTodoList)
    }

    function handleDeleteTodo(index) {
        let newTodoList = todos.filter((val, valIndex) => {
            return valIndex !== index
        })
        setTodos(newTodoList)
        handleSaveData(newTodoList)
    }

    function handleSaveData(currTodos) {
        localStorage.setItem('todo-app', JSON.stringify({ todos: currTodos }))
    }

    useEffect(() => {
        if (!localStorage || !localStorage.getItem('todo-app')) { return }
        let db = JSON.parse(localStorage.getItem('todo-app'))
        setTodos(db.todos)
    }, [])

    return (
        <>
            <Header todos={todos}/>
            <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos={todos}/>
            <TodoList handleEditTodo={handleEditTodo} handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo} selectedTab={selectedTab} todos={todos}/>
            <TodoInput handleAddTodo={handleAddTodo}/>
            <AIHelperButton handleAddTodo={handleAddTodo}/>
        </>
    )
}

export default App
