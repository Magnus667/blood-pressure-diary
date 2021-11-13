import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Medication } from '@blood-pressure-diary/api-interfaces';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { MedicationCreateDto } from '../dto/medication.create.dto';
import { PaginatedDatasource, Sort } from '../util/paginated-datasource';

@Component({
  selector: 'bpd-medication-list',
  templateUrl: './medication-list.component.html',
  styleUrls: ['./medication-list.component.scss'],
})
export class MedicationListComponent implements OnInit {
  displayedColumns: string[] = [
    'MedicineName',
    'Dosage',
    'Timestamp',
    'actions',
  ];

  private initialSort: Sort<Medication> = {
    property: 'Timestamp',
    order: 'DESC',
  };

  public dataSource = new PaginatedDatasource<Medication, Partial<Medication>>(
    (request, query) => this.dataService.getMedicationPage(request, query),
    this.initialSort,
    {},
    10
  );

  @ViewChild(MatSort) sort: MatSort;
  private sortSubscription: Subscription;

  constructor(
    private readonly dataService: DataService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSource.page$.subscribe((res) => {
      console.log(res);
    });
  }

  ngAfterViewInit(): void {
    // The matSort has three options for sort: 'asc' | 'desc' | ''. With disable clear the '' - unknown state is deactivated
    this.sort.disableClear = true;
    this.sortSubscription = this.sort.sortChange.subscribe((change) => {
      this.dataSource.sortBy({
        property: change.active,
        order: change.direction.toUpperCase(),
      });
    });
  }

  ngOnDestroy(): void {
    this.sortSubscription.unsubscribe();
  }

  edit(data: Medication) {
    return; // TODO: Open Popup letting the user editing the data (Maybe use inline editing)
    this.dataService.saveMedication(data as MedicationCreateDto).subscribe(
      (success) => {
        this.snackBar.open(`Gespeichert`, ``, {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-primary'],
        });

        // Refresh the UI
        // TODO? It might be better for performance not requesting the page again, but how to access the datasources current page from here?
        this.dataSource.queryBy({});
      },
      (error) => {
        console.error(error);
      }
    );
  }

  delete(data: Medication) {
    const dialogRef = this.dialog.open(MedicationDeleteDialogComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.dataService.deleteMedication(data.Id).subscribe(
          (success) => {
            this.snackBar.open(`Gelöscht`, ``, {
              duration: 2000,
              panelClass: ['mat-toolbar', 'mat-primary'],
            });

            // Refresh UI
            this.dataSource.queryBy({});
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }
}

@Component({
  selector: 'medication-delete-dialog',
  template: `
    <h2 mat-dialog-title>Eintrag löschen?</h2>
    <mat-dialog-content class="mat-typography">
      Soll der Eintrag ({{ data.Timestamp | date: 'dd.MM.YYYY HH:mm' }})
      gelöscht werden?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Abbrechen</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>
        Löschen
      </button>
    </mat-dialog-actions>
  `,
})
export class MedicationDeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}
}
