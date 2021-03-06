import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, Navbar, NavController, NavParams, Select} from 'ionic-angular';
import { PfollowrecordPage } from './pfollowrecord/pfollowrecord';
import { PlookrecordPage } from './plookrecord/plookrecord';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddhouseProvider} from "../../../../providers/addhouse/addhouse";
import {CustomerProvider} from "../../../../providers/customer/customer";
import {MypassengerPage} from "../../mypassenger/mypassenger";
import {SearchhousePage} from "../../../housing/housedetail/searchhouse/searchhouse";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {ToastComponent} from "../../../../components/toast/toast";
import {DescsPage} from "../descs/descs";
import {StatusBar} from "@ionic-native/status-bar";
import {LocalStorageProvider} from "../../../../providers/local-storage/local-storage";
import {ArryCodeValuePipe} from "../../../../pipes/arry-code-value/arry-code-value";
import {ErrorMessage} from "../../../../components/valid-error/valid-error";
import {NativeProvider} from "../../../../providers/native/native";
/**
 * Generated class for the PassengerdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passengerdetail',
  templateUrl: 'passengerdetail.html',
})
export class PassengerdetailPage {
  showIntention=false;
  right=true;
  down=false;
  rest=false;
  restRight=true;
  restDown=false;

  customerSrcList = [];
  agentList = [];
  customeroGrageInfoList = [];
  //意向
  area = [];
  estateList = []; //楼盘列表
  district:any;
  tradingArea = [];//商圈数组
  intentionTradeCodeId:string;  //用于转换商圈
 data :any;
  estateName:'';
  selectOptionGs:any;
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('selectOne') selectOne: Select;
  @ViewChild('selectTwo') selectTwo: Select;
  @ViewChild('selectThree') selectThree: Select;
  @ViewChild('selectFour') selectFour: Select;
  @ViewChild('selectFive') selectFive: Select;
  @ViewChild('selectSix') selectSix: Select;
  @ViewChild('selectSev') selectSev: Select;
  localCode:any;
  isReload:any;
  constructor(public navCtrl: NavController,public statusBar: StatusBar,
              public toast:ToastComponent,public nativePageTransitions: NativePageTransitions,
              public navParams: NavParams,private fb:FormBuilder,
              private customerProvider:CustomerProvider,private addhouseProvider:AddhouseProvider,
              public events: Events,  public localStorageProvider: LocalStorageProvider,
              public  nativeProvider:NativeProvider,) {
    this.selectOptionGs={
      title:'客户归属'
    };
    this.area = this.localStorageProvider.get('area');
    this.area&&this.area.unshift({name:'无',val:0});
    this.localCode = this.localStorageProvider.get('codeData');
    this.customerProvider.getDetail(navParams.data.customerId).then(res=>{
        this.data = res;
        this.form.patchValue({
          customerId:this.data.customerId&&this.data.customerId,
          customerName:this.data.customerName&&this.data.customerName,
          customerGender:this.data.customerGender&&this.data.customerGender,
          customerPhone:this.data.customerPhone&&this.data.customerPhone,
          customerSrc:this.data.customerSrc&&this.data.customerSrc,
          agentId:this.data.agentId&&this.data.agentId,
          customerGrade:this.data.customerGrade&&this.data.customerGrade,
          //更多
          intentionDiviCode:this.data.intentionDiviCode&&this.data.intentionDiviCode,
          intentionTradeCode:this.data.intentionTradeCode&&this.data.intentionTradeCode,
          intentionEstate:this.data.intentionEstate&&this.data.intentionEstate,
           minSpaceSize:this.data.minSpaceSize&&this.data.minSpaceSize,
          maxSpaceSize:this.data.maxSpaceSize&&this.data.maxSpaceSize,
          minPrice:this.data.minPrice&&this.data.minPrice,
          maxPrice:this.data.maxPrice&&this.data.maxPrice,
          minFloor:this.data.minFloor&&this.data.minFloor,
          maxFloor:this.data.maxFloor&&this.data.maxFloor,
          minBedroom:this.data.minBedroom&&this.data.minBedroom,
          maxBedroom:this.data.maxBedroom&&this.data.maxBedroom,
          minHall:this.data.minHall&&this.data.minHall,
          maxHall:this.data.maxHall&&this.data.maxHall,
          // decorationArray:this.data.decorationArray,
          decorationArrs:this.data.decorationArrs&&this.data.decorationArrs,
          //其他
          requiredDemands:this.data.requiredDemands&&this.data.requiredDemands,
          againstDemands:this.data.againstDemands&&this.data.againstDemands,
          comments:this.data.comments&&this.data.comments,
          // contactFreeTmArray:this.data.contactFreeTm&&this.data.contactFreeTm.split("-"),
          contactFreeTm1:this.data.contactFreeTm&&this.data.contactFreeTm.split("-")[0],
          contactFreeTm2:this.data.contactFreeTm&&this.data.contactFreeTm.split("-")[1],
        });
        console.log('start：',this.data.contactFreeTm&&this.data.contactFreeTm.split("-")[0],
    "end:",this.data.contactFreeTm&&this.data.contactFreeTm.split("-")[1]);
/*        this.getcontactFreeTm1(this.data.contactFreeTm&&this.data.contactFreeTm.split("-")[0]);
        this.getcontactFreeTm2(this.data.contactFreeTm&&this.data.contactFreeTm.split("-")[1]);*/

        for(var item of this.area){
           if(item.code==this.data.intentionDiviCode){
              this.areaChange(item);
           }
        }
        this.estateName=this.data.estateName;
    });
    //客户来源
    this.customerSrcList = new ArryCodeValuePipe().transform(this.localCode,'cms_src');
    //客户归属
    this.customerProvider.agentList().then(res=>{
      this.agentList = res;
    });
    //客户等级
    this.customeroGrageInfoList = new ArryCodeValuePipe().transform(this.localCode,'customer_grade');

    //
    if(this.navCtrl.last().name&&this.navCtrl.last().name=='MypassengerPage'){
       this.isReload= false;
       // console.log('上一个页面',this.navCtrl.last().name);
    }else {
      this.isReload= true;
    }
  }

  closeSelect(){
    this.selectOne.close();
    this.selectTwo.close();
    this.selectThree.close();
    this.selectFour.close();
    this.selectFive.close();
    this.selectSix.close();
    this.selectSev.close();
  }

  ionViewWillLeave(){
    this.closeSelect();
  }

  selectTitle(data){
    var title = {title:data};
    return title;
  }

  ionViewDidLoad() {
    if(this.isReload){
      this.navBar.backButtonClick = () => {
        this.navCtrl.push(MypassengerPage)
      };
    }
  }

  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }
  form:FormGroup =this.fb.group({
    customerId:['',Validators.required,],
    customerName:['',[Validators.required,Validators.pattern(/^[\u4e00-\u9fa5a-zA-Z]+$/)]],//客户名称
    customerGender :['',Validators.required],//客户性别
    customerPhone:[{value:'',disabled:true},[Validators.required, Validators.pattern(/^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/)]],//客户电话
    customerSrc:[{value:'',disabled:true},Validators.required], //客户来源
    agentId:['',Validators.required],//归属人id
    customerGrade:['',],//客户等级
    intentionDiviCode :[''],//意向区域
    intentionTradeCode :[''],//意向商圈
    intentionEstate :[''],//意向楼盘


    minSpaceSize:['',Validators.pattern(/^[0-9]*$/)],//最小面积
    maxSpaceSize:['',Validators.pattern(/^[0-9]*$/)],//最大面积
    minPrice :['',Validators.pattern(/^(\d+|\d+\.\d{1,4})$/)],//最低价格
    maxPrice:['',Validators.pattern(/^(\d+|\d+\.\d{1,4})$/)],//最高价格
    minFloor:['',Validators.pattern(/^[0-9]*$/)],//最低楼层
    maxFloor:['',Validators.pattern(/^[0-9]*$/)],//最高楼层
    minBedroom:['',Validators.pattern(/^[0-9]*$/)],//最少居室
    maxBedroom:['',Validators.pattern(/^[0-9]*$/)],//最多居室
    minHall:['',Validators.pattern(/^[0-9]*$/)],//最少厅
    maxHall:['',Validators.pattern(/^[0-9]*$/)],//最多厅
    decorationArray:[],//装修要求
    decorationArrs:[],//装修要求
    requiredDemands:[''],//核心要求
    againstDemands:[''],//核心抵触点
    contactFreeTmArray:this.fb.array([
      this.fb.group({
      })
    ]),//免打扰时间
    contactFreeTm1:[''],//免打扰时间开始
    contactFreeTm2:[''],//免打扰时间结束
    comments:[''],//备注
  });
