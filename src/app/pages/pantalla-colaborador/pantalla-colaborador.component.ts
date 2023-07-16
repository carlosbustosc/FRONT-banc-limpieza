import { Component, OnInit } from '@angular/core';

/*--conectar servicios---*/
import { ServizService } from 'src/app/servicios/serviz.service';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-pantalla-colaborador',
  templateUrl: './pantalla-colaborador.component.html',
  styleUrls: ['./pantalla-colaborador.component.scss']
})
export class PantallaColaboradorComponent implements OnInit{
    
  verPerfilCompleto:boolean = false

  correo:any;
  
  resultadosTrabajo:any = [];

  nombrePerfil:any

  /*----detalle servicio-----*/
  correoSolictante:any
  direccion:any
  fecha:any
  hora:any
  nombreCliente:any
  servicio1:any
  servicio2:any
  servicio3:any
  servicio4:any
  tarifa1:any
  tarifa2:any
  tarifa3:any
  tarifa4:any

  infoDetalle:boolean  = true;

  quitarBotones:boolean = true;
  
  mensajeTXT:any

  calificacion:any

  
      nombreDelCalificado:any 
      correoDelCalificado:any
      nombreQuienCalifica:any 
      correoQuienCalifica:any 


      pantallaCalificacion = false;
  

     
      nombrePersona:any;
      correoPerfil:any; 
      domicilios:any;    
      
    
      cargarComentarios:any = [];
      
  constructor( private conectarServicios:ServizService ){
    
  }

  
  ngOnInit(): void {
    
    if( localStorage.getItem('nombre') ){

      this.nombrePerfil = localStorage.getItem('nombre');
    
    
    }

    if( localStorage.getItem('correo') ){
        
      console.log( localStorage.getItem('correo') )

      this.correo =localStorage.getItem('correo');
    }

    this.conectarServicios.consultarAgendados( this.correo )
       
    .subscribe( resp => {
          console.log(resp)

          this.resultadosTrabajo = resp;

        })
  }



  verDetalle( posicion:any ){
    
    this.infoDetalle = true;

    this.correoSolictante =  this.resultadosTrabajo[posicion].correoSolictante
    this.direccion =  this.resultadosTrabajo[posicion].direccion
    this.fecha =  this.resultadosTrabajo[posicion].fecha
    this.hora =  this.resultadosTrabajo[posicion].hora
    this.nombreCliente =  this.resultadosTrabajo[posicion].nombreCliente
    this.servicio1 =  this.resultadosTrabajo[posicion].servicio1
    this.servicio2 =  this.resultadosTrabajo[posicion].servicio2
    this.servicio3 =  this.resultadosTrabajo[posicion].servicio3
    this.servicio4 =  this.resultadosTrabajo[posicion].servicio4
    this.tarifa1   =  this.resultadosTrabajo[posicion].tarifa1a
    this.tarifa2   =  this.resultadosTrabajo[posicion].tarifa2
    this.tarifa3   =  this.resultadosTrabajo[posicion].tarifa3
    this.tarifa4   =  this.resultadosTrabajo[posicion].tarifa4
    

  }

  esconder(){
    
      this.infoDetalle = false;
  }



  /*--puede ser la misma base de datos--*/

  aceptar(valor:any){
    


    Swal.fire({
      title: '¿Desea aceptar esta solicitud?',
      text: "Si acepta , se enviara una notificacion al cliente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Aceptar'
    }).then((result) => {

      if (result.isConfirmed) {
        Swal.fire(
          '¡Muy Bien!',
          'Se ha aceptado la solicitud de servicio',
          'success'
        )
        
         /*-
          console.log("mi correo :" + this.resultadosTrabajo[valor].correoSolictante );
          console.log("nombre de quien acepta :" + this.resultadosTrabajo[valor].nombrePersona );
          console.log("correo de quien acepta :" + this.resultadosTrabajo[valor].emailColaborador );
          -*/
      
          let aceptado = {
            
            nombreCliente : this.resultadosTrabajo[valor].nombreCliente,
            correoCliente: this.resultadosTrabajo[valor].correoSolictante,
            nombreQuienMandaNotificacion: this.resultadosTrabajo[valor].nombrePersona,
            emailQuienMandaNotificacion: this.resultadosTrabajo[valor].emailColaborador,
            estado: "Aceptado",
            mensaje: "El servicio fue aceptado por: " + this.resultadosTrabajo[valor].nombrePersona,
            sugerencia: ""
      
          }
      
          console.log(aceptado);
      
      
          this.conectarServicios.registrarNotificaciones(aceptado)
              .subscribe( resp => {
                console.log(resp)
              })
            }
      
          })
      
  }


