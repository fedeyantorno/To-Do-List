const date = document.querySelector('#date');
const input = document.querySelector('#input');
const list = document.querySelector('#list');
const btnEnter = document.querySelector('#btn-enter');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let id;
let listDB;

btnEnter.addEventListener('click', getTask);
document.addEventListener('keyup', addKeyEnter);

const locale = navigator.language;
const today = new Date();
date.innerHTML = today.toLocaleDateString(locale, {weekday: 'long', month: 'long', day:'numeric'});


// Agregar tarea
function getTask() {
    const task = input.value;
    if (task) {
        addTask(task, id, false, false);
        listDB.push({
            nombre: task,
            id: id,
            done: false,
            remove: false
            });    
    };
    localStorage.setItem('to-do-list', JSON.stringify(listDB))
    input.value = "";
    id++
};

function addKeyEnter(e) {    
    if (e.key == 'Enter') {
        const task = input.value;
        if (task) {
            addTask(task, id, false, false);
            listDB.push({
                nombre: task,
                id: id,
                done: false,
                remove: false
                });   
        };
        localStorage.setItem('to-do-list', JSON.stringify(listDB))
        input.value = "";
        id++        
    };
};

function addTask(task, id, done, remove) {

    if (remove) {
        return
    };

    const doneState = done ? check : uncheck;
    const lineState = done ? lineThrough : "";

    const newTask = `
                <li id="list-element" data="element">
                    <i class="fa-regular ${doneState}" data="done" id="${id}"></i>
                    <p class="text ${lineState}">${task}</p>
                    <i class="fa-light fa-trash-can" data="remove" id="${id}"></i>
                </li>
                `;
    list.insertAdjacentHTML("beforeend", newTask);
};

list.addEventListener('click', checkState)

function checkState (e) {
    const element = e.target;
    const elementData = element.attributes.data.value;
    if (elementData === "done") {
        taskDone(element)
    } else if(elementData === "remove") {
        taskRemove(element)       
    };
    localStorage.setItem('to-do-list', JSON.stringify(listDB))
};

function taskDone (element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    listDB[element.id].done = listDB[element.id].done ? false : true;
};

function taskRemove (element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    listDB[element.id].remove = true;
};

// LocalStorage getItem
let data = localStorage.getItem('to-do-list');

if (data) {
    listDB = JSON.parse(data);
    id = listDB.length;
    loadList (listDB)
} else {
    listDB = [];
    id = 0;
}

function loadList (data) {
    data.forEach( i => {
        const {nombre, id, done, remove} = i
        addTask(nombre, id, done, remove);        
    });
}