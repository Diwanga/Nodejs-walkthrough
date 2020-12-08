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
        btn.addEventListener('click', function () {
            console.log(this);  // Namegenerator
            console.log("assdsdasd");
            this.addName(); //as here () , this will not execute imediatly, 
        });        //first arrow  function excute when onstrructor execute, and registeing  add  nme function
        //to event  listner
        // Alternative:
        // btn.addEventListener('click', this.addName.bind(this));  //sending reference
    }

    // btn.addEventListener('click', function () {
    //     console.log(this);   // ==== button
    //     console.log("assdsdasd");
    //     this.addName();

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