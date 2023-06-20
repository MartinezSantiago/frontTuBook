import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-list-loans',
  templateUrl: './list-loans.component.html',
  styleUrls: ['./list-loans.component.css']
})
export class ListLoansComponent {
  @Input() loans: any;
}
