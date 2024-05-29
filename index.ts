#!/usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"

//5 students ID should be different.

const randomNumber:number= Math.floor(10000 + Math.random()*90000) 
// it will give 0 t0 1 value mean decimal.v need 5 digits so 10000
//console.log(randomNumber)  // 0.8536066600324188 Har bar ye different values day ga
let myBalance:number=0
let answer=await inquirer.prompt([
    {
        name:"students",
        type:"input",
        message:"Enter student name:",
        validate:function(value){ // ab yahan condition apply ho gi
            if (value.trim() !== ""){
                return true;
            }
            return "please return a non-empty value.";

        },
    },
    {
        name:"courses",
        type: "list",
        message:"select the course to enrol",
        choices:["html","css","javascript", "typescript","python"]
    }
]);
const tutionFee:{[key:string]: number}={
    "html":2000,
    "css":2500,
    "javascript":3000,
    "typescript":5000,
    "python":8000,
}
console.log(`\ntutionFees:${tutionFee[answer.courses]}/-\n`);
console.log(`Balance:${myBalance}\n`);
let paymentType=await inquirer.prompt([
    {
        name:"payment",
        type:"list",
        message:"select payment method",
        choices:["bank transfer","jaz cash","easy paisa"]
    },    {
        name:"amount",
        type:"input",
        message:"transfer money",
        validate:function(value){
            if(value.trim() !==""){
      
                return true;
                
            }
            return "please return a non-empty value";
        },
    }
]);
console.log(`\nyou select payment method ${paymentType.payment}\n`);
const tutionFees=tutionFee[answer.courses];
const paymentAmount=parseFloat(paymentType.amount)
if(tutionFees===paymentAmount){
    console.log(`congratulation, you have successfuly enrolled in ${answer.courses}.\n`);
    let ans=await inquirer.prompt([
        {
            name:"select",
            type:"list",
            message:"what would you like to do next",
            choices:["view status","Exit"]
        }
    ])
    if(ans.select=== "view status"){
        console.log(chalk.yellowBright.italic("\n ******** STATUS ********\n"))
        console.log(chalk.greenBright.italic(`student Name:${answer.students}`));
        console.log(chalk.blueBright.italic(`student ID: ${randomNumber}`));
        console.log(chalk.yellowBright.bold(`course: ${answer.courses}`));
        console.log(chalk.greenBright.bold(`Tution Fees Paid: ${paymentAmount}`));
        console.log(chalk.redBright.bold(`Balance: ${myBalance += paymentAmount}`));
        
         }
         else{
            console.log("\nExiting student Management System\n");
            
         }
}
else{
    console.log(chalk.yellowBright.bold("invalid amount due to course"));
}




