export default class Homework{
    constructor(homework){
        this._id = homework.id;
        this._name = homework.name;
        this._deadline = new Date(homework.deadline);
        this._months = [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic"
        ];
    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    get deadline(){
        return this._deadline;
    }

    _getNumberAsTwoDigits(deadline){
        if (deadline < 10){
        //se convierte en string
        return "0"+ deadline;
        } 
        return deadline;
    }
    getDeadlineForDate() {
        let { deadline } = this;
        let date2 = this._getNumberAsTwoDigits(deadline.getDate()) + '/' + this._getNumberAsTwoDigits(deadline.getMonth() + 1) + '/' + this._getNumberAsTwoDigits(deadline.getFullYear());
        return date2;
      }
    //Fecha para cumpleaños 
    getDateAsString() {
        let date =
        this._deadline.getDate() +
        "/" +
        this._months[this._deadline.getMonth()] +
        "/" +
        this._deadline.getFullYear();
    
        return date;
    }
    getMissingDays() {
        let oneDay = 24 * 60 * 60 * 1000;
        let differenceMs = this._deadline - new Date();
        let missingD = Math.trunc((differenceMs / oneDay)+1);    
        return missingD;
    }
}