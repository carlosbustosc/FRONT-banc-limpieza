import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


/*----conectar servicios----*/
import { ServizService } from 'src/app/servicios/serviz.service';

/*--usar ruta--*/
import { Router } from '@angular/router';


@Component({
  selector: 'app-cliente-login',
  templateUrl: './cliente-login.component.html',
  styleUrls: ['./cliente-login.component.scss']
})


export class ClienteLoginComponent implements OnInit {
  
  loginCliente:FormGroup;

  constructor(private usarRuta:Router, private fb:FormBuilder, private conectarServicios:ServizService ){
    
    this.loginCliente = this.fb.group({
  
      correo: [ "", Validators.required ],
      pass:   [ "", Validators.required ]
    
    })

  }


  get validarCorreo(){  
    return this.loginCliente.controls['correo'].invalid && this.loginCliente.controls['correo'].touched
  
  }

  get validarPass(){
    return this.loginCliente.controls['pass'].invalid && this.loginCliente.controls['pass'].touched
  
  }


  ingresarLogin(){

    if(this.loginCliente.invalid){
        
      Object.values( this.loginCliente.controls ).forEach( resp =>{
        
        resp.markAsTouched();

      } )

    }else{
          
      console.log(this.loginCliente);

      this.conectarServicios.loginClientes( this.loginCliente )
          .subscribe( (resp:any) => {
            
            this.loginCliente.reset()
            console.log(resp);

            this.usarRuta.navigate(['escojerColaborador', '0']);

            setTimeout(function(){
              window.location.reload()
            }, 200);

          
          }, (( err:any) => {
            
            if(err.error.error.message == "EMAIL_NOT_FOUND"){

              alert("el correo no existe")
            }
            
          }))
    }

  }

  

  ngOnInit(): void {
    
  }
}
