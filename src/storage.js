const updateStorage = (task) => {
  localStorage.setItem('My-To-Do-List', JSON.stringify(task));
}

export default updateStorage;