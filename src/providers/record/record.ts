import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpProvider} from "../http/http";
import {ConfigProvider} from "../config/config";
import {LocalStorageProvider} from '../../providers/local-storage/local-storage'

/*
  Generated class for the AddhouseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecordProvider {
  public id: any;
  private record = this.configProvider.set().http + 'property/propertyInfo/propertyDetail.do';

  constructor(public http: HttpClient, public httpProvider: HttpProvider, private configProvider: ConfigProvider, public localStorageProvider: LocalStorageProvider) {
    // this.id = this.localStorageProvider.get('propertyid');
    // console.log(this.id)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordProvider');
  }
  getRecord(params?) {
    this.id = this.localStorageProvider.get('propertyid');
    console.log(this.id)
    var data = {"propertyId": this.id}
    return this.httpProvider.httpPost(this.record, data)
  }

}

