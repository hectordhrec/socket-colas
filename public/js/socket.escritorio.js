// los on son para escuchar y los emit para enviar
var socket = io();

socket.on('connect', function(){
    console.log('Conectado al servidor');
});

socket.on('disconnect', function(){
    console.log('Perdida de conexión al servidor');
});

var searchParams = new URLSearchParams(window.location.search);
if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('Escritorio no válido');
}

var escritorio = searchParams.get('escritorio');
$('h1').text('Escritorio '+escritorio);

$('#atenderTicket').on('click', function() {
    socket.emit('atenderTicket',{escritorio:escritorio}, function(resp) {
        console.log(resp);
        if (resp.numero) {
            $('small').text('Ticket '+resp.numero);
        }else{
            $('small').text(resp);
            Swal.fire({
                icon: 'error',
                title: resp
            });
            return;
        }
    });
});