function createButton(className,textContent,parent,iconClass)
{
    const button= document.createElement('button')
    parent.appendChild(button);
    if(iconClass)
    {
        const icon = document.createElement('i');
        icon.className=iconClass
        button.appendChild(icon)
    }
    const textSpan = document.createElement('span');
    textSpan.textContent = "" +textContent;
    button.appendChild(textSpan);
    button.classList.add(className);
    
    return button
}

export default createButton;