import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatDatepickerModule, MatDatepicker} from '@angular/material/datepicker';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatStepperModule} from '@angular/material/stepper';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
    imports: [
                MatButtonModule, MatToolbarModule, MatTableModule, MatTabsModule , MatIconModule,
                MatProgressSpinnerModule,
                MatInputModule,
                MatFormFieldModule,
                MatDialogModule,
                MatDatepickerModule,
                MatSnackBarModule,
                MatTooltipModule,
                MatCardModule,
                MatPaginatorModule,
                MatListModule,
                MatSidenavModule,
                MatMenuModule,
                MatDividerModule,
                MatSelectModule,
                MatRadioModule,
                MatExpansionModule,
                MatBadgeModule,
                MatStepperModule,
                MatAutocompleteModule,
                MatCheckboxModule,
                MatNativeDateModule
             ],
    exports: [
                MatButtonModule,
                MatToolbarModule,
                MatTableModule,
                MatTabsModule,
                MatIconModule,
                MatProgressBarModule,
                MatProgressSpinnerModule,
                MatInputModule,
                MatFormFieldModule,
                MatDialogModule,
                MatDatepickerModule,
                MatSnackBarModule,
                MatTooltipModule,
                MatCardModule,
                MatPaginatorModule,
                MatListModule,
                MatSidenavModule,
                MatMenuModule,
                MatDividerModule,
                MatSelectModule,
                MatRadioModule,
                MatStepperModule,
                MatAutocompleteModule,
                MatCheckboxModule,
                MatExpansionModule,
                MatBadgeModule,
                MatNativeDateModule
            ],
            providers: [
                MatDatepickerModule,
                {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
                    verticalPosition: 'top', horizontalPosition: 'center', duration: 25000}
                },
                {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {closeOnNavigation: true}}
            ]
})

export class AppmaterialModule { }
