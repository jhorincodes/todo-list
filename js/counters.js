import { characterCount, listContainer, taskNumber } from "./variables.js"

export function taskCompCounter() {
  const checkedItems = listContainer.querySelectorAll(".checkbox:checked");
  return checkedItems.length;
}

export function listCounter() {
    const todoItems = listContainer.querySelectorAll(".todo-text-container")
    return todoItems.length;
}

export function countDisplay(){
    let todoCompleted = taskCompCounter();
    let taskCounter = listCounter();
    taskNumber.innerHTML = `Task Completed: ${todoCompleted}/${taskCounter}`
}

export function characterCounter(taskInput) {
    taskInput.addEventListener("input", () => {
        const inputLength = taskInput.value.length
        characterCount.textContent = `Character used: ${inputLength}/45`;
        charColorIndicator(inputLength)
    })  
}

export function charColorIndicator(inputLength){
    characterCount.classList.remove("good", "moderate", "limit-warning")
    if(inputLength > 30){
        characterCount.classList.add("limit-warning")
    } else if (inputLength > 15) {
        characterCount.classList.add("moderate")
    } else {
        characterCount.classList.add("good")
    }
}