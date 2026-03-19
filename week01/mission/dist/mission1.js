"use strict";
const customInput = document.getElementById('todo_input');
const todoform = document.getElementById('todo_form');
const todoList = document.getElementById('todo_list');
const doneList = document.getElementById('done_list');
let todos = [];
let doneTasks = [];
const renderTask = () => {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
    todos.forEach((todo) => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTasks.forEach((todo) => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};
const getTodoText = () => {
    return customInput.value.trim();
};
const addTodo = (text) => {
    todos.push({ id: Date.now(), text });
    customInput.value = "";
    renderTask();
};
const completeTask = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTasks.push(todo);
    renderTask();
};
const deleteTodo = (todo) => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTask();
};
todoform.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});
const createTodoElement = (todo, isDone) => {
    const li = document.createElement("li");
    li.classList.add("render-container__item");
    const span = document.createElement("span");
    span.textContent = todo.text;
    li.appendChild(span);
    const button = document.createElement("button");
    button.classList.add("render-container__btn");
    if (isDone) {
        button.textContent = "삭제";
        button.style.backgroundColor = "red";
        button.addEventListener("click", () => {
            deleteTodo(todo);
        });
    }
    else {
        button.textContent = "완료";
        button.style.backgroundColor = "green";
        button.addEventListener("click", () => {
            completeTask(todo);
        });
    }
    li.appendChild(button);
    return li;
};
renderTask();
