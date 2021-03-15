let instance = null;

class Singleton {

    constructor() {
        if (instance) return instance;
        else {
            this.id = "myid"
            instance = this;
        }
    }

    curId() {
        return "id = " + this.id;
    }

    foo() {
        return "foo";
    }

}

exports.Singleton = Singleton;

/*
You could also simply use a global variable and export it.
Another possibility is to put an instance in a var and 
export that variable only without exporting the class. 
*/
