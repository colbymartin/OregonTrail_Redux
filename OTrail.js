function prob(chance) {
  return chance < (Math.random() * 100);
}

function Wagon(capacity) {
    this.day = 1;
    this.capacity = capacity;
    this.food = 100;
    this.ammo = 40;
    this.passengers = [];
    this.join = function (trav) {
        if (this.capacity > this.passengers.length) {
            this.passengers.push(trav);
        } else console.log('Wagon is Full');
        trav.home = this;
    }
    this.quarantine = function () {
        let anysick = false;
        for (i = 0; i < this.passengers.length; i++) {
            if (this.passengers[i].sick === true) {
                anysick = true
            } 
        }
        console.log(anysick);
        return anysick;
    };
    this.ready = function () {
        let alive = 0;
        for (let i = 0; i < this.passengers.length; i++) {
            if (this.passengers[i].alive === true){
                alive++;
            }
        }
        return alive;
    }
    this.next = function () {
        this.day++;
        for (let i = 0; i < this.passengers.length; i++) {
            this.passengers[i].hunger = this.passengers[i].hunger + 10;
            this.passengers[i].eat();
            if (this.passengers[i].hunger >= 100) {
                this.passengers[i].alive = false;
            }
            if (this.passengers[i].sick === true){
                if (prob(20)) {
                    this.passengers[i].sick = false;
                }
                for (let count = 0; count < this.passengers.length; count++) {
                    if (prob(15)) {
                        this.passengers[i].sick = true;
                    } 
                }
            } else {
                for (let count = 0; count < this.passengers.length; count++) {
                    if (prob(5)) {
                        this.passengers[i].sick = true;
                    }
                }
            }
        }
        this.passengers[0].hunt();
    }
    return this;
};

function Traveler(name) {
    this.name = name;
    this.home = null;
    this.hunger = 50;
    this.sick = false;
    this.alive = true;
    this.hunt = function () {
        if (this.home.ammo > 5) {
            this.home.ammo = this.home.ammo - 5;
            if (prob(60)){
            this.home.food = this.home.food + 200;
            }   
        }  
    }
    this.eat = function () {
        if (this.sick === false && this.home.food >= 10) {
            this.home.food = this.home.food - 10;
        }
        if (this.sick === true && this.home.food >= 20) {
            this.home.food = this.home.food - 20;
        }
        this.hunger = this.hunger - 25;
    }
    this.sidekicks = function () {
        if (this.home.passengers.length === 0) {
            return 0;
        } else {
            return this.home.passengers.length - 1;
        }
    }
    return this;
};

let jerry = new Traveler('Jerry');
let elaine = new Traveler('Elaine');
let kramer = new Traveler('Kramer');
let george = new Traveler('George');


let wagon1 = new Wagon(7);
let wagon2 = new Wagon(6);
let wagon3 = new Wagon(8);

wagon1.join(jerry);
wagon1.join(elaine);
wagon1.join(kramer);
wagon1.join(george);

function Life() {
    for (let i = 0; wagon1.ready() !== 0; i++) {
        wagon1.next();
    }
    return wagon1.day;
}

console.log(Life());