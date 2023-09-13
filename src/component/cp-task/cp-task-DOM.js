/*** IMPORT***/
import Container from '../cp-container.js';
import Button from '../cp-button.js';
import Form from '../form/form.js'
import DomTool from "../../Dom-Tools.js";
import { Project } from '../../Project-Logic.js';

/******/

function createTask(title,description,dueDate,project,taskId)
{
    let isEditable = false;

    const element= document.createElement('div')
    element.classList.add('task');

    const taskBtn = Container('task-btn-container',element)
    const taskValidBtn=Button("task-btn","",taskBtn,"fa-solid fa-check")
   
    const taskCancelBtn=Button("task-btn","",taskBtn,"fa-solid fa-xmark")
    const taskEditBtn=Button("task-btn","",taskBtn,"fa-solid fa-pen-to-square")

    const taskInfo = Container('task-info',element)
    

    const taskTitle = document.createElement('h3');
    taskTitle.textContent = title

    const taskDescription =document.createElement('p')
    taskDescription.textContent= description

    const taskDate = document.createElement('p');
    taskDate.textContent=formatDate(dueDate);

    
    taskInfo.appendChild(taskTitle);
    taskInfo.appendChild(taskDescription);
    taskInfo.appendChild(taskDate);

    /*Make the task done and remove the valid button from it */
        taskValidBtn.addEventListener('click',()=>{
            element.classList.add('task-done')
        const taskDoneTitle=document.createElement('p')
            taskDoneTitle.textContent="DONE"
            taskInfo.style.borderRight="solid 1px black"
            taskBtn.removeChild(taskValidBtn)
            taskBtn.removeChild(taskEditBtn)
            element.appendChild(taskDoneTitle)
        })
    /*Delete the task from dom when clicked */
        taskCancelBtn.addEventListener('click',()=>{
            document.querySelector('.gridTask').removeChild(element);
            
            project.deleteTask(taskId)
            
        })
    /*Edit the task title and */
        taskEditBtn.addEventListener('click',(e)=>{
            isEditable = true;
            const domToolInstance = DomTool();
            e.stopPropagation();
            console.log(element)
          
            domToolInstance.makeElementEditable(taskTitle,taskEditBtn);
            domToolInstance.makeElementEditable(taskDescription,taskEditBtn);
            domToolInstance.makeElementEditable(taskDate,taskEditBtn);
          
            /**Make the the taskDueDate as input to change the value for the date**/
                taskDate.addEventListener('click',()=>{
                    let inputDueDate= document.createElement('input');
                    inputDueDate.type='date';
                    inputDueDate.name='taskDueDate';

                    let dateString = taskDate.textContent;
                    let datePart = dateString.match(/\b\d{2}-\d{2}-\d{4}\b/)[0];
                    let parts= datePart.split("-")
                    let newDateStr = `${parts[2]}-${parts[1]}-${parts[0]}`
                    inputDueDate.value=newDateStr;
                    taskDate.replaceWith(inputDueDate)

                    /*Change the value DueDate for this task if the Key'Enter' is pressed*/
                        inputDueDate.addEventListener('keydown', function(event) {
                            if (event.key === 'Enter') {
                                event.preventDefault(); 
                                console.log(inputDueDate.value)
                                taskDate.textContent = formatDate(inputDueDate.value);
                                inputDueDate.replaceWith(taskDate);
                            }
                        });
                   
                    
                })
            /*Check if DueDate is type of input if it his define the date as the inputDate.value */
                if(taskDescription.getAttribute('contenteditable') === 'false')
                    {
                        let inputDueDate = document.querySelector('input[name="taskDueDate"]')
                        taskDate.textContent = formatDate(inputDueDate.value);
                        inputDueDate.replaceWith(taskDate);
                    }
            /****/

                
    })

    element.addEventListener('keydown',function(event){
        if (event.key === 'Enter') {
            event.preventDefault(); 
            toggleEditable(); 

            let dateString = taskDate.textContent;
            let datePart = dateString.match(/\b\d{2}-\d{2}-\d{4}\b/)[0];
            let parts= datePart.split("-")
            let newDateStr = `${parts[2]}-${parts[1]}-${parts[0]}`
            
            project.modifyTask(taskId,{
                title:taskTitle.textContent,
                description:taskDescription.textContent,
                 dueDate:newDateStr
            })  
        }
       
   })

    function toggleEditable(taskI,task) {
        isEditable = !isEditable;
        document.querySelectorAll('.editable').forEach(element => {
            element.contentEditable = isEditable;
            element.classList.remove('editable')
            taskEditBtn.classList.remove('task-done')
        });
    }

    function saveTaskChange()
    {
        

        project.modifyTask(taskId,{title:taskTitle.textContent,description:taskDescription.textContent,datePart})

    }
  

    return element
}

const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Les mois vont de 0 à 11, donc +1
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    // const hours = String(dateObj.getHours()).padStart(2, '0');
    // const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  
    return `Due Date: ${day}-${month}-${year}`;
}

export default createTask;
