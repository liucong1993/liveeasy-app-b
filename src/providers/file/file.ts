import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpProvider} from "../http/http";
import {ConfigProvider} from "../config/config";
/*
  file文件服务
*/
@Injectable()
export class FileProvider {

  getTickerPath = this.configProvider.set().http+'/oss/getTicker';
  // baseDir = this.configProvider.set().http+'liveeasy-erp/oss/';
  baseDir = 'liveeasy-erp/oss/';
  constructor(public http: HttpClient,public httpProvider:HttpProvider,private configProvider:ConfigProvider) {
    console.log('Hello FileProvider Provider');
  }

  //获取签证
  getTicker(userDir){
     var data = {
       userDir:this.baseDir+userDir
     };
     return this.httpProvider.httpPostFormJson(this.getTickerPath,"userDir=" + this.baseDir+userDir)
  }


}
