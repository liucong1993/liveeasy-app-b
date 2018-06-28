import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {DeclinfoPage} from "./declinfo/declinfo";
import {HomeProvider} from "../../../../providers/home/home";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
/**
 * Generated class for the DeclardetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-declardetail',
  templateUrl: 'declardetail.html',
})
export class DeclardetailPage {
  orderid:any;
  users:any;
  orderDetail:any;
  allOrder:any;
  feelist:any;
  orderStatus:any;
  JSON:any;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,
              public nativePageTransitions: NativePageTransitions,
              public navParams: NavParams,private homeProvider:HomeProvider,) {
    this.orderid=navParams.get('item').orderId;
    this.orderStatus=navParams.get('item').orderStatus;
    this.JSON=navParams.get('json')
    console.log(this.orderid);
    this.homeProvider.decldetail(this.orderid).then(res=>{
      this.allOrder=res.data;
      this.orderDetail=res.data.order;
      this.feelist=res.data.feeList;
      this.users=res.data.user;
      console.log(this.allOrder);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeclardetailPage');
    this.navBar.backButtonClick = this.backButtonClick;
  }
  numJOSN=[
    {name:'报单客户',val:0},
    {name:'报单房源',val:1},
    {name:'业主信息',val:2},
    {name:'合同信息',val:3},
    {name:'收款信息',val:4},
    {name:'业绩类型',val:5},
  ];
goInfo(val){
    this.navCtrl.push(DeclinfoPage,{
      val:val,
      order:this.allOrder,
    })
}

  paypipe(val){
    for(var i in this.numJOSN){
      if(val == this.numJOSN[i].val){
        return this.numJOSN[i].name;
      }
    }
  }
  stapipe(val){
    for(var i in this.JSON){
      if(val == this.JSON[i].val){
        return this.JSON[i].name;
      }
    }
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
