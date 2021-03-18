// variables
const input_text = document.querySelector('#task-input')
const add_task_button = document.querySelector('#add-task-button')
const tasks_list = document.querySelector('ul')
const delete_all = document.querySelector('#delete-all')

// Event Listeners
document.addEventListener('click', (e)=>{
    let el = e.target
    if(el.getAttribute('id') === 'delete-button'){
        el.parentElement.remove()
        localSave()
    }
})

delete_all.addEventListener('click',()=>{
    localStorage.clear()
    location.reload()
})

input_text.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        createTask(input_text.value)
        clearInput()
    }
})

add_task_button.addEventListener('click', ()=>{
    createTask(input_text.value)
})

// functions
function createLi(txt){
    let li = document.createElement('li')
    let delete_button = document.createElement('button')
    li.innerText = txt
    delete_button.innerText = 'Delete task'
    delete_button.setAttribute('id', 'delete-button')
    li.appendChild(delete_button)
    return li
}

function createTask(txt){
    let li = createLi(txt)
    tasks_list.appendChild(li)
    localSave()
    clearInput()
}

function localSave(){
    let all_tasks = tasks_list.querySelectorAll('li')
    let all_tasks_array = []
    for(let i of all_tasks){
        all_tasks_array.push(i.innerText.replace('Delete task',''))
    }
    localStorage.setItem('tasks', JSON.stringify(all_tasks_array))
}
function localLoad(){
    let all_tasks = localStorage.getItem('tasks')
    all_tasks= JSON.parse(all_tasks)
    if(all_tasks!==null){
        for(let i of all_tasks){
            createTask(i)
        }
    }
}
function clearInput(){
    input_text.value=''
    input_text.focus()
}
localLoad()
