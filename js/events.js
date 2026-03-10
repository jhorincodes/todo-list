import { charColorIndicator, countDisplay } from "./counters.js"
import { removeAllModal, showDeleteModal, showEditModal, showRestoreModal } from "./modal.js";
import { getOrderState, saveTodo } from "./storage.js"
import { applyFiltersDeletedTodos, applyFiltersTodos, todoListAdder, updateOrderState } from "./todo.js";
import { characterCount, deletedListContainer, historyBtn, listContainer, orderSelect, searchInput, taskInput, todoList } from "./variables.js"

let isPermanentDelete;
let debounceTimer

document.addEventListener("change", (e) => {
    if(e.target.classList.contains("checkbox")){
        countDisplay()
    }
})

searchInput.addEventListener("input", (e) => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
        applyFiltersTodos()
        applyFiltersDeletedTodos()
    }, 300);
})

// handle sort/order
orderSelect.addEventListener("change", (e) => {
    updateOrderState(e.target.value);
    applyFiltersTodos()
    applyFiltersDeletedTodos()
})

document.addEventListener("click", (e) => {
    if(e.target.id == "add-btn") {
        e.preventDefault()
        if(taskInput.value) {
            todoListAdder(taskInput.value)
            taskInput.value = ""
            characterCount.textContent = "Character used: 0/45";
            charColorIndicator(0);
        } else {
            window.alert("Task field must not empty.")
        }
    }
    
    if(e.target.id == "delete-history-btn") {
        deletedListContainer.classList.toggle("show")
        listContainer.classList.toggle("hide")
        historyBtn.classList.toggle("bg-color")
        
        if(e.target.textContent === "Deleted Todo-list"){
            historyBtn.textContent = "Todo-list"
            
        } else {
            historyBtn.textContent = "Deleted Todo-list"
        }
        
        applyFiltersDeletedTodos()
    }

    // if(e.target.classList.contains("select-btn")){
    //     selectBtns.classList.add("show")
    //     selectBtn.classList.add("hide")
    // } else if(e.target.id === "cancel-select-btn"){
    //     selectBtns.classList.remove("show")
    //     selectBtn.classList.remove("hide")
    // }

    // getting the current todo-text item for edit and delete func
    if(e.target.classList.contains("edit-btn")){
        const todoItem = e.target.closest(".todo-text-container")
        showEditModal(todoItem)
    } else if(e.target.classList.contains("restore-btn")){
        const todoItem = e.target.closest(".todo-text-container")
        showRestoreModal(todoItem)
    } else if(e.target.classList.contains("delete-btn")){
        const todoItem = e.target.closest(".todo-text-container")
        isPermanentDelete = false
        showDeleteModal(todoItem, isPermanentDelete)
    } else if (e.target.classList.contains("permanent-delete-btn")){
        const todoItem = e.target.closest(".todo-text-container")
        isPermanentDelete = true
        showDeleteModal(todoItem, isPermanentDelete)
    }
    
    // cancel edit and delete
    if(e.target.id == "cancel-btn" || e.target.id == "cancel-delete-btn" || e.target.id == "cancel-restore-btn"){
        removeAllModal()
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
        } else {
            todoList[index].completed = false
        }
        saveTodo()
        applyFiltersTodos()
        applyFiltersDeletedTodos()
    }
    
})
