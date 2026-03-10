import { getDeletedTodos, getTodos } from "./storage.js"
import { listContainer, deletedListContainer  } from "./variables.js"

// for creating todo-list
function createCheckbox(index, ifCompleted, ifDeleted) {
    let className;
    let checkboxId;
        if(ifDeleted){
            className = ifCompleted ? 'checkbox' : 'checkbox-disabled'
            checkboxId =  ifDeleted ? `checkbox-${index}-disabled` : `checkbox-${index}`
        } else {
            className = 'checkbox'
            checkboxId = `checkbox-${index}`
        }

    return `
        <div class="checkbox-container" id="checkbox-container">
            <input type="checkbox" class="${className}" id="${checkboxId}" data-index="${index}"/>
            <label for="checkbox-${index}" class="custom-checkbox">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                </svg>
            </label>
        </div>
    `
}

function createSelectedBox(index) {
     return `
        <div class="checkbox-container" id="checkbox-container">
            <input type="checkbox" class="checkbox" data-index="${index}"/>
            <label for="checkbox-${index}" class="custom-checkbox">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                </svg>
            </label>
        </div>
    `
}

function createTodoText(task, ifCompleted, index) {
    const className = ifCompleted ? "todo-text todo-text-completed" : "todo-text"
    return `
        <label for="checkbox-${index}" class="${className}" data-index="${index}">${task}</label>
    `
}
function createDateAndTime(dateAndTime, index) {
    return `
        <p class="date-and-time-p" data-index="${index}">${dateAndTime}</p>
    `
}

function createBtn(index, ifPermanentDelete) {
    const createEditBtn = ` <svg xmlns="http://www.w3.org/2000/svg" class="edit-btn" id="edit-btn-${index} height="24px" viewBox="0 -960 960 960" width="24px">
                                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                            </svg>`
    const createRestoreBtn = `<button class="restore-btn" id="restore-btn" data-index="${index}">
                            restore
                        </button>`
    return `
    <div class="btns-container">
        ${ifPermanentDelete ? createRestoreBtn : createEditBtn}
        <svg xmlns="http://www.w3.org/2000/svg" class="${ifPermanentDelete ? "permanent-delete-btn" : "delete-btn"}" id="${ifPermanentDelete ? "permanent-delete-btn" : "delete-btn"} height="24px" viewBox="0 -960 960 960" width="24px">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
        </svg>
    </div>
    `
}

export function renderTodoList(todoList = getTodos()) {
  listContainer.innerHTML = "";

  todoList.forEach((item) => {
    const list = document.createElement('li')
    list.className = 'todo-text-container'
    list.dataset.index = item.id

    const checkbox = createCheckbox(item.id, item.completed, false)
    const todoText = createTodoText(item.todo, item.completed, item.id)
    const dateAndTime = createDateAndTime(item.dateAndTime, item.id) 
    const btns = createBtn(item.id, false)

    list.innerHTML += checkbox + todoText + dateAndTime + btns;
    const checkboxContainer = list.querySelector('.checkbox-container')
    const ifChecked = checkboxContainer.querySelector('input[type="checkbox"]')
    ifChecked.checked = item.completed 

    listContainer.appendChild(list)
    return list;
  });
}

export function renderDeletedList(deleteHistory = getDeletedTodos()) {
    deletedListContainer.innerHTML = "";
    deleteHistory.forEach((item) =>  {
        const deletedList = document.createElement('li')
        deletedList.className = 'todo-text-container'
        deletedList.dataset.index = item.id
        const todoText = createTodoText(item.todo, item.completed, item.id)
        const dateAndTime = createDateAndTime(item.dateAndTime, item.id) 
        const checkbox = createCheckbox(item.id, item.completed, true)
        const btns = createBtn(item.id, true)
        
        deletedList.innerHTML += checkbox + todoText + dateAndTime + btns;
        const ifChecked = deletedList.querySelector('input[type="checkbox"]')
        ifChecked.checked = item.completed 

        deletedListContainer.appendChild(deletedList)
        return deletedList;
    });
}