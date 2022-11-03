const completeBtn = document.querySelector('.complete');
const toDoListContainer = document.querySelector('.todo-list');
const form = document.querySelector('form');

let tasks = []; // eslint-disable-line 

const updateStorage = (task) => {
  localStorage.setItem('My-To-Do-List', JSON.stringify(task));
};

// render newly added task to page --------
export const render = (task) => {
  toDoListContainer.innerHTML += `
  <div id="${task.index}">
  <div class="list">
    <div class="list-description">
      <input type="checkbox" class="checkbox">
      <p contenteditable="true" class="text" spellcheck="false">${task.description}</p>
    </div>
    <div class="icon-container">
      <i class="fa-solid fa-ellipsis-vertical icon"></i>
      <i class="fa-regular fa-trash-can delete active"></i>
    </div>
  </div>
  <hr>
</div>
  `;
};

// Remove selected task from list---
const removeId = (id) => {
  tasks = tasks.filter((task) => task.index !== id);
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i;
    updateStorage(tasks);
  }
  updateStorage(tasks);
};

export const remove = (element) => {
  element.querySelectorAll('.icon').forEach((icon) => {
    icon.addEventListener('click', (e) => {
      const parent = e.target.parentNode.parentNode.parentNode;
      icon.classList.add('active');
      icon.nextElementSibling.classList.remove('active');
      setTimeout(() => {
        icon.nextElementSibling.classList.add('active');
        icon.classList.remove('active');
      }, 4000);
      element.querySelectorAll('.delete').forEach((btn) => {
        btn.addEventListener('click', () => {
          removeId(parseInt(parent.id, 10));
          parent.remove();
        });
      });
    });
  });
};

// mark a task as completed or not------------
const toggleComplete = (element) => {
  element.classList.toggle('completed');
  let elementPerentId = element.parentNode.parentNode.parentNode.id;
  elementPerentId = parseInt(elementPerentId, 10);
  tasks.forEach((task) => {
    if (task.index === elementPerentId) {
      const isIncluded = element.classList.contains('completed');
      if (isIncluded) {
        task.completed = true;
      } else {
        task.completed = false;
      }
      updateStorage(tasks);
    }
  });
};

export const markAsCompleted = (element) => {
  element.querySelectorAll('.checkbox').forEach((box) => {
    box.addEventListener('click', () => {
      const item = box.nextElementSibling;
      toggleComplete(item);
    });
  });
};

// Cleare completed files---------
export const cleareCompleted = (element) => {
  completeBtn.addEventListener('click', () => {
    element.querySelectorAll('.list').forEach((list) => {
      const taskId = parseInt(list.parentNode.id, 10);
      const parentnode = list.parentNode;
      tasks.forEach((task) => {
        if (task.completed && task.index === taskId) {
          parentnode.remove();
        }
      });
    });
    tasks = tasks.filter((task) => task.completed !== true);
    for (let i = 0; i < tasks.length; i += 1) {
      tasks[i].index = i;
      updateStorage(tasks);
    }
    updateStorage(tasks);
  });
};

// // edit task----------------
export const editTask = (element) => {
  element.querySelectorAll('.text').forEach((box) => {
    box.addEventListener('input', (e) => {
      const activeText = e.target;
      const textContent = activeText.innerHTML;
      const activeTextParentId = parseInt(activeText.parentNode.parentNode.parentNode.id, 10);
      tasks.forEach((task) => {
        if (task.index === activeTextParentId) {
          task.description = textContent;
          updateStorage(tasks);
        }
      });
    });
  });
};

//   // Add new task to the list---------
const add = (task) => {
  render(task);
  tasks.push(task);
  remove(toDoListContainer);
  markAsCompleted(toDoListContainer);
  editTask(toDoListContainer);
  updateStorage(tasks);
  cleareCompleted(toDoListContainer);
};

export const formaction = () => {
  form.onsubmit = (e) => {
    e.preventDefault();
    const { text } = e.target;
    add({
      description: text.value,
      completed: false,
      index: tasks.length,
    });
    text.value = '';
  };
};

if (localStorage.getItem('My-To-Do-List')) {
  tasks = JSON.parse(localStorage.getItem('My-To-Do-List'));
} else {
  localStorage.setItem('My-To-Do-List', JSON.stringify([]));
}

export { tasks };