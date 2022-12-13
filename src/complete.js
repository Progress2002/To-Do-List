// mark a task as completed or not------------
const toggleComplete = (element, tasks) => {
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
    }
  });
};

export default toggleComplete;