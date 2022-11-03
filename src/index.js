import "./style.css";
import updateStorage from "./storage.js";

const toDoListContainer = document.querySelector(".todo-list");
const form = document.querySelector("form");
const completeBtn = document.querySelector(".complete");

let tasks = [];

// render newly added task to page --------
const render = (task) => {
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
  tasks = tasks.filter((task) => task.index !== id)
  for(let i= 0; i < tasks.length; i++) {
    tasks[i].index = i;
    updateStorage(tasks)
  }
  updateStorage(tasks)
}

const remove = (element) => {
  element.querySelectorAll(".icon").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      const parent = e.target.parentNode.parentNode.parentNode;
      icon.classList.add("active");
      icon.nextElementSibling.classList.remove("active");
      setTimeout(() => {
        icon.nextElementSibling.classList.add("active");
        icon.classList.remove("active");
      }, 4000);
      element.querySelectorAll(".delete").forEach((btn) => {
        btn.addEventListener("click", () => {
          removeId(parseInt(parent.id))
          parent.remove();
        });
      });
    });
  });
};


// mark a task as completed or not------------
const markAsCompleted = (element) => {
  element.querySelectorAll('.checkbox').forEach((box) => {
    box.addEventListener('click', () => {
      let item = box.nextElementSibling;
      toggleComplete(item)
    })
  })
}
const toggleComplete = (element) => {
  element.classList.toggle('completed')
  let elementPerentId = element.parentNode.parentNode.parentNode.id;
  elementPerentId = parseInt(elementPerentId)
  tasks.forEach((task) => {
    if(task.index === elementPerentId) {
      let isIncluded = element.classList.contains('completed')
      if(isIncluded) {
        task.completed = true
      }else {
        task.completed = false
      }
      updateStorage(tasks)
    }
  })
}

// edit task----------------
const editTask = (element) => {
  element.querySelectorAll('.text').forEach((box) => {
    box.addEventListener('input', (e) => {
      let activeText = e.target
      let textContent = activeText.innerHTML
      let activeTextParentId = parseInt(activeText.parentNode.parentNode.parentNode.id)
      tasks.forEach((task) => {
        if(task.index === activeTextParentId){
          task.description = textContent
          updateStorage(tasks);
        }
      })
    })
  })}


  // Add new task to the list---------
const add = (task) => {
  render(task);
  tasks.push(task);
  remove(toDoListContainer);
  markAsCompleted(toDoListContainer)
  editTask(toDoListContainer)
  updateStorage(tasks);
};


form.onsubmit = (e) => {
  e.preventDefault();
  const { text } = e.target;
  add({
    description: text.value,
    completed: false,
    index: tasks.length,
  });
  text.value = "";
};

if (localStorage.getItem("My-To-Do-List")) {
  tasks = JSON.parse(localStorage.getItem("My-To-Do-List"));
} else {
  localStorage.setItem("My-To-Do-List", JSON.stringify([]));
}

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

});
