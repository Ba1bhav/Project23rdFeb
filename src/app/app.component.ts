import { Component, OnInit,OnChanges } from '@angular/core';
import { HandlerService } from './handler.service';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  Project_Status=[{'id':1,'value':'Not Started'},{'id':2,'value':'In Progress'},
                  {'id':3,'value':'Completed'},{'id':4,'value':'On Hold'},
                  {'id':9,'value':'Cancelled'}]

  Milestone_Status=[{'id':1,'value':'Not Started'},{'id':2,'value':'In Progress'},
                  {'id':3,'value':'Completed'},{'id':4,'value':'On Hold'},
                  {'id':5,'value':'Cancelled'}]

  Task_Status=[{'id':1,'value':'Not Started'},{'id':2,'value':'In Progress'},
                  {'id':3,'value':'Completed'},{'id':4,'value':'On Hold'},
                  {'id':5,'value':'Cancelled'}]
  public db_status:any;
  public selected_data:any;
 public change:any;
  onChange(changed_status:any,data_object:any){
    console.log(changed_status.value)
    console.log(data_object);
    let changed=data_object
    changed.status=changed_status.value
    this.api.push_update(data_object.id,changed)

  }
  projects(){
    this.api.url='https://projectmanagement-808e7-default-rtdb.firebaseio.com/project_data';
    this.api.fetch_Data()
    this.db_status=this.Project_Status;
  }
  milestone(){
    this.api.url='https://projectmanagement-808e7-default-rtdb.firebaseio.com/milestone_data';
    this.api.fetch_Data()
    this.db_status=this.Milestone_Status;
  }
  tasks(){
    this.api.url='https://projectmanagement-808e7-default-rtdb.firebaseio.com/task_data';
    this.api.fetch_Data()
    this.db_status=this.Task_Status;
  }
  constructor(private api:HandlerService){}
public db_data:any=this.api.db_table;

ngOnInit(): void {
  this.projects()
}
checkSelection(vals:any,val2:any){
  return vals==val2
}
checkDisabled(fetched_status:any,status_html:any){
  if(fetched_status==4){
    return [3,1].includes(status_html)
  }
  else{
    return false;
  }
}

}
