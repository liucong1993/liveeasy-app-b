import {Component, ViewChild} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  App,
  Navbar,
  Select,
  Content,
  Platform
} from 'ionic-angular';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorMessage} from '../../../components/valid-error/valid-error';
import {AddhouseProvider} from "../../../providers/addhouse/addhouse";
import {SearchhousePage} from "../housedetail/searchhouse/searchhouse";
import {LocalStorageProvider} from '../../../providers/local-storage/local-storage'
import {HousingPage} from "../housing";
import {DescPage} from "../housedetail/desc/desc";
import { Events } from 'ionic-angular';
import {ToastComponent} from "../../../components/toast/toast";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
import { Keyboard } from '@ionic-native/keyboard';
import {NativeProvider} from "../../../providers/native/native";

/**
 * Generated class for the AddhousePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addhouse',
  templateUrl: 'addhouse.html',
})
export class AddhousePage {
  // estateList:[any];
  classFlag = true;
  houLabel:any;
  //更多
  showIntention=false;
  right=true;
  down=false;
  //户型
  showHx=false;
  HxRight=true;
  HxDown=false;
  localCode:any;
  // cxJSON:Array<object>;//朝向
  // decorationJson:Array<object>;//装修
  // buildingTypeJson:Array<object>;//建筑类型
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('selectOne') selectOne: Select;
  @ViewChild('selectTwo') selectTwo: Select;
  @ViewChild('selectThree') selectThree: Select;
  @ViewChild('selectFour') selectFour: Select;
  @ViewChild('selectFive') selectFive: Select;
  @ViewChild('selectSix') selectSix: Select;
  @ViewChild('selectSev') selectSev: Select;
  @ViewChild('selectEng') selectEng: Select;
  @ViewChild('selectNine') selectNine: Select;
  @ViewChild('selectTen') selectTen: Select;
  @ViewChild('selectEle') selectEle: Select;
  @ViewChild('selectTwith') selectTwith: Select;
  @ViewChild('selectThirty') selectThirty: Select;
  @ViewChild('selectFourty') selectFourty: Select;
  @ViewChild('selectSixty') selectSixty: Select;
  @ViewChild('selectFivety') selectFivety: Select;
  constructor(public navCtrl: NavController, public navParams: NavParams,private keyboard: Keyboard,
              public actionSheetCtrl: ActionSheetController,
              private fb:FormBuilder,public nativePageTransitions: NativePageTransitions,
              private addhouseProvider:AddhouseProvider,
              public localStorageProvider:LocalStorageProvider,public events: Events ,public toast:ToastComponent,
              public app: App,public statusBar: StatusBar, public platform: Platform,
              public  nativeProvider:NativeProvider
  ) {
    //房源标签
    this.houLabel = this.localStorageProvider.get('tagsList');
    this.localCode = this.localStorageProvider.get('codeData');
  }

  @ViewChild(Content) content: Content;

  selectTitle(data){
     var title = {title:data};
     return title;
  }
  closeSelect(){
    this.selectOne.close();
    this.selectTwo.close();
    this.selectThree.close();
    this.selectFour.close();
    this.selectFive.close();
    this.selectSix.close();
    this.selectSev.close();
    this.selectEng.close();
    this.selectNine.close();
    this.selectTen.close();
    this.selectEle.close();
    this.selectTwith.close();
    this.selectThirty.close();
    this.selectFourty.close();
    this.selectSixty.close();
    this.selectFivety.close();
  }

  ionViewWillLeave(){
    this.closeSelect();

  }


  form:FormGroup =this.fb.group({
      adminDivisionCode:[''],//楼盘相对应区域
      cityCode:[this.localStorageProvider.get('loginInfo')['user']['office']['area']['code'].substring(0,4)],
      estate:[''],//楼盘
      estateName:['',[Validators.required]],
      estateId:[''],
      buildingNo:['',[Validators.required,Validators.pattern(/^[A-Za-z0-9]+$/)]], //楼栋号
      unitNo:['',[Validators.required,Validators.pattern(/^[A-Za-z0-9]+$/)]],//单元号
      floorNo:['',[Validators.required,Validators.required,Validators.pattern(/^[0-9]+$/)]],//楼层
      houseNo:['',[Validators.required,Validators.required,Validators.pattern(/^[0-9]+$/)]],//房间号
      spaceSize:['',[Validators.required,Validators.maxLength(10),Validators.pattern(/^(\d+|\d+\.\d{1,4})$/)]],//建筑面积
      innerSpaceSize:['',Validators.pattern(/^(\d+|\d+\.\d{1,4})$/)],//套内面积
      propertyPrice:['',[Validators.required,Validators.required,Validators.pattern(/^[1-9]\d*$/)]],//价格
      bedrooms:['1'],//室
      halls:['1'],
      bathrooms:['1'],
      kitchens:['1'],
      balconies:['1'],//阳
      orientation:['1',Validators.required],//房屋朝向
      decoration:['1'],//装修水平
      contacts:this.fb.array([
        this.fb.group({
          contact:[''],
          contactType:['mobile'],
          contactInfo:[''],
          sex:[''],
          desc:[''],
        })
      ]),//业主信息
     contact:['',[Validators.required,Validators.pattern(/^[\u4e00-\u9fa5a-zA-Z]*$/)]],
     contactInfo:['',[Validators.required, Validators.pattern(/^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/)]],
     contactInfo2:['',Validators.pattern(/^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/)],
    contactInfo3:['',Validators.pattern(/^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/)],
    sex:['male',Validators.required],
      tags:['0'],//房源标签
     infoOwnerId:[this.localStorageProvider.get('loginInfo')['user']['company']['id']],//加盟商id 根据登录人判断他的加盟商id
     buildingType:['1',Validators.required],//建筑类型
     buzzOwnerType:['0'],//交易权属
     buzzType:['1',Validators.required],//房屋用途
    hasElevator:['1',Validators.required],//配备电梯
    positionInBuilding:['1'],//楼层等级
    propertyLife:['1'], //房屋年限
    propertyMortgage:['0'],//抵押类型
    propertyPriceUnit:['1'],
    propertyType:['1'],//房源类型
    propertyDesc:[''],//房源描述
    //楼号比例
    elevators:['',[Validators.pattern(/^[0-9]+$/)]],//梯
    apartments:['',[Validators.pattern(/^[0-9]+$/)]],//户,
    tradingAreaId:[''],//商圈id
    businessTime:[],//挂牌时间
  });

    tip(){
      this.toast.alert('alert默认消息');
      this.toast.msg('成功操作');
      this.toast.error('失败操作');
    }

 //表单验证消息
    errors={
        buildingNo:[
            new ErrorMessage('required','楼栋号必须要填写！'),
            new ErrorMessage('pattern','请填写英文或数字'),
        ],
        unitNo:[
            new ErrorMessage('required','单元号必须要填写！'),
            new ErrorMessage('pattern','请填写英文或数字'),
        ],
        floorNo:[
            new ErrorMessage('required','楼层必须要填写！'),
            // new ErrorMessage('maxLength','楼层名称太长了'),
            new ErrorMessage('pattern','请填写数字'),
        ],
      houseNo:[
        new ErrorMessage('required','房间号必须要填写！'),
        new ErrorMessage('pattern','请填写数字'),
      ],
      contact:[
           new ErrorMessage('required','业主姓名必须要填写！'),
        new ErrorMessage('pattern','请填写中文或英文'),
      ],
      elevators:[
        new ErrorMessage('pattern','请填写数字'),
      ],
      apartments:[
        new ErrorMessage('pattern','请填写数字'),
      ],
      sex:[
          new ErrorMessage('required','业主性别必须要填写！'),
      ],
      contactInfo:[
        new ErrorMessage('required','业主电话必须要填写，请填写数字！'),
        new ErrorMessage('pattern', '手机号码格式不正确！'),
      ],
      contactInfo2:[
        new ErrorMessage('pattern', '手机号码格式不正确！'),
      ],
      contactInfo3:[
        new ErrorMessage('pattern', '手机号码格式不正确！'),
      ],
      buildingType:[
        new ErrorMessage('required','建筑类型必须要填写！'),
      ],
      buzzType:[
        new ErrorMessage('required','房屋用途必须要填写！'),
      ],
      hasElevator:[
        new ErrorMessage('required','是否配备电梯必须要填写！'),
      ],
      spaceSize:[
        new ErrorMessage('required','建筑面积必须要填写！'),
        new ErrorMessage('pattern','请填写大于0整数,不能输入空格等特殊符号'),
      ],
      innerSpaceSize:[
        new ErrorMessage('pattern','请填写大于0整数,不能输入空格等特殊符号'),
      ],
      propertyPrice:[
        new ErrorMessage('pattern','请填写大于0整数'),
      ],
    };


  ionViewWillEnter() {
    this.statusBar.styleLightContent();//状态栏文字颜色修改-白色
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = this.nativeProvider.back(this.navCtrl);
  }

  /**
   * 验证面积
   */
  compare(min,max){
    if(min&&max&&( parseFloat(max) < parseFloat(min) )){
      return true
    }else {
      return false
    }
  }


  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '更多',
      buttons: [
        {
          text: '内容',
          role: 'destructive',
          handler: () => {
            // console.log('Destructive clicked');
          }
        },{
          text: '内容',
          handler: () => {
            // console.log('Archive clicked');
          }
        },{
          text: '关闭',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  goserach(){
    this.events.subscribe('bevents', (params) => {
      // 接收B页面发布的数据
      //  console.log('接收数据为: ', params, params['meta'], JSON.parse(params['meta'])['trading_id'] );
      this.estateChange(params);
      // 取消订阅
      this.events.unsubscribe('bevents');
    });
    this.navCtrl.push(SearchhousePage);
  }

  estateChange(Value){
    this.form.controls['adminDivisionCode'].setValue(Value.site);
    this.form.controls['estateName'].setValue(Value.keyword);
    this.form.controls['estateId'].setValue(Value.id);
    this.form.controls['tradingAreaId'].setValue(Value['meta']['trading_id']);
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
   }
  tagsSelect(value){
    this.form.value.tags = this.tagsSum(value);
    // console.log('标签',this.form.value.tags,this.form.value);
  }

  gethangFreeTm2(event){
/*    this.form.value.businessTime = new Date(this.form.value.businessTime).getTime();
    console.log('时间',event, this.form.value.businessTime );*/
  }


  addContactBolean = true;
  isClick:boolean = false ;
  errBtnHttp:boolean;
  save(){
    this.isClick = true;
    this.errBtnHttp = true;
   if(this.addContactBolean){
     this.tagsSelect(this.form.value.tags);
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
     var man3 ={
       contact:this.form.value.contact,
       contactInfo:this.form.value.contactInfo3,
       sex:this.form.value.sex,
       contactType:'mobile',
       desc:'',
     };
     this.form.value.contacts.push(man2);
     this.form.value.contacts.push(man3);
     this.addContactBolean = false;
   }
   // console.log ('类型', typeof this.form.value.contacts );
    var type=  typeof this.form.value.contacts;
    if(type=="object"){
      this.form.value.contacts = JSON.stringify(this.form.value.contacts);
    }
    this.form.value.businessTime = new Date(this.form.value.businessTime).getTime();

    if(this.form.invalid){
      return false;
    }
    console.log('房源录入表单',this.form.value,'联系人',this.form.value.contacts);

   this.addhouseProvider.save(this.form.value).then(res=>{
      if(res.success){
        this.isClick = false;
       this.toast.msg('录入成功');
        this.errBtnHttp =true;
        setTimeout(()=>{
          this.navCtrl.parent.select(1);
          this.navCtrl.setRoot(HousingPage);
        },1000);

      }else {
        this.isClick = true;
        this.toast.error('录入失败！'+res.msg);
        this.errBtnHttp =false;
      }
    },err=>{
      this.toast.error('录入失败！');
      this.form.value.contacts = JSON.stringify(this.form.value.contacts);
      this.errBtnHttp =false;
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
    this.events.subscribe('content', (params) => {
      // 接收B页面发布的数据
      this.form.patchValue({propertyDesc:params});
      // console.log('表单的描述',this.form.value.propertyDesc);
      // 取消订阅
      this.events.unsubscribe('content');
    });
    this.navCtrl.push(DescPage,{content:this.form.value.propertyDesc});
  }


  //户型
  clickHx(){
    if(this.showHx==false ){
      this.showHx=true;
      this.HxRight=false;
      this.HxDown=true;
    }else{
      this.showHx=false;
      this.HxRight=true;
      this.HxDown=false;
    }
  }


}
