import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormComponentComponent } from './form-component/form-component.component';
import { ChildComponent } from './form-component/child/child.component';

@NgModule({
  declarations: [AppComponent, FormComponentComponent, ChildComponent],
  imports: [ReactiveFormsModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
