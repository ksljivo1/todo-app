import {useState} from "react";

export function TodoCard(props) {
    const [isEditable, setIsEditable] = useState(false)
    const {todo, handleDeleteTodo, todoIndex, handleCompleteTodo, selectedTab, handleEditTodo} = props
    const [inputValue, setInputValue] = useState(todo.input)

    return isEditable ?
        <div className="input-container">
            <input onChange={e => setInputValue(e.target.value)} value={inputValue}/>
            <button onClick={() => {
                if(!inputValue) { return }
                handleEditTodo(inputValue, todoIndex)
                setIsEditable(false)
            }}>
                <p>Edit completed</p>
            </button>
        </div>
    :
        <div className="card todo-item">
            <p>{todo.input}</p>
            <div className="todo-buttons">
                <button onClick={
                    () => {
                        handleCompleteTodo(todoIndex)
                    }
                } disabled={todo.complete}>
                    <h6>Done</h6>
                </button>
                <button>
                    <h6 onClick={
                        () => {
                            handleDeleteTodo(todoIndex)
                        }
                    }>Delete</h6>
                </button>
                {selectedTab === "Open" && <button>
                    <h6 onClick={() => setIsEditable(true)}>Edit</h6>
                </button>}
            </div>
        </div>
}