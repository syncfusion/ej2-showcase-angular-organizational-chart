import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DiagramComponent, Diagram, TreeInfo, RulerSettingsModel, SnapSettings, SnapSettingsModel, SnapConstraints, ConnectorModel, Connector, ConnectorConstraints, NodeModel, NodeConstraints, StackPanel, randomId, TextElement, ImageElement, PathElement, SelectorModel, SelectorConstraints, UserHandleModel, ScrollSettingsModel, PageSettingsModel, UserHandleEventsArgs, ISelectionChangeEventArgs, IHistoryChangeArgs, IScrollChangeEventArgs, ZoomOptions } from '@syncfusion/ej2-angular-diagrams';
import { MenuItemModel } from '@syncfusion/ej2-navigations';
import { DropDownDataSources } from '../script/dropdowndatasource';
import { DataManager } from '@syncfusion/ej2-data';
import { DiagramClientSideEvents } from '../script/events';
import { UtilityMethods } from '../script/utilitymethod';
import { AnimationSettingsModel } from '@syncfusion/ej2-angular-popups';
import { ButtonModel, ButtonComponent, ClickEventArgs, ChangeArgs } from '@syncfusion/ej2-angular-buttons';
import { MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { EmitType } from '@syncfusion/ej2-base';
import { IChangedEventArgs } from '@syncfusion/ej2-angular-charts';
import { IColorPickerEventArgs } from '@syncfusion/ej2-angular-richtexteditor';
import { ChangeEventArgs as NumericChangeEventArgs } from '@syncfusion/ej2-inputs';
import { CheckBoxChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { SelectEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { ChangeEventArgs, SelectedEventArgs, SliderChangeEventArgs, UploaderComponent } from '@syncfusion/ej2-angular-inputs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('diagram')
  public diagram: DiagramComponent | undefined;

  @ViewChild('modalButton')
  public modalButton: ButtonComponent | undefined;

  @ViewChild('defaultupload')
  public defaultupload: UploaderComponent | undefined;

  public dropDownDataSources: DropDownDataSources = new DropDownDataSources();

  public clientSideEvents: DiagramClientSideEvents = new DiagramClientSideEvents();

  public utilityMethods: UtilityMethods = new UtilityMethods();

  public value: string = 'Aharoni';
  public fontSizeValue: string = '12';
  public formatValue: string = 'JPG';
  public regionsValue: string = 'Page Settings';
  public mode: string | undefined;
  public filterPlaceholder: string | undefined;
  public popHeight: string = '350px';
  public mintype: string = 'MinRange';
  public header: string = 'Properties';
  public exportHeader: string = 'Export Diagram';
  public searchHeader: string = "Search Nodes";
  public showCloseIcon: Boolean = true;
  public width: string = '400px';
  public animationSettings: AnimationSettingsModel = { effect: 'None' };
  public target: HTMLElement = document.body;
  public searchTarget : any ='.db-general-diagram-prop-container' 
  public visible: Boolean = false;
  public zoomSlidervalue: number = 56;

  public multiCheckboxValue = [
    'Name', 'Desig'
  ];

  public fields: object = { text: 'text', value: 'value' };

  public matchingNodes = [];

  public currentIndex: number = 0;

  public path: object = {
    saveUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Remove'
  };

  public onOpen(args: any) {
    var multiCheckbox = (document.getElementById("multiCheckbox") as any).ej2_instances[0];
    const lis = multiCheckbox.liCollections[0];
    lis.classList.add('e-disabled');
    lis.style.pointerEvents = 'auto';
  }


  ngOnInit(): void {
    this.mode = 'CheckBox';
    this.filterPlaceholder = 'Search Data';
  }
  public ngAfterViewInit(): void {
  }
  public buttonContent: string = "Download Example CSV";
  public extensionType: string = ".csv";
  // Data source for the layout.
  public item: Object[] = [
    {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": "parent", "Name": "Maria Anders", "Designation": "Managing Director",
      "IsExpand": "true", "RatingColor": "#C34444", "ImageUrl": '../../assets/images/maria.png', "EmployeeID": 'SYNC1001', "Team": "TypeScript", "EmailId": 'maria.anders@gmail.com', "PhoneNumber": '0324 - 1819301'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 1, "Name": "Ana Trujillo", "Designation": "Project Manager",
      "IsExpand": "false",
      "RatingColor": "#68C2DE", "ReportingPerson": "parent", "ImageUrl": '../../assets/images/carlos.png', "EmployeeID": 'SYNC1002', "Team": "Java", "EmailId": 'ana.truj@gmail.com', "PhoneNumber": '0324 - 1819302'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 2, "Name": "Anto Moreno", "Designation": "Project Lead",
      "IsExpand": "false",
      "RatingColor": "#93B85A", "ReportingPerson": 1, "ImageUrl": '../../assets/images/daniel.png', "EmployeeID": 'SYNC1003', "Team": "Windows", "EmailId": 'ana.moreno@gmail.com', "PhoneNumber": '0324 - 1819303'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 3, "Name": "Thomas Hardy", "Designation": "Senior S/w Engg",
      "IsExpand": "false",
      "RatingColor": "#68C2DE", "ReportingPerson": 2, "ImageUrl": '../../assets/images/jaime.png', "EmployeeID": 'SYNC1004', "Team": "UX", "EmailId": 'thomos.hardy@gmail.com', "PhoneNumber": '0324 - 1819304'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 4, "Name": "Christina kaff", "Designation": "S/w Engg",
      "IsExpand": "false",
      "RatingColor": "#93B85A", "ReportingPerson": 3, "ImageUrl": '../../assets/images/felipe.png', "EmployeeID": 'SYNC1005', "Team": "UX", "EmailId": 'chris.kaff@gmail.com', "PhoneNumber": '0324 - 1819305'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 5, "Name": "Hanna Moos", "Designation": "Project Trainee",
      "IsExpand": "true",
      "RatingColor": "#D46E89", "ReportingPerson": 4, "ImageUrl": '../../assets/images/helen.png', "EmployeeID": 'SYNC1006', "Team": "Windows", "EmailId": 'hanna.moos@gmail.com', "PhoneNumber": '0324 - 1819306'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 6, "Name": "Peter Citeaux", "Designation": "S/w Engg",
      "IsExpand": "true",
      "RatingColor": "#68C2DE", "ReportingPerson": 5, "ImageUrl": '../../assets/images/rene.png', "EmployeeID": 'SYNC1007', "Team": "Java", "EmailId": 'peter.cite@gmail.com', "PhoneNumber": '0324 - 1819307'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 7, "Name": "Martín Kloss", "Designation": "Project Trainee",
      "IsExpand": "false",
      "RatingColor": "#93B85A", "ReportingPerson": 6, "ImageUrl": '../../assets/images/yoshi.png', "EmployeeID": 'SYNC1008', "Team": "UX", "EmailId": 'martin.kloss@gmail.com', "PhoneNumber": '0324 - 1819308'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 8, "Name": "Elizabeth Mary", "Designation": "Project Trainee",
      "IsExpand": "None",
      "RatingColor": "#93B85A", "ReportingPerson": 6, "ImageUrl": '../../assets/images/yvonne.png', "EmployeeID": 'SYNC1009', "Team": "Java", "EmailId": 'elizabeth.marys@gmail.com', "PhoneNumber": '0324 - 1819309'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 9, "Name": "Victoria Ash", "Designation": "Senior S/w Engg",
      "IsExpand": "None",
      "RatingColor": "#D46E89", "ReportingPerson": 5, "ImageUrl": '../../assets/images/carlos.png', "EmployeeID": 'SYNC1010', "Team": "React", "EmailId": 'victoria.ash@gmail.com', "PhoneNumber": '0324 - 1819310'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 10, "Name": "Francisco Yang", "Designation": "Senior S/w Engg",
      "IsExpand": "None",
      "RatingColor": "#93B85A", "ReportingPerson": 3, "ImageUrl": '../../assets/images/maria.png', "EmployeeID": 'SYNC1011', "Team": "Java", "EmailId": 'francisco.yang@gmail.com', "PhoneNumber": '0324 - 1819311'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 17, "Name": "Ann Devon", "Designation": "Project Manager",
      "IsExpand": "false",
      "RatingColor": "#68C2DE", "ReportingPerson": 25, "ImageUrl": '../../assets/images/yoshi-kenna.png', "EmployeeID": 'SYNC1012', "Team": "UX", "EmailId": 'Ann.devon@gmail.com', "PhoneNumber": '0324 - 1819312'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 18, "Name": "Roland Mendel", "Designation": "Project Lead",
      "IsExpand": "true",
      "RatingColor": "#68C2DE", "ReportingPerson": 17, "ImageUrl": '../../assets/images/carlos.png', "EmployeeID": 'SYNC1013', "Team": "UX", "EmailId": 'roland.mendel@gmail.com', "PhoneNumber": '0324 - 1819313'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 19, "Name": "Aria Cruz", "Designation": "Senior S/w Engg",
      "IsExpand": "false",
      "RatingColor": "#93B85A", "ReportingPerson": 18, "ImageUrl": '../../assets/images/daniel.png', "EmployeeID": 'SYNC1014', "Team": "Angular", "EmailId": 'aria.cruz@gmail.com', "PhoneNumber": '0324 - 1819314'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 20, "Name": "Martine Rancé", "Designation": "S/w Engg",
      "IsExpand": "None",
      "RatingColor": "#93B85A", "ReportingPerson": 18, "ImageUrl": '../../assets/images/helen.png', "EmployeeID": 'SYNC1015', "Team": "UX", "EmailId": 'martina.rance@gmail.com', "PhoneNumber": '0324 - 1819315'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 21, "Name": "Maria Larsson", "Designation": "Project Trainee",
      "IsExpand": "false",
      "RatingColor": "#EBB92E", "ReportingPerson": 19, "ImageUrl": '../../assets/images/maria.png', "EmployeeID": 'SYNC1016', "Team": "UX", "EmailId": 'maria.larsson@gmail.com', "PhoneNumber": '0324 - 1819316'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 22, "Name": "Diego Roel", "Designation": "Project Trainee",
      "IsExpand": "false",
      "RatingColor": "#D46E89", "ReportingPerson": 21, "ImageUrl": '../../assets/images/jaime.png', "EmployeeID": 'SYNC1017', "Team": "TypeScript", "EmailId": 'diego.roel@gmail.com', "PhoneNumber": '0324 - 1819317'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 23, "Name": "Peter Franken", "Designation": "Project Trainee",
      "IsExpand": "None",
      "RatingColor": "#D46E89", "ReportingPerson": 21, "ImageUrl": '../../assets/images/felipe.png', "EmployeeID": 'SYNC1018', "Team": "JavaScript", "EmailId": 'peter.franken@gmail.com', "PhoneNumber": '0324 - 1819318'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 25, "Name": "Carine Schmitt", "Designation": "Project Manager",
      "IsExpand": "None",
      "RatingColor": "#EBB92E", "ReportingPerson": "parent", "ImageUrl": '../../assets/images/maria.png', "EmployeeID": 'SYNC1019', "Team": "Java", "EmailId": 'carine.schmit@gmail.com', "PhoneNumber": '0324 - 1819319'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 26, "Name": "Paolo Accorti", "Designation": "Project Lead",
      "IsExpand": "None",
      "RatingColor": "#D46E89", "ReportingPerson": 36, "ImageUrl": '../../assets/images/yvonne.png', "EmployeeID": 'SYNC1020', "Team": "React", "EmailId": 'paolo.acc@gmail.com', "PhoneNumber": '0324 - 1819320'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 27, "Name": "Eduardo Roel", "Designation": "Senior S/w Engg",
      "IsExpand": "true",
      "RatingColor": "#93B85A", "ReportingPerson": 26, "ImageUrl": '../../assets/images/sergio.png', "EmployeeID": 'SYNC1021', "Team": "JavaScript", "EmailId": 'eduardo.roel@gmail.com', "PhoneNumber": '0324 - 1819321'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 28, "Name": "José Pedro", "Designation": "Senior S/w Engg",
      "IsExpand": "true",
      "RatingColor": "#D46E89", "ReportingPerson": 27, "ImageUrl": '../../assets/images/yoshi-kenna.png', "EmployeeID": 'SYNC1022', "Team": "Java", "EmailId": 'josé.pedro@gmail.com', "PhoneNumber": '0324 - 1819322'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 29, "Name": "André Fonseca", "Designation": "Senior S/w Engg",
      "IsExpand": "true",
      "RatingColor": "#EBB92E", "ReportingPerson": 28, "ImageUrl": '../../assets/images/joseph.png', "EmployeeID": 'SYNC1023', "Team": "React", "EmailId": 'andré.fonseca@gmail.com', "PhoneNumber": '0324 - 1819323'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 30, "Name": "Howard Snyd", "Designation": "S/w Engg",
      "IsExpand": "false",
      "RatingColor": "#68C2DE", "ReportingPerson": 29, "ImageUrl": '../../assets/images/simon.png', "EmployeeID": 'SYNC1024', "Team": "JavaScript", "EmailId": 'howard.synd@gmail.com', "PhoneNumber": '0324 - 1819324'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 31, "Name": "Manu Pereira", "Designation": "Project Trainee",
      "IsExpand": "None",
      "RatingColor": "#D46E89", "ReportingPerson": 29, "ImageUrl": '../../assets/images/maria.png', "EmployeeID": 'SYNC1025', "Team": "JavaScript", "EmailId": 'manu.periera@gmail.com', "PhoneNumber": '0324 - 1819325'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 32, "Name": "Mario Pontes", "Designation": "S/w Engg",
      "IsExpand": "None",
      "RatingColor": "#D46E89", "ReportingPerson": 29, "ImageUrl": '../../assets/images/annette.png', "EmployeeID": 'SYNC1026', "Team": "Java", "EmailId": 'mario.pontes@gmail.com', "PhoneNumber": '0324 - 1819326'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 33, "Name": "Carlos Schmitt", "Designation": "Project Trainee",
      "IsExpand": "None",
      "RatingColor": "#D46E89", "ReportingPerson": 29, "ImageUrl": '../../assets/images/maria.png', "EmployeeID": 'SYNC1027', "Team": "React", "EmailId": 'carlos.schmitt@gmail.com', "PhoneNumber": '0324 - 1819327'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 34, "Name": "Yoshi Latimer", "Designation": "Project Trainee",
      "IsExpand": "true",
      "RatingColor": "#D46E89", "ReportingPerson": 29, "ImageUrl": '../../assets/images/daniel.png', "EmployeeID": 'SYNC1028', "Team": "React", "EmailId": 'yoshi.latimer@gmail.com', "PhoneNumber": '0324 - 1819328'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 35, "Name": "Patricia Kenna", "Designation": "Project Trainee",
      "IsExpand": "true",
      "RatingColor": "#EBB92E", "ReportingPerson": 29, "ImageUrl": '../../assets/images/helen.png', "EmployeeID": 'SYNC1029', "Team": "JavaScript", "EmailId": 'patricia.kenna@gmail.com', "PhoneNumber": '0324 - 1819329'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 36, "Name": "Helen Bennett", "Designation": "Project Lead",
      "IsExpand": "None",
      "RatingColor": "#D46E89", "ReportingPerson": 25, "ImageUrl": '../../assets/images/rene.png', "EmployeeID": 'SYNC1030', "Team": "Java", "EmailId": 'helen.bennette@gmail.com', "PhoneNumber": '0324 - 1819330'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 65, "Name": "Alej Camino", "Designation": "Project Manager",
      "IsExpand": "false",
      "RatingColor": "#93B85A", "ReportingPerson": "parent", "ImageUrl": '../../assets/images/carlos.png', "EmployeeID": 'SYNC1031', "Team": "Windows", "EmailId": 'aleg.camino@gmail.com', "PhoneNumber": '0324 - 1819331'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 66, "Name": "Jonas Bergsen", "Designation": "Project Lead",
      "IsExpand": "None",
      "RatingColor": "#68C2DE", "ReportingPerson": 65, "ImageUrl": '../../assets/images/joseph.png', "EmployeeID": 'SYNC1032', "Team": "JavaScript", "EmailId": 'jonas.bergsen@gmail.com', "PhoneNumber": '0324 - 1819332'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 67, "Name": "Jose Pavarotti", "Designation": "Project Trainee",
      "IsExpand": "None",
      "RatingColor": "#D46E89", "ReportingPerson": 68, "ImageUrl": '../../assets/images/maria.png', "EmployeeID": 'SYNC1033', "Team": "Windows", "EmailId": 'jose.pavarotti@gmail.com', "PhoneNumber": '0324 - 1819333'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 68, "Name": "Miguel Angel", "Designation": "Senior S/w Engg",
      "IsExpand": "None",
      "RatingColor": "#D46E89", "ReportingPerson": 66, "ImageUrl": '../../assets/images/yoshi.png', "EmployeeID": 'SYNC1034', "Team": "Angular", "EmailId": 'miguel.angel@gmail.com', "PhoneNumber": '0324 - 1819334'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 69, "Name": "Jytte Petersen", "Designation": "Senior S/w Engg",
      "IsExpand": "true",
      "RatingColor": "#68C2DE", "ReportingPerson": 68, "ImageUrl": '../../assets/images/felipe.png', "EmployeeID": 'SYNC1035', "Team": "Angular", "EmailId": 'jytte.petersen@gmail.com', "PhoneNumber": '0324 - 1819335'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 70, "Name": "Kloss Perrier", "Designation": "Project Lead",
      "IsExpand": "None",
      "RatingColor": "#93B85A", "ReportingPerson": 72, "ImageUrl": '../../assets/images/jytte.png', "EmployeeID": 'SYNC1036', "Team": "JavaScript", "EmailId": 'closs.perrier@gmail.com', "PhoneNumber": '0324 - 1819336'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 71, "Name": "Art Nancy", "Designation": "Senior S/w Engg",
      "IsExpand": "true",
      "RatingColor": "#D46E89", "ReportingPerson": 27, "ImageUrl": '../../assets/images/rene.png', "EmployeeID": 'SYNC1037', "Team": "Java", "EmailId": 'art.nancy@gmail.com', "PhoneNumber": '0324 - 1819337'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 72, "Name": "Pascal Cartrain", "Designation": "Project Lead",
      "IsExpand": "true",
      "RatingColor": "#EBB92E", "ReportingPerson": 65, "ImageUrl": '../../assets/images/renete.png', "EmployeeID": 'SYNC1038', "Team": "Vue", "EmailId": 'pascal.cartrain@gmail.com', "PhoneNumber": '0324 - 1819338'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 73, "Name": "Liz Nixon", "Designation": "Senior S/w Engg",
      "IsExpand": "false",
      "RatingColor": "#68C2DE", "ReportingPerson": 68, "ImageUrl": '../../assets/images/maria.png', "EmployeeID": 'SYNC1039', "Team": "JavaScript", "EmailId": 'liz.nixon@gmail.com', "PhoneNumber": '0324 - 1819339'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 89, "Name": "Georg Pipps", "Designation": "Senior S/w Engg",
      "IsExpand": "None",
      "RatingColor": "#EBB92E", "ReportingPerson": "parent", "ImageUrl": '../../assets/images/rene.png', "EmployeeID": 'SYNC1040', "Team": "Java", "EmailId": 'georg.pipps@gmail.com', "PhoneNumber": '0324 - 1819340'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 30, "Name": "Isabel Castro", "Designation": "Project Trainee",
      "IsExpand": "None",
      "RatingColor": "#D46E89", "ReportingPerson": 89, "ImageUrl": '../../assets/images/jhon.png', "EmployeeID": 'SYNC1041', "Team": "Windows", "EmailId": 'isabel.castro@gmail.com', "PhoneNumber": '0324 - 1819341'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 90, "Name": "Rene Phillips", "Designation": "Project Trainee",
      "IsExpand": "false",
      "RatingColor": "#68C2DE", "ReportingPerson": 89, "ImageUrl": '../../assets/images/jytte.png', "EmployeeID": 'SYNC1042', "Team": "JavaScript", "EmailId": 'rene.phillips@gmail.com', "PhoneNumber": '0324 - 1819342'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 91, "Name": "Lúcia Carvalho", "Designation": "Project Trainee",
      "IsExpand": "None",
      "RatingColor": "#93B85A", "ReportingPerson": 89, "ImageUrl": '../../assets/images/yoshi-kenna.png', "EmployeeID": 'SYNC1043', "Team": "Java", "EmailId": 'lúcia.carvalho@gmail.com', "PhoneNumber": '0324 - 1819343'
    }, {
      "Fill": "white", "StrokeColor": "black", "FontFamily": "Arial", "IsBold": false, "IsItalic": false, "Decoration": "None", "FontSize": 12, "color": "black", "Id": 92, "Name": "Horst Kloss", "Designation": "Project Trainee",
      "IsExpand": "None",
      "RatingColor": "#D46E89", "ReportingPerson": 89, "ImageUrl": '../../assets/images/helen.png', "EmployeeID": 'SYNC1044', "Team": "Angular", "EmailId": 'horst.kloss@gmail.com', "PhoneNumber": '0324 - 1819344'
    },
  ];
  // To get the node userhandle.
  public handles: UserHandleModel[] = [
    {
      name: 'Add New Child', pathData: 'M13.55896,0L18.461914,0 18.461914,13.557983 32,13.557983 32,18.481018 18.5,18.481018 18.5,32 13.55896,32 13.55896,18.481018 0,18.481018 0,13.557983 13.55896,13.557983z',
      offset: 1, side: 'Bottom', tooltip: { content: 'Add New Child', position: 'BottomRight' }
    },
    {
      name: 'Edit Fields', pathData: 'M19.312381,27.48482L18.503085,29.661004 20.944314,29.115917z M24.540007,21.633355L20.390685,25.734296 22.789237,28.131621 26.97936,24.028763z M27.175001,19.029084L25.962399,20.227547 28.408086,22.629793 29.616994,21.446061z M10.602995,15C5.8599977,15 1.999999,18.829 1.999999,23.536 1.999999,24.895 3.1159983,26 4.4899979,26L17.731456,26 17.992104,25.299033 18.172095,25.116051 18.171058,25.116051 23.266144,20.080393 23.156942,19.84575C22.697614,18.897562 22.06124,18.03375 21.28199,17.31 19.682991,15.82 17.592992,15 15.397993,15L12.999995,15z M12.999995,2C9.9420033,2 7.45401,4.467 7.45401,7.5 7.45401,9.947 9.1090055,12.123 11.478999,12.791 12.461997,13.068 13.535994,13.069 14.521991,12.791 16.891984,12.122 18.54598,9.9459996 18.54598,7.5 18.54598,4.467 16.057987,2 12.999995,2z M12.999995,0C17.160984,0 20.545975,3.3639994 20.545975,7.5 20.545975,9.6899061 19.575261,11.720467 17.995872,13.115179L17.808254,13.274325 17.879796,13.290484C19.650854,13.712344 21.290927,14.584437 22.645989,15.846 23.445364,16.590375 24.124036,17.454672 24.656125,18.399828L24.764509,18.599506 26.399983,16.983108C26.614001,16.772111 26.895004,16.666856 27.175756,16.666978 27.456508,16.6671 27.737007,16.772599 27.950018,16.983108L31.969938,20.961079 31.999967,21.450059C31.999967,21.74208,31.88095,22.027051,31.672944,22.233074L23.04003,30.684984 22.706048,30.770982 17.325118,31.973977C17.245102,31.991006 17.165085,31.999978 17.085069,31.999978 16.769093,31.999978 16.464103,31.863993 16.252069,31.619976 15.987118,31.314985 15.91113,30.89 16.054073,30.511035L16.987776,28 4.4899979,28C2.013999,28 0,25.997 0,23.536 0,18.633812 3.3858614,14.50334 7.9561033,13.332249L8.1918802,13.274945 8.0051279,13.116582C6.4251604,11.721779 5.4540157,9.6905622 5.4540157,7.5 5.4540157,3.3639994 8.8390064,0 12.999995,0z',
      visible: true, offset: 1, side: 'Top', margin: { top: 0, bottom: 0, left: 0, right: 0 }, tooltip: { content: 'Edit Fields', position: 'BottomRight' }
    },
  ];

  // Rename Implementation - Start
  public renameDiagram(args: MouseEvent): void {
    document.getElementsByClassName('db-diagram-name-container')[0].classList.add('db-edit-name');
    let element: HTMLInputElement = (document.getElementById('diagramEditable') as HTMLInputElement);
    element.value = (document.getElementById('diagramName') as any).innerHTML;
    element.focus();
    element.select();
  }

  // Event handler triggered when the diagram name is changed.
  public diagramNameChange(args: MouseEvent): void {
    (document.getElementById('diagramName') as any).innerHTML = (document.getElementById('diagramEditable') as HTMLInputElement).value;
    document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
    (document.getElementById("exportfileName") as any).value = (document.getElementById('diagramName') as any).innerHTML;
  }

  // Event handler triggered when the diagram name is changed.
  public diagramNameKeyDown(args: KeyboardEvent): void {
    if (args.which === 13) {
      (document.getElementById('diagramName') as any).innerHTML = (document.getElementById('diagramEditable') as HTMLInputElement).value;
      document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
    }
  };

  //Ruler settings to enable ruler
  public rulerSettings: RulerSettingsModel = {
    showRulers: true
  };

  //Snap Settings to disable diagram graph
  public snapSettings: SnapSettingsModel = {
    constraints: SnapConstraints.None
  };

  //Data to load layout
  public data: Object = {
    //sets the fields to bind
    id: 'Id', parentId: 'ReportingPerson',
    dataSource: new DataManager(this.item),
  };

  //Created event
  public created(args: any) {
    this.diagram?.fitToPage({ mode: 'Page', region: 'Content' });
    this.diagram?.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
  };

  public position: any = { X: 'right', Y: 'top' };

  public zoomMenuItems = [
    { text: 'Zoom In' },
    { text: 'Zoom Out' }, { text: 'Zoom to Fit' },
    { text: 'Zoom to 50%' },
    { text: 'Zoom to 100%' },
    { text: 'Zoom to 200%' },
  ]

  public zoomContent() {
    return Math.round((this.diagram as any).scrollSettings.currentZoom * 100) + ' %'
  };

  // To perform zoom operation
  public zoomChange(args: any) {
    var currentZoom = (this.diagram as any).scrollSettings.currentZoom;
    var zoom: ZoomOptions = {};
    switch (args.item.text) {
      case 'Zoom In':
        (this.diagram as any).zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
        break;
      case 'Zoom Out':
        (this.diagram as any).zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
        break;
      case 'Zoom to Fit':
        zoom.zoomFactor = 1 / currentZoom - 1;
        (this.diagram as any).zoomTo(zoom);
        break;
      case 'Zoom to 50%':
        if (currentZoom === 0.5) {
          currentZoom = 0;
          zoom.zoomFactor = (0.5 / currentZoom) - 1;
          (this.diagram as any).zoomTo(zoom);

        }
        else {
          zoom.zoomFactor = (0.5 / currentZoom) - 1;
          (this.diagram as any).zoomTo(zoom);
        }
        break;

      case 'Zoom to 100%':
        if (currentZoom === 1) {
          currentZoom = 0;
          zoom.zoomFactor = (1 / currentZoom) - 1;
          (this.diagram as any).zoomTo(zoom);
        }
        else {
          zoom.zoomFactor = (1 / currentZoom) - 1;
          (this.diagram as any).zoomTo(zoom);
        }
        break;
      case 'Zoom to 200%':
        if (currentZoom === 2) {
          currentZoom = 0;
          zoom.zoomFactor = (2 / currentZoom) - 1;
          (this.diagram as any).zoomTo(zoom);
        }
        else {
          zoom.zoomFactor = (2 / currentZoom) - 1;
          (this.diagram as any).zoomTo(zoom);
        }
        break;
    }
  }

  //Selected Items to enable userhandles
  public selectedItems: SelectorModel = {
    constraints: SelectorConstraints.All,
    userHandles: this.handles
  };

  //scrollSettings to assign minZoom and maxZoom
  public scrollSettings: ScrollSettingsModel = {
    minZoom: 0.3, maxZoom: 3.2
  };

  //PageSettings to customize the diagram page
  public pageSettings: PageSettingsModel = {
    background: { color: '#FFFFFF' }, margin: { left: 5, top: 5 },
    orientation: 'Landscape', showPageBreaks: false, multiplePage: false
  };

  //Layout
  public layout: Object = {
    type: 'OrganizationalChart',
    getLayoutInfo: (node: Node, options: TreeInfo) => {
      /* tslint:disable:no-string-literal */
      if (!options.hasSubTree) {
        options.type = 'Right';
      }
    }
  };

  //Nodedefaults to customize node
  public nodeDefaults(obj: NodeModel): NodeModel {
    obj.height = 50;
    obj.addInfo = { fill: 'white' }
    obj.constraints = NodeConstraints.Default & ~NodeConstraints.Rotate | NodeConstraints.Tooltip;
    obj.tooltip = { content: getContent(obj.data), position: 'BottomRight', relativeMode: 'Object' },
      obj.style = { fill: 'transparent', strokeWidth: 2 };
    obj.expandIcon = {
      height: 20,
      width: 20,
      iconColor: 'white',
      cornerRadius: 10,
      borderColor: 'black',
      shape: 'None',
      fill: 'black',
      offset: { x: 0.5, y: 1.2 },
      pathData: 'M16.261993,32L16.359985,31.934998 16.454987,32 16.48999,31.846008 32,20.705013 32,12.254999 16.359985,23.539014 0,12.254999 0,20.705013 15.77301,31.846008z'
    };
    obj.collapseIcon = {
      height: 20,
      width: 20,
      iconColor: 'white',
      cornerRadius: 10,
      borderColor: 'black',
      shape: 'None',
      fill: 'black',
      offset: { x: 0.5, y: 1.2 },
      pathData: 'M16.261993,0L16.359985,0.065002445 16.454987,0 16.48999,0.15399169 32,11.294986 32,19.745 16.359985,8.5149861 0,19.745 0,11.294986 16.22699,0.15399169z'
    };
    return obj;
  }

  //Connector defaults to customize connector
  public connDefaults(connector: Connector, diagram: Diagram): ConnectorModel {
    connector.targetDecorator.shape = 'None';
    connector.type = 'Orthogonal';
    connector.constraints = ConnectorConstraints.Default & ~ConnectorConstraints.Select;
    connector.style.strokeColor = 'gray';
    return connector;
  };
  public setNodeTemplate: Function = this.nodeTemplate.bind(this);

  //Node template to add image and text node
  private nodeTemplate(obj: NodeModel): StackPanel {
    let content = new StackPanel();
    content.id = obj.id + '_outerstack';
    content.orientation = 'Horizontal';
    content.style.strokeColor = (obj as any).data.StrokeColor;
    content.style.fill = (obj as any).data.Fill;
    content.padding = { left: 5, right: 10, top: 5, bottom: 5 };

    // Add the line at the top of the outer stack
    let line = new PathElement();
    line.data = 'M0,0 L1,0'; // Line from (0,0) to (1,0)
    line.width = 2;
    line.height = 1;
    line.style.strokeWidth = 2;
    (line.style as any).margin = { left: 20, right: 20, top: 20, bottom: 20 };
    line.style.strokeColor = ((obj as any).data).RatingColor;
    line.horizontalAlignment = 'Stretch';
    line.verticalAlignment = 'Top';
    line.id = obj.id + '_line';

    let image = new ImageElement();
    image.width = 50;
    image.height = 50;
    image.source = ((obj as any).data).ImageUrl ? ((obj as any).data).ImageUrl : '';
    image.id = obj.id + '_pic';
    image.style.strokeColor = 'transparent';
    image.style.fill = 'transparent';

    let innerStack = new StackPanel();
    innerStack.style.strokeColor = 'transparent';
    innerStack.style.fill = 'transparent';
    innerStack.margin = { left: 5, right: 0, top: 0, bottom: 0 };
    innerStack.id = obj.id + '_innerstack';

    let text = new TextElement();
    text.content = ((obj as any).data).Name;
    text.style.color = (obj as any).data.color;
    text.style.bold = (obj as any).addInfo.IsBold;
    text.style.italic = (obj as any).data.IsItalic;
    text.style.textDecoration = (obj as any).data.Decoration;
    text.style.fontSize = (obj as any).data.FontSize;
    text.style.fontFamily = (obj as any).data.FontFamily;
    text.style.strokeColor = 'none';
    text.horizontalAlignment = 'Left';
    text.style.fill = 'none';
    text.id = obj.id + '_text1';

    let desigText = new TextElement();
    desigText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
    desigText.content = ((obj as any).data).Designation;
    desigText.style.color = (obj as any).data.color;
    desigText.style.bold = (obj as any).addInfo.IsBold;
    desigText.style.italic = (obj as any).data.IsItalic;
    desigText.style.textDecoration = (obj as any).data.Decoration;
    desigText.style.fontSize = (obj as any).data.FontSize;
    desigText.style.fontFamily = (obj as any).data.FontFamily;
    desigText.style.strokeColor = 'none';
    desigText.style.fill = 'none';
    desigText.horizontalAlignment = 'Left';
    desigText.style.textWrapping = 'Wrap';
    desigText.id = obj.id + '_desig';

    innerStack.children = [text, desigText];

    // Add the line to the innerStack, and the innerStack to the content stack
    innerStack.children = [line, text, desigText];
    content.children = [image, innerStack];

    return content;
  };

  public onUserHandleMouseDown(args: UserHandleEventsArgs) {
    this.clientSideEvents.onUserHandleMouseDown(args);
  }
  public selectionChange(args: ISelectionChangeEventArgs) {
    this.clientSideEvents.selectionChange(args);
  }
  public historyChange(args: IHistoryChangeArgs) {
    this.clientSideEvents.historyChange();
  }
  public scrollChange(args: IScrollChangeEventArgs) {
    this.clientSideEvents.scrollChange(args);
  }

  //Method to do opertation of the menu bar
  public menuSelect(args: MenuEventArgs) {
    let options: string | undefined = args.item.text;
    let zoomSlider = (document.getElementById("zooming") as any).ej2_instances[0];
    let exportDialog = (document.getElementById("exportDialog") as any).ej2_instances[0];
    switch (options) {
      case 'New':
        (this.diagram as any).clear();
        (this.diagram as any).dataSourceSettings.dataSource.dataSource.json = [];
        var object;
        object = {
          item: { text: 'No image with subtext' },
          value: ['Name', 'Desig'],
        };
        this.utilityMethods.modifyNodeTemplate(object);
        this.clientSideEvents.addParent();
        this.clientSideEvents.historyChange();
    
        break;
      case 'Open':
        (document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button') as any).click();
        break;
      case 'Save':
        let data: any = this.diagram?.saveDiagram();
        this.utilityMethods.download(data);
        break;
      case 'Export':
        exportDialog.show();
        break;
      case 'Print':
        this.utilityMethods.btnPrintClick();
        break;
      case 'Landscape':
        (args.item as any).parentObj.items[1].iconCss = '';
        args.item.iconCss = 'sf-icon-check-tick';
        (this.diagram as any).pageSettings.orientation = 'Landscape';
        break;
      case 'Portrait':
        (args.item as any).parentObj.items[0].iconCss = '';
        args.item.iconCss = 'sf-icon-check-tick';
        (this.diagram as any).pageSettings.orientation = 'Portrait';
        break;
      case 'Letter (8.5 in x 11 in)':
      case 'Legal (8.5 in x 14 in)':
      case 'A3 (297 mm x 420 mm)':
      case 'A4 (210 mm x 297 mm)':
      case 'A5 (148 mm x 210 mm)':
      case 'A6 (105 mm x 148 mm)':
      case 'Tabloid (279 mm x 432 mm)':
        this.utilityMethods.paperListChange(args);
        this.utilityMethods.updateSelection(args.item)
        break;
      case 'Show Lines':
        (this.diagram as any).snapSettings.constraints = (this.diagram as any).snapSettings.constraints ^ SnapConstraints.ShowLines;
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        break;
      case 'Snap To Grid':
        (this.diagram as any).snapSettings.constraints = (this.diagram as any).snapSettings.constraints ^ SnapConstraints.SnapToLines;
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        break;
      case 'Snap To Object':
        (this.diagram as any).snapSettings.constraints = (this.diagram as any).snapSettings.constraints ^ SnapConstraints.SnapToObject;
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        break;
      case 'Show Ruler':
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        (this.diagram as any).rulerSettings.showRulers = !(this.diagram as any).rulerSettings.showRulers;
        break;
      case 'Show Page Breaks':
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        (this.diagram as any).pageSettings.showPageBreaks = !(this.diagram as any).pageSettings.showPageBreaks;
        break;
      case 'Show Multiple page':
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        (this.diagram as any).pageSettings.multiplePage = !(this.diagram as any).pageSettings.multiplePage;
        break;
      case 'Fit To Width':
        (this.diagram as any).fitToPage({ mode: 'Width' });
        zoomSlider.content = Math.round((this.diagram as any).scrollSettings.currentZoom * 100);
        break;
      case 'Fit To Page':
        (this.diagram as any).fitToPage({ mode: 'Page', region: 'Content' });
        zoomSlider.content = Math.round((this.diagram as any).scrollSettings.currentZoom * 100);
        break;
    }
    this.diagram?.dataBind();
  }
  public toolbarClick(args: ClickEventArgs) {
    this.utilityMethods.toolbarclick(args);
  }

  //Method to change the fontfamily of the selected node
  public fontFamilyChange(args: IChangedEventArgs) {
    if ((args as any).value) {
      (args as any).value = null;
    }
    this.utilityMethods.fontStyleChange(args);
  }

  //Method to change the size of the font of the selected node
  public fontSizeChange(args: IChangedEventArgs) {
    this.utilityMethods.fontStyleChange(args);
  }

  //Method to change the font color of the selected node
  public fontColorChange(args: IColorPickerEventArgs) {
    let parameter = { itemData: { text: args.value }, itemValue: 'fontColor' };
    this.utilityMethods.fontStyleChange(parameter);
  }

  //Method to change the fill color of the selected node
  public fillColorChange(args: IColorPickerEventArgs) {
    let diagram = (document.getElementById("diagram") as any).ej2_instances[0];
    let fillColor = args.value;
    for (let i: number = 0; i < diagram.selectedItems.nodes.length; i++) {
      let outerContainer = document.getElementById(diagram.selectedItems.nodes[i].id + '_outerstack');
      (outerContainer as any).style.fill = fillColor;
      diagram.selectedItems.nodes[i].addInfo.fill = fillColor;
      diagram.selectedItems.nodes[i].data.Fill = fillColor;
    }
    diagram.dataBind();
  }

  //Method to change the stroke color of the selected node
  public strokeColorChange(args: IColorPickerEventArgs) {
    let diagram = (document.getElementById("diagram") as any).ej2_instances[0];
    let strokeColor = args.value;
    for (let i: number = 0; i < diagram.selectedItems.nodes.length; i++) {
      let outerContainer = document.getElementById(diagram.selectedItems.nodes[i].id + '_outerstack');
      (outerContainer as any).style.stroke = strokeColor;
      diagram.selectedItems.nodes[i].data.StrokeColor = strokeColor;
    }
    diagram.dataBind();
  }

  //Button to show the search dialog
  public searchBtn() {
    let searchDialog = (document.getElementById("searchDialog") as any).ej2_instances[0];
    searchDialog.show();
  }

  //Method to apply the edited information to the nodes
  public apply(args: any) {
    var diagram = (document.getElementById("diagram") as any).ej2_instances[0];
    var dialogInstance = (document.getElementById("defaultDialog") as any).ej2_instances[0];
    var node = diagram.selectedItems.nodes[0];
    let name = document.getElementById('name');
    let designation = document.getElementById('role');
    let employeeID = document.getElementById('empId');
    let team = document.getElementById('team');
    let email = document.getElementById('mail');
    let phoneNo = document.getElementById('phNumber');
    node.data.Name = (name as any).value;
    var nameText = document.getElementById(node.id + '_text1_text');
    if (nameText) {
      nameText.textContent = (name as any).value;
    }
    node.data.Designation = (designation as any).value;
    var desigText = document.getElementById(node.id + '_desig_text');
    if (desigText) {
      desigText.textContent = (designation as any).value;
    }
    node.data.EmployeeID = (employeeID as any).value;
    var eidText = document.getElementById(node.id + '_eid_text');
    if (eidText) {
      eidText.textContent = (employeeID as any).value;
    }
    node.data.Team = (team as any).value;
    var teamText = document.getElementById(node.id + '_team_text');
    if (teamText) {
      teamText.textContent = (team as any).value;
    }
    node.data.EmailId = (email as any).value;
    var emailText = document.getElementById(node.id + '_email_text');
    if (emailText) {
      emailText.textContent = (email as any).value;
    }
    node.data.PhoneNumber = (phoneNo as any).value;
    var phoneText = document.getElementById(node.id + '_phone_text');
    if (phoneText) {
      phoneText.textContent = (phoneNo as any).value;
    }
    node.tooltip.content = getContent(node.data);
    dialogInstance.hide();
  }

  //Button to cancel the edit dialog
  public cancel(args: any) {
    var dialogInstance = (document.getElementById("defaultDialog") as any).ej2_instances[0];
    dialogInstance.hide();
  }

  //Buttons to edit the nodes
  public defaultButtons: { [key: string]: any }[] = [
    { click: this.apply.bind(this), buttonModel: { content: 'Apply', isPrimary: true } },
    { click: this.cancel.bind(this), buttonModel: { content: 'Cancel', isPrimary: true } },
  ];

  //Buttons to export the diagram
  public exportButtons: { [key: string]: any }[] = [
    { click: this.export.bind(this), buttonModel: { content: 'Export', isPrimary: true } },
    { click: this.cancelExport.bind(this), buttonModel: { content: 'Cancel', isPrimary: true } },
  ];

  //Buttons to search the nodes in dialog
  public searchButtons: { [key: string]: any }[] = [
    { click: this.search.bind(this), buttonModel: { iconCss: 'e-icons e-search', isPrimary: true } },
    { click: this.btnprevious.bind(this), buttonModel: { content: '&#171; Previous', isPrimary: true } },
    { click: this.btnnext.bind(this), buttonModel: { content: 'Next &#187;', isPrimary: true } },

  ];

  public btnHideToolbar(args : any){
    var diagram = (document.getElementById("diagram") as any).ej2_instances[0];
    this.hideElements('hide-properties', diagram);
  }

  public hideElements(elementType : string, diagram : any) {
    var diagramContainer = document.getElementsByClassName('diagrambuilder-container')[0];
    if (diagramContainer.classList.contains(elementType)) {
      diagramContainer.classList.remove(elementType);
    }
    else {
      diagramContainer.classList.add(elementType);
    }
    if (diagram) {
      diagram.updateViewPort();
    }
  }



  //Method to export the diagram
  public export() {
    var diagram = (document.getElementById("diagram") as any).ej2_instances[0];
    var exportDialog = (document.getElementById("exportDialog") as any).ej2_instances[0];
    var hOffset = diagram.scrollSettings.horizontalOffset;
    var vOffset = diagram.scrollSettings.verticalOffset;
    var zoom = diagram.scrollSettings.currentZoom;
    localStorage.setItem('export', diagram.saveDiagram());
    diagram.loadDiagram(localStorage.getItem('export'));
    diagram.exportDiagram({
      fileName: (document.getElementById("exportfileName") as any).value,
      format: (document.getElementById("exportFormat") as any).value,
      mode: 'Download'
    });
    if (zoom <= 0.45) {
      diagram.fitToPage({ mode: 'Page', region: 'Content' });
    } else {
      diagram.scrollSettings.horizontalOffset = hOffset;
      diagram.scrollSettings.verticalOffset = vOffset;
    }
    diagram.dataBind();
    exportDialog.hide();
  }

  //Button to cancel the export option
  public cancelExport() {
    var exportDialog = (document.getElementById("exportDialog") as any).ej2_instances[0];
    exportDialog.hide();
  }

  //Button to search the nodes
  public search() {
    const selectedValue = (document.getElementById('searchDropDown') as any).textContent;
    const searchText = (document.getElementById('searchBox') as any).value.replace(/\s+/g, '').toLowerCase();
    let diagram = (document.getElementById("diagram") as any).ej2_instances[0];
    this.matchingNodes = [];
    this.currentIndex = 0;
    diagram.clearSelection();
    const searchWords = searchText.split(/\s+/); // Split the searchText into individual words
    const searchRegex = new RegExp(searchWords.map((word: any) => `\\b${word}\\b`).join('.*'), 'i'); // Create a regular expression with 'i' flag to ignore case and match all words
    this.matchingNodes = diagram.nodes.filter((node: { data: { Name: string; EmployeeID: string; Designation: string; Team: string; EmailId: string; PhoneNumber: string; }; }) => {
      if (selectedValue === 'Name' && searchRegex.test(node.data.Name.replace(/\s+/g, '').toLowerCase())) {
        return true;
      } else if (selectedValue === 'Employee ID' && searchRegex.test(node.data.EmployeeID.replace(/\s+/g, '').toLowerCase())) {
        return true;
      } else if (selectedValue === 'Designation' && searchRegex.test(node.data.Designation.replace(/\s+/g, '').toLowerCase())) {
        return true;
      } else if (selectedValue === 'Team' && searchRegex.test(node.data.Team.replace(/\s+/g, '').toLowerCase())) {
        return true;
      } else if (selectedValue === 'Email ID' && searchRegex.test(node.data.EmailId.replace(/\s+/g, '').toLowerCase())) {
        return true;
      } else if (selectedValue === 'Phone Number' && searchRegex.test(node.data.PhoneNumber.replace(/\s+/g, '').toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
    diagram.select([this.matchingNodes[this.currentIndex]]);
  }

  //Button to show the previous node with the same choice
  public btnprevious() {
    if (this.matchingNodes.length > 0) {
      let diagram = (document.getElementById("diagram") as any).ej2_instances[0];
      this.currentIndex = (this.currentIndex - 1 + this.matchingNodes.length) % this.matchingNodes.length;
      diagram.select([this.matchingNodes[this.currentIndex]]);
    }
  }

  //Button to show the next node with the same choice
  public btnnext() {
    if (this.matchingNodes.length > 0) {
      var diagram = (document.getElementById("diagram") as any).ej2_instances[0];
      this.currentIndex = (this.currentIndex + 1) % this.matchingNodes.length;
      diagram.select([this.matchingNodes[this.currentIndex]]);
    }
  }
  private registerBrowseEvent: boolean = false;
  public btnImportClick(args: any) {
    if (!this.registerBrowseEvent) {
      (this.defaultupload as any).dropArea = document.getElementById('dropRegion');
      (document.getElementById('browseFile') as any).onclick = () => {
        (document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button') as any).click();
        return false;
      };
      this.registerBrowseEvent = true;
    }
    this.extensionType = ".csv";
    (this.defaultupload as any).clearAll();
    let uploadDialogContent: any = document.getElementById('uploadDialogContent');
    uploadDialogContent.className = 'db-upload-content firstPage';
    let fileUploadDialog = (document.getElementById("fileUploadDialog") as any).ej2_instances[0];
    fileUploadDialog.show();
  }

  public fileUploadButtons: { [key: string]: any }[] = [
    { click: this.nextButton.bind(this), buttonModel: { content: 'Next', isPrimary: true } },
    { click: this.cancelButton.bind(this), buttonModel: { content: 'Cancel', isPrimary: true } },
  ];

  public nextButton() {

  }

  public cancelButton() {
    let fileUploadDialog = (document.getElementById("fileUploadDialog") as any).ej2_instances[0];
    fileUploadDialog.hide();
  }
  public downloadFormatChange(args: ChangeArgs): void {
    debugger
    if (args.event) {
      let target: HTMLElement = args.event.target as HTMLElement;
      if (target.id === 'csvFormat') {
        this.buttonContent = 'Download Example CSV';
        this.extensionType = '.csv';
        (document.getElementById('descriptionText1') as any).innerHTML = 'Make sure that each column of the table has a header';
        (document.getElementById('descriptionText2') as any).innerHTML = 'Each employee should have a reporting person (except the top most employee of the organization)' +
          ', and it should be indicated by any field from the data source.';
      } else if (target.id === 'xmlFormat') {
        this.buttonContent = 'Download Example XML';
        this.extensionType = '.xml';
        (document.getElementById('descriptionText1') as any).innerHTML = 'Make sure that XML document has a unique root element and start-tags have matching end-tags.';
        (document.getElementById('descriptionText2') as any).innerHTML = 'All XML elements will be considered employees and will act as a reporting person for its child XML elements.';
      } else {
        this.buttonContent = 'Download Example JSON';
        this.extensionType = '.json';
        (document.getElementById('descriptionText1') as any).innerHTML = 'Make sure that you have defined a valid JSON format.';
        (document.getElementById('descriptionText2') as any).innerHTML = 'Each employee should have a reporting person (except the top most employee of the organization)' +
          ', and it should be indicated by any field from the data source.';
      }
    }
  }

  public downloadExampleFiles(args: MouseEvent): void {
    if (this.buttonContent === 'Download Example CSV') {
      this.downloadCSV();
    } else if (this.buttonContent === 'Download Example XML') {
      this.downloadXML();
    } else {
      this.downloadJSON();
    }
  }

  public downloadCSV(): void {
    let csv: string = 'Fill,StrokeColor,FontFamily,IsBold,IsItalic,Decoration,FontSize,color,Id,Name,Designation,IsExpand,RatingColor,ImageUrl,EmployeeID,Team,EmailID,PhoneNumber\n';
    this.item.forEach((row: any): void => {
      for (let prop in row) {
        csv += row[prop].toString() + ',';
      }
      csv += '\n';
    });
    if ((window.navigator as any).msSaveBlob) {
      let blob: Blob = new Blob([csv], { type: 'text/plain;charset=utf-8;' });
      (window.navigator as any).msSaveOrOpenBlob(blob, 'people.csv');
    } else {
      let hiddenElement: HTMLAnchorElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'people.csv';
      document.body.appendChild(hiddenElement);
      hiddenElement.click();
      hiddenElement.remove();
    }
  }

  public downloadJSON(): void {
    let dataStr: string = JSON.stringify(this.data);
    if ((window.navigator as any).msSaveBlob) {
      let blob: Blob = new Blob([dataStr], { type: 'data:text/json;charset=utf-8,' });
      (window.navigator as any).msSaveOrOpenBlob(blob, 'people.json');
    } else {
      dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(dataStr);
      let downloadAnchorNode: HTMLAnchorElement = document.createElement('a');
      downloadAnchorNode.setAttribute('href', dataStr);
      downloadAnchorNode.setAttribute('download', 'people.json');
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
  }

  public downloadXML(): void {
    let xmltext: string = '<?xml version="1.0" encoding="utf-8" ?><people>' +
      '<person Name="Maria Anders" Role="Managing Director" Location="US" Phone="(555) 111-1111" Email="mariaanders@fakecompany.com" ImageURL="./assets/dbstyle/orgchart_images/blank-male.jpg">' +
      '<person Name="Carine Schmitt" Role="Project Manager" Department="Development" Location="US" Phone="(555) 222-2222" Email="carineschmitt@fakecompany.com" SupervisorName="Maria Anders" ImageURL="./assets/dbstyle/orgchart_images/blank-male.jpg"></person>' +
      '<person Name="Daniel Tonini" Role="Project Manager" Department="Development" Location="US" Phone="(555) 333-3333" Email="danieltonini@fakecompany.com" SupervisorName="Maria Anders" ImageURL="./assets/dbstyle/orgchart_images/blank-male.jpg">' +
      '<person Name="Alex Camino" Role="Project Manager" Department="Development" Location="US" Phone="(555) 444-4444" Email="alexcamino@fakecompany.com" SupervisorName="Daniel Tonini" ImageURL="./assets/dbstyle/orgchart_images/blank-male.jpg"></person>' +
      '<person Name="Jones Bergson" Role="Project Lead" Department="Development" Location="US" Phone="(555) 555-5555" Email="jonesbergson@fakecompany.com" SupervisorName="Daniel Tonini" ImageURL="./assets/dbstyle/orgchart_images/blank-male.jpg"></person>' +
      '<person Name="Rene Phillips" Role="Project Lead" Department="Development" Location="US" Phone="(555) 666-6666" Email="renephillips@fakecompany.com" SupervisorName="Daniel Tonini" ImageURL="./assets/dbstyle/orgchart_images/blank-male.jpg"></person>' +
      '</person>' +
      '</person>' +
      '</people>';
    let filename: string = 'people.xml';
    let bb: Blob = new Blob([xmltext], { type: 'text/plain' });
    if ((window.navigator as any).msSaveBlob) {
      (window.navigator as any).msSaveOrOpenBlob(bb, filename);
    } else {
      let pom: HTMLAnchorElement = document.createElement('a');
      pom.setAttribute('href', window.URL.createObjectURL(bb));
      pom.setAttribute('download', filename);
      document.body.appendChild(pom);
      pom.click();
      pom.remove();
    }
  }

  public onFileUploadSuccess(args: { [key: string]: Object }): void {
    (document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = 'none';
    if ((args as any).operation !== 'remove') {
      let file1: { [key: string]: Object } = (args as any).file as { [key: string]: Object };
      let file: Blob = (file1 as any).rawFile as Blob;
    }
  }

  //Method to change the subtree option
  public subTreeClick(args: any) {
    let target = args.target;
    let diagram = (document.getElementById("diagram") as any).ej2_instances[0];
    if (target.className === 'image-pattern-style') {
      let subTreeOrientation: any;
      let subTreeAlignment: any;
      switch (target.id) {
        case 'pattern1':
          subTreeOrientation = 'Vertical';
          subTreeAlignment = 'Alternate';
          break;
        case 'pattern2':
          subTreeOrientation = 'Vertical';
          subTreeAlignment = 'Left';
          break;
        case 'pattern3':
          subTreeOrientation = 'Vertical';
          subTreeAlignment = 'Left';
          break;
        case 'pattern4':
          subTreeOrientation = 'Vertical';
          subTreeAlignment = 'Right';
          break;
        case 'pattern5':
          subTreeOrientation = 'Vertical';
          subTreeAlignment = 'Right';
          break;
        case 'pattern6':
          subTreeOrientation = 'Horizontal';
          subTreeAlignment = 'Balanced';
          break;
        case 'pattern7':
          subTreeOrientation = 'Horizontal';
          subTreeAlignment = 'Center';
          break;
        case 'pattern8':
          subTreeOrientation = 'Horizontal';
          subTreeAlignment = 'Left';
          break;
        case 'pattern9':
          subTreeOrientation = 'Horizontal';
          subTreeAlignment = 'Right';
          break;
        default:
          break;
      }
      // Remove the 'e-selected-orientation-style' class from all divs with the class 'image-pattern-style'
      let divs = document.getElementsByClassName('image-pattern-style');
      for (let i: number = 0; i < divs.length; i++) {
        divs[i].classList.remove('e-selected-pattern-style');
      }
      // Add the 'e-selected-orientation-style' class to the selected div
      target.classList.add('e-selected-pattern-style');
      diagram.layout.getLayoutInfo = function (node: Node, options: any) {
        if (target.id === 'pattern4' || target.id === 'pattern3') {
          options.offset = -50;
        }
        if ((node as any).data.Role === 'General Manager') {
          options.assistants.push(options.children[0]);
          options.children.splice(0, 1);
        }
        if (!options.hasSubTree) {
          options.orientation = subTreeOrientation;
          options.type = subTreeAlignment;
        }
      };
      diagram.dataBind();
      diagram.doLayout();
      diagram.fitToPage({ mode: 'Page', region: 'Content' });
    }
  }

  //Click Event for orientation of the PropertyPanel.
  public orientClick(args: any) {
    let target = args.target;
    let diagram = (document.getElementById("diagram") as any).ej2_instances[0];
    if (target.className.includes('image-pattern-style2')) {
      // Remove the 'e-selected-orientation-style' class from all divs with the class 'image-pattern-style'
      let divs = document.getElementsByClassName('image-pattern-style2');
      for (let i: number = 0; i < divs.length; i++) {
        divs[i].classList.remove('e-selected-orientation-style');
      }
      // Add the 'e-selected-orientation-style' class to the selected div
      target.classList.add('e-selected-orientation-style');
      // Update the diagram orientation based on the selected div
      let orientation1 = target.id;
      diagram.layout.orientation = orientation1;
      diagram.dataBind();
      diagram.doLayout();
      diagram.fitToPage({ mode: 'Page', region: 'Content' });
    }
  }

  public templateClick(args: any) {
    let target = args.target;
    let object;
    if (target.className.includes('org-pattern-style')) {
      switch (target.id) {
        case 'orgPattern1':
          object = {
            item: { text: 'No image' },
            value: ['Name'],
          };
          break;
        case 'orgPattern2':
          object = {
            item: { text: 'No image with subtext' },
            value: ['Name', 'Desig'],
          };
          break;
        case 'orgPattern3':
          object = {
            item: { text: 'Image at left' },
            value: ['Name'],
          };
          break;
        case 'orgPattern4':
          object = {
            item: { text: 'Image at left with subtext' },
            value: ['Name', 'Desig'],
          };
          break;
      }
    }
    var divs = document.getElementsByClassName('col-xs-6 org-pattern-parent');
    for (var i = 0; i < divs.length; i++) {
      divs[i].classList.remove('e-selected-template-style');
    }
    // Add the 'e-selected-orientation-style' class to the selected div
    target.classList.add('e-selected-template-style');
    this.utilityMethods.modifyNodeTemplate(object);
  }

  //Numeric text box to change the horizontal spacing
  public onhSpacingChange(args: NumericChangeEventArgs): void {
    (this.diagram as any).layout.horizontalSpacing = Number(args.value);
    (this.diagram as any).dataBind();
  }

  //Numeric text box to change the vertical spacing
  public onvSpacingChange(args: NumericChangeEventArgs): void {
    (this.diagram as any).layout.verticalSpacing = Number(args.value);
    (this.diagram as any).dataBind();
  }

  //Check box to expand and collapse nodes
  public onExpandChange(args: CheckBoxChangeEventArgs): void {
    for (let node of (this.diagram as any).nodes) {
      if (args.checked) {
        node.expandIcon.shape = 'Minus';
        node.collapseIcon.shape = 'Plus';
      } else {
        node.expandIcon.shape = 'None';
        node.collapseIcon.shape = 'None';
      }
    }
    (this.diagram as any).dataBind();
    (this.diagram as any).doLayout();
  }

  public insertOrRemovePicture(args: SelectEventArgs) {
    this.utilityMethods.insertOrRemovePicture(args);
  }
  public modifyNodeTemplate(args: SelectedEventArgs) {
    this.utilityMethods.modifyNodeTemplate(args);
  }
  public checkboxmodifyNodeTemplate(args: ChangeEventArgs) {
    this.utilityMethods.modifyNodeTemplate(args);
  }

  // To close the overview when we click the close button.
  public toggleOverviewButton() {
    let toolbarObj = (document.getElementById("toolbarEditor") as any).ej2_instances[0];
    (document.getElementById('overview-container') as any).style.position = '';
    (document.getElementById('overview-container') as any).style.zIndex = '-1';
    toolbarObj.items[toolbarObj.items.length - 1].cssClass = toolbarObj.items[toolbarObj.items.length - 1].cssClass.replace('active', '');
  }

  // Triggers when the JSON file is uploaded successfully. 
  public onUploadSuccess: EmitType<Object> = (args: any) => {
    let file1: { [key: string]: Object } = args.file as { [key: string]: Object };
    let file: Blob = (file1 as any).rawFile as Blob;
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = this.loadDiagram.bind(this);
  }

  // Triggers when the image is uploaded successfully.
  public onPictureUploadSuccess: EmitType<Object> = (args: any) => {
    const file = args.file;
    const reader = new FileReader();
    reader.onload = function () {
      const base64String = reader.result;
      applyBase64AsImageUrl(base64String);
    };
    reader.readAsDataURL(file.rawFile);
  }

  //Method to load diagram
  public loadDiagram(event: ProgressEvent): void {
    var diagram = (document.getElementById("diagram") as any).ej2_instances[0];
    diagram.loadDiagram((event.target as any).result);
    diagram.fitToPage({ mode: 'Page', region: 'Content' });
  }

  //Method to handle whether the upload will be failed
  public onUploadFailure(args: { [key: string]: Object }): void {
    (document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = 'none';
  }
  public onUploadFileSelected(args: { [key: string]: Object }): void {
    (document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = '';
  }
  public onUploadProgress(args: { [key: string]: Object }): void {
    (document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = '';
  }
}

// To apply the image's base64 value to the imageUrl of node data.
function applyBase64AsImageUrl(base64String: any) {
  var diagram = (document.getElementById("diagram") as any).ej2_instances[0];
  let selectedNode = diagram.selectedItems.nodes[0];
  selectedNode.data.ImageUrl = base64String;
  diagram.dataSourceSettings.dataSource.dataSource.json.find((x: { Id: any; }) => x.Id == selectedNode.data.Id).ImageUrl = base64String;
  var imageTag = document.getElementById(selectedNode.id + '_picimage');
  (imageTag as any).href.baseVal = base64String;
}

// To get the tooltip content of node.
function getContent(obj: any) {
  var tooltipContent = document.createElement('div');
  tooltipContent.innerHTML = `
    <div>
      <table style="border-collapse: collapse; width: 200px; background-color: #f4f4f4;">
      <tr>
          <td style="border: 1px solid #d3d3d3; padding: 5px; background-color: #e9e9e9;">Name:</td>
          <td style="border: 1px solid #d3d3d3; padding: 5px;">${obj.Name}</td>
      </tr>
        <tr>
          <td style="border: 1px solid #d3d3d3; padding: 5px; background-color: #e9e9e9;">Role:</td>
          <td style="border: 1px solid #d3d3d3; padding: 5px;">${obj.Designation}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #d3d3d3; padding: 5px; background-color: #e9e9e9;">Empoyee ID:</td>
          <td style="border: 1px solid #d3d3d3; padding: 5px;">${obj.EmployeeID}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #d3d3d3; padding: 5px; background-color: #e9e9e9;">Team:</td>
          <td style="border: 1px solid #d3d3d3; padding: 5px;">${obj.Team}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #d3d3d3; padding: 5px; background-color: #e9e9e9;">Email ID::</td>
          <td style="border: 1px solid #d3d3d3; padding: 5px;">${obj.EmailId}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #d3d3d3; padding: 5px; background-color: #e9e9e9;">Phone Number:</td>
          <td style="border: 1px solid #d3d3d3; padding: 5px;">${obj.PhoneNumber}</td>
        </tr>
      </table>
    </div>`;
  return tooltipContent;
}
