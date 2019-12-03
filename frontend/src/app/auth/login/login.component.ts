import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { Cat } from '../cat';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})

export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {

    // this.loginForm = this.fb.group({
    //   email: ['', Validators.required],
    //   password: ['', Validators.required]
    // });
  }

  ngOnInit() {}

  login(form) {
    console.log(form.value);
    this.authService.login(form.value).subscribe((res) => {
      console.log("Logged in!");
      this.router.navigateByUrl('cats');
    });
  }

}
