// Comando para establecer la concexion

var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function(){
    console.log('Conectado al Servidor');
});

socket.on('disconnect', function(){
    console.log('Desconectado del Servidor');
});


// on 'estadoActual'
socket.on('estadoActual', function(resp){

    console.log(resp.actual);
    label.text( resp.actual);

});


$('button').on('click', function(){

    // console.log('click');
    socket.emit('siguienteTicket',null, function(siguienteTicket){

        label.text(siguienteTicket);


    });

});
