import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DiagramAllModule, SymbolPaletteAllModule, OverviewAllModule } from '@syncfusion/ej2-angular-diagrams';
import { ContextMenuModule, MenuModule, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule, TooltipModule } from '@syncfusion/ej2-angular-popups';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { DropDownListModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule, RadioButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxModule, SliderModule, UploaderModule, ColorPickerModule, Slider } from '@syncfusion/ej2-angular-inputs';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, DiagramAllModule, SymbolPaletteAllModule, ListViewModule,
    NumericTextBoxModule, DropDownButtonModule, ContextMenuModule, SliderModule,
    ToolbarModule, MenuModule, DropDownListModule, ButtonModule, RadioButtonModule, UploaderModule,
    DialogModule, CheckBoxModule, MultiSelectAllModule, TooltipModule, ColorPickerModule, OverviewAllModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
