import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent {
  data: any;
  AdditionalValue;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.data =
      this.router.getCurrentNavigation()?.extras.state?.['submittedData'];
    this.AdditionalValue =
      this.router.getCurrentNavigation()?.extras.state?.['AdditionalData'];
  }
}
