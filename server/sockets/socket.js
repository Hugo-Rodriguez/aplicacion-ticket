const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", (client) => {
  client.on("siguienteTicket", (data, callback) => {
    let siguiente = ticketControl.siguienteTicket();
    console.log("Siguiente ticket:",siguiente);
    callback(siguiente);
  });


 // emitir un evento llamado estado actual

client.emit('estadoActual', {

  actual: ticketControl.getUltimoTicket(),
  ultimos4: ticketControl.getUltimos4()
 });

 client.on('atenderTicket', (data, callback)=>{

    if( !data.escritorio ) {
      return callback ( {
        err: true,
        mensaje: 'El escitorio es necesario'
      });
    }

    let atenderTicket = ticketControl.atenderTicket( data.escritorio);
    

    // actualizar / notificar cambios en los Ultimos 4
    callback(atenderTicket);


    // emitir ultimos 4
    client.broadcast.emit('ultimos4', {
      ultimos4: ticketControl.getUltimos4()
    });




 });
  


});

