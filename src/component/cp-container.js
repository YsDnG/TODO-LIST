
/*Create a new div with the class of className and it to his parent */
const createContainer=(className,parent)=>{
    
    const element = document.createElement('div');
    element.classList.add(className);
   
    if(parent)
    {
         parent.appendChild(element);
         return element
        
    }
    else
    {
         document.getElementById('app').appendChild(element);
         return element
    }
    
}

export default createContainer;