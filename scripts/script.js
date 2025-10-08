const inputField = document.getElementById('newEntry');
const ul = document.querySelector('#taskList-cont');
let idIncrement = 1;


const incrementId = () => {
    var id = `item-${idIncrement++}`; // id format with incrementing numbers
    return id;
}

//Adding new task to the list
let addNew = () => {
    let taskText = inputField.value.trim()
    if (taskText.length < 3) {
        //inputField.style.borderColor = 'red';
        alert('Entry must be at least three characters');
    } else {
    id = incrementId();
    // Create checkbox item
    let taskListItem = document.createElement('input');
    taskListItem.type = 'checkbox'; // Set list item as checkbox
    taskListItem.className = 'listItem'; // Set list item class
    

    // Create label for checkbox
    let taskListLabel = document.createElement('label');
    taskListLabel.htmlFor = id;
    taskListLabel.textContent = taskText;

    let taskLi = document.createElement('li'); // Create li element to store checkbox and label
    taskListItem.id = id; // Set input element id
    taskLi.id = id; // Set li element id

    // Append checkbox elements to the li element
    taskLi.append(taskListItem, taskListLabel);

    ul.appendChild(taskLi) // Append li element to target ul element with the checkbox elements

    inputField.value = ""; // Reset input field after list item addition
    //inputField.style.border = 'none'; // Reset input field appeareance after prior invalid input
    }
};

// Removing task list elements
const itemDel = () => {
    var selected = document.querySelectorAll('.listItem:checked'); // Find checked checkbox items
    //Delete cheked elements' parent li element
    selected.forEach((element) => {
        element.parentElement.remove();
    })
}

/*
const saveList = () => {
    let storedValues = []; // Store list items to array
    let liValues = document.querySelectorAll('.listItem');

    for (let i = 0; i < liValues.length; i++) {
        storedValues.push(liValues[i].innerHTML);
    }

    localStorage.setItem('liItems', JSON.stringify(storedValues));

}

const loadSaved = () => {
    const savedValues = JSON.parse(localStorage.getItem('storedValues'))
    console.log(savedValues)
    //ul.appendChild(savedValues);
}
*/

// Listeners
document.querySelector("#addBtn").addEventListener("click",addNew); // Addition

document.querySelector("#delBtn").addEventListener("click",itemDel); // Deletion