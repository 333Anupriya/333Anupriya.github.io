import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageProductsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
