import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SupermercadoComponent } from './view/supermercado.component';
import { FulladdressPipe } from '../pipes/fulladdress.pipe';
import { AddMercadoComponent } from './add-mercado/add-mercado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditMercadoComponent } from './edit-mercado/edit-mercado.component';
import { DarkenOnHoverModule } from '../directives/darken-on-hover/darken-on-hover.module';
import { flyToLocationModule } from '../directives/fly-to-location/fly-to-location.module';
import { biggerOnHoverModule } from '../directives/bigger-on-hover/bigger-on-hover.module';
import { VMessageComponent } from '../vmessage/vmessage.component';
import { VMessageModule } from '../vmessage/vmessage.module';

@NgModule({
  declarations: [SupermercadoComponent, FulladdressPipe, AddMercadoComponent, EditMercadoComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    VMessageModule,
    ReactiveFormsModule,
    DarkenOnHoverModule,
    flyToLocationModule,
    biggerOnHoverModule,
    FormsModule
  ],
  providers: [FulladdressPipe],
  exports: [
    SupermercadoComponent
  ]

})
export class SupermercadoModule { }
