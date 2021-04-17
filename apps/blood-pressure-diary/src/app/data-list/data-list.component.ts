import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { BloodPressureDateCreateDto } from '../dto/blood-pressure-date.create.dto';
import { PaginatedDatasource, Sort } from '../util/paginated-datasource';

export class BloodPressure {
  Systolic: number;
  Diastolic: number;
  Pulse: number;
  Date: Date;
  Id: number;
  UserId: number;
}

@Component({
  selector: 'blood-pressure-diary-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['Systolic', 'Diastolic', 'Pulse', 'Date', 'actions'];

  private initialSort: Sort<BloodPressure> = { property: 'Date', order: 'DESC' };

  public dataSource = new PaginatedDatasource<BloodPressure, Partial<BloodPressure>>(
    (request, query) => this.dataService.getPage(request, query),
    this.initialSort,
    {},
    10
  )

  @ViewChild(MatSort) sort: MatSort;
  private sortSubscription: Subscription;

  constructor(private readonly dataService: DataService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // The matSort has three options for sort: 'asc' | 'desc' | ''. With disable clear the '' - unknown state is deactivated
    this.sort.disableClear = true;
    this.sortSubscription = this.sort.sortChange.subscribe(change => {
      this.dataSource.sortBy({ property: change.active, order: change.direction.toUpperCase() });
    });
  }

  ngOnDestroy(): void {
    this.sortSubscription.unsubscribe();
  }

  edit(data: BloodPressure) {
    return; // TODO: Open Popup letting the user editing the data (Maybe use inline editing)
    this.dataService.saveData(data as BloodPressureDateCreateDto).subscribe(
      success => {
        this.snackBar.open(`Gespeichert`, ``, {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });

        // Refresh the UI 
        // TODO? It might be better for performance not requesting the page again, but how to access the datasources current page from here?
        this.dataSource.queryBy({});

      },
      error => {
        console.error(error);
      }
    );
  }

  delete(data: BloodPressure) {
    const dialogRef = this.dialog.open(BloodPressureDiaryDeleteDialogComponent, {
      data
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result === true) {
          this.dataService.deleteData(data.Id).subscribe(
            success => {
              this.snackBar.open(`Gelöscht`, ``, {
                duration: 2000,
                panelClass: ['mat-toolbar', 'mat-primary']
              });

              // Refresh UI
              this.dataSource.queryBy({});

            }, error => {
              console.error(error);
            }
          );
        }
      }
    )
  }
}

@Component({
  selector: 'blood-pressure-diary-delete-dialog',
  template: `
    <h2 mat-dialog-title>Eintrag löschen?</h2>
    <mat-dialog-content class="mat-typography">
      Soll der Eintrag ({{data.Date | date: 'dd.MM.YYYY HH:mm' }}) gelöscht werden?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Abbrechen</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Löschen</button>
    </mat-dialog-actions>
  `
})
export class BloodPressureDiaryDeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data) { }
}