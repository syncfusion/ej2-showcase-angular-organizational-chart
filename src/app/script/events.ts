import { IScrollChangeEventArgs, ISelectionChangeEventArgs, NodeModel, randomId, UserHandleEventsArgs } from "@syncfusion/ej2-angular-diagrams";

export class DiagramClientSideEvents {
    constructor() {

    }

    // Selection change event.
    public selectionChange(args: ISelectionChangeEventArgs) {
        if (args.state === 'Changed') {
            if (args.newValue.length > 0) {
                this.applyFillColor(args.newValue);
                this.enableItems();
            }
            if (args.oldValue.length > 0 && (args.newValue.length === 0 || args.oldValue[0].id !== args.newValue[0].id)) {
                this.removeFillColor(args.oldValue);
            }
            if (args.newValue.length === 0) {
                this.disableItems();
            }
        }
    }

    // To apply fill color to the selected node.
    public applyFillColor(obj: any) {
        const diagram = (document.getElementById("diagram") as any).ej2_instances[0];
        for (let i: number = 0; i < obj.length; i++) {
            if (obj[i] as Node) {
                let outerContainer = document.getElementById(obj[i].id + '_outerstack');
                (outerContainer as any).style.fill = obj[i].data.RatingColor;
            }
        }
        diagram.dataBind();
    }

    // To remove fill color of selected node.
    public removeFillColor(obj: any) {
        const diagram = (document.getElementById("diagram") as any).ej2_instances[0];
        for (let i: number = 0; i < obj.length; i++) {
            if (obj[i] as Node) {
                let outerContainer = document.getElementById(obj[i].id + '_outerstack');
                (outerContainer as any).style.fill = obj[i].data.Fill;
            }
        }
        diagram.dataBind();
    }

    // To enable items when we select node.
    public enableItems() {
        var toolbarEditor = (document.getElementById("toolbarEditor") as any).ej2_instances[0];
        var currentShapeTemplate = 'Image at left';
        if (currentShapeTemplate !== 'No image') {
            let pictureDropdown = document.getElementById('pictureDropdown');
            (pictureDropdown as any).style.cssText = 'pointer-events: auto !important; opacity:1';
        }
        if (toolbarEditor.items.length > 0) {
            let labelStyleItems = document.getElementsByClassName('item-singleSelect');
            for (let i: number = 0; i < labelStyleItems.length; i++) {
                (labelStyleItems[i] as any).style.cssText = 'pointer-events: auto !important; opacity:1';
            }
        }
        let colorItems = document.getElementsByClassName('item-singleSelectColor');
        for (let i: number = 0; i < colorItems.length; i++) {
            (colorItems[i] as any).style.cssText = 'pointer-events: auto !important; opacity:1';
        }
    }

    // To disable itmes when there is no selection
    public disableItems() {
        let pictureDropdown = document.getElementById('pictureDropdown');
        (pictureDropdown as any).style.cssText = 'pointer-events: none !important; opacity:0.5';
        let labelStyleItems = document.getElementsByClassName('item-singleSelect');
        for (let i: number = 0; i < labelStyleItems.length; i++) {
            (labelStyleItems[i] as any).style.cssText = 'pointer-events: none !important; opacity:0.5';
        }
        let colorItems = document.getElementsByClassName('item-singleSelectColor');
        for (let j: number = 0; j < colorItems.length; j++) {
            (colorItems[j] as any).style.cssText = 'pointer-events: none !important; opacity:0.5';
        }
    }

    // To execute userhandle click.
    public onUserHandleMouseDown(args: UserHandleEventsArgs) {
        let option = args.element.name;
        switch (option) {
            case 'Add New Child':
                this.addChild(args);
                break;
            case 'Edit Fields':
                this.editFields(args);
                break;
        }
    }

