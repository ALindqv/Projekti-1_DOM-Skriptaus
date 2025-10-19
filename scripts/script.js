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
const errorMsg = document.querySelector('#error')

// Buttons
const addbtn = document.querySelector('addbtn');
const delBtn = document.querySelector("#delBtn");
const clearBtn = document.querySelector('#clearBtn');

//Load localstorage items
const loadFromStorage = () => {
    let taskArray = localStorage.getItem(STORAGE_KEY); 
    return taskArray ? JSON.parse(taskArray) : []; //Empty array if localstorage is empty
}

// Save to localstorage
const saveToStorage = (taskData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(taskData));
}

const incrementId = () => {
    // Getting id number from localstorage, set to 0 if empty
    const taskIdNumber = parseInt(localStorage.getItem(idCounter) || '0', 10); // Parsing string from localstorage as int
    let id = `task${taskIdNumber}`; // ID template with incrememnting number
    localStorage.setItem(idCounter, String(taskIdNumber + 1)) // Save id counter key and increment value in localstorage
    return id;
}


let renderTasks = () => {
    ul.innerHTML = '';
    let taskData = loadFromStorage(); // Checkbox id and label text from localstorage
    for (let i = 0; i < taskData.length; i++) {
        // Create checkbox element
        let checkboxElem = document.createElement('input');
        checkboxElem.type = checkboxInput; // 
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

// Removing tasks from the list

// Removing selected task list elements
const delSelected = () => {
    taskData = loadFromStorage();
    
    const selected = document.querySelectorAll('.listItem-checkbox:checked').id; // Find checked checkbox items
    
    toRemove = new Set(selected);
    /*
    // Get the ids of selected elements
    for (let i = 0; i < selected.length; i++) {
        toRemove.push(selected[i].id, 1)
    } */

    remaining = taskData.filter(value => !toRemove.has(value));
    console.log(remaining)
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

    const tasks = loadFromStorage(); // Get task data array from localstorage
    
    tasks.push({id, label}); // Populate the array with new data
    saveToStorage(tasks); // Updated array to localstorage
    renderTasks(); 

    form.reset(); 
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

// Listeners

// Event listener for the submit button
form.addEventListener('submit', e => {
    if (!inputValidation()) {
        e.preventDefault(); // Prevent form submission if invalid
    } else {
        taskSubmit(); 
    }
});
    
// Submitting items with the enter key
form.addEventListener('keydown', e => {
    if (e.key === "Enter") {
        e.preventDefault();
        console.log('pressed')
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