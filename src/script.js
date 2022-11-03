const completeBtn = document.querySelector(".complete");
const toDoListContainer = document.querySelector(".todo-list");
let tasks = [];




const updateStorage = (task) => {
  localStorage.setItem('My-To-Do-List', JSON.stringify(task));
}

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
  tasks = tasks.filter((task) => task.index !== id)
  for(let i= 0; i < tasks.length; i++) {
    tasks[i].index = i;
    updateStorage(tasks)
  }
  updateStorage(tasks)
}

export const remove = (element) => {
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
export const markAsCompleted = (element) => {
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

// Cleare completed files---------
export const cleareCompleted = (element) => {
  completeBtn.addEventListener('click', () => {
    element.querySelectorAll('.list').forEach((list) => {
      let taskId = parseInt(list.parentNode.id)
      let parentnode = list.parentNode;
      tasks.forEach((task) => {
        if(task.completed && task.index === taskId) {
          parentnode.remove();
        }
      })
    })
    tasks = tasks.filter((task) => task.completed !== true);
    for(let i= 0; i < tasks.length; i++) {
      tasks[i].index = i;
      updateStorage(tasks)
    }
    updateStorage(tasks)
  })
}

// // edit task----------------
export const editTask = (element) => {
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

  //   // Add new task to the list---------
export const add = (task) => {
  render(task);
  tasks.push(task);
  remove(toDoListContainer);
  markAsCompleted(toDoListContainer)
  editTask(toDoListContainer)
  updateStorage(tasks);
  cleareCompleted(toDoListContainer)
};

export {tasks}