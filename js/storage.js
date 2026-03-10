import { todoList, deleteHistory, todoListKey, deleteStorageKey, orderState, orderStateKey } from "./variables.js"
import { renderTodoList, renderDeletedList } from "./render.js"

// save to local storage
export function saveTodo(){
    const stringData = JSON.stringify(todoList)
    localStorage.setItem(todoListKey, stringData)
    renderTodoList()
}
export function getTodos(){
    return todoList
}

export function saveDeleteTodo(){
    const stringData = JSON.stringify(deleteHistory)
    localStorage.setItem(deleteStorageKey, stringData)
    renderDeletedList()
}
export function getDeletedTodos(){
    return deleteHistory
}

export function saveOrderState(){
    const stringData = JSON.stringify(orderState)
    localStorage.setItem(orderStateKey, stringData)
}
export function getOrderState(){
    return orderState
}
