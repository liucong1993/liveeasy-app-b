import {Component, Renderer, ViewChild} from '@angular/core';
import {Navbar, NavController, Searchbar} from 'ionic-angular';
import { MsgdetailPage } from './msgdetail/msgdetail';
import {HomeProvider} from "../../providers/home/home";
import {AddhousePage} from "../housing/addhouse/addhouse";
import {AddpassengerPage} from "../passenger/mypassenger/addpassenger/addpassenger";
import {DeclarationPage} from "./declaration/declaration";
import {AllsearchPage} from "../allsearch/allsearch";
import {StatusBar} from "@ionic-native/status-bar";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {CheckhousePage} from "./checkhouse/checkhouse";
import {HomesearchPage} from "./homesearch/homesearch";
import {TabsPage}from "./../tabs/tabs";
import {StatisticsPage} from "./statistics/statistics";
import {PropertyProvider} from "../../providers/property/property";
import {ArryCodeValuePipe} from "../../pipes/arry-code-value/arry-code-value";
import { JPush } from 'ionic3-jpush';
import { Device } from '@ionic-native/device';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  associate=false;
  pop=false;
  notificationNews = [];
  @ViewChild('navbar') navBar: Navbar;
  @ViewChild('searchBar') searchBar:Searchbar;
  codeData:any;
  code:any;
  check=[];
  adjust=[];
  close=[];
  addHomeTag = [] ;
  res=[];
  data:any;
  tests=[];
  noticeList = [];

  constructor(public navCtrl: NavController,
              public nativePageTransitions: NativePageTransitions,
              public homeProvider:HomeProvider,public statusBar: StatusBar,  private renderer:Renderer,
              public localStorageProvider: LocalStorageProvider,public propertyProvider:PropertyProvider,
              public jPush: JPush, device: Device
             ) {
    this.localStorageProvider.del('searchMoreData');
    // this.homeProvider.getAllNotice().then(res=>{
    //   console.log('获取所有消息',res.data);
    //   // operationCode
    //   // for(var item of res.data ){
    //   //  var  c= item.operationCode;
    //   //   if(c=='4025'||c=='3030'||c=='3029'||c=='3028'||c=='3027'||c=='3026'||c=='3025'||c=='3011'||c=='3012'||c=='3024'||c=='3031'
    //   //     ||c=='3032'||c=='4026'){
    //   //     this.noticeList[0].name='房源调整';
    //   //     this.noticeList[0].data.push(c);
    //   //   }else if(c=='2001'||c=='2002'||c=='2003'||c=='2004'||c=='2005'){
    //   //     this.noticeList[1].name='管理员通知';
    //   //     this.noticeList[1].data.push(c);
    //   //   }
    //   // }
    //   // console.log('重构后',this.noticeList);
    // });
    //获取待办消息接口-
    this.propertyProvider.getCode().then(res=>{
        if(res.success){
           this.localStorageProvider.set('codeData', res.data.result);
          //添加，修改房源的标签 (不存在学区房)
          var tagsList = new ArryCodeValuePipe().transform(this.localStorageProvider.get('codeData'),'property_tag_desc');
          for(var item of tagsList){
            if( parseFloat(item['val'])<=64&&parseFloat(item['val'])!=8){
              this.addHomeTag.push(item);
            }
          }
          this.localStorageProvider.set('tagsList',this.addHomeTag);

        }
    });

  }









  //状态栏文字颜色修改-黑色
  ionViewWillEnter() {
    this.statusBar.styleDefault();

  }
  ionViewDidLoad(){
    this.homeProvider.getNotification().then(res=>{
      if(res){this.notificationNews = res.data.result;}
    });
  }

  //禁用调出键盘
  ionViewDidEnter(){
    let input = this.searchBar.getElementRef().nativeElement.querySelector('input');
    this.renderer.setElementAttribute(input, 'disabled', 'true');

    // this.navBar.backButtonClick = () => {
    //   this.navCtrl.push(HomesearchPage);
    // };

  }

  addhouse(){
    this.openWin(AddhousePage)
  }
  addpassenger(){
    this.openWin(AddpassengerPage)
  }
  msgDetail(){
    this.notificationNews&&this.openWin(MsgdetailPage);
  }
  checkhouse(i){
    this.openWin(CheckhousePage,{
      item:i,
      val:i.val,
      res:this.res,
    });

  }
  //
  houseJSON=[
    {name:'关闭房源审核',val:'1',icon:'tixing',code:'3033'},
    {name:'房源调整',val:'2',icon:'notice1',code:'3030'},
    {name:'关闭房源',val:'3',icon:'tixing',code:'3005'},
  ];

  gosta(){
    this.openWin(StatisticsPage);
  }
  godeclara(){
    this.openWin(DeclarationPage)
  }
  floorName = '';
  search(){
    this.openWin(HomesearchPage,{floorName:this.floorName})
  }

  gohomeSource(){
    this.navCtrl.parent.select(1);
  }

  goNotice(){
    this.openWin(CheckhousePage,);
  }

//------跳转页面过渡--------//
  openWin(goPage, param = {}) {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    };

    this.nativePageTransitions.slide(options);
    this.navCtrl.push(goPage, param, {animate:false});
  }

}
