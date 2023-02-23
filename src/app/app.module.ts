import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HandlerService } from './handler.service';
import { FormsModule, NgModel } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule
  ,FormsModule],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private api:HandlerService){}
}
