import {Component, ViewChild, Renderer} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams,Searchbar} from 'ionic-angular';
import {CustomerProvider} from "../../../../providers/customer/customer";
import {ToastComponent} from "../../../../components/toast/toast";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
/**
 * Generated class for the CloseprivateguestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-closeprivateguest',
  templateUrl: 'closeprivateguest.html',
})
export class CloseprivateguestPage {
  customerid:any;
  clientID:any;
  clientName:any;
  clientPhone:any;
  adminDivisionCode:any;
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('searchBar') searchBar:Searchbar;
  @ViewChild('select') select;
  constructor(public navCtrl: NavController, public navParams: NavParams,public nativePageTransitions: NativePageTransitions,
              private fb:FormBuilder,public customerProvider:CustomerProvider,private renderer:Renderer,
              public toast:ToastComponent,
              public statusBar: StatusBar,) {
    this.clientID=navParams.get('item').customerSn;
    this.clientName=navParams.get('item').customerName;
    this.clientPhone=navParams.get('item').customerPhone;
    this.customerid=navParams.get('item').customerId;
    this.adminDivisionCode=navParams.get('item').adminDivisionCode;
    console.log(this.adminDivisionCode);

  }
  selectTitle(data){
    var title = {title:data};
    return title;
  }

  ionViewWillLeave(){
    this.select.close();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CloseprivateguestPage');
    this.navBar.backButtonClick = this.backButtonClick;
  }
  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }
  form:FormGroup =this.fb.group({
    customerStatus:['3',Validators.required],
    content:['',[Validators.required]],
  });
  // errors={
  //   content:[
  //     new ErrorMessage('pattern','不能输入特殊符号'),
  //   ],
  // };

  closes(){
    this.customerProvider.prclose({
      adminDivisionCode:this.adminDivisionCode,
      customerStatus:this.form.value.customerStatus,
      content:this.form.value.content,
      customerId:this.customerid,
      customerPhone:this.clientPhone
    }).then(res => {
      console.log(res);
      if(res.success){
        this.toast.msg('关闭成功!');
        this.navCtrl.pop()
      }else{
        this.toast.error('关闭失败！');
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
