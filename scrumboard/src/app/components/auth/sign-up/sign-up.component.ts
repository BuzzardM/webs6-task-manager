import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Validation from "../../../utils/form-validation";
import {UserService} from "../../../services/user/user.service";
import {IUser} from "../../../models/user";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(private readonly authService: AuthService,
              private readonly router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }

  onSubmitForm() {
    let email = this.form.get('email')?.value;
    let name = this.form.get('name')?.value;
    let password = this.form.get('confirmPassword')?.value;

    this.authService.register(email, password)
      .then(async () => {
        const user: IUser = {email, name};
        await this.userService.addUser(user);
        await this.router.navigate(['/']);
      })
      .catch((e) => console.log(e.message));
  }
}
