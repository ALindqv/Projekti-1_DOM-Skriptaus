var inputField = document.getElementById('newEntry');
var ul = document.querySelector('#taskList-cont');

//Adding new task to the list
let addNew = () => {
    // Create checkbox item
    var taskListItem = document.createElement('input');
    taskListItem.type = 'checkbox'; // Set list item as checkbox
    taskListItem.className = 'listItem'; // Set list item class
    taskListItem.id = 'item6'; // Set list item id

    // Create label for checkbox
    var taskListLabel = document.createElement('label');
    taskListLabel.htmlFor = "id";
    taskListLabel.appendChild(document.createTextNode(inputField.value));

    // Line break after checkbox
    var taskListBr = document.createElement('br');

    // Assign new unique id for each list item
    ul.appendChild(taskListItem);
    ul.appendChild(taskListLabel);
    ul.appendChild(taskListBr);

    inputField.value = ""; // Reset input field after list item addition
};