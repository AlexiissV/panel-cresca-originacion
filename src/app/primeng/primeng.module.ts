import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {StepsModule} from 'primeng/steps';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TabViewModule } from 'primeng/tabview';
import { FieldsetModule } from 'primeng/fieldset';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { BadgeModule } from 'primeng/badge';
import { CheckboxModule } from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    StepsModule,
    RadioButtonModule,
    InputMaskModule,
    InputTextareaModule,
    InputSwitchModule,
    AutoCompleteModule,
    DropdownModule,
    DialogModule,
    ToastModule,
    TableModule,
    InputNumberModule,
    DynamicDialogModule,
    TabViewModule,
    FieldsetModule,
    TagModule,
    CardModule,
    PanelModule,
    BadgeModule,
    CheckboxModule,
    MessagesModule,
    CalendarModule
  ],
  exports:[
    InputTextModule,
    ButtonModule,
    StepsModule,
    RadioButtonModule,
    InputMaskModule,
    InputTextareaModule,
    InputSwitchModule,
    AutoCompleteModule,
    DropdownModule,
    DialogModule,
    ToastModule,
    TableModule,
    InputNumberModule,
    DynamicDialogModule,
    TabViewModule,
    FieldsetModule,
    TagModule,
    CardModule,
    PanelModule,
    BadgeModule,
    CheckboxModule,
    MessagesModule,
    CalendarModule
  ]
})
export class PrimengModule { }
