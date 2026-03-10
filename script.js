// const addBtn = document.getElementById("add-btn");
const historyBtn = document.getElementById("delete-history-btn");
const listContainer = document.getElementById("list-container");
const deletedListContainer = document.getElementById("deleted-list-container");
const taskInput = document.getElementById("task");

// modals
const editBtnModal = document.querySelector(".edit-btn")
const modal = document.getElementById("modal") 
const editModal = document.getElementById("edit-content")
const editInput = document.getElementById("edit-input")
const saveBtn = document.getElementById("save-btn")
const cancelBtn = document.getElementById("cancel-btn")
const deleteModal = document.getElementById("delete-content")
const deleteText = document.getElementById("delete-text")
const confirmBtn = document.getElementById("confirm-btn")
const cancelDeleteBtn = document.getElementById("cancel-delete-btn")
const hTagModal = document.getElementById("h1-delete-modal")
let currentTodoItem; 
let todoItemToDelete; 
let editedValue;
let permanentDeleteBtn


// task counter and task completed counter and checkbox
const taskNumber = document.getElementById("task-number")
let taskCounter;
let todoCompleted;
const characterCount = document.getElementById("character-counter")

const todoListKey = "todo-list"
const deleteStorageKey = "delete-history"
const historyDisplayKey = "history-display-state"
let todoList = JSON.parse(localStorage.getItem(todoListKey)) || []
let deleteHistory = JSON.parse(localStorage.getItem(deleteStorageKey)) || []

renderTodoList()
renderDeletedList()
countDisplay()
characterCounter(taskInput)
charColorIndicator()

function taskCompCounter() {
  const checkedItems = listContainer.querySelectorAll(".checkbox:checked");

  todoCompleted = checkedItems.length;
  return todoCompleted;
}

function listCounter() {
    const todoItems = listContainer.querySelectorAll(".todo-text-container")
    taskCounter = todoItems.length;

    return taskCounter;
}
function countDisplay(){
    let todoCompleted = taskCompCounter();
    let taskCounter = listCounter();
    taskNumber.innerHTML = `Task Completed: ${todoCompleted}/${taskCounter}`
}

document.addEventListener("change", (e) => {
    if(e.target.classList.contains("checkbox")){
        countDisplay()
    }
})

// addBtn.addEventListener("click", (e) => {
//     e.preventDefault()
   
// })
console.log(historyDisplay[0]?.display);

document.addEventListener("click", (e) => {
    if(e.target.id == "add-btn") {
        e.preventDefault()
        if(taskInput.value) {
            todoListAdder(taskInput.value)
            taskInput.value = ""
            characterCount.textContent = `Character used: ${inputLength = 0}/45`;
            charColorIndicator(inputLength = 0)
        } else {
            window.alert("Task field must not empty.")
        }
    }
    
    if(e.target.id == "delete-history-btn") {
        deletedListContainer.classList.toggle("show")
        listContainer.classList.toggle("hide")
        historyBtn.classList.toggle("bg-color")
        
        if(e.target.textContent === "Delete Todo-list"){
            historyBtn.textContent = "Todo-list"
        } else {
            historyBtn.textContent = "Delete Todo-list"
        }
        
        renderDeletedList()
    }
    
    // getting the current todo-text item for edit and delete func
    if(e.target.classList.contains("edit-btn")){
        const todoItem = e.target.closest(".todo-text-container")
        currentTodoItem = todoItem
        editInput.value = todoItem.querySelector(".todo-text").textContent
        showEditModal()
    }

    if(e.target.classList.contains("delete-btn")){
        const todoItem = e.target.closest(".todo-text-container")
        todoItemToDelete = todoItem
        deleteText.textContent = todoItem.querySelector(".todo-text").textContent 
        showDeleteModal(permanentDeleteBtn)
    } else if (e.target.classList.contains("permanent-delete-btn")){
        const todoItem = e.target.closest(".todo-text-container")
        todoItemToDelete = todoItem
        deleteText.textContent = todoItem.querySelector(".todo-text").textContent 
        permanentDeleteBtn = true
        showDeleteModal(permanentDeleteBtn)
    }
    
    // cancel edit and delete
    if(e.target.id == "cancel-btn"){
        removeAllModal()
    }
    if(e.target.id == "cancel-delete-btn"){
        removeAllModal()
    }
    
    // save edit and confirm delete
    if(e.target.id == "save-btn"){
        saveEdit(editInput, currentTodoItem)
    }
    if(e.target.id == "confirm-btn"){
        confirmDeleteText(todoItemToDelete, permanentDeleteBtn)
    }
    
    
    if(e.target.classList.contains("checkbox")){
        const checkedItem = e.target;
        const getCheckBoxId = Number(checkedItem.dataset.index);
        const index = todoList.findIndex((item) => item.id == getCheckBoxId)
        
        if (index === -1) {
            console.log("Todo not found.");
            return;
        }
        
        countDisplay()
        const checked = todoList[index].completed;
        
        if(!checked) {
            todoList[index].completed = true
            saveTodo()
        } else {
            todoList[index].completed = false
            saveTodo()
        }
    }
    
})

