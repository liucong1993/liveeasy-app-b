import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { RedacthousePage } from '../redacthouse/redacthouse';
import {SearchhousePage} from "../searchhouse/searchhouse";
import {RecordPage} from "../record/record";
import { LookhousePage } from './../lookhouse/lookhouse';
import { LetteratorneyPage } from '../letteratorney/letteratorney';
import { RolepeoplePage } from '../rolepeople/rolepeople';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ErrorMessage} from "../../components/valid-error/valid-error";
import {PropertyModel} from "../../model/property/property.model";
import {LocalStorageProvider} from  '../../providers/local-storage/local-storage'
import {PropertyProvider} from "../../providers/property/property";
import {HousingPage} from "../housing/housing";
import {FollowPage} from "../follow/follow";
import {KeyPage} from "../key/key";
import {DescPage} from "../desc/desc";
import { Events } from 'ionic-angular';
/**
 * Generated class for the HousedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-housedetail',
  templateUrl: 'housedetail.html',
})
export class HousedetailPage {
  sensitiveInfo =false;
  showInfos=true;
  follow=false;
  data:PropertyModel;
  //更多
  showIntention=false;
  right=true;
  down=false;
  //编辑房源
  propertyid:any;
  buildingNo:any; //栋号
  unitNo:any; //单元
  floorNo:any; //楼层
  houseNo:any; //房间号
  spaceSize:any; //建筑面积
  innerSpaceSize:any; //套内面积
  propertyPrice:any; //价格
  orientation:any; //朝向
  decoration:any; //装修
//房源标签
  houLabel:any;
  estateList:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
              private fb:FormBuilder,public localStorageProvider:LocalStorageProvider,public propertyProvider: PropertyProvider,
              public events: Events) {
    this.data = navParams.get('item');
    this.estateList = navParams.get('estateList');
    // '联系人',this.data.contacts,JSON.parse(this.data.contacts)
    console.log('获取详情', this.data );
    var jsonData = JSON.parse(this.data.contacts);
    if( this.data){
      this.form.patchValue({
        buildingNo: this.data.buildingNo,
        estateName:this.data.estateName,
        unitNo: this.data.unitNo,
        floorNo: this.data.floorNo,
        houseNo: this.data.houseNo,
        spaceSize: this.data.spaceSize,
        innerSpaceSize: this.data.innerSpaceSize,
        propertyPrice: this.data.propertyPrice,
        bedrooms: this.data.bedrooms,
        halls: this.data.halls,
        bathrooms: this.data.bathrooms,
        kitchens: this.data.kitchens,
        balconies: this.data.balconies,
        orientation: this.data.orientation,
        decoration: this.data.decoration,
        contact:jsonData[0].contact,
        sex:jsonData[0].sex,
        contactInfo:jsonData[0].contactInfo,
        contactInfo2:jsonData.length>1?jsonData[1].contactInfo:'',
        //更多
        buildingType:this.data.buildingType,
        hasElevator:this.data.hasElevator,
        elevators:this.data.elevators,
        apartments:this.data.apartments,
        propertyDesc:this.data.propertyDesc,//描述
      });
    }

    //判断存在tagsStr
    if(this.data.tagsStr){
      var tagsStr =  this.data.tagsStr.toString();
      var tagsArry = tagsStr.split(',');
       var arry = [];
        for(var i in tagsArry){
           arry[i] = tagsArry[i].toString().replace(/\s/g, "")
        }

      this.form.patchValue({
        tagsStr:arry
      })
    }
    // console.log('参数',this.data, this.data.tagsStr,tagsArry,'表单标签',arry,'固定',['8','16','32']);
    // console.log(this.data.propertyId);
    this.propertyid=this.data.propertyId;
    this.localStorageProvider.set('propertyid',this.data.propertyId);
    //获取房源标签
    this.houLabel=this.localStorageProvider.get('labels');

  }


  //房源标签处理
  tagsSum(data){
    var str =  data.toString();
    var result = str.split(",");
    var sum = 0;
    for(var i in result){
      sum+=parseInt(result[i])
    }
    return sum ;
  };

  tagsSelect(value){
    this.form.value.tags= this.tagsSum(value);
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad HousedetailPage');
  }

  form:FormGroup =this.fb.group({
    adminDivisionCode:[''],//楼盘相对应区域
    estate:['',Validators.required],//楼盘
    estateName:[''],
    estateId:[''],
    buildingNo:['',Validators.required], //楼栋号
    unitNo:['',Validators.required],//单元号
    floorNo:['',[Validators.required,Validators.maxLength(5)]],//楼层
    houseNo:['',Validators.required],//房间号
    spaceSize:['',Validators.required],//建筑面积
    innerSpaceSize:['',Validators.required],//套内面积
    propertyPrice:['',Validators.required],//价格
    bedrooms:['1'],//室
    halls:['1'],
    bathrooms:['1'],
    kitchens:['1'],
    balconies:['1'],//阳
    orientation:[null,Validators.required],//房屋朝向
    decoration:[null],//装修水平
    contacts:this.fb.array([
      this.fb.group({
        contact:[''],
        contactType:['mobile'],
        contactInfo:[''],
        sex:[''],
        desc:[''],
      })
    ]),//业主信息
    contact:['',Validators.required],
    contactInfo:['',[Validators.required, Validators.pattern(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/)]],
    contactInfo2:['',Validators.pattern(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/)],
    sex:['male',Validators.required],
    tags:['0'],//房源标签
    tagsStr:[],//列表
    infoOwnerId:[1],//加盟商id 根据登录人判断他的加盟商id
    buildingType:['0'],//建筑类型
    buzzOwnerType:['0'],//交易权属
    buzzType:['0'],
    hasElevator:['0'],//配备电梯
    positionInBuilding:['2'],
    propertyLife:['1'], //房屋年限
    propertyMortgage:['0'],
    propertyPriceUnit:['1'],
    propertyType:['1'],
    propertyDesc:[''],//房源描述
    //楼号比例
    elevators:[''],//梯
    apartments:[''],//户
  });
  //表单验证消息
  errors={
    buildingNo:[
      new ErrorMessage('required','楼栋号必须要填写！'),
      new ErrorMessage('maxLength','这个长度太长了'),
    ],
    unitNo:[
      new ErrorMessage('required','单元号必须要填写！'),
    ],
    floorNo:[
      new ErrorMessage('required','楼层必须要填写！'),
      new ErrorMessage('maxLength','楼层名称太长了'),
    ],
    contact:[
      new ErrorMessage('required','业主姓名必须要填写！'),
    ],
    sex:[
      new ErrorMessage('required','业主性别必须要填写！'),
    ],
    contactInfo:[
      new ErrorMessage('required','业主电话必须要填写！'),
      new ErrorMessage('pattern', '手机号码格式不正确！'),
    ],
    contactInfo2:[
      new ErrorMessage('pattern', '手机号码格式不正确！'),
    ],
  };



    presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '更多',
      buttons: [
        {
          text: '内容',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: '内容',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: '关闭',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  record(){
    this.navCtrl.push(RecordPage,{
      propertyid:this.propertyid,
    });
  }
  goRedact(){
    this.navCtrl.push(RedacthousePage);
  }
  showInfo(){
    this.sensitiveInfo =true;
    this.showInfos=false;
    this.follow=true;
  }

  //楼盘搜索页面
  goserach(){
    this.events.subscribe('bevents', (params) => {
      // 接收B页面发布的数据
      console.log('接收数据为: ', params);
      // this.form.value.estateName = params.estateName;
      // this.form.value.estateId =  params.estateId;
      this.estateChange(params);
      // 取消订阅
      this.events.unsubscribe('bevents');
    });
    this.navCtrl.push(SearchhousePage);
  };
  estateChange(Value){
    this.form.controls['adminDivisionCode'].setValue(Value.adminDivisionCode);
    this.form.controls['estateName'].setValue(Value.estateName);
    this.form.controls['estateId'].setValue(Value.estateId);
    console.log('表单',this.form.value);
  }




  letterOfAttorney(){
    this.navCtrl.push(LetteratorneyPage,{
      propertyid:this.propertyid,
    })
  }

  /**
   * 房源实勘
   */

  lookHouse(){
    this.navCtrl.push(LookhousePage,{item:this.navParams.get('item')});
  }

  rolepeople(){
    this.navCtrl.push(RolepeoplePage,{
      propertyid:this.propertyid,
    })
  }


  //表单提交
  save(){
    // tagsSum
    this.form.patchValue({
      tags:this.tagsSum(this.form.value.tagsStr)
    });
    delete this.form.value.tagsStr;
    // 联系人
    this.form.value.contacts[0].contact = this.form.value.contact;
    this.form.value.contacts[0].contactInfo = this.form.value.contactInfo;
    this.form.value.contacts[0].sex = this.form.value.sex;

    var man2 ={
      contact:this.form.value.contact,
      contactInfo:this.form.value.contactInfo2,
      sex:this.form.value.sex,
      contactType:'mobile',
      desc:'',
    };

    this.form.value.contacts.push(man2);
    console.log('第二个人',man2,'联系人',this.form.value.contacts);
    this.form.value.contacts = JSON.stringify(this.form.value.contacts);

    var formData = {
      propertyId:this.propertyid,
      ...this.form.value
    };
    this.propertyProvider.updates(formData).then(res=>{
       alert('修改成功');
       this.navCtrl.push(HousingPage);
    })
  }
  //根据楼盘名返回楼盘地址
  searchStandardAddress(name){
    for(var i in  this.estateList){
      if(name == this.estateList[i].estateName){
        return this.estateList[i].standardAddress
      }
    }
  }
  //跟进
  goFollow(){
    this.navCtrl.push(FollowPage,{
      propertyid: this.data.propertyId,
      estatename: this.data.estateName,
      convid: this.data.convId,
      standardAddress:this.searchStandardAddress(this.data.estateName)
    })
  }

  //钥匙
  goKey(){
    this.navCtrl.push(KeyPage,{
      propertyid:this.propertyid,
    })
  }

  //更多
  clickIntention(){
    if(this.showIntention==false ){
      this.showIntention=true;
      this.right=false;
      this.down=true;
    }else{
      this.showIntention=false;
      this.right=true;
      this.down=false;
    }
  }
  //房源描述
  godesc(){
    // this.navCtrl.push(DescPage)
    this.events.subscribe('content', (params) => {
      // 接收B页面发布的数据
      console.log('接收数据为: ', params);
      this.form.patchValue({propertyDesc:params});
      console.log('表单的描述',this.form.value.propertyDesc);
      // 取消订阅
      this.events.unsubscribe('content');
    });
    this.navCtrl.push(DescPage,{content:this.form.value.propertyDesc});
  }
}
