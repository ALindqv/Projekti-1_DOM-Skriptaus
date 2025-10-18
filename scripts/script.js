const STORAGE_KEY = 'task'

// Static attributes for input
const cbInputType = 'checkbox';
const cbClass = 'listItem-checkbox';
const liClass = 'listItem';

// DOM Elements
const inputField = document.querySelector('#newEntry');
const ul = document.querySelector('#taskList-cont');
const form = document.querySelector('.taskSubmit');
const errorMsg = document.querySelector('#error')

const delBtn = document.querySelector("#delBtn");
const clearBtn = document.querySelector('#clearBtn');
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
    ul.innerHTML = '';
    let taskData = loadFromStorage(); // Checkbox id and label text from localstorage
    for (let i = 0; i < taskData.length; i++) {
        // Create checkbox element
        let checkboxElem = document.createElement('input');
        checkboxElem.type = cbInputType; // Set list item as checkbox
        checkboxElem.className = cbClass; // Different checkbox class name for easier styling
        checkboxElem.id = taskData[i].id; // Set input element id

        // Create label for checkbox element
        let checkboxLabel = document.createElement('label');
        checkboxLabel.textContent = taskData[i].label;
        checkboxLabel.htmlFor = checkboxElem.id;

        const taskLi = document.createElement('li'); // Create li element to store checkbox and label
        taskLi.className = liClass // Task element main class name

        taskLi.append(checkboxElem, checkboxLabel); // Append checkbox and label to the li element as child elements

        ul.appendChild(taskLi) // Append li element to target ul element with the checkbox elements
    }
}

// Removing tasks from the list

// Removing selected task list elements
const delSelected = () => {
    taskData = loadFromStorage();
    const selected = document.querySelectorAll('.listItem-checkbox:checked'); // Find checked checkbox items
    let index = taskData.indexOf(selected) +1
    console.log(index)

    //Delete checked elements' parent li element
    selected.forEach((elem) => {
        taskData.splice(index, selected.length)
        elem.parentElement.remove();
    })
    saveToStorage(taskData);
    createTask();
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

// Submitting tasks as a function for reuse purposes
let taskSubmit = () => {
    
    const label = inputField.value;
    const id = incrementId() // Getting checkbox id value from a simple counter

    const tasks = loadFromStorage();
    
    tasks.push({id, label});
    saveToStorage(tasks);
    createTask();

    form.reset();
}

const inputValidation = (e) => {
    inputField.style.border = '';
    inputField.setCustomValidity('');

    const valueToValidate = inputField.value.trim();
    let valid = true;

    if (valueToValidate.length < 3) {
        inputField.style.border = '1px solid red';
        inputField.setCustomValidity('Input cannot be less than three characters');
        valid = false;
    }

    if (!valid) {
        e.preventDefault();
        inputField.reportValidity();
    } else {
        taskSubmit();
    }
    
}   

// Listeners

// Event listener for the submit button
form.addEventListener('submit', e => {
    e.preventDefault();
    inputValidation(e)
});
    
// Submitting items with the enter key
form.addEventListener('keydown', e => {
if (e.key === "Enter") {
    e.preventDefault();
    inputValidation(e)
    }
});


delBtn.addEventListener("click",delSelected); // Deletion
clearBtn.addEventListener("click",clearList);

// Load storage on page load
window.onload = function () {
    createTask();
}