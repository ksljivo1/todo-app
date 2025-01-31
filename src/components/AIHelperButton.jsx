// export function AIHelperButton() {
//     return (<footer>
//         <button>
//             <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
//                 <img width={20} height={20} src="/dependabot-svgrepo-com.svg" alt=""/>
//                 <p>AI Helper</p>
//             </div>
//         </button>
//     </footer>)
// }
import {GoogleGenerativeAI} from "@google/generative-ai";
import { useState } from "react";

export function AIHelperButton(props) {
    const {handleAddTodo} = props
    const [inputValue, setInputValue] = useState("")

    const [expanded, setExpanded] = useState(false);


    return (
        <div className={`ai-helper-container ${expanded ? "expanded" : ""}`}>
            {expanded ? (
                <div className="input-container">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter a goal, and I'll generate tasks for you"
                    />
                    <button onClick={ async () => {
                        const test = import.meta.env.VITE_TEST
                        console.log(test)
                        const genAi = new GoogleGenerativeAI(test);
                        const model = genAi.getGenerativeModel({model: "gemini-pro"})

                        const result = await model.generateContent(inputValue + `this was the goal, since im using 
                        gemini-pro free tier can u answer me with a json array that contains maximum 5 tasks to complete the goal, so that i can parse it in my code`)
                        const jsonString = result.response.text()
                            .replace(/^```json\s*/, '') // Remove leading ```json
                            .replace(/```$/, ''); // Remove trailing ```

                        try {
                            const tasks = JSON.parse(jsonString).map(obj => obj.task || obj)
                            console.log(tasks)

                            if (tasks.length === 0) return

                            (async () => {
                                for (const task of tasks) {
                                    await new Promise(resolve => setTimeout(resolve, 1000))
                                    handleAddTodo(task)
                                }
                            })();

                            setInputValue("")
                        } catch (error) {
                            console.error("Error parsing JSON:", error)
                        }

                    }}>
                        <i className="fa-solid fa-magic"></i> Generate
                    </button>
                    <button onClick={() => setExpanded(false)}>Cancel</button>
                </div>
            ) : (
                <button className="ai-helper-button" onClick={() => setExpanded(true)}>
                    <i className="fa-solid fa-robot"></i> AI Helper
                </button>
            )}
        </div>
    );
}
