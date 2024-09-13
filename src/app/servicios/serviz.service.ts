import { Injectable} from '@angular/core';

/*----usar http----*/
import { HttpClient } from '@angular/common/http';

/*---usar map---*/
import { map } from "rxjs/operators"


@Injectable({
  providedIn: 'root'
})

export class ServizService{
    

  idToken:any;
  idCorreo:any;

  nombreLogueado:string = "";

  serviciosHogar:any = [

    {
      "id":"0",
      "img":"assets/img/limpieza_hogar.jpg",
      "servicio":"Limpieza de hogar",
      "valor":"limpieza"
    },
    {
      "id":"1",
      "img":"assets/img/domicilios.jpg",
      "servicio":"Domicilios",
      "valor":"domicilios"
    },
    {
      "id":"2",
      "img":"assets/img/reparacion-hogar.jpg",
      "servicio":"Reparaciones en hogar",
      "valor":"reparahogar"
    },
    {
      "id":"3",
      "img":"assets/img/reparar_electrodomesticos.jpg",
      "servicio":"Reparacion de  electrodomesticos",
      "valor":"reparaelectro"
    },
    {
      "id":"4",
      "img":"assets/img/limpiar_alfombras.jpg",
      "servicio":"Limpieza de alfrombras",
      "valor":"limpiaalfombras"
    },
    {
      "id":"5",
      "img":"assets/img/pasear_perros.jpg",
      "servicio":"Paseador de perros",
      "valor":"perros"
    },
    {
      "id":"6",
      "img":"assets/img/limpiar_piscina.jpg",
      "servicio":"Cuidado de piscina",
      "valor":"piscina"
    },
    {
      "id":"7",
      "img":"assets/img/reparacion_electrica.jpg",
      "servicio":"Reparaciones electricas",
      "valor":"reparaelectricas"
    },
    {
      "id":"8",
      "img":"assets/img/caterin_alimentos.jpg",
      "servicio":"Catering de alimentos",
      "valor":"alimentos"
    },
    {
      "id":"9",
      "img":"assets/img/jardineria.jpg",
      "servicio":"Jardineria",
      "valor":"jardineria"
    },
    {
      "id":"10",
      "img":"assets/img/plomeria.jpg",
      "servicio":"Plomeria",
      "valor":"plomeria"
    },
    {
      "id":"11",
      "img":"assets/img/lavado_ventanas.jpg",
      "servicio":"Reparacion y lavado de ventanas",
      "valor":"lavadocentanas"
    },
    {
      "id":"12",
      "img":"assets/img/desinfeccion.jpg",
      "servicio":"Desinfeccion",
      "valor":"desinfeccion"
    }
  ]

  constructor( private usarHttp:HttpClient ) {

    this.leerToken();
    this.leerCorreo();


    console.log(this.nombreLogueado);

  }

  
/*----CARGAR SERVICIOS EN EL HOME---*/
  getServicios(){
    
    return this.serviciosHogar;
  }


  /*---------cargar Script---------*/
    cargaJS( archivos:string[] ){
        
      for(let archivo of archivos){

        let script = document.createElement('script');
        script.src = "./assets/js/" + archivo + ".js";
        let body = document.getElementsByTagName("body")[0];
        body.appendChild(script);
      }

    }


 
    /*-----CIUDADES DE COLOMBIA-----*/
    cuidad(){
      
      return this.usarHttp.get('https://www.datos.gov.co/resource/xdk5-pm3f.json');
    
    }


