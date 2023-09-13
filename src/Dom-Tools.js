/******IMPORT ******/
import Container from './component/cp-container.js'
import createTaskDom from './component/cp-task/cp-task-DOM.js'


/************/


const DomTool = () => {

    const swapFocus = (element,nodeElement)=>{
        nodeElement.forEach(item => {
            item.classList.remove('btn-add-focus')
            
        });

        element.classList.add('btn-add-focus')
    };

    const clearTaskContent=(element)=>{

        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    const displayTaskForProject=(gridTask,SelectedProject)=>{
        if (SelectedProject && SelectedProject.Tasks) {
            SelectedProject.Tasks.forEach(t=>{
                let Task = createTaskDom(t._title,t._description,t.dueDate,SelectedProject,t._id)
                gridTask.appendChild(Task)
            })
        }
        else{
            console.error('SelectedProject ou SelectedProject.Tasks est undefined', SelectedProject);
        }
    }

    const clearProjectTaskDom=(gridTask)=>{
        gridTask.innerHTML='';
    }

    /*Make the task element editable and change the edit button green while you can edit*/
        const makeElementEditable=(element,btn)=>{

            if(element.getAttribute('contenteditable') === 'true')
            {
                element.setAttribute('contenteditable', 'false');
                element.classList.remove('editable');
                btn.classList.remove('task-done')
                
            }
            else{
                element.setAttribute('contenteditable', 'true')
                element.classList.add('editable');
                btn.classList.add('task-done')
            }

        }
        
    


    return{
    swapFocus,
    clearTaskContent,
    displayTaskForProject,
    makeElementEditable,
    clearProjectTaskDom,
    };

}
export default DomTool;
