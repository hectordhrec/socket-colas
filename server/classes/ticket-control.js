const fs = require('fs');
class Ticket{
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl{
    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        let tickets = [];
        let ultimos5 = [];
        let data = require('../data/data.json');
        
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos5 = data.ultimos5;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente(){
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo,null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket(){
        return `Ticket ${this.ultimo}`;
    }
    
    getUltimos5(){
        return this.ultimos5;
    }

    atenderTicket(escritorio){
        if (this.tickets.length === 0) {
            return 'No hay Tickets';
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimos5.unshift(atenderTicket);

        if(this.ultimos5.length > 5){
            this.ultimos5.splice(-1,1);
        }
        console.log(this.ultimos5,this.ultimos5.length);

        this.grabarArchivo();
        return atenderTicket;
    }

    reiniciarConteo(){
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos5 = [];
        this.grabarArchivo();
    }

    grabarArchivo(){
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos5: this.ultimos5
        }
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}