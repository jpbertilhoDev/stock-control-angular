import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//*IMPORTS PRIMENG
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { SidebarNavigationComponent } from './components/sidebar-navigation/sidebar-navigation.component';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';



@NgModule({
  declarations: [SidebarNavigationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    //*PRIMENG
    ToolbarModule,
    SidebarModule,
    CardModule,
    ButtonModule,
    MenuModule


  ],
  exports: [SidebarNavigationComponent  ],
  providers: [DialogService, CurrencyPipe]
})
export class SharedModule { }
