/******IMPORT ******/

import createDomDefault from "./CreateDomDefaultProject.js";
import '@fortawesome/fontawesome-free/css/all.css';
import DomTool from "./Dom-Tools.js";
const domToolInstance = DomTool();
import {Project} from './Project-Logic.js'
import createTaskObject from "./component/cp-task/cp-task-logic.js";
import createTaskDom from './component/cp-task/cp-task-DOM.js'

/*** CSS IMPORT ***/
import './component/cp-task/cp-task.css'; // Import index.css
import './component/form/form.css'
/******/

/***********/

/*** Dom selector ***/

const sideBar = document.querySelector('.sidebar')


/******/

/*Create Page Dom and start with The default project as entry*/


let Projects = JSON.parse(localStorage.getItem('Projects')) || [];
// localStorage.clear();

function createProjectFromData(data) {
    const project = Project(data.Title);
    data.Tasks.forEach(taskData => {
        
        const task = createTaskObject(taskData._title, taskData._description, taskData._dueDate);
        project.addTask(task);
    });
    return project;
}

if (!Projects.length) {
    const defaultProject = Project('DEFAULT');
    defaultProject.addTask(createTaskObject("Title", "This is the description", new Date()));
    Projects.push(defaultProject);
    localStorage.setItem('Projects', JSON.stringify(Projects));
} 
else 
{
    const projectData = JSON.parse(localStorage.getItem('Projects'));
    Projects = projectData.map(createProjectFromData);
}





createDomDefault(Projects);


let ProjectsDom = document.querySelectorAll('.Project');
const gridTask =document.querySelector('.gridTask');
Projects.forEach(p=> p.sortTaskByDate());





function addProjectClickEventListener(projectDom) {
    projectDom.addEventListener('click', () => {
        domToolInstance.swapFocus(projectDom, document.querySelectorAll('.Project'));
        domToolInstance.clearTaskContent(gridTask);
        const project = Projects.find(p=>p.Title === projectDom.textContent)
         domToolInstance.displayTaskForProject(gridTask, project);
    });
}


const initialProjects = document.querySelectorAll('.Project');
initialProjects.forEach(addProjectClickEventListener);

const projectParentElement = document.querySelector('.sideBar-action');
const taskParentElement = document.querySelector('.gridTask')

const observerProject = new MutationObserver ((mutationList) => {
    for (const mutation of mutationList){
        if(mutation.type === 'childList' && mutation.addedNodes.length > 0){
            mutation.addedNodes.forEach((newNode)=>{
                if(newNode.classList.contains("Project")){
                    Projects.push(Project(newNode.textContent));
                    localStorage.setItem('Projects', JSON.stringify(Projects));
                    addProjectClickEventListener(newNode)         
                }
            });
        }
    }
});


const observerTask = new MutationObserver((mutationList)=>{
    for(const mutation of mutationList)
    {
        if(mutation.type === 'childList'&& mutation.addedNodes.length>0){
            mutation.addedNodes.forEach((newNode)=>{
                if(newNode.classList.contains('task')){
                    const projects = document.querySelectorAll(".Project")
                    Array.from(projects).find(Element=>{
                        if(Element.classList.contains('btn-add-focus'))
                        {
                           Projects.find(p=>p.Title === Element.textContent).sortTaskByDate()
                        }
                    })
            }       
        })
    }
    }

})

observerProject.observe(projectParentElement,{childList:true});
observerTask.observe(taskParentElement, {childList:true});















