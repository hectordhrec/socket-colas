// los on son para escuchar y los emit para enviar
var socket = io();
var labelTicket1 = $('#lblTicket1');
var labelEscritorio1 = $('#lblEscritorio1');
var labelTicket2 = $('#lblTicket2');
var labelEscritorio2 = $('#lblEscritorio2');
var labelTicket3 = $('#lblTicket3');
var labelEscritorio3 = $('#lblEscritorio3');
var labelTicket4 = $('#lblTicket4');
var labelEscritorio4 = $('#lblEscritorio4');
var labelTicket5 = $('#lblTicket5');
var labelEscritorio5 = $('#lblEscritorio5');

var lblTickets = [labelTicket1,labelTicket2,labelTicket3,labelTicket4,labelTicket5];
var lblEscritorios = [labelEscritorio1,labelEscritorio2,labelEscritorio3,labelEscritorio4,labelEscritorio5];

socket.on('connect', function(){
    console.log('Conectado al servidor');
});

socket.on('disconnect', function(){
    console.log('Perdida de conexión al servidor');
});

socket.on('estadoActual', function(resp){
    actualizarHTML(resp.ultimos5);
});

socket.on('ultimos5',function(resp){
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizarHTML(resp.ultimos5);
});

function actualizarHTML(ultimos5) {
    for(var i =0; i<=ultimos5.length -1;i++){
        lblTickets[i].text('Ticket '+ultimos5[i].numero);
        lblEscritorios[i].text('Escritorio '+ultimos5[i].escritorio);
    }
}