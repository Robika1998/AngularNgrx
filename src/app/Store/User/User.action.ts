import { createAction, props } from '@ngrx/store';
import { Users,Usercred } from '../Model/User.model';

export const BEGIN_REGISTER = '[auth] begin register';
export const BEGIN_LOGIN = '[auth] begin login';
export const DUPLICATE_USER='[user] duplicate user'
export const DUPLICATE_USER_SUCC='[user] duplicate user succ'


export const beginRegister = createAction(BEGIN_REGISTER,props<{ userdata: Users }>());
export const beginLogin = createAction(BEGIN_LOGIN,props<{ usercred: Usercred }>());
export const duplicateUser=createAction(DUPLICATE_USER,props<{username:string}>())
export const duplicateUserSuccess=createAction(DUPLICATE_USER_SUCC,props<{isduplicate:boolean}>())
