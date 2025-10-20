// Localstorage keys as variables for easy use
const STORAGE_KEY = 'task' // Main task storage key
const idCounter = 'cbIdCounter' // Saving checkbox id counter to storage

// Static attributes for input
const checkboxInput = 'checkbox'; // Set list item as checkbox
const cbClass = 'listItem-checkbox'; 
const liClass = 'listItem';

// DOM Elements
const inputField = document.querySelector('#newEntry');
const ul = document.querySelector('#taskList-cont');
const form = document.querySelector('.taskSubmit');

// Buttons
const addbtn = document.querySelector('addbtn');
const delBtn = document.querySelector("#delBtn");
const clearBtn = document.querySelector('#clearBtn');

/* 
Main
localstorage */

//Load localstorage items
const loadFromStorage = () => {
    let taskArray = localStorage.getItem(STORAGE_KEY); 
    return taskArray ? JSON.parse(taskArray) : []; //Empty array if localstorage is empty
}

// Save to localstorage
const saveToStorage = (taskData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(taskData));
}


// ID for checkbox elements
const getId = () => {
    // Getting id number from localstorage, set to 1 if empty
    const idNumber = parseInt(localStorage.getItem(idCounter) || '1', 10); // Parsing string from localstorage as int
    let id = `task${idNumber}`; // ID template with incrementing number
    localStorage.setItem(idCounter, String(idNumber + 1)) // Save id counter key and increment value in localstorage
    return id;
}

/* 
Rendering
tasks */

// Creates the ul li elements from given localstorage data
let renderTasks = () => {
    ul.innerHTML = '';
    let taskData = loadFromStorage(); // Checkbox id and label text from localstorage

    for (let i = 0; i < taskData.length; i++) {
        let checkboxElem = document.createElement('input');
        checkboxElem.type = checkboxInput;
        checkboxElem.className = cbClass; // Checkbox class for easier styling
        checkboxElem.id = taskData[i].id; // Set input element id

        // Create label for checkbox element
        let checkboxLabel = document.createElement('label');
        checkboxLabel.textContent = taskData[i].label;
        checkboxLabel.htmlFor = checkboxElem.id;

        const taskLi = document.createElement('li'); // Create li element to store checkbox and label
        taskLi.className = liClass // Task element main class name

        taskLi.append(checkboxElem, checkboxLabel); // Append checkbox and label to the li element as child elements

        ul.appendChild(taskLi)
    }
}

// Submitting tasks as a function for reuse purposes
let taskSubmit = () => {
    
    const label = inputField.value;
    const id = getId() // Getting checkbox id value from a simple counter

    const tasks = loadFromStorage(); // Get task data array from localstorage
    
    tasks.push({id, label}); // Populate the array with new data
    saveToStorage(tasks); // Updated array to localstorage
    renderTasks(); 

    form.reset(); 
}

/* 
Removing tasks 
from the list */ 

// Removing selected task list elements
const delSelected = () => {
    let taskData = loadFromStorage();
    
    const selected = Array.from(document.querySelectorAll('.listItem-checkbox:checked'), checkbox => checkbox.id); // Find checked checkbox id values
    
    // Create a set and add collected ids
    toRemove = new Set(selected); 

    remaining = taskData.filter(obj => !toRemove.has(obj.id)); // Filter objects from localstorage array using their id
    saveToStorage(remaining);
    renderTasks();
}

// Clear the entire list
const clearList = () => {
   localStorage.clear();
   renderTasks();
}

const inputValidation = () => {
    inputField.style.border = '';
    inputField.setCustomValidity('');

    const valueToValidate = inputField.value.trim();

    if (valueToValidate.length < 3) {
        inputField.style.border = '1px solid red';
        inputField.setCustomValidity('Input cannot be less than three characters');
        inputField.reportValidity();
        return false; // Form submission not allowed
    }
    return true; // Form submission allowed
}; 

/* 
Event
Listeners */

inputField.addEventListener('input', () => {
    inputField.setCustomValidity('');
    inputField.style.border = '';
})


// Event listener for the submit button
form.addEventListener('submit', e => {
    if (!inputValidation()) {
        e.preventDefault(); // Prevent form submission if invalid
        inputField.focus();
    } else {
        e.preventDefault();
        taskSubmit(); 
    }
});
    
// Submitting items with the enter key
form.addEventListener('keydown', e => {
    if (e.key === "Enter") {
        e.preventDefault();
        if (!inputValidation()) {
            e.preventDefault()
        } else {
            taskSubmit();
        }
    }
});

delBtn.addEventListener("click",delSelected); // Deletion
clearBtn.addEventListener("click",clearList); // Clear list

// Load storage on page load
window.onload = () => {
    renderTasks();
}