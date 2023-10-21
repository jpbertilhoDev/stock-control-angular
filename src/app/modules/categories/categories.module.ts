import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

 // OTHER IMPORTS

import { CATEGORIES_ROUTES } from './categories.routing';
import { CategoriesHomeComponent } from './page/categories-home/categories-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';

//PRIME NG IMPORTS

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [CategoriesHomeComponent, CategoriesTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(CATEGORIES_ROUTES),
    SharedModule,
    HttpClientModule,

    //PRIME NG IMPORTS

    CardModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule,

  ],
  providers: [DialogService, ConfirmationService],
})
export class CategoriesModule {}
