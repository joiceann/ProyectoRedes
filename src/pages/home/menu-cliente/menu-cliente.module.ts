import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuClientePage } from './menu-cliente';

@NgModule({
  declarations: [
    MenuClientePage,
  ],
  imports: [
    IonicPageModule.forChild(MenuClientePage),
  ],
})
export class MenuClientePageModule {}
