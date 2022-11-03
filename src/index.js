import "./style.css";
import { render, remove, markAsCompleted, editTask, cleareCompleted, tasks, formaction} from "./script.js";

const completeBtn = document.querySelector(".complete");
const toDoListContainer = document.querySelector(".todo-list");

formaction()

document.addEventListener("DOMContentLoaded", () => {
  tasks.sort((a, b) => a.index - b.index).map((item) => render(item));
  remove(toDoListContainer);
  tasks.forEach((task) => {
    if(task.completed){
      let taskIndex = task.index
      toDoListContainer.querySelectorAll('.text').forEach((text) => {
        let textParentNodeId = parseInt(text.parentNode.parentNode.parentNode.id)
        if(textParentNodeId === taskIndex) {
          text.classList.add('completed')
        }
      })
    }
  })
  editTask(toDoListContainer)
  markAsCompleted(toDoListContainer)
  cleareCompleted(toDoListContainer)

});
