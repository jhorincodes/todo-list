// const addBtn = document.getElementById("add-btn");
export const historyBtn = document.getElementById("delete-history-btn");
export const textContainer = document.getElementById("todo-text-container");
export const listContainer = document.getElementById("list-container");
export const deletedListContainer = document.getElementById("deleted-list-container");
export const taskInput = document.getElementById("task");
export const searchInput = document.getElementById("search")
export const orderSelect = document.getElementById("order")

// modals
export const editBtnModal = document.querySelector(".edit-btn")
export const modal = document.getElementById("modal") 
export const editModal = document.getElementById("edit-content")
export const editInput = document.getElementById("edit-input")
export const saveBtn = document.getElementById("save-btn")
export const cancelBtn = document.getElementById("cancel-btn")
export const deleteModal = document.getElementById("delete-content")
export const deleteText = document.getElementById("delete-text")
export const confirmBtn = document.getElementById("confirm-btn")
export const cancelDeleteBtn = document.getElementById("cancel-delete-btn")
export const hDeleteModal = document.getElementById("h1-delete-modal")
export const restoreModal = document.getElementById("restore-content")
export const restoreText = document.getElementById("restore-text")
export const restoreConfirmBtn = document.getElementById("restore-confirm-btn")
export const cancelRestoreBtn = document.getElementById("cancel-restore-btn")

export const selectBtns = document.querySelector(".select-btns")
export const selectBtn = document.querySelector(".select-btn")

export let editedValue;

// task counter
export const taskNumber = document.getElementById("task-number")
export let taskCounter;
export let todoCompleted;
export const characterCount = document.getElementById("character-counter")

export const todoListKey = "todo-list"
export const deleteStorageKey = "delete-history"
export const orderStateKey = "order-state"

export let todoList = JSON.parse(localStorage.getItem(todoListKey)) || []
export let deleteHistory = JSON.parse(localStorage.getItem(deleteStorageKey)) || []

export let orderState = JSON.parse(localStorage.getItem(orderStateKey)) || []   