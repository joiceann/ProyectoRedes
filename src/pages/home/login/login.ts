import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5';
import { Storage } from '@ionic/storage';
import {MenuClientePage } from './../menu-cliente/menu-cliente';
import {MenuRestPage} from './../menu-rest/menu-rest'
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public form: FormGroup;
  public usuario: string = "";
  public clave: string = "";
  public restaurante: boolean= false;
  public datos: any;
  public errormsg: string = "";
  public respuesta: any;
  public estado: any;
  public usuariosGuardados: any;
  public adminsGuardados: any;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public storage: Storage
    ) {
      this.preparar_usuarios();
      this.prepara_forma();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  prepara_forma() {
    this.errormsg = "";
    this.form = new FormGroup({
      usuario: new FormControl('',Validators.required),
      clave: new FormControl('', Validators.required),
      restaurante: new FormControl('', Validators.required)
    });
  }

  preparar_usuarios(){
    let us1={
      "id": "joicem",
      "usuario": "joicem",
      "clave": Md5.hashStr('12345')
    }
    let usuarios= [us1]
    localStorage.setItem('usuarios', JSON.stringify(usuarios))

    let admin={
      "id": "admin",
      "usuario": "admin",
      "clave": Md5.hashStr('12345')
    }
    let admins=[admin]
    localStorage.setItem('administradores', JSON.stringify(admins))
    console.log('guardado')
  }


  onSubmit() {
      

      let controles = this.form.controls;
      let type = controles.restaurante.value;
      let clavemd5 = Md5.hashStr(controles.clave.value);

      let ident ={
        "id": controles.usuario.value,
        "usuario": controles.usuario.value,
        "clave": clavemd5
      };

      if (type==true){
        this.adminsGuardados = JSON.parse(localStorage.getItem('administradores'))
        if (this.adminsGuardados != null){
          for (let admin in this.adminsGuardados){
            if (this.adminsGuardados[admin].usuario==ident.usuario &&  this.adminsGuardados[admin].clave == ident.clave){
                console.log('USUARIO ENCONTRADO')
                this.navCtrl.setRoot(MenuRestPage);
            }
          }

          console.log('NO SE ENCONTRO USUARIO')
        }

      }
      else{
        console.log('Es un usuario')
          this.usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'))
          console.log(this.usuariosGuardados)
          if (this.usuariosGuardados != null ){
            for (let user in this.usuariosGuardados){
              console.log(user)
              if (this.usuariosGuardados[user].usuario==ident.usuario &&  this.usuariosGuardados[user].clave == ident.clave){
                  console.log('USUARIO ENCONTRADO')
                  this.navCtrl.setRoot(MenuClientePage);
              }
            }
            console.log('NO SE ENCONTRO USUARIO')
          }
      }
      
      console.log(controles.usuario.value)
      console.log(controles.clave.value)
      console.log(controles.restaurante.value)
      

     

      this.storage.set("users", JSON.stringify(ident))
      






  }

}
