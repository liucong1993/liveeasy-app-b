import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PropertyModel} from "../../../../model/property/property.model";
import {LocalStorageProvider} from '../../../../providers/local-storage/local-storage';
import {PropertyProvider} from "../../../../providers/property/property";
/**
 * Generated class for the AuditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-audit',
  templateUrl: 'audit.html',
})
export class AuditPage {
  data:PropertyModel;
  distrs:Array<any>;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,public localStorageProvider:LocalStorageProvider,
              public propertyProvider: PropertyProvider) {
    this.data = this.navParams.get('houseInfo');
    this.distrs = this.localStorageProvider.get('distrs');
    // console.log('获取到的data',this.data);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AuditPage');
  }

  distrsPipe(data){
    for(var i in this.distrs){
        if(data == this.distrs[i].code){
          return this.distrs[i].name
        }
    }
  }

  pass(){
   // this.propertyProvider.priceAuditConfirm().then(res=>{
   //
   //  })
  }

  noPass(){

  }

}
