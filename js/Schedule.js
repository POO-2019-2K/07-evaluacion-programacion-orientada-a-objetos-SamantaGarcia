import Homework from "./Homework.js";

export default class Schedule{
    constructor(tableSchedule){
        this._tableSchedule = tableSchedule;
        this._homeworks = [];        
        this._initTable();
    }

    _initTable(){
        //localStorage.removeItem("Homework");
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

    _findH(id){      
        let find = -1;
        this._homeworks.forEach((e, index) => {
            if (e.id === id) {
                find = index;
                return;
            }
        });
        return find;
    }

    showInTable(homework){
      let found = this._findH(homework.id);
      if (found >= 0) {
        Swal.fire({
          type: "error",
          title: "Error",
          text: "This ID already exist" 
        });
        return;
      }

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
            id : homework.id,
            name : homework.name,
            deadline : homework.deadline
        }
        this._homeworks.push(objHomework);

        this._homeworks.sort(function(a,b){
            return new Date(a.deadline) - new Date(b.deadline);
            
          });
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
           this._editRow(row, homework); //llamando al metodo de editar
        }); 

      let iconDel = document.createElement("span");
        iconDel.className = "fa fa-user-times";
      let btnDelete = document.createElement("button");
      btnDelete.type = "button";
      btnDelete.appendChild(iconDel);
      btnDelete.className = "btn btn-outline-danger";
      btnDelete.addEventListener("click", () => { 
         this._deleteRow(row, homework); //llamando al metodo de editar
      }); 

      row.cells[3].appendChild(btnEdit);
      row.cells[4].appendChild(btnDelete);
    }

    //eliminar
    _deleteRow(row, homework){      
        this._homeworks.splice(homework, 1);
        row.innerHTML = ""; 
        localStorage.setItem("Homework", JSON.stringify(this._homeworks));
        return;          
    }

    //editar
    _editRow(row, homework){
        //console.log(row, persona);
        let inputName = document.createElement("input");
        inputName.type = "text";
        inputName.value = homework.name;

        let inputDeadline = document.createElement("input");
        inputDeadline.type = "date";
        inputDeadline.value = homework.deadline;

        row.cells[0].innerHTML = ""; //borrar la celda
        row.cells[0].appendChild(inputName); //appendChild para crear un input através de una variable  

        row.cells[1].innerHTML = "";
        row.cells[1].appendChild(inputDeadline);

        row.cells[2].innerHTML = "";

         //crear botones

         let iconSave = document.createElement("span");
        iconSave.className = "fa fa-user-check";
      //salvar
    let btnSave = document.createElement("button");
    btnSave.type = "button";
    btnSave.appendChild(iconSave);
    btnSave.className = "btn btn-outline-success";
    row.cells[3].innerHTML = "";
    row.cells[3].appendChild(btnSave);
    btnSave.addEventListener("click", () => {
      let newH ={
        id : homework.id,
        name : inputName.value,
        deadline : inputDeadline.value
      }
      console.log(newH);
      this._saveEdit(row, homework,newH);
    });

    let iconCan = document.createElement("span");
    iconCan.className = "fa fa-user-alt-slash";

    let btnCancel = document.createElement("button");
    btnCancel.type = "button";
    btnCancel.appendChild(iconCan);
    btnCancel.className = "btn btn-outline-danger";
    row.cells[4].innerHTML = "";
    row.cells[4].appendChild(btnCancel);
    btnCancel.addEventListener("click", () => {
      this._cancelEdit(row, homework); //llamar metodo
    });
    }
    _saveEdit(row, homework, newH){
        let position = this._findH(homework.id);
        this._homeworks[position] = newH;
        localStorage.setItem("Homework", JSON.stringify(this._homeworks));
  
        this._cancelEdit(row, new Homework(newH));
        console.log(row, homework, newH)
    }
  
      _cancelEdit(row, homework){
          row.cells[0].innerHTML = homework.name;
          row.cells[1].innerHTML = homework.getDateAsString();
          row.cells[2].innerHTML = homework.getMissingDays();
      
          row.cells[3].innerHTML = "";
          row.cells[4].innerHTML = "";
           this._addButtons(row, homework); //metodo de botones
        }
}