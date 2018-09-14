import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, Platform } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import {ToastComponent} from "../../components/toast/toast";
declare var Wechat;
declare var QQSDK;
/*
  房源分享
*/
@Injectable()
export class SharePropertyProvider {

  title:string;//标题
  description:string='这是描述';//描述
  link:string;//分享链接
  image:string;//图片

  constructor(public http: HttpClient,platform: Platform,public loadingCtrl: LoadingController,
              private clipboard: Clipboard,public toast:ToastComponent) {

    if (platform.is('ios')) {
      this.link = "https://itunes.apple.com/cn/app/女装尖货-单件月销1-8万/id1194942857?mt=8";
    }
    else if (platform.is('android')) {
      this.link = "http://a.app.qq.com/o/simple.jsp?pkgname=cn.tongedev.dress";
    } else {
      this.link = "http://dress.tongedev.cn";
    }
  }

  wxShare(scene) {
    var loading = this.loadingCtrl.create({ showBackdrop: false });
    loading.present();
    try {
      Wechat.share({
        message: {
          title: this.title,
          description: this.description,
          thumb: this.image,
          mediaTagName: "TEST-TAG-001",
          messageExt: "",  // 这是第三方带的测试字段
          messageAction: "", // <action>dotalist</action>
          media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: this.link
          }
        },
        scene: scene == 0 ? Wechat.Scene.SESSION : Wechat.Scene.Timeline  // share to Timeline
      }, function () {
        // alert("分享成功！");
      }, function (reason) {
        // alert("Failed: " + reason);
      });
    } catch (error) {
      console.log(error);
    } finally {
      loading.dismiss();
    }
  }
  qqShare(scene) {
    var loading = this.loadingCtrl.create({ showBackdrop: false });
    loading.present();
    try {
      var args: any = {};
      if (scene == 0) {
        args.scene = QQSDK.Scene.QQ;//QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
      }
      else {
        args.scene = QQSDK.Scene.QQZone;
      }
      args.url = this.link;
      args.title = this.title;
      args.description = this.description;
      args.image = this.image;
      QQSDK.shareNews(function () {
        loading.dismiss();
      }, function (failReason) {
        loading.dismiss();
      }, args);
    } catch (error) {
      console.log(error);
    } finally {
      loading.dismiss();
    }
  }

  linkShare(){


    this.clipboard.copy('Hello world1123');
/*    this.clipboard.paste().then(
      (resolve: string) => {
        alert('copy:'+resolve);
      },
      (reject: string) => {
        alert('Error: ' + reject);
      }
    );*/

    this.toast.defaultMsg('middle','已复制到剪贴板');
    //https://beta-erp.zdfc.com/html/shareProperty?convId=420105100748
    // this.toastService.show('已复制到剪贴板');
  }


}
