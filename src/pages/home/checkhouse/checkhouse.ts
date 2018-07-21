import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar } from 'ionic-angular';

import {CustomerProvider} from "../../../providers/customer/customer";
import {PropertyProvider} from "../../../providers/property/property";
import {ToastComponent} from "../../../components/toast/toast";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
import {HomeProvider} from "../../../providers/home/home";
/**
 * Generated class for the MypassengerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkhouse',
  templateUrl: 'checkhouse.html',
})
export class CheckhousePage {
  pageData = [];
  totalPages:number;//总页数
  hasData = true;
  /**
   * 列表搜索条件
   * @type {{}}
   */
  values:any;
  // params:CustomerPageParams = {
  //   operationCode:'0'
  // };
  val:any;
  code:any;
  @ViewChild('navbar') navBar: Navbar;
  constructor(public navCtrl: NavController,
              public statusBar: StatusBar, public homeProvider:HomeProvider,
              public nativePageTransitions: NativePageTransitions,public navParams: NavParams,private customerProvider:CustomerProvider,
              public propertyProvider: PropertyProvider,public toast:ToastComponent,) {
    this.val=navParams.get('val')
    this.code=navParams.get('item').code;
    console.log(this.val,this.code)
  }

  ionViewDidLoad() {
    this.search();
    this.navBar.backButtonClick = this.backButtonClick;
  }
  ionViewDidEnter() {
  }
  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }
  navbar=true;
  ionViewWillUnload(){
    this.navbar =false;
  }

  search(){
    this.pageData = null;
    this.hasData  = true;
    this.homeProvider.msgs(1,{operationCode:parseInt(this.code)}).then(res=>{
      console.log(res.data.result)
      this.pageData = res.data.result;
      this.totalPages = res.data.totalPages;

      if(res.data.hasOwnProperty('result')){
        this.hasData  = true;
      }else{
        this.hasData = false;
      }
    });
  }

  //条数
  currentPage:number =1;
  all = false;
  //上拉加载
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      infiniteScroll.complete();
      this.currentPage++;
      if(this.currentPage >=this.totalPages){
        //如果都加载完成的情况，就直接 disable ，移除下拉加载
        infiniteScroll.enable(false);
        //toast提示
        this.all = true;
      }else {
        this.all = false;
        this.homeProvider.msgs(1,{operationCode:parseInt(this.code)}).then(res=>{
          for(let i=0;i<res.data.result.length;i++){
            this.pageData.push(res.data.result[i]);
          }
        });

      }

      console.log('Async operation has ended');
      infiniteScroll.complete(function () {
        console.log('数据请求完成');
      });
    }, 1000);

  }
  searchFloorNum = 0; //初始化搜索次数
  totalRecords :any;//查询到的总条数；
  firstPageData = [];
  //下拉刷新
  num :any;
  timer:any;
  not=false;
  haveData=false;
  doRefresh(refresher) {
    console.log('上拉刷新Begin async operation', refresher);

    this.homeProvider.msgs(1,{operationCode:parseInt(this.code)}).then(res=>{
      console.log('结束时间内容',res.data.totalRecords);

      this.totalRecords = res.data.totalRecords;
      this.pageData = res.data.result;
      this.totalPages = res.data.totalPages;
      let newCount = this.checkUpdateCount(res.data.result);
      this.firstPageData = res.data.result;

      console.log('Async operation has ended');
      refresher.complete();
      if (newCount > 0 ) {
        console.log(newCount)
        // this.toast.defaultMsg('middle','已更新'+ newCount +'条记录');
        this.num=3;
        this.haveData=true;
        this.timer=setInterval(()=>{
          this.num--;
          if(this.num===0){
            this.haveData=false;
            window.clearInterval(this.timer);
          }
        },1000);
      } else {
        // this.toast.defaultMsg('middle','暂无更新');
        this.not=true;
        this.num=3;
        this.timer=setInterval(()=>{
          this.num--;
          // console.log(this.num)
          if(this.num===0){
            this.not=false;
            window.clearInterval(this.timer);
          }
        },1000);
      }
    });
  }

  checkUpdateCount(result) {
    let count = 0;
    result = result || [];
    this.firstPageData = this.firstPageData || [];
    for (let item in result) {
      var rs = this.firstPageData.find(firstData => firstData.propertyId == result[item].propertyId ) || [];
      if (rs.length == 0) {
        count ++;
      }
    }
    return count;
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
