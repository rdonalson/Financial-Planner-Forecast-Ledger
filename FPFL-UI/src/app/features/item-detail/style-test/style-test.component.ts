import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-style-test',
  templateUrl: './style-test.component.html',
  styleUrls: ['./style-test.component.scss']
})
export class StyleTestComponent implements OnInit {
  pageTitle: string = 'Manage Debits';
  constructor() { }

  ngOnInit(): void {
  }

}
