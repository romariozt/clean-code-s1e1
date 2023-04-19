// ?Документ — это DOM, к которому можно получить доступ в консоли с помощью document.window.
// ?Дерево сверху, html, body, p и т.д.

// ?Проблема: взаимодействие с пользователем не дает правильных результатов.
// ?Решение: добавьте интерактивность, чтобы пользователь мог управлять ежедневными задачами.
// ?Разбейте все на более мелкие шаги и выполняйте каждый шаг за раз.


// ?Обработка событий, взаимодействие с пользователем — это то, что запускает выполнение кода.

const taskInput=document.getElementById("new-task");//Add a new task.
const addButton=document.getElementsByTagName("button")[0];//first button
const incompleteTaskHolder=document.getElementById("incompleteTasks");//ul of #incompleteTasks
const completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    label.innerText=taskString;
    label.className='task';

    //Each elements, needs appending
    checkBox.type="checkbox";
    editInput.type="text";
    editInput.className="task";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="edit";

    deleteButton.className="delete";
    deleteButtonImg.src='./img/remove.svg';
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    const listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

// ?----- Изменить существующую задачу. -------

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector("label");
    var editBtn=listItem.querySelector(".edit");
    var containsClass=listItem.classList.contains("editMode");
    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("editMode");
};


// ?----------- Delete task -------------
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


// ?------- Отметить задачу как выполненную --------
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");

    //?выберите дочерние элементы ListItems
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector("button.edit");
    var deleteButton=taskListItem.querySelector("button.delete");


    //?Привязать editTask к кнопке редактирования.
    editButton.onclick=editTask;

    //?Привяжите deleteTask к кнопке удаления.
    deleteButton.onclick=deleteTask;

    //?Привяжите taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}


//?цикл по неполным элементам списка incompleteTaskHolder ul list items
//?для каждого элемента списка
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//?цикл по завершенным элементам списка TasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}



// Проблемы с юзабилити не видны, пока они не окажутся перед тестировщиком.

//предотвратить создание пустых задач.

// Измените редактирование для сохранения, когда вы находитесь в режиме редактирования.