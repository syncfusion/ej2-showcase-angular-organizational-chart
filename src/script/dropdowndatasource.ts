import { ItemModel, MenuItemModel } from "@syncfusion/ej2-angular-navigations";


export class DropDownDataSources {


    public fileMenuItems: ItemModel[] = this.getFileMenuItems();

    public pictureItems: ItemModel[] = this.getPictureItems();

    public templateItems: ItemModel[] = this.getTemplateItems();

    // Returns File menu items.
    public getFileMenuItems(): ItemModel[] {
        let menuItems: MenuItemModel[] = [
            {
                text: 'File',
                iconCss: 'em-icons e-file',
                items: [
                    { text: 'New', iconCss: 'sf-icon-new' },
                    { text: 'Open', iconCss: 'sf-icon-open' },
                    { separator: true },
                    { text: 'Save', iconCss: 'sf-icon-save' },
                    { separator: true },
                    { text: 'Export', iconCss: 'sf-icon-export' },
                    { text: 'Print', iconCss: 'sf-icon-print' },
                ]
            },
            // Returns design menu items.
            {
                text: 'Design',
                iconCss: 'em-icons e-edit',
                items: [
                    {
                        text: 'Orientation', iconCss: 'sf-icon-page_orientation',
                        items: [
                            { text: 'Landscape', iconCss: 'sf-icon-check-tick' },
                            { text: 'Portrait', iconCss: '' }
                        ]
                    },
                    {
                        text: 'Size', iconCss: 'em-icons e-copy',
                        items: this.paperList1()
                    },
                ]
            },
            // Returns View menu items.
            {
                text: 'View',
                items: [
                    { text: 'Show Lines', },
                    { text: 'Snap To Grid', iconCss: '' },
                    { text: 'Snap To Object',iconCss: ''},
                    { text: 'Show Ruler', iconCss: 'sf-icon-check-tick' },
                    { separator: true },
                    { text: 'Fit To Width' },
                    { text: 'Fit To Page' },
                ]
            },
        ];
        return menuItems;
    };

    // Returns paper list with size value.
    public paperList1() {
        const paperList1 = [
            { text: 'Letter (8.5 in x 11 in)', value: 'Letter', iconCss: 'sf-icon-check-tick' }, { text: 'Legal (8.5 in x 14 in)', value: 'Legal' },
            { text: 'Tabloid (279 mm x 432 mm)', value: 'Tabloid' }, { text: 'A3 (297 mm x 420 mm)', value: 'A3' },
            { text: 'A4 (210 mm x 297 mm)', value: 'A4' }, { text: 'A5 (148 mm x 210 mm)', value: 'A5' },
            { text: 'A6 (105 mm x 148 mm)', value: 'A6' },
        ];
        return paperList1;
    }
    // Font family list.
    public fontFamilyList: { [key: string]: Object }[] = [
        { text: 'Arial', value: 'Arial' },
        { text: 'Aharoni', value: 'Aharoni' },
        { text: 'Bell MT', value: 'Bell MT' },
        { text: 'Fantasy', value: 'Fantasy' },
        { text: 'Times New Roman', value: 'Times New Roman' },
        { text: 'Segoe UI', value: 'Segoe UI' },
        { text: 'Verdana', value: 'Verdana' },
    ];

    // Font size list.
    public fontSizeList: { [key: string]: Object }[] = [
        { text: '8', value: '8pt' },
        { text: '9', value: '9pt' },
        { text: '10', value: '10pt' },
        { text: '11', value: '11pt' },
        { text: '12', value: '12pt' },
        { text: '14', value: '14pt' },
        { text: '16', value: '16pt' },
        { text: '18', value: '18pt' },
        { text: '20', value: '20pt' },
        { text: '22', value: '22pt' },
        { text: '24', value: '24pt' },
        { text: '26', value: '26pt' },
        { text: '28', value: '28pt' },
    ];

    // Picture dropdown items.
    public getPictureItems(): ItemModel[] {
        const items = [
            { text: 'Insert', },
            { text: 'Change', },
            { text: 'Delete', },
            { text: 'Show/Hide', },
        ]
        return items;
    }

    // Export image formats.
    public fileFormats: { [key: string]: Object }[] = [
        { text: 'JPG', value: 'JPG' }, { text: 'PNG', value: 'PNG' },
        { text: 'SVG', value: 'SVG' }
    ];

    public diagramRegions: { [key: string]: Object }[] = [
        { text: 'Content', value: 'Content' }, { text: 'PageSettings', value: 'PageSettings' }
    ];

    // Node shape template with image alignment.
    public getTemplateItems(): ItemModel[] {
        const items = [
            { text: 'Image at top', },
            { text: 'Image at left', },
            { text: 'No image' }
        ]
        return items;
    }

    // Fields multi-selection dropdown items.
    public fieldsMultiListItems: { [key: string]: Object }[] = [
        { Name: 'Name', Code: 'Name' },
        { Name: 'Employee ID', Code: 'EID' },
        { Name: 'Designation', Code: 'Desig' },
        { Name: 'Team', Code: 'Team' },
        { Name: 'Email ID', Code: 'Email' },
        { Name: 'Phone Numebr', Code: 'Phone' }
    ];

    public checkBoxFields: Object = { text: 'Name', value: 'Code' };

    //Provides a list of search criteria for a search dialog.
    public searchDropDownItems: { [key: string]: Object }[] = [
        { text: 'Name', value: 'Name' },
        { text: 'Employee ID', value: 'Employee ID' },
        { text: 'Designation', value: 'Designation' },
        { text: 'Team', value: 'Team' },
        { text: 'Email ID', value: 'Email ID' },
        { text: 'Phone Number', value: 'Phone Number' }
    ];

}