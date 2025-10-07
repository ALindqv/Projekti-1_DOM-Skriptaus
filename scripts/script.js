const inputField = document.getElementById('newEntry');
const ul = document.querySelector('#taskList-cont');


const createLi = () => {

}
//Adding new task to the list
let addNew = () => {
        let taskText = inputField.value.trim()
        if (taskText.length < 3 && taskText.length > 100) {
            inputField.style.borderColor = 'red';
            alert('Entries must be between 3 and 100 characters');
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
        

        // Create line break after checkbox
        let taskListBr = document.createElement('br');

        // Append checkbox elements to the li element
        taskLi.appendChild(taskListItem);
        taskLi.appendChild(taskListLabel);
        taskLi.appendChild(taskListBr);

        ul.appendChild(taskLi) // Append li element with the checkbox elements

        inputField.value = ""; // Reset input field after list item addition
        inputField.style.border = 'none'; // Reset input field appeareance after prior invalid input
        }
};



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

document.querySelector("#addBtn").addEventListener("click",addNew);
document.querySelector("#addBtn").addEventListener("click",saveList);

document.querySelector("#retrieveBtn").addEventListener("click",loadSaved);