import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormComponentComponent } from './form-component/form-component.component';
import { ChildComponent } from './form-component/child/child.component';
import { RouterModule, Routes } from '@angular/router';
import { NewComponent } from './new/new.component';
import { WelcomeComponent } from './welcome/welcome.component';
const appRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'form',
    component: FormComponentComponent,
  },
  {
    path: 'success',
    component: NewComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    FormComponentComponent,
    ChildComponent,
    WelcomeComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
