import { Component, OnInit,ChangeDetectorRef, OnChanges, AfterContentChecked, AfterContentInit, AfterViewInit, SimpleChanges, AfterViewChecked } from '@angular/core';
import { HandlerService } from './handler.service';
import { Project_Status,Milestone_Status,Task_Status } from './Status_Data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit,AfterViewChecked{
  Project_Status=Project_Status
  Milestone_Status=Milestone_Status
  Task_Status=Task_Status
  public db_status:any;
  public selected_data:any;
  public change:any;
  public reason:any='';
  public Display_reason:any=false;


 open(changed_status:any,data_object:any,content:any,i:any) {
  this.modalService.open(content, { backdrop:'static',ariaLabelledBy: 'modal-basic-title' }).result.then(
    (result) => {
      console.log(this.reason)
      let changed=data_object;
      if(result==200)
      {   changed.status=changed_status.value;
          changed.reason=this.reason;
          this.api.push_update(data_object.id,changed)
          this.reason='';
          console.log(this.db_data[i],data_object)
      }
      else{
        changed_status.value=data_object.status
      }
    }
    ,(err=>{console.log('You Closed PopUp ');changed_status.value=data_object.status;})
  );
}

  onChange(changed_status:any,data_object:any,Modal_Reffrence:any,i:any){
    console.log(changed_status.value ,' is a changed value ')
    console.log(data_object,' is object entry');
    let changed=data_object
    if((['4','5','9'].includes(changed_status.value))){
      console.log('Modal Called Success')
      this.open(changed_status,data_object,Modal_Reffrence,i)
    }
    else{
    changed.status=changed_status.value
    this.api.push_update(data_object.id,changed)
    this.Display_reason=false
    }
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

//

constructor(private api:HandlerService,private modalService: NgbModal,private changeDetectorRef: ChangeDetectorRef){}
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

public db_data:any=this.api.db_table;

ngOnInit(): void {
  this.projects()
}
checkSelection(selected:any,entry:any){
  if(['4','5','9'].includes(entry)){
    this.Display_reason=true;
  }
  return selected==entry
}
checkDisabled(fetched_status:any,status_html:any){
  if((fetched_status==4)){
    return [3,1].includes(status_html)
  }
  else{
    return false;
  }
}

ngAfterViewInit() {
  this.changeDetectorRef.detectChanges();
}

}
