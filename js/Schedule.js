import Homework from "./Homework.js";

export default class Schedule{
    constructor(tableSchedule){
        this._tableSchedule = tableSchedule;
        this._homeworks = [];        
        this._initTable();
    }

    _initTable(){

        var lsHomework = JSON.parse(localStorage.getItem("Homework"));
        if (lsHomework === null) {
            return;
        }
        lsHomework.forEach((e, index) =>{
            e.deadline = new Date (e.deadline);
            this.showInTable(new Homework(e));
        });
        console.log(lsHomework);
    }

    showInTable(homework){
        let row = this._tableSchedule.insertRow(-1);
        let cellName = row.insertCell(0);
        let cellDeadline = row.insertCell(1);
        let cellMissingDay = row.insertCell(2);        
        let cellEdit = row.insertCell(3);
        let cellDelete = row.insertCell(4);

        cellName.innerHTML = homework.name;
        cellDeadline.innerHTML = homework.getDateAsString();
        cellMissingDay.innerHTML = homework.getMissingDays();

        cellName.style.color = "white";
        cellDeadline.style.color = "white";
        cellMissingDay.style.color = "white";       

        let objHomework = {
            name : homework.name,
            deadline : homework.deadline
        }
        this._homeworks.push(objHomework);
        console.log(this._homeworks);
        localStorage.setItem("Homework", JSON.stringify(this._homeworks));

        this._addButtons(row, homework);

    }

    _addButtons(row, homework){
        let iconEdit = document.createElement("span");
        iconEdit.className = "fa fa-user-edit";     

        let btnEdit = document.createElement("button");
        btnEdit.type = "button";
        btnEdit.appendChild(iconEdit);
        btnEdit.className = "btn btn-outline-warning ";
        btnEdit.addEventListener("click", () => { 
           //this._editRow(row, homework); //llamando al metodo de editar
        }); 

      let iconDel = document.createElement("span");
        iconDel.className = "fa fa-user-times";
      let btnDelete = document.createElement("button");
      btnDelete.type = "button";
      btnDelete.appendChild(iconDel);
      btnDelete.className = "btn btn-outline-danger";
      btnDelete.addEventListener("click", () => { 
         // this._deleteRow(row, homework); //llamando al metodo de editar
      }); 

      row.cells[3].appendChild(btnEdit);
      row.cells[4].appendChild(btnDelete);
    }


}