/*[this.fb.array([
  this.fb.group({
    // contact:[''],
    // contactType:['mobile'],
    // contactInfo:[''],
    // sex:[''],
    // desc:[''],
  })
])*/

  //表单验证消息
  errors={
    customerPhone:[
      new ErrorMessage('required','电话必须要填写！'),
      new ErrorMessage('pattern', '手机号码格式不正确！'),
    ],
    customerName:[
      // new ErrorMessage('required','业主姓名必须要填写！'),
      new ErrorMessage('pattern','请填写中文或英文'),
    ],
    minSpaceSize:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    maxSpaceSize:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    minPrice:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    maxPrice:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    minFloor:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    maxFloor:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    minBedroom:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    maxBedroom:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    minHall:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    maxHall:[
      new ErrorMessage('pattern','请填写数字'),
    ],
  };

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

  rests(){
    if(this.rest==false ){
      this.rest=true;
      this.restRight=false;
      this.restDown=true;
    }else{
      this.rest=false;
      this.restRight=true;
      this.restDown=false;
    }
  }

  passengerLook(){
    this.nativeProvider.openWin(this.navCtrl,PlookrecordPage,{
      id:this.data,
    })
  }
  passengerFollow(){
    this.nativeProvider.openWin(this.navCtrl,PfollowrecordPage,{
      id:this.data,
    })
  }


  goserach(){
    this.events.subscribe('bevents', (params) => {
      // 接收B页面发布的数据
       console.log('接收数据为: ', params);
      // this.form.value.estateName = params.estateName;
      // this.form.value.estateId =  params.estateId;
      this.estateName = params.keyword;
      this.form.controls['intentionEstate'].setValue(params.id);

      // 取消订阅
      this.events.unsubscribe('bevents');
    });
    this.nativeProvider.openWin(this.navCtrl,SearchhousePage);
  }
  isDisabled = false;
  save(){
    this.isDisabled = true;
    this.form.value.contactFreeTmArray = [];
    this.form.value.contactFreeTmArray[0]= this.form.value.contactFreeTm1;
    this.form.value.contactFreeTmArray[1]= this.form.value.contactFreeTm2;
    this.form.value.decorationArray=this.form.value.decorationArrs;
     console.log('提交',this.form.value);
    this.customerProvider.update(this.form.value).then(res=>{
      if (res.success){
        this.toast.msg('修改客户成功!');
        this.navCtrl.pop();
        this.isDisabled = false;
      }
    },err=>{
      this.isDisabled = false;
      this.toast.error('修改失败！');
    })

  }


  desc(val){

    this.events.subscribe('content', (params) => {
      // 接收B页面发布的数据
      // console.log('接收数据为: ', params);
      if(params){
        if(params.num==1){
          this.form.controls['requiredDemands'].setValue(params.val);
        };
        if(params.num==2){
          this.form.controls['againstDemands'].setValue(params.val);
        };
        if(params.num==3){
          this.form.controls['comments'].setValue(params.val);
        };
      }

      // 取消订阅
      this.events.unsubscribe('content');
    });


    if(val==1){
      this.nativeProvider.openWin(this.navCtrl,DescsPage,{
        val:1,
        content:this.form.value.requiredDemands
      });
    }
    if(val==2){
      this.nativeProvider.openWin(this.navCtrl,DescsPage,{
        val:2,
        content:this.form.value.againstDemands
      });
    }
    if(val==3){
      this.nativeProvider.openWin(this.navCtrl,DescsPage,{
        val:3,
        content:this.form.value.comments
      });
    }
  }



  /**
   验证
   */

  compare(min,max){
    if(min&&max&&( parseFloat(max) < parseFloat(min) )){
      return true
    }else {
      return false
    }
  }

  //验证面积
  areaCheck=false;
  priceCheck=false;
  floorCheck=false;
  roomCheck=false;
  hallCheck=false;
  areaTips=false;
  areas(){
    if(this.form.value.minSpaceSize||this.form.value.maxSpaceSize){
      if(parseFloat(this.form.value.maxSpaceSize) < parseFloat(this.form.value.minSpaceSize)){
        // console.log('结束面积不能小于开始面积');
        this.areaCheck = true;
      }else {
        this.areaCheck = false;
      }
    }
  }
  //价格
  prices(){
    if(this.form.value.minPrice||this.form.value.maxPrice){
      if(parseFloat(this.form.value.maxPrice) < parseFloat(this.form.value.minPrice)){
        // console.log('最高价格不能小于最低价格');
        this.priceCheck = true;
      }else {
        this.priceCheck = false;
      }
    }
  }
  //楼层
  floors(){
    if(this.form.value.minFloor||this.form.value.maxFloor){
      if(parseInt(this.form.value.maxFloor) < parseInt(this.form.value.minFloor)){
        // console.log('最高楼不能小于最低楼层');
        this.floorCheck = true;
      }else {
        this.floorCheck = false;
      }
    }
  }
  //居室
  rooms(){
    if(this.form.value.minBedroom&&this.form.value.maxBedroom){
      if(parseInt(this.form.value.maxBedroom) < parseInt(this.form.value.minBedroom)){
        // console.log('最多居室不能小于最少居室');
        this.roomCheck = true;
      }else {
        this.roomCheck = false;
      }
    }
  }
  //客厅
  halls(){
    if(this.form.value.minHall||this.form.value.maxHall){
      if(parseInt(this.form.value.maxHall) < parseInt(this.form.value.minHall)){
        // console.log('最多厅不能小于最少厅');
        this.hallCheck = true;
      }else {
        this.hallCheck = false;
      }

    }
  }

  getcontactFreeTm1(event){
    if( event.hour<10 ){event.hour='0'+event.hour}
    if( event.minute<10 ){event.minute='0'+event.minute}
    var startTime = event.hour +':'+event.minute ;
    this.form.value.contactFreeTm1 = startTime;
    console.log('表单',event,this.form.value.contactFreeTm1);
  }

  getcontactFreeTm2(event){
    if( event.hour<10 ){event.hour='0'+event.hour}
    if( event.minute<10 ){event.minute='0'+event.minute}
    var endTime = event.hour +':'+event.minute ;
    this.form.value.contactFreeTm2 = endTime;
     console.log('表单',this.form.value.contactFreeTm2);
  }

  //select 改变事件
  areaChange(data){
    this.tradingArea =  data.area;
  }
  //select 确认事件
  onAreaChange(event){
    this.form.patchValue({intentionTradeCode:0});
  }
  //select 取消事件
  areaCancel(event){
    for(var item of this.area){
       if(item.code==event.value){
         this.tradingArea=item.area
       }
    }
  }


}