    /*-------REGISTRAR UN CLIENTE--------*/
    registrarCliente(datosCliente:any){
      
      var key = "AIzaSyBWXjUXM9EMzDiBB55cspNi5-gWaAzEjlo"
      const datos = {
        
        displayName      : datosCliente.controls['nombre'].value,
        telefono    : datosCliente.controls['telefono'].value,
        email       : datosCliente.controls['correo'].value,
        password    : datosCliente.controls['pass'].value,
        returnSecureToken: true

      }

      return this.usarHttp.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ key }`, datos  )
                          .pipe(
                            map( resp => {
                              
                              const dat = {
                                nombre : datos.displayName,
                                telefono : datos.telefono,
                                resp
                              }
                              return dat;

                            })
                          )

    }



    /*-------REGISTRAR UN COLABORADOR--------*/
    registrarColaborador( datosColaborador:any ){
        
          const colaboradorDatos = {
            
            nombre     : datosColaborador.controls['nombre'].value,
            correo     : datosColaborador.controls['correo'].value,
            ciudad     : datosColaborador.controls['ciudad'].value,
            pass       : datosColaborador.controls['pass'].value,
            tipoServicio :  datosColaborador.controls['Tiposervicio'].value,
            servicio1  : datosColaborador.controls['servicio1'].value,
            tarifa1    : datosColaborador.controls['tarifa1'].value,
            servicio2  : datosColaborador.controls['servicio2'].value,
            tarifa2    : datosColaborador.controls['tarifa2'].value,
            servicio3  : datosColaborador.controls['servicio3'].value,
            tarifa3    : datosColaborador.controls['tarifa3'].value,
            servicio4  : datosColaborador.controls['servicio4'].value,
            tarifa4    : datosColaborador.controls['tarifa4'].value,

          }

          return this.usarHttp.post(`https://registrocolaboradores-default-rtdb.firebaseio.com/colaboradores.json`, colaboradorDatos)
          .pipe(
            map( (resp:any) => {
              
              const datos = {

                nombre     : datosColaborador.controls['nombre'].value,
                correo     : datosColaborador.controls['correo'].value,
                ciudad     : datosColaborador.controls['ciudad'].value,
                pass       : datosColaborador.controls['pass'].value,
                tipoServicio :  datosColaborador.controls['Tiposervicio'].value,
                servicio1  : datosColaborador.controls['servicio1'].value,
                tarifa1    : datosColaborador.controls['tarifa1'].value,
                servicio2  : datosColaborador.controls['servicio2'].value,
                tarifa2    : datosColaborador.controls['tarifa2'].value,
                servicio3  : datosColaborador.controls['servicio3'].value,
                tarifa3    : datosColaborador.controls['tarifa3'].value,
                servicio4  : datosColaborador.controls['servicio4'].value,
                tarifa4    : datosColaborador.controls['tarifa4'].value,
                id         : resp.name,
    
              }
              
              return datos

            })

          )
    }



    /*---BUSCAR COLABORADORES CON UN SELECT---*/
    buscarColaboradores( nombreBusqueda:string ){
      
      return this.usarHttp.get(`https://registrocolaboradores-default-rtdb.firebaseio.com/colaboradores.json`)
                      .pipe(
                        map( resp=>{
                          
                           /*--creamos un arreglo nuevo--*/
                           const GuardarArr:any = []; 
                            
                           
                            Object.values( resp ).forEach( datos => {/*--hacemos un bucle de los datos base de datos--*/
                              //console.log( datos.id)
                              let todosLosDatos = datos;/*---traemos todos los datos---*/
  
                              let TodosNombres = datos.tipoServicio;/*---traemos todos los nombre---*/
                              
  
                              if( TodosNombres.indexOf( nombreBusqueda ) >= 0 ){/*---comprobamos si esta el nombre---*/
            
                                  //console.log(todosLosId)/*---solo trae el id de ese---*/
                                  GuardarArr.push( todosLosDatos )/*---insertarmos solo el id de la cedula---*/
                              }
  
                            })
                            
                            return GuardarArr/*---retornamos----*/
                       
                        })
  
                      )
    
    }


    /*-----LOGIN CLIENTES-----*/
    loginClientes(usuario:any){
        
      const usuarioLog = {

        email:     usuario.controls['correo'].value,
        password:  usuario.controls['pass'].value,
        returnSecureToken: true
      }


      return this.usarHttp.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBWXjUXM9EMzDiBB55cspNi5-gWaAzEjlo', usuarioLog)
      .pipe(
        map( (resp:any) => {
            
          localStorage.setItem('nombre', resp.displayName);
          localStorage.setItem('correo', resp.email);


          this.idToken = resp.idToken;
          
          this.guardarToken();

          return resp;


        })
      )
    
    }
    

    /*----------lOGIN COLABORADOR---------*/
    loginColaborador(usuarioCOl:any){
        
        return this.usarHttp.get('https://registrocolaboradores-default-rtdb.firebaseio.com/colaboradores.json')
                    .pipe(
                      map( resp => {
                        
                         /*--creamos un arreglo nuevo--*/
                         const GuardarArr:any = []; 
                          
                         
                          Object.values( resp ).forEach( datos => {/*--hacemos un bucle de los datos base de datos--*/
                            //console.log( datos.id)
                            let todosLosDatos = datos;/*---traemos todos los datos---*/
            
                            let TodosNombres = datos.correo;/*---traemos todos los nombre---*/
                            
            
                            if( TodosNombres.indexOf( usuarioCOl.controls['correo'].value ) >= 0 ){/*---comprobamos si esta el nombre---*/
            
                                //console.log(todosLosId)/*---solo trae el id de ese---*/
                                GuardarArr.push( todosLosDatos )/*---insertarmos solo el id de la cedula---*/
                            }
            
                          })
                          
                           var correo = usuarioCOl.controls['correo'].value;
                           var clave  = usuarioCOl.controls['pass'].value;
                            
                           if((correo == GuardarArr[0].correo) && (clave == GuardarArr[0].pass)){
                                
                            this.idCorreo = GuardarArr[0].correo;
                            this.guardarCorreo();
                            localStorage.setItem('nombre', GuardarArr[0].nombre);

                            }else{
                                

                            }

                        
                      })
            
                    )
                                               
    }

  
    /*---------AGENDAMIENTO----*/
    agendarServicio(datosAgenda:any){
          
      let datosAgendados = {
          
        direccion: datosAgenda.direccion,
        fecha:     datosAgenda.fecha,
        hora:      datosAgenda.hora,
        servicio1: datosAgenda.servicio1,
        servicio2: datosAgenda.servicio2,
        servicio3: datosAgenda.servicio3,
        servicio4: datosAgenda.servicio4,
        tarifa1a:  datosAgenda.tarifa1a,
        tarifa2:   datosAgenda.tarifa2,
        tarifa3:   datosAgenda.tarifa3,
        tarifa4:   datosAgenda.tarifa4,
        emailColaborador    :   datosAgenda.emailColaborador,
        correoSolictante    :   datosAgenda.correoSolictante,
        nombrePersona       :   datosAgenda.nombrePersona,
        nombreCliente       :   datosAgenda.nombreCliente

      }

      return this.usarHttp.post('https://agendamientos-246b0-default-rtdb.firebaseio.com/agenda.json', datosAgendados)

    }


    /*---------TOKEN-------------*/
    guardarToken(){

      localStorage.setItem('Token', this.idToken);
   
    }


    leerToken(){

      if( localStorage.getItem('Token') ){

        this.idToken = localStorage.getItem('Token');
      
      }else{
          
        this.idToken = ""
      
      }
      
    }

    validarToken(){
    
        return  this.idToken.length > 2
       
     }
   /*---------TOKEN-------------*/








   /*---validar correo-----*/
  guardarCorreo(){

    localStorage.setItem('correo', this.idCorreo);
 
  }

  
  leerCorreo(){

    if( localStorage.getItem('correo') ){

      this.idCorreo = localStorage.getItem('correo');
    
    }else{
        
      this.idCorreo = ""
    
    }
    
  }


  validarCorreo(){

    return this.idCorreo.length > 2
   
   }
