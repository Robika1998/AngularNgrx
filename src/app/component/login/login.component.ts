import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usercred } from '../../Store/Model/User.model';
import { Store } from '@ngrx/store';
import { beginLogin } from '../../Store/User/User.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private builder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
      localStorage.clear()
  }

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  Proceedlogin() {
    if (this.loginform.valid) {
      const _obj: Usercred = {
        username: this.loginform.value.username as string,
        password: this.loginform.value.password as string,
      };
      this.store.dispatch(beginLogin({ usercred: _obj }));
    }
  }

  resetlogin() {
    this.loginform.reset();
  }
}
