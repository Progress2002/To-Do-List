/**
 * @jest-environment jsdom
 */

import { add } from '../script.js';

const getTask = (id) => {
  const task = document.getElementById(`${id}`);
  if (!task) return;

  const taskObj = {
    index: parseInt(task.id, 10),
    completed: task.querySelector('.checkbox').checked,
    description: task.querySelector('.text').textContent,
  };

  return taskObj; // eslint-disable-line 
};

const tasks = JSON.parse(localStorage.getItem('My-To-Do-List')) || [];

const mockData = [
  {
    index: 0,
    description: 'do my homework',
    completed: false,
  },
];

describe('Add method', () => {
  test('Add method should add task to dom and local storage', () => {
    document.body.innerHTML = `
      <div class="todo-list"></div>
    `;

    const taskListEl = document.querySelector('.todo-list');

    add(mockData[0], tasks, taskListEl);

    const taskFromListEl = getTask(mockData[0].index);
    const taskFromLocalStorage = JSON.parse(localStorage.getItem('My-To-Do-List'))[0];

    expect(taskFromListEl).toEqual(mockData[0]);
    expect(taskFromLocalStorage).toEqual(mockData[0]);

    localStorage.clear();
  });
});

describe('Add method', () => {
  test('Remove method should add task to dom and local storage', () => {
    document.body.innerHTML = `
      <div class="todo-list"></div>
    `;

    const taskListEl = document.querySelector('.todo-list');

    add(mockData[0], tasks, taskListEl);

    const removeBtn = document.querySelector('.delete');
    removeBtn.click();

    const taskFromListEl = getTask(mockData[0].index);
    const taskFromLocalStorage = JSON.parse(localStorage.getItem('My-To-Do-List'))[0];

    expect(taskFromListEl).not.toEqual(mockData[0]);
    expect(taskFromLocalStorage).not.toEqual(mockData[0]);
  });
});