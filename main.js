let inputTask = document.getElementById("input-task")
let buttonAddTask = document.getElementById("button-add")
let taskName = document.getElementById("task-name")
let CompleteList = document.getElementById("tasks")
let checkTaskCompleted = document.getElementById("check")
let numberOfTasks = document.getElementById("number-of-tasks")

let arrayTasks = []

reloadTask()

function showTasks() {
    let newLi = ""

    arrayTasks.forEach((task, index) => {
        newLi += `<li class="item-task ${task.completed === true && "completed"}">
            <buttton class="checked-button" onclick="taskCompleted(${index})">
                <i id="check" class="${task.completed === true ? "fas fa-check-square" : "far fa-square"}"></i>
            </buttton>

            <p class="${task.completed === true && "completed"}" id="task-name">${task.task}</p>

            <buttton class="delete-button" onclick="deleteTask(${index})">
                <i class="fas fa-trash"></i>
            </buttton>
        </li>`
    })

    if (arrayTasks.length === 0) {
        numberOfTasks.innerHTML = "Você não possui nenhuma tarefa!"
    } else if (arrayTasks.length === 1) {
        numberOfTasks.innerHTML = "Você possui 1 tarefa no total!"
    } else {
        numberOfTasks.innerHTML = `Você possui ${arrayTasks.length} tarefas no total!`
    }

    CompleteList.innerHTML = newLi

    localStorage.setItem("to-do-p5d:newTask", JSON.stringify(arrayTasks))
}

function addTask() {
    if (inputTask.value && inputTask.value.trim() != 0) {
        arrayTasks.push({
            task: inputTask.value,
            completed: false
        })
    } else {
        document.getElementById("modal-container").style.display = "flex"
        
        setTimeout( function() {
            document.getElementById("modal-container").style.display = "none"
        }, 2500 );
    }

    inputTask.value = ""
    showTasks()
}

function pressEnter(chave) {
    if (chave.key === "Enter") {
        addTask()
    }
}

function deleteTask(index) {
    arrayTasks.splice(index, 1)
    showTasks()
}

function taskCompleted(index) {
    arrayTasks[index].completed = !arrayTasks[index].completed
    showTasks()
}

function reloadTask() {
    let myTasks = localStorage.getItem("to-do-p5d:newTask")

    if (myTasks) {
        arrayTasks = JSON.parse(myTasks)
        showTasks()
    }
}

buttonAddTask.addEventListener("click", addTask)

document.addEventListener("keypress", pressEnter)