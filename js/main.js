import "./variables.js"
import { renderTodoList, renderDeletedList } from "./render.js"
import { countDisplay, characterCounter, charColorIndicator  } from "./counters.js"
import "./events.js"
import { taskInput } from "./variables.js"
import { applyFiltersDeletedTodos, applyFiltersTodos } from "./todo.js"

characterCounter(taskInput)
charColorIndicator()
renderTodoList()
renderDeletedList()
countDisplay()
applyFiltersTodos()
applyFiltersDeletedTodos()
