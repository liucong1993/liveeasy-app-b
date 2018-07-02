import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
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
  selectOptions:any;
  selectOptionGs:any;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,public nativePageTransitions: NativePageTransitions, public navParams: NavParams,private fb:FormBuilder,public toast:ToastComponent,
              private customerProvider:CustomerProvider,private addhouseProvider:AddhouseProvider,
              public events: Events,public statusBar: StatusBar
  ) {
    this.selectOptions = {
      title: '客户来源',
    };
    this.selectOptionGs={
      title:'客户归属'
    }
    //客户来源
    this.customerProvider.customerSrcInfo().then(res=>{
       this.customerSrcList = res;
    });
    //客户归属
    this.customerProvider.agentList().then(res=>{
       this.agentList = res;
    });
    //客户等级
    this.customerProvider.customeroGrageInfo().then(res=>{
       this.customeroGrageInfoList = res;
    });
    //区域
    this.customerProvider.area().then(res=>{
      this.area = res.data.distrs;
    });
    //商圈
    this.customerProvider.tradingArea().then(res=>{
     this.shangQuan = this.tradingArea = res;
    });
    //楼盘列表
    this.addhouseProvider.estateListSelect().then(res=>{
      this.estateList = res.data.result;
    });
  }
  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpassengerPage');
    this.navBar.backButtonClick = this.backButtonClick;
  }


  form:FormGroup =this.fb.group({
    customerName:['',Validators.required],//客户名称
    customerGender :['1',Validators.required],//客户性别
    customerPhone:['',[Validators.required, Validators.pattern(/^[1][3,4,5,7,8][0-9]{9}$/)]],//客户电话
    customerSrc:['',Validators.required], //客户来源
    agentId:['',Validators.required],//归属人id
     customerGrade:['',],//客户等级
     intentionDiviCode :[''],//意向区域
    intentionTradeCode :[''],//意向商圈
    intentionEstate :[''],//意向楼盘
     minSpaceSize:[''],//最小面积
     maxSpaceSize:[''],//最大面积
     minPrice :[''],//最低价格
     maxPrice:[''],//最高价格
     minFloor:[''],//最低楼层
     maxFloor:[''],//最高楼层
     minBedroom:[''],//最少居室
     maxBedroom:[''],//最多居室
    minHall:[''],//最少厅
    maxHall:[''],//最多厅
    decorations:[],//装修要求
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

  areaChange(event){

    this.tradingArea = [];
    if(this.shangQuan){
      for(var i in this.shangQuan){
        if(this.shangQuan[i].code.substring(0,6)==event){
          this.tradingArea.push(this.shangQuan[i]);
        }
      }
    }


  }
  estateName='';
  goserach(){
    this.events.subscribe('bevents', (params) => {
      // 接收B页面发布的数据
      console.log('接收数据content为: ', params);
      // this.form.value.estateName = params.estateName;
      // this.form.value.estateId =  params.estateId;
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
    // this.form.value.contactFreeTmArray
    var startTime = event.hour +':'+event.minute ;
    this.form.value.contactFreeTmArray[0] = startTime;
     console.log('时间',event,startTime);
  }

  getcontactFreeTm2(event){
    var endTime = event.hour +':'+event.minute ;
    this.form.value.contactFreeTmArray[1] = endTime;
    console.log('表单',this.form.value);
  }


  save(){
    console.log('表单客户',this.form.value);
    this.customerProvider.add(this.form.value).then(res=>{
      if (res.success){
        this.toast.msg('录入成功!');
        this.navCtrl.push(MypassengerPage);
      }
    },err=>{
       alert('录入失败！');
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
      this.openWin(DescsPage,{
        val:1,
        content:this.form.value.requiredDemands
      });
    }
    if(val==2){
      this.openWin(DescsPage,{
        val:2,
        content:this.form.value.againstDemands
      });
    }
    if(val==3){
      this.openWin(DescsPage,{
        val:3,
        content:this.form.value.comments
      });
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
