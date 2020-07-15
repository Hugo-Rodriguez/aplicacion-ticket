var socket = io();



var searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('escritorio')) {
    window.Location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');


console.log(escritorio);
$('h1').text('Escritorio: ' + escritorio);


$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp){

        console.log(resp);

        if ( resp === 'No hay tickets'){
            label.text(resp);
            alert(resp);
            return;
        }
        
        label.text('Ticket ' + resp.numero);


    });

});
