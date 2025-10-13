const STORAGE_KEY = 'task'

// Static attributes for input
const cbInputType = 'checkbox';
const cbClass = 'listItem-checkbox';
const liClass = 'listItem';

// DOM Elements
const inputField = document.querySelector('#newEntry');
const ul = document.querySelector('#taskList-cont');
const form = document.querySelector('#taskSubmit')
let idIncrement = 1;

const incrementId = () => {
    let id = `task${idIncrement++}`; // Unique id for li elements
    return id;
}

//Load localstorage items
const loadFromStorage = () => {
    let taskArray = localStorage.getItem(STORAGE_KEY); 
    return taskArray ? JSON.parse(taskArray) : []; //Empty array if localstorage is empty
}

// Save to localstorage
const saveToStorage = (taskData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(taskData));
}



let createTask = () => {
    // Create checkbox element
    let checkboxElem = document.createElement('input');
    checkboxElem.type = cbInputType; // Set list item as checkbox
    checkboxElem.className = cbClass; // Different checkbox class name for easier styling
    checkboxElem.id = incrementId(); // Set input element id

    // Create label for checkbox element
    let checkboxLabel = document.createElement('label');
    checkboxLabel.textContent = inputField.value;
    checkboxLabel.htmlFor = checkboxElem.id;
    
    const taskLi = document.createElement('li'); // Create li element to store checkbox and label
    taskLi.className = liClass // Task element main class name
    
    taskLi.append(checkboxElem, checkboxLabel); // Append checkbox and label to the li element as child elements

    ul.appendChild(task) // Append li element to target ul element with the checkbox elements
}

const renderFromStorage = () => {
    ul.innerHTML = '';
    const taskData = loadFromStorage();
    for (let i = 0; i < taskData.length; i++) {
        createTask();
    }
}




// Removing tasks from the list

// Removing selected task list elements
const delSelected = () => {
    let selected = document.querySelectorAll('.listItem-checkbox:checked'); // Find checked checkbox items
    //Delete checked elements' parent li element
    selected.forEach((elem) => {
        elem.parentElement.remove();
    })
}

// Clear the entire list
const clearList = () => {
    let liItems = document.querySelectorAll('.listItem');
    taskArray = loadFromStorage();
    liItems.forEach((elem) => {
        elem.remove();
    })
    localStorage.clear();
    taskArray = [];
}

// Listeners
form.addEventListener('submit', e => {
    e.preventDefault();

    const label = inputField.value;
    const id = incrementId()

    const tasks = loadFromStorage();
    tasks.push({id, label});
    saveToStorage(tasks);
    form.reset()
})
    
// Event listener for adding items using enter key
    
form.addEventListener('keydown', e => {
if (e.key === "Enter") {
    e.preventDefault(); // Disable key default functionality
    createTask();
    form.reset();
    }
    
});
//document.querySelector("#addBtn").addEventListener("click",saveToStorage); // Addition
//document.querySelector("#addBtn").addEventListener("click",saveToStorage);
document.querySelector("#delBtn").addEventListener("click",delSelected); // Deletion
document.querySelector("#clearBtn").addEventListener("click",clearList);

// Load storage on page load
window.onload = function () {
    const taskData = loadFromStorage();
    /*
    for (let i = 0; i < taskData.length; i++) {
        insertToTasks(taskData[i].label)
    }
    */
}