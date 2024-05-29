#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

class Student {
    name:String
    constructor(n:string){
        this.name=n

    }
}

class Person{
    students:Student[]=[]
    addStudent(obj:Student){
        this.students.push(obj)
    }
}

const persons = new Person()

const programStart =async(persons:Person)=>{
    do{
    console.log(chalk.bold.magenta("\n \t Welcome! \n \t"));
    const ans = await inquirer.prompt({
        name: "select",
        type: "list",
        message: "Whom would you like to interact with?",
        choices: ["staff", "student", "exit"]

    })
    if (ans.select == "staff"){
        console.log(chalk.blue("You approach the staff room.Please feel free to ask any question.\n"));
    }
    else if(ans.select == "student"){
        const ans = await inquirer.prompt({
            name: "student",
            type: "input",
            message: (chalk.yellow("\nEnter the student's name you wish to engage with:"))
        })
    const student = persons.students.find(val => val.name == ans.student)
    if(!student){
        const name = new Student(ans.student)
        persons.addStudent(name)
        console.log(chalk.blue(`Hello I am ${name.name}. Nice to meet you!\n`));
        console.log("New student added");
        console.log("Current Student List:");
        console.log(persons.students);

    } else {
        console.log(chalk.blue(`Hello I am ${student.name}. Nice to see you again!\n`));
        console.log("\nExisting Student List:");
        console.log(persons.students);
    }
        
    }else if (ans.select == "exit"){
        console.log(chalk.bold.green("\nExiting the Program..\n"));
        process.exit()
    }
    }while(true)
    
}

programStart(persons);