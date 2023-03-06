import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-todofilter',
  templateUrl: './todofilter.component.html',
  styleUrls: ['./todofilter.component.css']
})
export class TodofilterComponent implements OnInit {
  currentRoute = 'all';

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.currentRoute$.subscribe(
      currentRoute => this.currentRoute = currentRoute
    );

  }

}
