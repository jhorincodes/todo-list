import { countDisplay } from "./counters.js"
import { removeAllModal } from "./modal.js"
import { renderDeletedList, renderTodoList } from "./render.js"
import { getDeletedTodos, getOrderState, getTodos, saveDeleteTodo, saveOrderState, saveTodo } from "./storage.js"
import { deleteHistory, orderSelect, searchInput, todoList } from "./variables.js"

export function todoListAdder(task) {
    addTodo(task)
    saveTodo()
    getTodos()   
    countDisplay()

}

function addTodo(task) {
const todosData = getTodos() || [];
const deletedTodosData = getDeletedTodos() || [];
const allTodos = [...todosData, ...deletedTodosData];
let newId = 0;

const usedIds = new Set(allTodos.map(todo => todo.id));


while (usedIds.has(newId)) {
    newId++;
}

    todoList.push({
        todo: task,
        completed: false,
        dateAndTime: new Date().toLocaleString(),
        id: newId,
    });

    saveTodo();
}


export function saveEdit(inputToSave, id) {
    let index = todoList.findIndex(item => item.id == id);    

    if (index !== -1) {
        if(inputToSave.value) {
            todoList[index].todo = inputToSave.value       
            saveTodo() 
        } else {
            window.alert("Task field must not empty.")
        }
    } else {
        console.log("Todo not found");
    }    
    removeAllModal()
    
    id = "";
    inputToSave = "";
}

export function confirmDeleteText(todoId, isPermanentDelete) {
    let index = !isPermanentDelete
        ? todoList.findIndex(item => item.id === todoId)
        : deleteHistory.findIndex(item => item.id === todoId);

    if (index !== -1) {
        if (!isPermanentDelete) {
            const deleteTodo = todoList[index];
            deleteHistory.push(deleteTodo);
            updateTodo(todoList, todoId)
        } else {
            updateTodo(deleteHistory, todoId)
        }
    } else {
        console.log("Todo not found");
    }
    
    saveTodo();
    saveDeleteTodo();
    removeAllModal();
    countDisplay();
}

export function restoreTodo(todoId){
    const index = deleteHistory.findIndex(item => item.id === todoId)
    
    if(index !== -1){
        const restoreTodo = deleteHistory[index];
        todoList.push(restoreTodo)
        updateTodo(deleteHistory, todoId)
    } else {
        console.log("Todo not found");
    }
    saveTodo()
    saveDeleteTodo()
    removeAllModal();
    countDisplay();
}


export function updateTodo(todos, todoId){
    const filtered = todos.filter(item => item.id !== todoId);
    todos.length = 0
    todos.push(...filtered)

    return todos
} 

export function applyFiltersTodos(){
    const searchTerm = searchInput.value.toLowerCase()
    let todos = getTodos()
    let state = getOrderState()
    orderSelect.value = state

    // first, filter by search term
    let filteredTodos = todos.filter(todo => todo.todo.toLowerCase().includes(searchTerm))
    switch (orderSelect.value) {
        case 'by date':
            filteredTodos.sort((a, b) => new Date(a.dateAndTime) - new Date(b.dateAndTime))
            break
        case 'completed':
            filteredTodos = filteredTodos.filter(todo => todo.completed)
            break
        case 'pending':
            filteredTodos = filteredTodos.filter(todo => !todo.completed)
            break
        case 'a-z':
            filteredTodos.sort((a, b) => a.todo.localeCompare(b.todo))
            break
        case 'z-a':
            filteredTodos.sort((a, b) => b.todo.localeCompare(a.todo))
            break
        default:
            filteredTodos.sort((a, b) => new Date(a.dateAndTime) - new Date(b.dateAndTime))
            break
    }
    renderTodoList(filteredTodos)
}
export function applyFiltersDeletedTodos(){
    const searchTerm = searchInput.value.toLowerCase()
    let deletedTodos = getDeletedTodos()
    let state = getOrderState()
    orderSelect.value = state
    
    // first, filter by search term
    let filteredTodos = deletedTodos.filter(todo => todo.todo.toLowerCase().includes(searchTerm))

    switch (orderSelect.value) {
        case 'by date':
            filteredTodos.sort((a, b) => new Date(a.dateAndTime) - new Date(b.dateAndTime))
            break
        case 'completed':
            filteredTodos = filteredTodos.filter(todo => todo.completed)
            break
        case 'pending':
            filteredTodos = filteredTodos.filter(todo => !todo.completed)
            break
        case 'a-z':
            filteredTodos.sort((a, b) => a.todo.localeCompare(b.todo))
            break
        case 'z-a':
            filteredTodos.sort((a, b) => b.todo.localeCompare(a.todo))
            break
        default:
            filteredTodos.sort((a, b) => new Date(a.dateAndTime) - new Date(b.dateAndTime))
            break
    }
    renderDeletedList(filteredTodos)
}

export function updateOrderState(value) {
    let state = getOrderState()
    state[0] = value       
    saveOrderState()
    applyFiltersDeletedTodos()
}