import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuRestPage } from './menu-rest';

@NgModule({
  declarations: [
    MenuRestPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuRestPage),
  ],
})
export class MenuRestPageModule {}