/*---validar correo-----*/



  destruirTokenYnombre(){
   
     localStorage.removeItem('Token');
     localStorage.removeItem('nombre');
     localStorage.removeItem('correo');

 

  }



  /*-----------CONSULTAR AGENDADOS----*/
  consultarAgendados(DatCorreo:any){
        
      return this.usarHttp.get('https://agendamientos-246b0-default-rtdb.firebaseio.com/agenda.json')
              .pipe(
                map( (resp:any) =>{
                  
                   /*--creamos un arreglo nuevo--*/
                   const GuardarArr:any = []; 
                    
                    Object.keys( resp ).forEach( llaves => {
                        
                      let userKey = resp[llaves];
                      userKey.id = llaves

                    })
                    
                   
                    Object.values( resp ).forEach( (datos:any) => {/*--hacemos un bucle de los datos base de datos--*/
                      //console.log( datos.id)
                      let todosLosDatos = datos;/*---traemos todos los datos---*/
        
                      let TodosNombres = datos.emailColaborador;/*---traemos todos los nombre---*/
                        
        
                      if( TodosNombres.indexOf( DatCorreo ) >= 0 ){/*---comprobamos si esta el nombre---*/
        
                          //console.log(todosLosId)/*---solo trae el id de ese---*/
                          GuardarArr.push( todosLosDatos )/*---insertarmos solo el id de la cedula---*/
                      }
        
                    })
                    
                    return GuardarArr/*---retornamos----*/
               
                })

      )
                          
  }


   /*------REGISTRAR NOTIFICACIOBNES-------*/
  registrarNotificaciones( noticia:any ){
        
      let dataNotificaciones = {
        
        nombreCliente: noticia.nombreCliente,
        correoCliente: noticia.correoCliente,
        nombreQuienMandaNotificacion: noticia.nombreQuienMandaNotificacion,
        emailQuienMandaNotificacion: noticia.emailQuienMandaNotificacion,
        estado: noticia.estado,
        mensaje: noticia.mensaje,
        sugerencia: noticia.sugerencia
      }

      return this.usarHttp.post('https://notificaciones-d9fbd-default-rtdb.firebaseio.com/notificaciones.json',   dataNotificaciones  )

  }


  /*--------------CARGAR NOTIFICACIONES-------------*/
  cargarNotificaciones(emailCliente:any){
        
      return this.usarHttp.get("https://notificaciones-d9fbd-default-rtdb.firebaseio.com/notificaciones.json")
              .pipe(
                map( resp=>{
                  
                   /*--creamos un arreglo nuevo--*/
                   const GuardarArr:any = []; 
                    
                   
                    Object.values( resp ).forEach( datos => {/*--hacemos un bucle de los datos base de datos--*/
                      //console.log( datos.id)
                      let todosLosDatos = datos;/*---traemos todos los datos---*/
        
                      let TodosNombres = datos.correoCliente;/*---traemos todos los nombre---*/
                      
        
                      if( TodosNombres.indexOf( emailCliente) >= 0 ){/*---comprobamos si esta el nombre---*/
        
                          //console.log(todosLosId)/*---solo trae el id de ese---*/
                          GuardarArr.push( todosLosDatos )/*---insertarmos solo el id de la cedula---*/
                      }
        
                    })
                    
                    return GuardarArr/*---retornamos----*/
               
                })
        
              )

  }



  /*-------REGISTRAR TRABAJOS TERMINADOS-----------*/
  registrarTrabajosTerminados( terminado:any ){
        
      let Terminados = {
        
        nombreCliente: terminado.nombreCliente,
        correoCliente: terminado.correoCliente,
        nombreQuienMandaNotificacion: terminado.nombreQuienMandaNotificacion,
        emailQuienMandaNotificacion: terminado.emailQuienMandaNotificacion,
        estado: terminado.estado,
        mensaje: terminado.mensaje
      }

      return this.usarHttp.post('https://notificaciones-d9fbd-default-rtdb.firebaseio.com/terminados.json',  Terminados  )

  }


  /*--------------CARGAR TERMIMADOS-------------*/
  cargarTerminados(emailCliente:any){
        
        return this.usarHttp.get("https://notificaciones-d9fbd-default-rtdb.firebaseio.com/terminados.json")
                .pipe(
                  map( (resp:any) =>{
                    
                     /*--creamos un arreglo nuevo--*/
                     let GuardarArr:any = []; 
                    
                    
                     /*-----insertar id---------*/
                     Object.keys( resp ).forEach( llave => {
                      
                      let usuario =  resp[llave]/*---- ingresa a la llave y me trae todos los usuarios ---*/
                      usuario.id  = llave;/*--- creamos en esos usuarios un id y le colocamos la llave ----*/

                     /*--- console.log(usuario);---aca esta todos los usuario con su id ----*/
                
                    })


                       /*-----------filtrar por correo----------*/
                      Object.values( resp ).forEach( (datos:any) => {/*--hacemos un bucle de los datos base de datos--*/
                        //console.log( datos.id)

                      
                        let todosLosDatos = datos;/*---traemos todos los datos---*/
                        let TodosNombres = datos.correoCliente;/*---traemos todos los nombre---*/
                        
                       
                        if( TodosNombres.indexOf( emailCliente) >= 0 ){/*---comprobamos si esta el nombre---*/
          
                            //console.log(todosLosId)/*---solo trae el id de ese---*/
                            GuardarArr.push( todosLosDatos )/*---insertarmos solo el id de la cedula---*/
                        }


                      
          
                      })
                      
                      
                      return GuardarArr/*---retornamos----*/
                 
                  })
          
                )
  
  }


  /*-----------BORRAR TERMINADOS-----------*/
  borrarTerminados( llaveID:any ){
      
      return this.usarHttp.delete(`https://notificaciones-d9fbd-default-rtdb.firebaseio.com/terminados/${ llaveID }.json`)

  }


  /*--------BORRAR REGISTROS RECHAZADOS----------*/
  borrarRechazados( Id:any ){

   console.log(Id)

    return this.usarHttp.delete(`https://agendamientos-246b0-default-rtdb.firebaseio.com/agenda/${ Id }.json`);

  }


  /*---------BORRAR PAGADOS EN AMBIENTE COLABORADOR---------*/
  borrarEnColaborador(id:any){
    
    return this.usarHttp.delete(`https://notificaciones-d9fbd-default-rtdb.firebaseio.com/pagos/${ id }.json`);

  }





  
    /*-------REGISTRAR TRABAJOS TERMINADOS-----------*/
    registrarPago( pago:any ){
        
      const DetallePago = {

        nombrePagador      : pago.nombrePagador,
        correoPagador      : pago.correoPagador,
        emailAlQueLePagan  : pago.emailAlQueLePagan ,
        estado             : pago.estado

      }

      console.log(DetallePago);

      return this.usarHttp.post('https://notificaciones-d9fbd-default-rtdb.firebaseio.com/pagos.json',  DetallePago  )

    }

  
    /*--------------CARGAR PAGOS-------------*/
    cargarPagos(emailPagado:any){
        
      return this.usarHttp.get("https://notificaciones-d9fbd-default-rtdb.firebaseio.com/pagos.json")
              .pipe(
                map( (resp:any )=>{
                  
                
                   /*--creamos un arreglo nuevo--*/
                   const GuardarArr:any = []; 


                  /*----traemos la llave-----*/
                  Object.keys( resp ).forEach( llaves2 => {
                        
                      let id = resp[llaves2];
                      id.id = llaves2;
                  })


                    
                   /*-----filtramos datos-----*/
                    Object.values( resp ).forEach( (datos:any) => {/*--hacemos un bucle de los datos base de datos--*/
                      //console.log( datos.id)
                      let todosLosDatos = datos;/*---traemos todos los datos---*/
        
                      let TodosNombres = datos.emailAlQueLePagan;/*---traemos todos los nombre---*/
                      
        
                      if( TodosNombres.indexOf( emailPagado ) >= 0 ){/*---comprobamos si esta el nombre---*/
        
                          //console.log(todosLosId)/*---solo trae el id de ese---*/
                          GuardarArr.push( todosLosDatos )/*---insertarmos solo el id de la cedula---*/
                      }
        
                    })
                    
                    return GuardarArr/*---retornamos----*/
               
                })
        
              )

    }







    /*---------REGISTRAR CALIFICACION COLABORADOR----------*/
    RegistrarCalificacionColaborador( DatosAcalificar:any){
        
      let DatosCalificar = {
        
       nombreCalificado : DatosAcalificar.nombreCalif, 
       emailCalificado  : DatosAcalificar.emailCalif, 
       correoQuienCalifica : DatosAcalificar.correoQuienCal,
       nombreQuienCalifica : DatosAcalificar.nombreQuienCalif,
       calificacion : DatosAcalificar.calificacion,
       mensaje: DatosAcalificar.mensaje

      }

      console.log( DatosCalificar );
      return this.usarHttp.post('https://notificaciones-d9fbd-default-rtdb.firebaseio.com/calificacion.json',  DatosCalificar  )

    }



    /*-----------------------CARGAR CALIFICACIONES---------------------*/
    cargarCalificaciones(correo:any){

      return this.usarHttp.get('https://notificaciones-d9fbd-default-rtdb.firebaseio.com/calificacion.json')
            .pipe(
              map( resp=>{
                
                 /*--creamos un arreglo nuevo--*/
                 const GuardarArr:any = []; 
                  
                 
                  Object.values( resp ).forEach( datos => {/*--hacemos un bucle de los datos base de datos--*/
                    //console.log( datos.id)
                    let todosLosDatos = datos;/*---traemos todos los datos---*/
      
                    let TodosNombres = datos.emailCalificado;/*---traemos todos los nombre --- ultimo push trabajo*/
                    
      
                    if( TodosNombres.indexOf( correo ) >= 0 ){/*--------push casa---------comprobamos si esta el nombre---*/
      
                        //console.log(todosLosId)/*---solo trae el id de ese---*/
                        GuardarArr.push( todosLosDatos )/*---insertarmos solo el id de la cedula---*/
                    }
      
                  })
                  
                  return GuardarArr/*---retornamos----*/
             
              })
      
            )

    }
    

}


/*-----------push FINAl 3-------------*/