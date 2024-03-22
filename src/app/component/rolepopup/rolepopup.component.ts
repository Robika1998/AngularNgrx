import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getroles, getuserbycode, updateuserrole } from '../../Store/User/User.action';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Roles, Userinfo } from '../../Store/Model/User.model';
import { getUserbycode, getallroles } from '../../Store/User/User.Selector';

@Component({
  selector: 'app-rolepopup',
  templateUrl: './rolepopup.component.html',
  styleUrl: './rolepopup.component.css'
})
export class RolepopupComponent implements OnInit {;

  rolelist: Roles[];
  userinfo!: Userinfo;

  constructor(private store: Store, private builder: FormBuilder, private ref: MatDialogRef<RolepopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.store.dispatch(getroles())
    this.store.select(getallroles).subscribe(item => {
      this.rolelist = item;})
      if (this.data != null) {
        this.store.dispatch(getuserbycode({ username: this.data.code }))
        this.store.select(getUserbycode).subscribe(item => {
          this.userinfo = item;
          this.roleform.setValue({
            username: this.userinfo.username,
            role: this.userinfo.role,
            id: this.userinfo.id
          })
        })
      }
  }

  roleform = this.builder.group({
    id: this.builder.control(0),
    username: this.builder.control({ value: '', disabled: true }),
    role: this.builder.control('', Validators.required)
  });

  Saveuserrole() {
    if (this.roleform.valid) {
      this.store.dispatch(updateuserrole({userrole:this.roleform.value.role as string,
       userid:this.roleform.value.id as number}))
       this.closepopup();
   }
  }

  closepopup() {
    this.ref.close()
  }

}
