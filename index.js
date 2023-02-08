const createTaskButton = document.querySelector('.createTask');

const localStoragePersist = (arr) => {
    localStorage.setItem('TODO_STORAGE',JSON.stringify(arr));
}

const getTodoData = () => JSON.parse(localStorage.getItem('TODO_STORAGE')) || [];


// Functions

const parseTasks = (arr) => {
    const todoContainer = document.querySelector('.todo_items');
    todoContainer.innerHTML = '';
    arr.forEach((task) => {
        todoContainer.insertAdjacentHTML('beforeend', `<li id="${task.id}" class="todo_item">
                  ${task.editable
            ? `<input value="${task.value}">`
            : `<span class="${task.done && 'done'}">${task.value}</span>`
        }
                  <div class="tasksButtonsWrapper">
                      <button class="buttons" data-action="edit" id="editButton" onclick="editTask(${task.id})">
                          <img class="image" src="./img/editIcon.svg" alt="edit">
                      </button>
                      <button class="buttons" data-action="done" id="doneButton" onclick="doneTask(${task.id})">
                          <img class="image" src="./img/done.svg" alt="done">
                      </button>
                      <button class="buttons" data-action="delete" onclick="deleteTask(${task.id})">
                          <img class="image" src="./img/cross.svg" alt="cross">
                      </button>
                  </div>
              </li>`);
    })
    localStoragePersist(arr)

};

const generateTask = (input, options = {editable: false, done: false}) => ({
    value: input.value,
    id: Date.now(),
    editable: options.editable,
    done: options.done
});

const createTask = () => {
    const input = document.querySelector('.todo_text');

    if (input.value === '') return;

    const todoItems = getTodoData();

    todoItems.push(generateTask(input));

    input.value = '';

    parseTasks(todoItems)
};

const deleteTask = (taskId) => {
    const todoList = getTodoData();
    const updatedList = todoList.filter(({id}) => taskId !== id);
    parseTasks(updatedList)
};

const doneTask = (taskId) => {
    const todoList = getTodoData();
    const updatedList = todoList.map((task) => {
        if (task.id === taskId) return {...task, done: !task.done};
        return task;
    })
    parseTasks(updatedList)
};

const editTask = (taskId) => {
    const currTask = document.getElementById(taskId)
    const currInput = currTask.querySelector('input')

    const todoList = getTodoData();
    console.log(todoList)

    const updatedList = todoList.map((task) => {
        if (task.id === taskId) return {
            ...task,
            value: task.editable ? currInput.value : task.value,
            done: false,
            editable: !task.editable,
        }
        return task;
    })


    parseTasks(updatedList)
};




parseTasks(getTodoData())

createTaskButton.addEventListener('click', createTask);

