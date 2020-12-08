class NameField {
    constructor(name) {
        const field = document.createElement('li');
        field.textContent = name;
        const nameListHook = document.querySelector('#names');
        nameListHook.appendChild(field);
    }
}

class NameGenerator {
    constructor() {
        const btn = document.querySelector('button');
        this.names = ['Max', 'Manu', 'Anna'];
        this.currentName = 0;
        btn.addEventListener('click', () => {
            console.log(this);
            this.addName(); //as here () , this will not execute imediatly, 
        });        // when call button, arrow func execute and azeute addname
        //to event  listner
        // Alternative:
        // btn.addEventListener('click', this.addName.bind(this));  //sending reference
    }

    //  () => console.log("pahuihi")   kiyane reference ekak wage therenjne 

    addName() {
        console.log(this);
        const name = new NameField(this.names[this.currentName]);
        this.currentName++;
        if (this.currentName >= this.names.length) {
            this.currentName = 0;
        }
    }
}

const gen = new NameGenerator();