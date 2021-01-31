import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';

interface TableData {
  Systolic: number,
  Diastolic: number,
  Pulse: number,
  Date: Date
}

@Component({
  selector: 'blood-pressure-diary-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Systolic', 'Diastolic', 'Pulse', 'Date'];
  dataSource: MatTableDataSource<TableData>;

  @ViewChild(MatSort) sort: MatSort;

  public data: any[] = [];

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.data = data;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      console.log(this.data);
    })
  }

  ngAfterViewInit(){
    // this.dataSource.sort = this.sort;
  }




}