function characterCounter(taskInput) {
    taskInput.addEventListener("input", () => {
        const inputLength = taskInput.value.length
        characterCount.textContent = `Character used: ${inputLength}/45`;
        charColorIndicator(inputLength)
    })  
}

function charColorIndicator(inputLength){
    characterCount.classList.remove("good", "moderate", "limit-warning")
    if(inputLength > 30){
        characterCount.classList.add("limit-warning")
    } else if (inputLength > 15) {
        characterCount.classList.add("moderate")
    } else {
        characterCount.classList.add("good")
    }
}

// for creating todo-list
function createCheckbox(index) {
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.className = 'checkbox'
    checkbox.id = `checkbox-${index}`
    checkbox.dataset.index = index

    return checkbox;
}

function createCustomCheckbox(index) {
    return `
        <label for="checkbox-${index}" class="custom-checkbox">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>
    `
}

function createTodoText(task, index) {
    return `
        <label for="checkbox-${index}" class="todo-text" data-index="${index}">${task}</label>
    `
}

function createEditBtn(index) {
    return `
            <svg xmlns="http://www.w3.org/2000/svg" class="edit-btn" id="edit-btn-${index} height="24px" viewBox="0 -960 960 960" width="24px">
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
            </svg>
    `
}

function createRestoreBtn(index) {
    return `
        <button class="restore-btn" id="restore-btn" data-index="${index}">
            restore
        </button>
    `
}

function createDeleteBtn(index, permanentlyDelete) {
    return `
            <svg xmlns="http://www.w3.org/2000/svg" class="${permanentlyDelete ? "permanent-delete-btn" : "delete-btn"}" id="${permanentlyDelete ? "permanent-delete-btn" : "delete-btn"} height="24px" viewBox="0 -960 960 960" width="24px">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
    `
}

function renderTodoList(){
    listContainer.innerHTML = ""
    todoList.forEach((item) => {
        const list = document.createElement('li')
        list.className = 'todo-text-container'
        list.dataset.index = item.id
        const todoText = createTodoText(item.todo, item.id)
        const checkbox = createCheckbox(item.id)
        const customCheckbox = createCustomCheckbox(item.id)
        const editBtn = createEditBtn(item.id)
        const deleteBtn = createDeleteBtn(item.id)
        
        list.appendChild(checkbox)
        
        list.innerHTML += customCheckbox + todoText + editBtn + deleteBtn;
        
        const ifChecked = list.querySelector('input[type="checkbox"]')
        ifChecked.checked = item.completed 
        console.log(item.completed);

        listContainer.appendChild(list)
        return list;
    });
}

function todoListAdder(task) {
    addTodo(task)
    saveTodo()
    getTodo()   
    countDisplay()

}

