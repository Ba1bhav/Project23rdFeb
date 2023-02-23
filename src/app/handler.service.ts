import { Injectable } from '@angular/core';
import{ HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class HandlerService {
  url:any='https://projectmanagement-808e7-default-rtdb.firebaseio.com/project_data'
  db_table:any=[]
  db_values:any=[]
  db_keys:any=[]
  data:any;

  constructor( private api:HttpClient) { }

  push_update(id:any,data:any){
    this.api.put(this.url+'/'+this.db_keys[id-1]+'.json',data).subscribe((response) => {
      console.log('push update',this.db_keys[id-1],'data',data,response)
      this.fetch_Data()
    })

  }

  fetch_Data(){
    this.api.get(this.url+'.json').subscribe((response) => {
      this.data = response;
      this.db_keys = Object.keys(response);
      this.db_table.splice(0,this.db_table.length)
      for (let i of this.db_keys) {
        this.db_table.push(this.data[i]);
      }
    })
  }
}
