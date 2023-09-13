import Container from './cp-container.js';
import Button from './cp-button.js'
import addProjectForm from './form/project-form.js'
import DomTool from "../Dom-Tools.js";
const domToolInstance = DomTool();
import {Project} from '../Project-Logic.js'

function createSidebar(Projects)
{
    /*Create Dom element and return selector for the element*/
        const app = document.getElementById('app');
        const sideBar = Container('sideBar');
        const sideBarTitle= Container("sideBar-title",sideBar);
    /**/
    
    /*Create and add to the sideBar element title*/
        const title = document.createElement('h1');
        const  sideBarTitleIcon = document.createElement('i');
        sideBarTitleIcon.className= "sidebar__icon fa-solid fa-rectangle-list"
        title.appendChild(sideBarTitleIcon);
        const textSpan = document.createElement('span');
        textSpan.textContent = " " +"TODO-LIST";
        title.appendChild(textSpan);
        sideBarTitle.appendChild(title);
        sideBar.appendChild(sideBarTitle)
    /**/
   
        const sideBarAction = Container('sideBar-action',sideBar);
    

        const btnDefault= Button("sideBar-projectBtn",'DEFAULT',sideBarAction)
        btnDefault.classList.add('btn-add-focus')
        btnDefault.classList.add('Project');



    /**/

    /*Create and and btn add new project to the side bar*/
        const createProject=Container('sideBar-addProject',sideBarAction);
        const btnAddProject= Button('sideBar-projectBtn',"New Project",createProject,'fa-solid fa-plus');
    /**/

    Projects.forEach(element => {
        if(element.Title !== "DEFAULT")
        {
            
            const btnProject= Button("sideBar-projectBtn",element.Title,sideBarAction)
            btnProject.classList.add('Project');
        }
        
    });

    /**Event listener click new project create form for new project name**/    
        btnAddProject.addEventListener('click',() =>{  
            const form = addProjectForm();  
            btnAddProject.classList.add('is-hidden');
            createProject.appendChild(form)
            /*Event listener on submit form for new project*/
                form.addEventListener('submit',(e)=>{
                    e.preventDefault();
                    let formData = new FormData(e.target);
                    const newProjectBtn=Button('sideBar-projectBtn',formData.get('projectName'),sideBarAction)
                    newProjectBtn.classList.add('Project')
                    let newProject = Project(newProjectBtn.textContent);
                    
                    form.reset();
                    form.classList.add('is-hidden')
                    btnAddProject.classList.remove('is-hidden')
               
                /**/

                })
            /**/

            form.elements['cancel'].addEventListener('click',(e)=>{
                e.preventDefault();
                form.reset();
                createProject.removeChild(form)
                btnAddProject.classList.remove('is-hidden')

            })

        })
    /****/


}
export default createSidebar;