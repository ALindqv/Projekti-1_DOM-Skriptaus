const inputField = document.querySelector('#newEntry');
const ul = document.querySelector('#taskList-cont');
let idIncrement = 1;


const incrementId = () => {
    var id = `item-${idIncrement++}`; // id format with incrementing numbers
    return id;
}

// Create new checkbox li item
const createListItem = () => {
    // Create checkbox item
    let checkboxElem = document.createElement('input');
    checkboxElem.type = 'checkbox'; // Set list item as checkbox
    checkboxElem.className = 'listItem-checkbox'; // Different checkbox class name for easier styling

    // Create label for checkbox
    let checkboxLabel = document.createElement('label');
    checkboxLabel.className = 'cbLabel';
    checkboxLabel.htmlFor = id;
    
    return {checkboxElem, checkboxLabel};
}

// Adding new task to the list
let itemAdd = () => {
    let taskText = inputField.value.trim() // Store user input to a variable
    if (taskText.length < 3) {
        //inputField.style.borderColor = 'red';
        alert('Entry must be at least three characters');
    } else {
    id = incrementId(); // Get next id number
    let {checkboxElem, checkboxLabel} = createListItem() // Get created checkbox and label
    checkboxLabel.textContent = taskText; // Set user input value as the label

    let taskLi = document.createElement('li'); // Create li element to store checkbox and label
    checkboxElem.id = id; // Set input element id
    taskLi.className = 'listItem' // Li element main class name
    taskLi.id = id; // Set li element id

    taskLi.append(checkboxElem, checkboxLabel); // Append checkbox and label to the li element as child elements

    ul.appendChild(taskLi) // Append li element to target ul element with the checkbox elements

    inputField.value = ""; // Reset input field after list item addition
    //inputField.style.border = 'none'; // Reset input field appeareance after prior invalid input
    }
};

// Removing task list elements
const itemDel = () => {
    var selected = document.querySelectorAll('.listItem-checkbox:checked'); // Find checked checkbox items
    //Delete checked elements' parent li element
    selected.forEach((elem) => {
        elem.parentElement.remove();
    })
}


const saveToStorage = () => {
    // li element attributes
    let liElem = document.querySelectorAll('.listItem');
    let liClass = liElem.getAttribute('class');
    let liId = liElem.getAttribute('id')

    // Checkbox element + label attributes
    let cbElem = document.querySelectorAll('.listItem-checkbox');
    let cbLabel = document.querySelectorAll('.cbLabel');
    let cbType = cbElem.getAttribute('type');
    let cbClass = cbElem.getAttribute('class');
    let cbId = cbElem.getAttribute('id')

    /*
    const liElem={
        liClass: 'listItem',
        liId: id
    }

    const inputElem={
        inputType: 'checkbox',
        inputClass: 'listItem-checkbox',
        inputId: id
    }

    const liElemJSON = JSON.stringify(liElem)
    const inputElemJSON = JSON.stringify(inputElem)

    localStorage.setItem('liElem',liElemJSON);
    localStorage.setItem('inputElem',inputElemJSON);
    */

}

const elementFromStorage = () => {
    const savedValues = JSON.parse(localStorage.getItem('storedValues'))
    console.log(savedValues)
    ul.appendChild(savedValues);
}


// Listeners
document.querySelector("#addBtn").addEventListener("click",itemAdd); // Addition
document.querySelector("#delBtn").addEventListener("click",itemDel); // Deletion
document.querySelector("#storageSaveBtn").addEventListener("click",saveToStorage);
//document.querySelector("#delBtn").addEventListener("click",loadSaved);

// Event listener for adding items using enter key
inputField.addEventListener('keypress',function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        document.querySelector('#addBtn').click();
    }
});