import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {CustomerProvider} from "../../../../providers/customer/customer";
import {ToastComponent} from "../../../../components/toast/toast";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SearchPage} from "./search/search";
import {SearchhousePage} from "../../../housing/housedetail/searchhouse/searchhouse";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
@IonicPage()
@Component({
  selector: 'page-passengerlook',
  templateUrl: 'passengerlook.html',
})
export class PassengerlookPage {
  customerid:any;
  clientID:any;
  clientName:any;
  clientPhone:any;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams,public nativePageTransitions: NativePageTransitions,
              private fb:FormBuilder,public customerProvider:CustomerProvider,
              public toast:ToastComponent,  public events: Events) {
    this.clientID=navParams.get('item').customerSn;
    this.clientName=navParams.get('item').customerName;
    this.clientPhone=navParams.get('item').customerPhone;
    this.customerid=navParams.get('item').customerId;
    console.log(this.customerid)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PassengerlookPage');
    this.navBar.backButtonClick = this.backButtonClick;
  }
  form:FormGroup =this.fb.group({
    propertyId:[''],
    appointmentTm:['',Validators.required],
  });

  fy(){
    this.events.subscribe('bevents', (params) => {
      console.log('接收数据为: ', params);
      this.events.unsubscribe('bevents');
    });
    this.navCtrl.push(SearchhousePage);
  }

  looks(){
    this.customerProvider.prlook({
      propertyId:this.form.value.propertyId,
      appointmentTm:new Date(this.form.value.appointmentTm).getTime(),
      customer:{customerId:this.customerid}
    }).then(res => {
      console.log(res);
      if(res.success){
        this.toast.msg('约看成功!');
        this.navCtrl.pop()
      }else{
        this.toast.error('约看失败！');
      }
    });
    console.log(this.form.value)
  }

  //------返回处理--------//
  backButtonClick = (e: UIEvent) => {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
      slowdownfactor: 3,
      iosdelay: 50
    };

    this.nativePageTransitions.slide(options)
      .then()
      .catch();
    this.navCtrl.pop({animate:false});
  }
}
