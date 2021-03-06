import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, Navbar, NavController, NavParams,Content,Select} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerProvider} from "../../../../providers/customer/customer";
import {MypassengerPage} from "../mypassenger";
import {AddhouseProvider} from "../../../../providers/addhouse/addhouse";
import {SearchhousePage} from "../../../housing/housedetail/searchhouse/searchhouse";
import {ErrorMessage} from "../../../../components/valid-error/valid-error";
import {ToastComponent} from "../../../../components/toast/toast";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
import {DescsPage} from "../descs/descs";
import {LocalStorageProvider} from "../../../../providers/local-storage/local-storage";
import {ArryCodeValuePipe} from "../../../../pipes/arry-code-value/arry-code-value";
import {PropertyProvider} from "../../../../providers/property/property";
import {NativeProvider} from "../../../../providers/native/native";
/**
 * Generated class for the AddpassengerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addpassenger',
  templateUrl: 'addpassenger.html',
})
export class AddpassengerPage {
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
  shangQuan = [];//保存商圈
  intentionTradeCodeId:string;  //用于转换商圈
  type:string="";
  aa:any;
  localCode:any;
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('selectOne') selectOne: Select;
  @ViewChild('selectTwo') selectTwo: Select;
  @ViewChild('selectThree') selectThree: Select;
  @ViewChild('selectFour') selectFour: Select;
  @ViewChild('selectFive') selectFive: Select;
  @ViewChild('selectSix') selectSix: Select;
  @ViewChild('selectSev') selectSev: Select;
  constructor(public navCtrl: NavController,public nativePageTransitions: NativePageTransitions,
              public navParams: NavParams,private fb:FormBuilder,public toast:ToastComponent,public localStorageProvider: LocalStorageProvider,
              private customerProvider:CustomerProvider,private addhouseProvider:AddhouseProvider,
              public events: Events,public statusBar: StatusBar,public propertyProvider: PropertyProvider,
              public  nativeProvider:NativeProvider,
  ) {

    this.localCode = this.localStorageProvider.get('codeData');
    //客户来源
     this.customerSrcList = new ArryCodeValuePipe().transform(this.localCode,'cms_src');
    //客户归属
    this.customerProvider.agentList().then(res=>{
       this.agentList = res;
       console.log(this.agentList)
      for(var i in this.agentList){
        if(this.agentList[i].id == this.localStorageProvider.get('loginInfo').user.id){
          console.log(this.agentList[i].id)
          this.form.patchValue({
            agentId:this.agentList[i].id
          })
        }
      }
    });
   //客户等级
   this.customeroGrageInfoList = new ArryCodeValuePipe().transform(this.localCode,'customer_grade');
    //行政区划
    if(!this.localStorageProvider.get('area')){
      this.propertyProvider.getDivision().then(res=>{
        this.area = res.data.result[0];
        this.localStorageProvider.set('area',this.area);
        this.area&&this.area.unshift({name:'不限',id:'99',code:'99'});
      });
    }else {
      this.area = this.localStorageProvider.get('area');
      this.area&&this.area.unshift({name:'无',val:0});
    }

  }
  @ViewChild(Content) content: Content;

/*  scrollTo() {
    window.addEventListener('native.keyboardshow', (e: any) => {
      this.content.scrollTo(0, e.keyboardHeight);
    });
  }*/
  closeSelect(){
    this.selectOne&&this.selectOne.close();
    this.selectTwo&&this.selectTwo.close();
    this.selectThree&&this.selectThree.close();
    this.selectThree&&this.selectFour.close();
    this.selectFive&&this.selectFive.close();
    this.selectSix&&this.selectSix.close();
    this.selectSev&&this.selectSev.close();
  }

  ionViewWillLeave(){
    this.closeSelect();
  }

  selectTitle(data){
    var title = {title:data};
    return title;
  }
  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpassengerPage',this.form.value);
    this.navBar.backButtonClick = this.nativeProvider.back(this.navCtrl);
  }


  form:FormGroup =this.fb.group({
    customerName:['',[Validators.required,Validators.pattern(/^[\u4e00-\u9fa5a-zA-Z]*$/)]],//客户名称
    customerGender :['1',Validators.required],//客户性别
    customerPhone:['',[Validators.required, Validators.pattern(/^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/)]],//客户电话
    customerSrc:['',Validators.required], //客户来源
    agentId:['',Validators.required],//归属人id
     customerGrade:['',],//客户等级
     intentionDiviCode :[''],//意向区域
    intentionTradeCode :[''],//意向商圈
    intentionEstate :[''],//意向楼盘
     minSpaceSize:['',Validators.pattern(/^[0-9]+$/)],//最小面积
     maxSpaceSize:['',Validators.pattern(/^[0-9]*$/)],//最大面积
     minPrice :['',Validators.pattern(/^(\d+|\d+\.\d{1,4})$/)],//最低价格
     maxPrice:['',Validators.pattern(/^(\d+|\d+\.\d{1,4})$/)],//最高价格
     minFloor:['',Validators.pattern(/^[0-9]*$/)],//最低楼层
     maxFloor:['',Validators.pattern(/^[0-9]*$/)],//最高楼层
     minBedroom:['',Validators.pattern(/^[1-9]\d*$/)],//最少居室
     maxBedroom:['',Validators.pattern(/^[1-9]\d*$/)],//最多居室
    minHall:['',Validators.pattern(/^[0-9]*$/)],//最少厅
    maxHall:['',Validators.pattern(/^[0-9]*$/)],//最多厅
    decorationArray:[],//装修要求
    requiredDemands:[''],//核心要求
    againstDemands:[''],//核心抵触点
    contactFreeTmArray:[[]],//免打扰时间
    contactFreeTm1:[''],//免打扰时间开始
    contactFreeTm2:[''],//免打扰时间结束
    comments:[''],//备注
  });

  //表单验证消息
  errors={
    customerName:[
      new ErrorMessage('required','客户名称必须要填写！'),
      new ErrorMessage('pattern','请填写中文或英文'),
    ],
    customerPhone:[
      new ErrorMessage('required','电话必须要填写！'),
      new ErrorMessage('pattern', '手机号码格式不正确！'),
    ],
    customerSrc:[
      new ErrorMessage('required','客户来源必须要填写！'),
    ],
    agentId:[
      new ErrorMessage('required','客户归属必须要填写！'),
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
      new ErrorMessage('pattern','请填写大于0整数'),
    ],
    maxBedroom:[
      new ErrorMessage('pattern','请填写大于0整数'),
    ],
    minHall:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    maxHall:[
      new ErrorMessage('pattern','请填写数字'),
    ],

  };


  compare(min,max){
     if(min&&max&&( parseFloat(max) < parseFloat(min) )){
       return true
     }else {
       return false
     }
  }



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

  estateName='';
  goserach(){
    this.events.subscribe('bevents', (params) => {
      // 接收B页面发布的数据
      console.log('接收数据content为: ', params);
      this.estateName = params.keyword;
      this.form.controls['intentionEstate'].setValue(params.id);

      // 取消订阅
      this.events.unsubscribe('bevents');
    });
    this.navCtrl.push(SearchhousePage);
  }

  estateChange(Value){
    console.log('value',Value);
    //哥
    // this.form.controls['adminDivisionCode'].setValue(Value.site);
    // this.form.controls['estateName'].setValue(Value.keyword);
    if(Value){
      this.estateName = Value.keyword;
      this.form.controls['intentionEstate'].setValue(Value.id);
      console.log('表单',this.form.value);
    }

  }


  getcontactFreeTm1(event){
    if( event.hour<10 ){event.hour='0'+event.hour}
    if( event.minute<10 ){event.minute='0'+event.minute}
    var startTime = event.hour +':'+event.minute ;
    this.form.value.contactFreeTmArray[0] = startTime;
  }

  getcontactFreeTm2(event){
    if( event.hour<10 ){event.hour='0'+event.hour}
    if( event.minute<10 ){event.minute='0'+event.minute}
    var endTime = event.hour +':'+event.minute ;
    this.form.value.contactFreeTmArray[1] = endTime;
  }


  errBtnHttp:boolean;
  save(){
    this.errBtnHttp = true;
    console.log('表单客户',this.form.value);
    this.customerProvider.add(this.form.value).then(res=>{
      if (res.success){
        this.toast.msg('录入成功!');
        this.errBtnHttp = true;
        // this.navCtrl.pop();
        this.navCtrl.pop().then(()=>{
          this.events.publish('bevents',{reload:true});
        })

      }else {
        this.errBtnHttp = false;
        this.toast.error(res.msg);
      }
    },err=>{
       alert('录入失败！');
      this.errBtnHttp = false;
    })

  }

  desc(val){

    this.events.subscribe('content', (params) => {
      // 接收B页面发布的数据
      console.log('接收数据为: ', params);
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
  areaList:any;
  areaChange(data){
    this.areaList = data.area;
  }
  onAreaChange(event){
    this.tradingArea =  this.areaList;
  }


}