// save to local storage
function saveTodo(){
    const todoListKey = "todo-list"
    const stringData = JSON.stringify(todoList)
    localStorage.setItem(todoListKey, stringData)
    renderTodoList()
}

function addTodo(task){
    const data = getTodo()
    let newId = 0;
    if(data.length > 0) { 
        const lastItem = data[data.length - 1]
        newId = lastItem.id + 1
    } 

    todoList.push({
        todo: task,
        completed: false,
        dateAndTime: new Date().toLocaleString(),
        id: newId,
    })
    saveTodo()
}

function getTodo(){
    return todoList
}

function renderDeletedList(){
    const permanentlyDelete = true
    deletedListContainer.innerHTML = ""
    deleteHistory.forEach((item) =>  {
        const deletedList = document.createElement('li')
        deletedList.className = 'todo-text-container'
        deletedList.dataset.index = item.id
        const todoText = createTodoText(item.todo, item.id)
        const checkbox = createCheckbox(item.id)
        const customCheckbox = createCustomCheckbox(item.id)
        const restoreBtn = createRestoreBtn(item.id)
        const deleteBtn = createDeleteBtn(item.id, permanentlyDelete)
        
        deletedList.appendChild(checkbox)
        
        deletedList.innerHTML += customCheckbox + todoText + restoreBtn + deleteBtn;
        
        const ifChecked = deletedList.querySelector('input[type="checkbox"]')
        ifChecked.checked = item.completed 

        deletedListContainer.appendChild(deletedList)
        return deletedList;
    });
}


// delete history for restoring and permanently delete the task
function saveDeleteTodo(){
    const stringData = JSON.stringify(deleteHistory)
    localStorage.setItem(deleteStorageKey, stringData)
    renderDeletedList()
}

// function saveDisplayState() {
//     const stringData = JSON.stringify(historyDisplay)
//     localStorage.setItem(historyDisplayKey, stringData)
// }

function removeAllModal() {
    modal.classList.remove('show')
    editModal.classList.remove('show');
    deleteModal.classList.remove('show')
}

function showModal() {
    modal.classList.add('show')
}

function showEditModal(){
    console.log("edit-btn was cliked");
    showModal()
    editModal.classList.add('show')
}

function showDeleteModal(permanentDeleteBtn){
    showModal()
    deleteModal.classList.add("show")
    hTagModal.textContent = !permanentDeleteBtn ? "Delete this todo?" : "Delete this todo permanently?"
    
}

function saveEdit(inputToSave, currentTodoItem) {
    const id = Number(currentTodoItem.dataset.index);
    const index = todoList.findIndex(item => item.id == id);    
    todoItemToSave = currentTodoItem.querySelector('.todo-text')

    if (index !== -1) {
        todoList[index].todo = inputToSave.value;        
        saveTodo() 
        removeAllModal()
    } else {
        console.log("Todo not found");
    }    

    currentTodoItem = "";
    inputToSave = "";
}

function confirmDeleteText(todoToDelete, permanentDeleteBtn) {
    const id = Number(todoToDelete.dataset.index);
    let index    
    console.log(id);
    
    if(!permanentDeleteBtn){
        index = todoList.findIndex(item => item.id == id);
    } else {
        index = deleteHistory.findIndex(item => item.id == id);    
    }
    
    if (index !== 1) {
        if(!permanentDeleteBtn) {
            const deleteTodo = todoList[index]
            deleteHistory.push(deleteTodo)
            
            // Remove from array
            todoList = todoList.filter((item) => item.id !== id);
            saveTodo()
            
        } else {
            deleteHistory = deleteHistory.filter((item) => item.id !== id)
        }
    }
        else {
        console.log("Todo not found");
    }    
    
    todoToDelete.remove()        
    saveDeleteTodo()
    
    todoToDelete.remove();
    // Close modal and update count
    removeAllModal();
    countDisplay();
}


