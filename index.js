// import { faker } from "@faker-js/faker";
// // Customer Class
// class Customer {
//     fname: string;
//     lName: string;
//     age: number;
//     gender: string;
//     mobNumber: number;
//     accNumber: number;
//     constructor(fname: string, lName: string, age: number, gender: string, mobNumber: number, accNumber: number) {
//         this.fname = fname;
//         this.lName = lName;
//         this.age = age;
//         this.gender = gender;
//         this.mobNumber = mobNumber;
//         this.accNumber = accNumber;
//     }
// }
// //  Interface Bank Account
//     interface BankAccount {
//         accNumber : number;
//         balance : number;
//     }
//     //  Class Bank
//     class Bank {
//         customer: Customer[]= [];
//         account: BankAccount[] = [];
//     }
//      let bankAlHabib = new Bank();
// //  creat customer
//      for(let i:number = 1; i <=3 ; i++)
//         {
//             let fname = faker.person.firstName('male');
//             let lName = faker.person.lastName();
//             let num = parseInt(faker.phone.number("3#########"));
//             const cus = new Customer(fname, lName, 20 * i, "male", num, 1000+i);
//         }
//      console.log(bankAlHabib);
import { faker } from '@faker-js/faker';
import chalk from 'chalk';
import inquirer from "inquirer";
// Customer Class
class Customer {
    firstName;
    lastName;
    age;
    gender;
    mobNumber;
    accNumber;
    constructor(fName, lName, gender, age, mob, acc) {
        this.firstName = fName;
        this.lastName = lName;
        this.age = age;
        this.gender = gender;
        this.mobNumber = mob;
        this.accNumber = acc;
    }
}
// Class Bank
class Bank {
    customer = [];
    account = [];
    addCustomer(obj) {
        this.customer.push(obj);
    }
    addAccountNumber(obj) {
        this.account.push(obj);
    }
    transaction(accObj) {
        let NewAccounts = this.account.filter((acc) => acc.accNumber !== accObj.accNumber);
        this.account = [...NewAccounts, accObj];
    }
}
let StandardCharteredBank = new Bank();
// Custumer Create
for (let i = 1; i <= 3; i++) {
    let fName = faker.person.firstName("male");
    let lName = faker.person.lastName();
    let num = parseInt(faker.phone.number("3#########"));
    const cus = new Customer(fName, lName, "male", 20 * i, num, 1000 + i);
    StandardCharteredBank.addCustomer(cus);
    StandardCharteredBank.addAccountNumber({ accNumber: cus.accNumber, balance: 1000 * i });
}
// Bank Functionality
async function bankService(bank) {
    do {
        let service = await inquirer.prompt({
            type: "list",
            name: "select",
            message: "Please Select the Service",
            choices: ["View Balance", "Cash Withdraw", "Cash Deposite", "Exit"]
        });
        // View Balance
        if (service.select == "View Balance") {
            let res = await inquirer.prompt({
                type: "input",
                name: "num",
                message: "Please Enter Your Account Number:",
            });
            let account = StandardCharteredBank.account.find((acc) => acc.accNumber == res.num);
            if (!account) {
                StandardCharteredBank;
                console.log(chalk.red.bold.italic("Invalid Account Number"));
            }
            if (account) {
                let name = StandardCharteredBank.customer.find((item) => item.accNumber == account?.accNumber);
                console.log(`Dear ${chalk.green.italic(name?.firstName)} ${chalk.green.italic(name?.lastName)} Your Account Balance is ${chalk.bold.blueBright("$", account.balance)}`);
            }
        }
        // Cash Withdrw
        if (service.select == "Cash Withdraw") {
            let res = await inquirer.prompt({
                type: "input",
                name: "num",
                message: "Please Enter Your Account Number:",
            });
            let account = StandardCharteredBank.account.find((acc) => acc.accNumber == res.num);
            if (!account) {
                console.log(chalk.red.bold.italic("Invalid Account Number"));
            }
            if (account) {
                let ans = await inquirer.prompt({
                    type: "number",
                    message: "Please Enter Your amount.",
                    name: "rupee",
                });
                let newBalance = account.balance - ans.rupee;
                // transaction method call
                bank.transaction({ accNumber: account.accNumber, balance: newBalance });
            }
        }
        // Cash Deposite
        if (service.select == "Cash Deposite") {
            let res = await inquirer.prompt({
                type: "input",
                name: "num",
                message: "Please Enter Your Account Number:",
            });
            let account = StandardCharteredBank.account.find((acc) => acc.accNumber == res.num);
            if (!account) {
                console.log(chalk.red.bold.italic("Invalid Account Number"));
            }
            if (account) {
                let ans = await inquirer.prompt({
                    type: "number",
                    message: "Please Enter Your amount.",
                    name: "rupee",
                });
                if (ans.rupee > account.balance) {
                    console.log(chalk.red.bold("Insuficiant Balance...."));
                    let newBalance = account.balance + ans.rupee;
                    // transaction method call
                    bank.transaction({ accNumber: account.accNumber, balance: newBalance });
                }
            }
        }
        if (service.select == "Exit")
            break;
    } while (true);
}
bankService(StandardCharteredBank);
