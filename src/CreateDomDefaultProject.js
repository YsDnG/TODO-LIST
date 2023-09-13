
/******IMPORT ******/

import {Project} from './Project-Logic.js'
import DomTool from "./Dom-Tools.js";
const domToolInstance = DomTool();

/***COMPONENT IMPORT***/
import SideBar from './component/cp-sidebar'
import Container from './component/cp-container';
import Button from './component/cp-button.js'
import createTaskDom from './component/cp-task/cp-task-DOM.js'
import createTaskObject from './component/cp-task/cp-task-logic.js'
import Form from './component/form/form.js'

/******/

/************/

function createDomDefault(Projects)
{

    const sideBar = SideBar(Projects);
    const content= Container("todo-content")
    const addTask= Button("addTask-btn","Add Task",content,'fa-solid fa-plus');
    
    const gridTask = Container('gridTask',content);
    Projects[0].Tasks.forEach(element => {
        const taskTestDom = createTaskDom(element._title,element._description,element._dueDate,Projects[0],element._id);
        gridTask.appendChild(taskTestDom)
        
    });
    
    

    
    /*Display from to add a new task*/
        addTask.addEventListener('click',(e)=>{
            e.stopPropagation();
            const overlay = Container('overlay',content)
            overlay.classList.add('overlay');
            const SelectedProject = Projects.find(p => p.Title === document.querySelector('.Project.btn-add-focus').textContent);
            const form = Form(SelectedProject);
            content.appendChild(form);
    /**/

    /*Remove the form and the overlay from the dom when click outside of it */
        function documentClickHandler(e)
        {
            if(!form.contains(e.target) && e.target !== addTask)
            {
                form.reset();
                content.removeChild(form)
                content.removeChild(overlay)
                document.removeEventListener('click',documentClickHandler);
            }
        }
    /**/
        document.addEventListener('click',documentClickHandler)
        
    });
  
}

export default createDomDefault;