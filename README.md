# Todo App

This project is a simple Todo application built with React. In addition to the core task management features (adding, completing, deleting tasks), the app also integrates with the Gemini generative AI model to help users break down goals into smaller, actionable tasks. Users can now **edit existing tasks** and generate AI-powered task suggestions based on a goal they provide.

## Features

- **Add tasks**: Users can add new tasks via an input field.
- **Edit tasks**: Tasks can be edited after being created.
- **Complete tasks**: Mark tasks as done, which moves them to the "Completed" section.
- **Delete tasks**: Remove tasks from the list.
- **Tab navigation**: Filter tasks by their status (All, Open, Completed).
- **AI-generated tasks**: Users can input a goal, and the Gemini API will return up to 5 detailed subtasks.
- **Data persistence**: Uses `localStorage` to keep tasks saved across sessions.

## Tech Stack

- React
- Gemini Pro (Generative Language API)
- JavaScript

### Live Demo: [Visit the site](https://react-course-todo-app.netlify.app/)
