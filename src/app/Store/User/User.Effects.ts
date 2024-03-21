import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../service/user.service';
import { Injectable } from '@angular/core';
import { beginLogin, beginRegister, duplicateUser, duplicateUserSuccess } from './User.action';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { showalert } from '../Common/App.Action';
import { Router } from '@angular/router';

@Injectable()
export class UserEffect {
  constructor(private action$: Actions, private service: UserService, private route: Router) {}

  _userregister = createEffect(() =>
        this.action$.pipe(
            ofType(beginRegister),
            exhaustMap((action) => {
                return this.service.UserRegistration(action.userdata).pipe(
                    map(() => {
                        this.route.navigate(['login'])
                        return showalert({ message: 'Registered successfully.', resulttype: 'pass' })
                    }),
                    catchError((_error) => of(showalert({ message: 'Registerion Failed due to :.' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _duplicateuser = createEffect(() =>
    this.action$.pipe(
        ofType(duplicateUser),
        switchMap((action) => {
            return this.service.Duplicateusername(action.username).pipe(
                switchMap((data) => {
                    if (data.length > 0) {
                        return of(duplicateUserSuccess({ isduplicate: true }),
                            showalert({ message: 'Username already exist.', resulttype: 'fail' }))
                    } else {
                        return of(duplicateUserSuccess({ isduplicate: false }))
                    }

                }),
                catchError((_error) => of(showalert({ message: 'Registerion Failed due to :.' + _error.message, resulttype: 'fail' })))
            )
        })
    )
)

    _userlogin = createEffect(() =>
    this.action$.pipe(
        ofType(beginLogin),
        exhaustMap((action) => {
            return this.service.UserLogin(action.usercred).pipe(
                map((data) => {
                    if(Array.isArray(data) && data.length > 0) {
                        const _userdata = data[0];
                        if(_userdata.status === true) {
                            this.service.SetUserToLoaclStorage(_userdata)
                            this.route.navigate([''])
                            return showalert({message: 'Login success', resulttype: 'pass'})
                        } else {
                            return showalert({message: 'InActive User.', resulttype: 'fail'})
                        }
                    } else{
                        return showalert ({ message: 'Login Failed: Invalid', resulttype: 'fail'})
                    }
                }),
                catchError((_error ) => of(showalert({message: 'Login Failed due to :.' + _error.message, resulttype: 'fail'})))
            )
        })
    ))
    
}
