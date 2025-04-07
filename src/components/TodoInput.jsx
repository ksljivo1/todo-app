import {useEffect, useRef, useState} from "react";

export function TodoInput(props) {
    const {handleAddTodo} = props
    const [inputValue, setInputValue] = useState("")
    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    })

    return (
        <div className="input-container">
            <input ref={inputRef} value={inputValue} onChange={(e) => {
                setInputValue(e.target.value)
            }} placeholder="Add task"/>
            <button onClick={() => {
                if(!inputValue) { return }
                handleAddTodo(inputValue)
                setInputValue("")
            }}>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    )
}