  rechazar( valor:any ){
    
    console.log(this)

    Swal.fire({
      title: '¿Desea rechazar esta solicitud?',
      text: "Si la rechaza, la solicitud sera eliminada ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Rechazar!'
    }).then((result) => {

      if (result.isConfirmed) {
        Swal.fire(
          '¡Rechazada!',
          'la Solicitud ha sido eliminada.',
          'success'
        )


        let rechazado = {
      
          nombreCliente : this.resultadosTrabajo[valor].nombreCliente,
          correoCliente: this.resultadosTrabajo[valor].correoSolictante,
          nombreQuienMandaNotificacion: this.resultadosTrabajo[valor].nombrePersona,
          emailQuienMandaNotificacion: this.resultadosTrabajo[valor].emailColaborador,
          estado: "Rechazado",
          mensaje: "El servicio fue rechazado por:  " + this.resultadosTrabajo[valor].nombrePersona,
          sugerencia: "(le sugerimos buscar una persona que haga el servicio en su sector o que tenga un servicio mas acorde a su necesidad)"
          
        }
    
        console.log(rechazado);
      
        /*-
        this.conectarServicios.registrarNotificaciones(rechazado)
              .subscribe( resp => {
                console.log(resp)
              })
              --*/
  

              /*---borrar registro rechazado-----*/
              this.conectarServicios.borrarRechazados( this.resultadosTrabajo[valor].id )
                  .subscribe( (resp:any) => {
                    console.log( resp );

                     /*---cargar pagina---*/
                      setTimeout(function(){
                        window.location.reload()
                      }, 200);
                     /*---cargar pagina---*/
                     
                  })

      }
    })

    /*
    console.log("mi correo :" + this.resultadosTrabajo[valor].correoSolictante );
    console.log("nombre de quien rechaza :" + this.resultadosTrabajo[valor].nombrePersona );
    console.log("correo de quien rechaza :" + this.resultadosTrabajo[valor].emailColaborador );
    */

    

       

  }


  terminado(valor:any){
    
    Swal.fire({
      title: '¿El trabajo ha sido terminado?',
      text: "Si es asi se confirmara al cliente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ha sido terminado!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '!Muy bien!',
          'El cliente será notificado.',
          'success'
        )

         /*-
          console.log("mi correo :" + this.resultadosTrabajo[valor].correoSolictante );
          console.log("nombre de quien acepta :" + this.resultadosTrabajo[valor].nombrePersona );
          console.log("correo de quien acepta :" + this.resultadosTrabajo[valor].emailColaborador );
          -*/
      
          let Terminado = {
            
            nombreCliente : this.resultadosTrabajo[valor].nombreCliente,
            correoCliente: this.resultadosTrabajo[valor].correoSolictante,
            nombreQuienMandaNotificacion: this.resultadosTrabajo[valor].nombrePersona,
            emailQuienMandaNotificacion: this.resultadosTrabajo[valor].emailColaborador,
            estado: "Terminado",
            mensaje: "El servicio fue Terminado por: " + this.resultadosTrabajo[valor].nombrePersona,
            sugerencia: ""
      
          }
      
          console.log(Terminado);
      

          /*----notificar terminado----*/
          this.conectarServicios.registrarTrabajosTerminados(Terminado)
              .subscribe( resp => {
                console.log(resp)
              })




            /*---borrar registro rechazado-----*/
            this.conectarServicios.borrarRechazados( this.resultadosTrabajo[valor].id )
            .subscribe( (resp:any) => {
              console.log( resp );

               /*---cargar pagina---*/
                setTimeout(function(){
                  window.location.reload()
                }, 200);
               /*---cargar pagina---*/
               
            })

      }

    })

   
        

  }


  calificarCliente(valor:any){
        
        this.pantallaCalificacion = true;

        this.nombreDelCalificado = this.resultadosTrabajo[valor].nombreCliente
        this.correoDelCalificado = this.resultadosTrabajo[valor].correoSolictante
        this.nombreQuienCalifica = this.resultadosTrabajo[valor].nombrePersona
        this.correoQuienCalifica = this.resultadosTrabajo[valor].emailColaborador

  }


  radioBotton(valor:any){
      
    this.calificacion = valor;
  }


  enviarCalificacion(){
      
      let datosCalificar = {
  
        nombreCalif:this.nombreDelCalificado,
        emailCalif: this.correoDelCalificado,
        correoQuienCal:this.nombreQuienCalifica,
        nombreQuienCalif:this.correoQuienCalifica,
        calificacion: this.calificacion,
        mensaje: this.mensajeTXT
        
      }

      console.log(datosCalificar);

      /*---conectar servicios-----*/
      this.conectarServicios.RegistrarCalificacionColaborador(datosCalificar)
    
                            .subscribe( resp => {
                              console.log(resp);

                              alert("se calificado correctamente");
                              this.pantallaCalificacion = false;

                            })
                          
  }

  cerrar(){
    this.pantallaCalificacion = false;
    this.verPerfilCompleto = false;
  }






  verPerfil( position:any){
    
    this.verPerfilCompleto = true;


    this.nombrePersona = this.resultadosTrabajo[position].nombreCliente,
    this.correoPerfil = this.resultadosTrabajo[position].correoSolictante,
    this.domicilios = this.resultadosTrabajo[position].direccion 
  
    
    this.conectarServicios.cargarCalificaciones( this.resultadosTrabajo[position].correoSolictante )
    .subscribe(resp => {

      console.log(resp)
      this.cargarComentarios = resp;
    
    })


    /*--
    this.nombrePersona = this.busquedaColaboradores[position].nombre
    this.domicilios    = this.busquedaColaboradores[position].ciudad
    this.correo        = this.busquedaColaboradores[position].correo


   
    

  }

  ---*/
  }




}
