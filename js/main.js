import Schedule from "./Schedule.js"
import Homework from "./Homework.js"

class Main{
    constructor(){
        let list = new Schedule(document.querySelector("#tableSchedule"));

        document.querySelector("#btnAdd").addEventListener("click", () =>{
            let form = document.querySelector("#form");
            if (form.checkValidity() === true) {
                let name = document.querySelector("#name").value;
                let sDeadline = document.querySelector("#deadline").value;
                sDeadline = sDeadline.split("-");
                var deadline = new Date(sDeadline[0], sDeadline[1]-1, sDeadline[2]);
                let id = document.querySelector("#id").value;

    
                let objHomework = {
                    id : id,
                    name : name,
                    deadline : deadline
                };
                let homework = new Homework(objHomework);
                list.showInTable(homework);
               
            }
            form.classList.add("was-validated");
        });
    }
}
let m = new Main();