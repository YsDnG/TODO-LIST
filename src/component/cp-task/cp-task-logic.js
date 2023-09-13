

const createTaskObject = (title,description, dueDate) => {
    
    const isValidDate = (d) => {
        return d instanceof Date && !isNaN(d);
    };

    const task = {
        _id: Date.now().toString() + "_" + Math.random().toString(36).substr(2, 9),
        _title: title,
        _description: description,
        _dueDate: dueDate,  // convertit la chaîne en objet Date

        get id() {
            return this._id; // Getter pour l'identifiant unique
        },
        get title() {
            return this._title;
        },
        set title(value) {
            this._title = value;
        },

        get description() {
            return this._description;
        },
        set description(value) {
            this._description = value;
        },

        get dueDate() {
            return this._dueDate;
        },
        set dueDate(value) {
            const dateValue = new Date(value);
            if (isValidDate(dateValue)) {
                this._dueDate = dateValue;
            } else {
                console.error('Invalid date provided.');
            }
        }
    };
    return task;
}



export default createTaskObject;