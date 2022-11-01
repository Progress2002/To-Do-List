// import _ from "lodash";
import './style.css';

const toDoListContainer = document.querySelector('.todo-list');

const tasks = [
  {
    description: 'complete my project',
    completed: false,
    index: 5,
  },
  {
    description: 'wash the dishes',
    completed: true,
    index: 3,
  },
];

const render = (task) => {
  toDoListContainer.innerHTML += `
  <div class="list">
    <div class="list-description">
      <input type="checkbox">
      <p>${task.description}</p>
    </div>
    <div class="icon-container">
      <i class="fa-solid fa-ellipsis-vertical icon"></i>
    </div>
  </div>
  <hr>
  `;
};

document.addEventListener('DOMContentLoaded', () => {
  tasks.sort((a, b) => a.index - b.index).map((item) => render(item));
});