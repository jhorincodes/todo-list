import { confirmDeleteText, restoreTodo, saveEdit } from "./todo.js";
import {
  modal,
  editModal,
  deleteModal,
  hDeleteModal,
  restoreModal,
  editInput,
  saveBtn,
  deleteText,
  confirmBtn,
  restoreText,
  restoreConfirmBtn,
} from "./variables.js"

export function removeAllModal() {
    modal.classList.remove('show')
    editModal.classList.remove('show');
    deleteModal.classList.remove('show')
    restoreModal.classList.remove('show')
}

export function showModal() {
    modal.classList.add('show')
}

export function showEditModal(todoItem){
    showModal()
    editModal.classList.add('show') 
    editInput.value = todoItem.querySelector(".todo-text").textContent
    const id = todoItem.dataset.index;
    
    saveBtn.onclick = () => {
        saveEdit(editInput, id)
    }
}

export function showDeleteModal(todoItem, isPermanentDelete){
    showModal()
    deleteModal.classList.add("show")
    deleteText.textContent = todoItem.querySelector(".todo-text").textContent 
    hDeleteModal.textContent = !isPermanentDelete ? "Delete this todo?" : "Delete this todo permanently?"
    const todoId = Number(todoItem.dataset.index);
    
    confirmBtn.onclick = () => {
        confirmDeleteText(todoId, isPermanentDelete);
    };
}

export function showRestoreModal(todoItem){
    showModal()
    restoreModal.classList.add("show")
    restoreText.textContent = todoItem.querySelector(".todo-text").textContent
    const todoId = Number(todoItem.dataset.index);

    restoreConfirmBtn.onclick = () => {
        restoreTodo(todoId);
    };
}



