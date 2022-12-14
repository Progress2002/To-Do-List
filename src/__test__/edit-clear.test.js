/**
 * @jest-environment jsdom
 */

import { add, updateTaskDesc } from '../script.js';

// eslint-disable-next-line consistent-return
const getTask = (id) => {
  const task = document.getElementById(`${id}`);
  if (task) {
    return {
      index: parseInt(task.id, 10),
      completed: task.querySelector('.checkbox').checked,
      description: task.querySelector('.text').textContent,
    };
  }
};

const cleareCompleted = (element, tasks) => {
  element.querySelectorAll('.list').forEach((list) => {
    const parentnode = list.parentNode;
    tasks.forEach((task) => {
      if (task.completed) {
        parentnode.remove();
      }
    });
  });
  tasks = tasks.filter((task) => !task.completed);
  localStorage.setItem('My-To-Do-List', JSON.stringify(tasks));
};

describe('Edit method', () => {
  test('Edit method should edit task in dom and local storage', () => {
    document.body.innerHTML = `
      <div class="todo-list"></div>
    `;

    const tasks = JSON.parse(localStorage.getItem('My-To-Do-List')) || [];
    const mockData = [
      {
        index: 0,
        description: 'do my homework',
        completed: false,
      },
    ];

    const taskListEl = document.querySelector('.todo-list');

    add(mockData[0], tasks, taskListEl);

    const taskDescription = document.querySelector('p');
    const newTaskDescription = 'do my math homework';
    taskDescription.textContent = newTaskDescription;
    updateTaskDesc(tasks, taskDescription);

    const taskFromListEl = getTask(mockData[0].index);
    const taskFromLocalStorage = JSON.parse(localStorage.getItem('My-To-Do-List'))[0];

    expect(taskFromListEl.description).toBe(newTaskDescription);
    expect(taskFromLocalStorage.description).toBe(newTaskDescription);
    localStorage.clear();
  });
});

describe('Clear completed tasks method', () => {
  test('Clear completed tasks method should remove completed task from dom and local storage', () => {
    document.body.innerHTML = `
      <div class="todo-list"></div>
      <button class="complete">Clear all completed</button>
    `;

    const tasks = [];
    const mockData = [
      {
        index: 0,
        description: 'do my math homework',
        completed: false,
      },
    ];

    const taskListEl = document.querySelector('.todo-list');

    add(mockData[0], tasks, taskListEl);

    const checkbox = document.querySelector('input');
    checkbox.click();
    cleareCompleted(taskListEl, tasks);

    const taskFromListEl = getTask(mockData[0].index);
    const taskFromLocalStorage = JSON.parse(localStorage.getItem('My-To-Do-List'))[0];

    expect(taskFromListEl).toBeUndefined();
    expect(taskFromLocalStorage).toBeUndefined();
  });
});