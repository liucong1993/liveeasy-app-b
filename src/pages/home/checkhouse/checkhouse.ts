import { Component ,ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Navbar, ModalController, Platform} from 'ionic-angular';

import {CustomerProvider} from "../../../providers/customer/customer";
import {PropertyProvider} from "../../../providers/property/property";
import {ToastComponent} from "../../../components/toast/toast";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
import {HomeProvider} from "../../../providers/home/home";
import {HousinfoPage} from "../../housing/housinfo/housinfo";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {LocalStorageProvider} from "../../../providers/local-storage/local-storage";
import {ArryCodeValuePipe} from "../../../pipes/arry-code-value/arry-code-value";
import {DeclardetailPage} from "../declaration/declardetail/declardetail";
import {NativeProvider} from "../../../providers/native/native";
import {jpushUnit} from "../../../providers/native/jpush-unit";
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
  totalPages: number;//总页数
  hasData = true;
  /**
   * 列表搜索条件
   */
  values: any;
  val: any;
  code: any;
  res: any;
  @ViewChild('navbar') navBar: Navbar;
  localCode:any;
  msgJson:any;
  pageResult:any;
  constructor(public navCtrl: NavController,
              public statusBar: StatusBar, public homeProvider: HomeProvider,
              public modalCtrl: ModalController,public platform: Platform,
              public nativePageTransitions: NativePageTransitions, public navParams: NavParams,
              private customerProvider: CustomerProvider,
              public propertyProvider: PropertyProvider, public toast: ToastComponent,
              public localStorageProvider: LocalStorageProvider,public  nativeProvider:NativeProvider,
              private jpushUnit:jpushUnit,) {
    this.localCode = this.localStorageProvider.get('codeData');
    this.msgJson = new ArryCodeValuePipe().transform(this.localCode,'operate_code');
  }

  ionViewDidLoad() {
    this.search();
    this.navBar.backButtonClick = this.nativeProvider.back(this.navCtrl);
    this.jpushUnit.clearAllNotification();
  }

  ionViewDidEnter() {
  }

  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }

  /**
   *  消息公告-类型转换
   * @param data
   * @returns {any}
   */
  msgPipe(data){
      if(data){
        for(var item of this.msgJson){
          if(data==item.val){
            return item.name;
          }
        }
      }
  }


  navbar = true;

  ionViewWillUnload() {
    this.navbar = false;
  }

  check = [];
  adjust = [];
  close = [];

  search() {
    this.homeProvider.msgs(1).then(res =>{
      this.res=res;
      this.pageData = res.data.result;
      console.log(res);
    });
  }

  //条数
  currentPage: number = 1;
  all = false;

  //上拉加载
  doInfinite(infiniteScroll) {
    // setTimeout(() => {
      infiniteScroll.complete();
      this.currentPage++;
      if (this.pageResult&&this.pageResult.length<10) {
        //如果都加载完成的情况，就直接 disable ，移除下拉加载
        // infiniteScroll.enable(false);
        //toast提示
        this.all = true;
      } else {
        this.all = false;
        this.homeProvider.msgs(this.currentPage).then(res=>{
          this.pageResult =res.data&&res.data.result;
          if(res.data&&res.data.result){
            for (let i = 0; i < res.data.result.length; i++) {
              this.pageData.push(res.data.result[i]);
            }
          }else {
            this.all = true;
          }
        });

      }

      console.log('Async operation has ended');
      infiniteScroll.complete(function () {
        console.log('数据请求完成');
      });
    // }, 1000);

  }

  searchFloorNum = 0; //初始化搜索次数
  totalRecords: any;//查询到的总条数；
  firstPageData = [];
  //下拉刷新
  num: any;
  timer: any;
  not = false;
  haveData = false;
  newCount: any;

  doRefresh(refresher) {
    console.log('上拉刷新Begin async operation', refresher);
    this.homeProvider.msgs(1,{operationCode:parseInt(this.code)}).then(res=>{
    console.log('结束时间内容', this.res.data.totalRecords);

    this.totalRecords = this.res.data.totalRecords;
    this.pageData = this.res.data.result;
    this.totalPages = this.res.data.totalPages;
    let newCount = this.checkUpdateCount(this.res.data.result);
    this.newCount = newCount;
    this.firstPageData = this.res.data.result;
    console.log('Async operation has ended', newCount);
    refresher.complete();
      this.pageResult =res.data&&res.data.result;
      if (res.data.result && res.data.result.length > 0) {
        this.pageData = [];
        for (let i = 0; i < res.data.result.length; i ++) {

          this.pageData.push(res.data.result[i])
        }
        this.currentPage =1;
      }


    if (newCount > 0) {
      console.log(newCount)
      // this.toast.defaultMsg('middle','已更新'+ newCount +'条记录');
      this.num = 3;
      this.haveData = true;
      this.timer = setInterval(() => {
        this.num--;
        if (this.num === 0) {
          this.haveData = false;
          window.clearInterval(this.timer);
        }
      }, 1000);
    } else {
      // this.toast.defaultMsg('middle','暂无更新');
      this.not = true;
      this.num = 3;
      this.timer = setInterval(() => {
        this.num--;
        // console.log(this.num)
        if (this.num === 0) {
          this.not = false;
          window.clearInterval(this.timer);
        }
      }, 1000);
    }
    });
  }

  checkUpdateCount(result) {
    let count = 0;
    result = result || [];
    this.firstPageData = this.firstPageData || [];
    for (let item in result) {
      if (this.val == 1) {
        var rs = this.check.find(check => check.propertyId == result[item].propertyId) || [];
        if (rs.length == 0) {
          count++;
        }
      } else if (this.val == 2) {
        var rb = this.adjust.find(adjust => adjust.propertyId == result[item].propertyId) || [];
        console.log(this.adjust)
        if (rb.length == 0) {
          count++;
        }
      } else if (this.val == 3) {
        var rc = this.close.find(close => close.propertyId == result[item].propertyId) || [];
        if (rc.length == 0) {
          count++;
        }
      }

    }
    return count;
  }


  detail(item){
    this.homeProvider.updateMsg(item.messageId,1).then(res=>{
      if(res.success){
        this.search();
      }
    });
    if(item.operationCode<5000){
      let profileModal = this.modalCtrl.create(HousinfoPage, {propertyId: item.objectId, modals: false});
      profileModal.present();
    }else {
      this.nativeProvider.openWin(this.navCtrl,DeclardetailPage,{
        id:item.objectId,
      });
    }
  }
}
