import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddhousePage } from './addhouse';
import {ComponentsModule} from "../../../components/components.module";
import {ToastComponent} from "../../../components/toast/toast";
import {PipesModule} from "../../../pipes/pipes.module";

@NgModule({
  declarations: [
    AddhousePage,
  ],
  imports: [
    IonicPageModule.forChild(AddhousePage),
      ComponentsModule,
      PipesModule,
  ],
  // providers:[ToastComponent]
})
export class AddhousePageModule {}
