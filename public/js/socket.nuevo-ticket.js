// los on son para escuchar y los emit para enviar
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function(){
    console.log('Conectado al servidor');
});
socket.on('disconnect', function(){
    console.log('Perdida de conexión al servidor');
});
socket.on('estadoActual', function(resp){
    label.text(resp.actual);
});

$('#nuevoTicket').on('click',function() {
    socket.emit('nuevoTicket',null,function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});