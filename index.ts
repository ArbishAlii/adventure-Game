#! /usr/bin/env node
import inquirer from "inquirer";

class Player {
    name: string;
    fuel: number = 100;
    constructor(name: string) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
    fuelIncrease() {
        this.fuel = 100;
    }
}

class Opponent {
    name: string;
    fuel: number = 100;
    constructor(name: string) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
}

let player = await inquirer.prompt([
    {
        name: "name",
        type: "input",
        message: "Please Enter your Name:"
    }
]);


let opponent = await inquirer.prompt([
    {
        name: "select",
        type: "list",
        message: "Select your Opponent",
        choices: ["Skeleton", "Alien", "Zombie"]

    }
]);

let player1 = new Player(player.name);
let opponent1 = new Opponent(opponent.select);

async function gameLoop() {
    while (true) {
        let ask = await inquirer.prompt([
            {
                name: "opt",
                type: "list",
                message: "What would you like to do?",
                choices: ["Attack", "Drink your Potion", "Run for Your Life.."]

            }
        ]);

        if (ask.opt === "Attack") {
            let num = Math.floor(Math.random() * 2);
            if (num === 1) {
                player1.fuelDecrease();
            } else {
                opponent1.fuelDecrease();
            }

            console.log(`${player1.name} fuel is ${player1.fuel}`);
            console.log(`${opponent1.name} fuel is ${opponent1.fuel}`);

            if (player1.fuel <= 0) {
                console.log("You lose, Better Luck Next Time");
                break;
            } else if (opponent1.fuel <= 0) {
                console.log("You Win :)");
                break;
            }
        } else if (ask.opt === "Drink your Potion") {
            player1.fuelIncrease();
            console.log(`You drink health potion, your fuel is ${player1.fuel}`);
        } else if (ask.opt === "Run for Your Life..") {
            console.log("You lose, Better Luck Next Time");
            break;
        }
    }
}

gameLoop();
