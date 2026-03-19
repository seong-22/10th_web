const customInput = document.getElementById('todo_input') as HTMLInputElement; //입력창 요소 가져오기
const todoform = document.getElementById('todo_form') as HTMLFormElement; //폼 요소 가져오기
const todoList = document.getElementById('todo_list') as HTMLUListElement; //할 일 리스트 요소 가져오기
const doneList = document.getElementById('done_list') as HTMLUListElement; //완료한 일 리스트 요소 가져오기

type Todo = {
    id: number;
    text: string;
};

let todos: Todo[] = []; //할 일 목록을 저장할 배열
let doneTasks: Todo[] = []; //완료한 일 목록을 저장할 배열

const renderTask = (): void => {
    todoList.innerHTML = ""; //할 일 리스트 초기화
    doneList.innerHTML = ""; //완료한 일 리스트 초기화

    todos.forEach((todo): void => { //할 일 목록 렌더링
        const li = createTodoElement(todo, false); //할 일 요소 생성
        todoList.appendChild(li); //할 일 리스트에 요소 추가
    });

    doneTasks.forEach((todo) => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};

const getTodoText = (): string => {
    return customInput.value.trim(); //입력한 값 가져오기
};

const addTodo = (text: string): void => {
    todos.push({id: Date.now(), text}); //할 일 목록에 새로운 할 일 추가
    customInput.value = ""; //입력창 초기화
    renderTask(); //할 일 목록 렌더링
};

const completeTask = (todo: Todo): void => {
    todos = todos.filter((t) => t.id !== todo.id); //할 일 목록에서 완료한 일 제거
    doneTasks.push(todo); //완료한 일 목록에 완료한 일 추가
    renderTask(); //할 일 목록 렌더링
};

const deleteTodo = (todo: Todo): void => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id); //완료한 일 목록에서 삭제할 일 제거
    renderTask(); //할 일 목록 렌더링
};

todoform.addEventListener("submit", function(e){ //폼 제출 시
    e.preventDefault(); //기본 동작 방지
    const text = getTodoText(); //입력한 값 가져오기
    if(text){ //입력한 값이 있을 때만 할 일 추가
        addTodo(text); //할 일 추가
    }
})

const createTodoElement = (todo: Todo, isDone: boolean): HTMLElement => {
    const li = document.createElement("li");
    li.classList.add("render-container__item");
    
    // 텍스트 추가 (보안과 가독성을 위해 span 권장)
    const span = document.createElement("span");
    span.textContent = todo.text;
    li.appendChild(span);

    const button = document.createElement("button");
    button.classList.add("render-container__btn");

    if (isDone) {
        // '해낸 일' 리스트에 그려질 때
        button.textContent = "삭제";
        button.style.backgroundColor = "red";
        button.addEventListener("click", () => {
            deleteTodo(todo); // 삭제 함수 호출
        });
    } else {
        // '해야 할 일' 리스트에 그려질 때
        button.textContent = "완료";
        button.style.backgroundColor = "green";
        button.addEventListener("click", () => {
            completeTask(todo); // 완료(이동) 함수 호출
        });
    }

    li.appendChild(button);
    return li;
};

renderTask(); //초기 렌더링

