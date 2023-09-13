import Button from '../cp-button.js'
import Container  from '../cp-container.js';
function createNewProjectForm()
{

    let form = document.createElement('form');
    form.classList.add('addProject-form')
    form.method='post'

    const newProjectName =document.createElement('input')
    newProjectName.name= 'projectName';
    newProjectName.placeholder='Project Name'
    newProjectName.type='text';
    form.appendChild(newProjectName)

    const buttonDiv=Container('btn-container',form);

    const btnSubmit = Button('addNewProject-btn',"ADD",form,"fa-solid fa-plus");
    btnSubmit.type='submit';
    buttonDiv.appendChild(btnSubmit);

    const btnCancel = Button('addNewProject-btn',"CANCEL",form,"fa-solid fa-xmark");
    buttonDiv.appendChild(btnCancel);
    btnCancel.name='cancel'


    form.appendChild(buttonDiv);

    return form;
}

export default createNewProjectForm;