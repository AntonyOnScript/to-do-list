const inputText = document.querySelector('#task-input')
const addTaskButton = document.querySelector('#add-task-button')
const taskList = document.querySelector('ul')
const deleteAll = document.querySelector('#delete-all')
const beepSound = document.getElementsByTagName('audio')[0]
const rememberButton = document.querySelector('.remember-alarm-button')

rememberButton.addEventListener('click', ()=>{
    clearInterval(remember_interval)
})

document.addEventListener('click', (e)=>{
    let el = e.target
    if(el.getAttribute('id') === 'delete-button'){
        el.parentElement.remove()
        localSave()
    }
})

deleteAll.addEventListener('click',()=>{
    localStorage.clear()
    location.reload()
})

inputText.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        createTask(inputText.value)
        clearInput()
    }
})

addTaskButton.addEventListener('click', ()=>{
    createTask(inputText.value)
})

function createLi(txt){
    let li = document.createElement('li')
    let deleteButton = document.createElement('button')
    li.innerText = txt
    deleteButton.innerText = 'Delete task'
    deleteButton.setAttribute('id', 'delete-button')
    li.appendChild(deleteButton)
    return li
}

function createTask(txt){
    let li = createLi(txt)
    taskList.appendChild(li)
    localSave()
    clearInput()
}

function localSave(){
    let allTasks = taskList.querySelectorAll('li')
    let alltaskArrays = []
    for(let i of allTasks){
        alltaskArrays.push(i.innerText.replace('Delete task',''))
    }
    localStorage.setItem('tasks', JSON.stringify(alltaskArrays))
}

function localLoad(){
    let allTasks = localStorage.getItem('tasks')
    allTasks= JSON.parse(allTasks)
    if(allTasks!==null){
        for(let i of allTasks){
            createTask(i)
        }
    }
}

function clearInput(){
    inputText.value=''
    inputText.focus()
}

function rememberMyTasks(){
    let tasks = localStorage.getItem('tasks')
    let taskArrays = JSON.parse(tasks)
    let taskStrings =''
    for(let i of taskArrays){
        taskStrings +=i+' '
    }
    beepSound.volume = 1
    beepSound.play()
    alert(`You still need to do: ${taskStrings}`)
}

const remember_interval = setInterval(() => {
    rememberMyTasks()
}, (10 * 60 * 1000))

localLoad()