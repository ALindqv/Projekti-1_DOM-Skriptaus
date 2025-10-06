const inputField = document.getElementById('newEntry');
const ul = document.querySelector('#taskList-cont');

//Adding new task to the list
let addNew = () => {
        let taskText = inputField.value.trim()
        if (taskText.length < 3) {
            inputField.style.borderColor = 'red';
            alert('Entries must be at least three characters');
        } else {
        let idIncrement = 1;
        let id = `item-${idIncrement++}`; // id format with incrementing numbers

        let taskLi = document.createElement('li'); // Create li element to store checkbox and label

        // Create checkbox item
        let taskListItem = document.createElement('input');
        taskListItem.type = 'checkbox'; // Set list item as checkbox
        taskListItem.className = 'listItem'; // Set list item class
        taskListItem.id = id; // Set list item id

        // Create label for checkbox
        let taskListLabel = document.createElement('label');
        taskListLabel.htmlFor = id;
        taskListLabel.textContent = taskText;
        

        // Line break after checkbox
        let taskListBr = document.createElement('br');

        // Assign new unique id for each list item
        taskLi.appendChild(taskListItem);
        taskLi.appendChild(taskListLabel);
        taskLi.appendChild(taskListBr);

        ul.appendChild(taskLi)

        inputField.value = ""; // Reset input field after list item addition
        inputField.style.border = 'none';
        }
};

document.querySelector("#addBtn").addEventListener("click",addNew);