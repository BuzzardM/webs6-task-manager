import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "./components/auth/sign-in/sign-in.component";
import {SignUpComponent} from "./components/auth/sign-up/sign-up.component";

const routes: Routes = [
  {path: 'login', component: SignInComponent},
  {path: 'register', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
