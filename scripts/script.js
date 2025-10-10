const inputField = document.querySelector('#newEntry');
const ul = document.querySelector('#taskList-cont');
let idIncrement = 1;
let localStorageId = 1;

//Load localstorage items
let tasks = localStorage.getItem('tasks') ? 
JSON.parse(localStorage.getItem('tasks')) : []; //Empty array if localstorage is empty

tasks.forEach(itemAdd);

const incrementId = () => {
    let id = `task${idIncrement++}`; // Unique id for li elements
    return id;
}

// Create new checkbox li item
const createCheckBox = () => {
    // Create checkbox item
    let checkboxElem = document.createElement('input');
    checkboxElem.type = 'checkbox'; // Set list item as checkbox
    checkboxElem.className = 'listItem-checkbox'; // Different checkbox class name for easier styling

    // Create label for checkbox
    let checkboxLabel = document.createElement('label');
    checkboxLabel.htmlFor = id;
    
    return {checkboxElem, checkboxLabel};
}

// Adding new task to the list
let itemAdd = (taskText) => {
    let taskText = inputField.value.trim() // Store user input to a variable
    if (taskText.length < 3) {
        alert('Entry must be at least three characters');
        return;
    } else {
        id = incrementId(); // Get next id number
        let {checkboxElem, checkboxLabel} = createCheckBox() // Get created checkbox and label
        checkboxLabel.textContent = taskText; // Set user input value as the label

        let taskLi = document.createElement('li'); // Create li element to store checkbox and label
        taskLi.className = 'listItem' // Li element main class name
        checkboxElem.id = id; // Set input element id
        

        taskLi.append(checkboxElem, checkboxLabel); // Append checkbox and label to the li element as child elements

        ul.append(taskLi) // Append li element to target ul element with the checkbox elements
        
        inputField.value = ""; // Reset input field after list item addition
    }
};



// Save to localstorage
const saveToStorage = () => {
    let cbObject = { 
        type: 'checkbox',
        class: 'listItem-checkbox',
        id: id
    }

    localStorage.setItem(id, JSON.stringify(cbObject));
}

const elementFromStorage = () => {
    const savedValues = JSON.parse(localStorage.getItem('storedValues'))
    console.log(savedValues)
    ul.appendChild(savedValues);
}

// Removing tasks from the list

// Removing selected task list elements
const delSelected = () => {
    let selected = document.querySelectorAll('.listItem-checkbox:checked'); // Find checked checkbox items
    let keyIndex = localStorage.key()
    //Delete checked elements' parent li element
    selected.forEach((elem) => {
        elem.parentElement.remove();
        localStorage.removeItem(keyIndex)
    })
}

// Clear the entire list
const clearList = () => {
    let liItems = document.querySelectorAll('.listItem');
    liItems.forEach((elem) => {
        elem.remove();
        localStorage.clear()
    })
}



// Listeners
document.querySelector("#addBtn").addEventListener("click",itemAdd); // Addition
document.querySelector("#addBtn").addEventListener("click",saveToStorage);
document.querySelector("#delBtn").addEventListener("click",delSelected); // Deletion
document.querySelector("#clearBtn").addEventListener("click",clearList);

// Event listener for adding items using enter key
inputField.addEventListener('keypress',function(e) {
    if (e.key === "Enter") {
        e.preventDefault(); // Disable key default functionality
        document.querySelector('#addBtn').click();
    }
});