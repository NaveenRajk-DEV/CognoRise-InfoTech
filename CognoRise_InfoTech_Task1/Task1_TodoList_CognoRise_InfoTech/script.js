const Task_add_btn = document.querySelector('.Task-btn');
const Input_field = document.querySelector('#Todo-input');
const All_Clear_btn = document.querySelector('.Clear-btn');
const Trash_icon = document.querySelectorAll('#Trash-icon');
const Lists_parent = document.querySelector('.Lists-parent');
// 
const Main_Object = {
    Click_Count : 0,
    Which_task : '',
    Array_task : [],
    CheckBox_Array : [],
    Whick_CheckBox : '',
}
// 
All_Clear_btn.addEventListener('click',()=>{
    Main_Object.Click_Count += 1;
    if(Main_Object.Click_Count===2){
        localStorage.clear();
        window.location.reload();
        Main_Object.Click_Count = 0;
    }
})
window.onload = ()=>{
    Main_Object.Array_task = JSON.parse(localStorage.getItem('TaskKey')) || [];
    Main_Object.CheckBox_Array = JSON.parse(localStorage.getItem('CheckBoxKey')) || [];
    Main_Object.Array_task.forEach((value)=>{
        if(value == '' || value == ' '){
            Main_Object.Array_task.splice(Main_Object.Array_task.indexOf(value),1);
            Main_Object.CheckBox_Array.splice(Main_Object.Array_task.indexOf(value),1);
            Update_localStorage();
        }
    })
    Default_Actions();
}
function Default_Actions(){
    Main_Object.Array_task.forEach((task,index)=>{
        Add_task(task,index);
    });
}
Default_Actions();
function Add_task(task,index){
    // Declaring and initializing the variables
    const NewTaskList = document.createElement('li');
    const NewCheckBox = document.createElement('input');
    const NewInner_Task_text = document.createElement('b');
    const NewTrash_icon = document.createElement('i');
    // setting the attributes
    NewTaskList.setAttribute("class","li-elements")
    NewCheckBox.setAttribute("type","checkbox");
    NewCheckBox.setAttribute("class","checkbox-btn");
    NewInner_Task_text.innerHTML = task;
    NewTrash_icon.setAttribute("class","fa-solid fa-trash")
    NewTrash_icon.setAttribute("id","Trash-icon")
    /* append the inner children such as 
    checkbox, task_text, trash_icon in 
    the new 'li' element */
    // order of appending children is more important
    NewTaskList.appendChild(NewCheckBox);
    NewTaskList.appendChild(NewInner_Task_text);
    NewTaskList.appendChild(NewTrash_icon);
    /* append the new 'li' element in the 'ol' element */
    Lists_parent.appendChild(NewTaskList);
    // 
    NewCheckBox.checked = Main_Object.CheckBox_Array[index];
    if(NewCheckBox.checked){
        NewInner_Task_text.style.textDecoration = 'line-through'
    }
    // 
    NewTrash_icon.addEventListener('click',(event)=>{
        Main_Object.Which_task = event.target.parentNode;
        Deleting_task();
    });
    // 
    NewCheckBox.addEventListener('click',(event)=>{
        Main_Object.Whick_CheckBox = [...Lists_parent.children].indexOf(event.target.parentNode);
        if(NewCheckBox.checked){
            Main_Object.CheckBox_Array[Main_Object.Whick_CheckBox] = NewCheckBox.checked;
            Update_localStorage();
        }
        else{
            Main_Object.CheckBox_Array[Main_Object.Whick_CheckBox] = NewCheckBox.checked;
            Update_localStorage();
        }
        (NewCheckBox.checked)?event.target.parentNode.children[1].style.textDecoration = 'line-through':event.target.parentNode.children[1].style.textDecoration = 'none';
    })
}
// Add the New task
Task_add_btn.addEventListener('click',()=>{
    Main_Object.Array_task.push(Input_field.value);
    Main_Object.CheckBox_Array.push(false);
    Add_task(Input_field.value);
    Update_localStorage();
    Input_field.value = ''
});
// Deleting the Tasks
Trash_icon.forEach((icons)=>{
    icons.addEventListener('click',(event)=>{
        Main_Object.Which_task = event.target.parentNode;
        Deleting_task();
    })
})
function Deleting_task(){
    Lists_parent.removeChild(Main_Object.Which_task);
    if(Main_Object.Array_task.includes(Main_Object.Which_task.children[1].innerHTML)){
        Main_Object.Array_task.splice(Main_Object.Array_task.indexOf(Main_Object.Which_task.children[1].innerHTML),1);
        Main_Object.CheckBox_Array.splice(Main_Object.Array_task.indexOf(Main_Object.Which_task.children[1].innerHTML),1);
        Update_localStorage();
    }
}
// Update the array in local storage
function Update_localStorage(){
    localStorage.setItem('TaskKey',JSON.stringify(Main_Object.Array_task));
    localStorage.setItem('CheckBoxKey',JSON.stringify(Main_Object.CheckBox_Array));
}