    public addParent(){
        var diagram = (document.getElementById("diagram") as any).ej2_instances[0];
        if ((diagram as any).selectedItems.nodes.length === 0) {
            let data = (diagram as any).dataSourceSettings.dataSource.dataSource.json;
            let newData = [{
                'Id': 'parent',
                'Name': 'Name',
                'Designation': 'Designation',
                'RatingColor': 'transparent',
                "ImageUrl": 'ImageUrl',
                "Team": "Team",
                "EmployeeID": "EmployeeID",
                "EmailId": "EmailId",
                "PhoneNumber": "PhoneNumber",
                "IsBold": false, "IsItalic": false, "Decoration": "None",
                "FontFamily": "Arial", "FontSize": 12, "color": "black",
                "Fill": "white", "StrokeColor": "black",
            }];
            let newNode = { id: randomId(), data: newData[0], offsetX : 300, offsetY : 400, width: 100, height: 50 };
            diagram.add(newNode);
            (diagram as any).dataSourceSettings.dataSource.dataSource.json = data.concat(newData);
            diagram.doLayout();
        }
    }

    //To add child to the selected node.
    public addChild(args: UserHandleEventsArgs) {
        var diagram = (document.getElementById("diagram") as any).ej2_instances[0];
        if ((diagram as any).selectedItems.nodes.length > 0) {
            let data = (diagram as any).dataSourceSettings.dataSource.dataSource.json;
            let newData = [{
                'Id': randomId(),
                'Name': 'Name',
                'Designation': 'Designation',
                'RatingColor': (diagram as any).selectedItems.nodes[0].data.RatingColor,
                'ReportingPerson': (diagram as any).selectedItems.nodes[0].data.Id,
                "ImageUrl": (diagram as any).selectedItems.nodes[0].data.ImageURL,
                "Team": (diagram as any).selectedItems.nodes[0].data.Team,
                "EmployeeID": (diagram as any).selectedItems.nodes[0].data.EmployeeID + (data.length + 1),
                "EmailId": "newEmployee" + (data.length + 1) + "@gmail.com",
                "PhoneNumber": "0324 - 18193" + (data.length + 1),
                "IsBold": false, "IsItalic": false, "Decoration": "None",
                "FontFamily": "Arial", "FontSize": 12, "color": "black",
                "Fill": "white", "StrokeColor": "black",
            }];
            let newNode = { id: randomId(), data: newData[0], width: 100, height: 50 };
            diagram.add(newNode);
            let newConnector = { id: randomId(), sourceID: (diagram as any).selectedItems.nodes[0].id, targetID: newNode.id };
            diagram.add(newConnector);
            (diagram as any).dataSourceSettings.dataSource.dataSource.json = data.concat(newData);
            diagram.doLayout();
        }
    }

    // To append the values of selected node in the respective text boxed and to open the editNode dialog box.
    public editFields(args: UserHandleEventsArgs) {
        let editBox = (document.getElementById('defaultDialog') as any).ej2_instances[0];
        var diagram = (document.getElementById("diagram") as any).ej2_instances[0];
        let name = document.getElementById('name');
        let designation = document.getElementById('role');
        let employeeID = document.getElementById('empId');
        let team = document.getElementById('team');
        let email = document.getElementById('mail');
        let phoneNo = document.getElementById('phNumber');
        let node = diagram.selectedItems.nodes[0];
        (name as any).value = node.data.Name;
        (designation as any).value = node.data.Designation;
        (employeeID as any).value = node.data.EmployeeID;
        (team as any).value = node.data.Team;
        (email as any).value = node.data.EmailId;
        (phoneNo as any).value = node.data.PhoneNumber;
        editBox.show();
    }

    // History change event
    public historyChange() {
        var toolbarContainer = document.getElementsByClassName('db-toolbar-container')[0];
        var diagram = (document.getElementById("diagram") as any).ej2_instances[0];
        toolbarContainer.classList.remove('db-undo');
        toolbarContainer.classList.remove('db-redo');
        if (diagram.historyManager.undoStack.length > 0) {
            toolbarContainer.classList.add('db-undo');
        }
        if (diagram.historyManager.redoStack.length > 0) {
            toolbarContainer.classList.add('db-redo');
        }
    }

    // To update the zoom slider value based on diagram zoom
    public scrollChange(args: IScrollChangeEventArgs) {
        var diagram = (document.getElementById("diagram") as any).ej2_instances[0];
        if (args.panState === 'Start') {
            var zooming = (document.getElementById("zooming") as any).ej2_instances[0];
            zooming.content =  Math.round(diagram.scrollSettings.currentZoom * 100) + ' %';
    }
}
}