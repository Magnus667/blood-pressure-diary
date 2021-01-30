import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'blood-pressure-diary-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {

  public data: any[] = [
    {
      Systolic: 12,
      Diastolic: 13,
      Pulse: 14
    }
  ];

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.data = data;
    })
  }


  displayedColumns: string[] = ['Systolic', 'Diastolic', 'Pulse', 'Date'];

}
