const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
    
    client.on('nuevoTicket',(data,callback)=>{
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });
    
    client.on('atenderTicket',(data,callback)=>{
        if (!data.escritorio) {
            return callback({
                err: true,
                message: 'Escritorio no válido'
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
        
        client.broadcast.emit('ultimos5',{
            ultimos5: ticketControl.getUltimos5()
        });
    });

    client.emit('estadoActual',{
        actual:ticketControl.getUltimoTicket(),
        ultimos5: ticketControl.getUltimos5()
    });

});