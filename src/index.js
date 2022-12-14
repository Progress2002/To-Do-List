import './style.css';
import {
  render, remove, markAsCompleted, editTask, cleareCompleted, tasks, formaction,
} from './script.js';

const toDoListContainer = document.querySelector('.todo-list');

formaction();

document.addEventListener('DOMContentLoaded', () => {
  tasks.sort((a, b) => a.index - b.index).map((item) => render(item));
  remove(toDoListContainer);
  tasks.forEach((task) => {
    if (task.completed) {
      const taskIndex = task.index;
      toDoListContainer.querySelectorAll('.text').forEach((text) => {
        const textParentNodeId = parseInt(text.parentNode.parentNode.parentNode.id, 10);
        if (textParentNodeId === taskIndex) {
          text.classList.add('completed');
          text.previousElementSibling.checked = true;
        }
      });
    }
  });
  editTask(toDoListContainer);
  markAsCompleted(toDoListContainer);
  cleareCompleted(toDoListContainer);
});
