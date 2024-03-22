import { Users } from './../../Store/Model/User.model';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { getusers } from '../../Store/User/User.action';
import { getuserlist } from '../../Store/User/User.Selector';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RolepopupComponent } from '../rolepopup/rolepopup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent implements OnInit {
  userlist: Users[] = []; // Declaring userlist as an array of Users
  displayedColumns: string[] = [
    'username',
    'name',
    'email',
    'role',
    'status',
    'action',
  ];
  dataSource: MatTableDataSource<Users>; // Corrected datasource declaration
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.userlist); // Initialize datasource
  }

  ngOnInit(): void {
    this.store.dispatch(getusers());
    this.store.select(getuserlist).subscribe((items: Users[]) => {
      this.userlist = items; // Assign the received array of users to userlist
      this.dataSource.data = this.userlist; // Update the data in dataSource
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  FunctionChangeRole(username: string) {
    this.OpenPopup(username);
  }

  OpenPopup(username: string) {
    this.dialog.open(RolepopupComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        code: username,
      },
    });
  }
}
