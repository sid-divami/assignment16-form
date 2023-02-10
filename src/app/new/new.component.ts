import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { CrudService } from '../service/crud.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit {
  data: any;
  users: User[] = [];
  AdditionalValue;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: CrudService
  ) {
    this.data =
      this.router.getCurrentNavigation()?.extras.state?.['submittedData'];
    this.AdditionalValue =
      this.router.getCurrentNavigation()?.extras.state?.['AdditionalData'];
  }
  // Fetch User Data
  getAllUsers() {
    this.http.getAllUsers().subscribe(
      (res) => {
        this.data = res;
        console.log(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
    this.getAllUsers();
  }
}
