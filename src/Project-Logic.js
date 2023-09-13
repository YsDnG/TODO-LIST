

export const Project=(Title)=>{
  
    return{
        Title,
        Tasks:[],
        addTask(task){
        this.Tasks.push(task);
        this.saveToLocalStorage();
        },
        modifyTask(id, newTaskProperties) {
            const task = this.Tasks.find(task => task.id === id);
            if (task) {
                Object.assign(task, newTaskProperties);
                this.saveToLocalStorage();
            } else {
                console.error('ID de tâche invalide');
            }
        },
        deleteTask(id){
            this.Tasks = this.Tasks.filter(item => item._id !== id)
            this.saveToLocalStorage();

        },
        saveToLocalStorage() {
            const existingProjects = JSON.parse(localStorage.getItem('Projects')) || [];
            const projectIndex = existingProjects.findIndex(proj => proj.Title === this.Title);

            if (projectIndex !== -1) {
                existingProjects[projectIndex] = this;
            } else {
                existingProjects.push(this);
            }
            
            localStorage.setItem('Projects', JSON.stringify(existingProjects));
        },
        sortTaskByDate(){
            this.Tasks.sort((a,b)=> {return new Date(a._dueDate)-new Date(b._dueDate)})
        },

        displayTasks() {
            console.log(this.Tasks);
        },
    }
}