import createTaskDom from '../cp-task/cp-task-DOM.js'
import createTaskObject from '../cp-task/cp-task-logic.js';
import Container from '../cp-container.js';
import DomTool from '../../Dom-Tools.js';

function createFormAddTask(project)
{
    const domToolInstance=DomTool();
    /*Create a new element form */
        let form = document.createElement('form');
        form.classList.add('addTask-form')
        form.method='post'

    /*Create input for the title of the task */
        let inputTitle = document.createElement('input');
        inputTitle.type='text';
        inputTitle.name='taskTitle';
        inputTitle.placeholder='Task Title'
        form.appendChild(inputTitle);

     /*Create input for the description of the task */
        let inputDescription = document.createElement('input');
        inputDescription.type='text';
        inputDescription.name='taskDescription';
        inputDescription.placeholder='Task description'
        form.appendChild(inputDescription);

     /*Create input for the deDate of the task */
        let inputDueDate= document.createElement('input');
        inputDueDate.type='date';
        inputDueDate.name='taskDueDate';


        /*Make the date by deafult at tomorrow*/
            let currentDate= new Date();
            // Format date  at 'YYYY-MM-DD'
            let date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
            inputDueDate.value=date;
            form.appendChild(inputDueDate);


        // Créez un bouton de soumission
            let submitButton = document.createElement('button');
            submitButton.classList.add('addTask-btn')
            submitButton.type = 'submit';
            submitButton.textContent = 'ADD TASK';
            form.appendChild(submitButton);


            form.addEventListener('submit', function(e) {
                e.preventDefault();

                const gridTask = document.querySelector('.gridTask')
                const overlay = document.querySelector('.overlay')

                let formData = new FormData(e.target);
            /*Create a new Task object with the value of the form*/    
                const newTask = createTaskObject(
                    formData.get('taskTitle'),
                    formData.get('taskDescription'),
                    formData.get('taskDueDate'),
                    );
            /**/
            /*Add the new task to Project task array*/
                
                project.addTask(newTask);
               
                const newTaskDom= createTaskDom(newTask._title,newTask._description,newTask._dueDate,project,newTask._id)
                project.sortTaskByDate();
                domToolInstance.clearProjectTaskDom(gridTask);
                domToolInstance.displayTaskForProject(gridTask,project)
                
                
                this.reset();
                this.classList.add('is-hidden')
                overlay.classList.add('is-hidden')
            
            });

            return form;
}

export default createFormAddTask;