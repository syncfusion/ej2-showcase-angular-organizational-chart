import { ClickEventArgs } from "@syncfusion/ej2-angular-buttons";
import { DiagramTools, ImageElement, PathElement, StackPanel, TextElement } from "@syncfusion/ej2-angular-diagrams";
import { SelectEventArgs } from "@syncfusion/ej2-angular-dropdowns";
import { SelectedEventArgs, SliderChangeEventArgs } from "@syncfusion/ej2-angular-inputs";
import { MenuEventArgs } from "@syncfusion/ej2-angular-navigations";

export class PaperSize {
    pageHeight: number | undefined;
    pageWidth: number | undefined;

}

export class UtilityMethods {
    public showHidePictures = [];

    // To download diagram json.
    public download(data: string) {
        if ((window.navigator as any).msSaveBlob) {
            let blob: Blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
            (window.navigator as any).msSaveOrOpenBlob(blob, 'Diagram.json');
        }
        else {
            let dataStr: string = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
            let a: HTMLAnchorElement = document.createElement('a');
            a.href = dataStr;
            a.download = document.getElementById('diagramName') ? (document.getElementById('diagramName') as any).innerHTML + '.json' : 'Diagram.json';
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
    }

    // To update page paper size
    public paperListChange(args: MenuEventArgs) {
        var diagram = (document.getElementById("diagram") as any).ej2_instances[0];
        var value = (args as any).value || (args as any).item.value;
        var paperSize: any = this.getPaperSize(value);
        var pageWidth = paperSize.pageWidth;
        var pageHeight = paperSize.pageHeight;
        if (pageWidth && pageHeight) {
            if (diagram.pageSettings.orientation === 'Portrait') {
                if (pageWidth > pageHeight) {
                    var temp = pageWidth;
                    pageWidth = pageHeight;
                    pageHeight = temp;
                }
            }
            else {
                if (pageHeight > pageWidth) {
                    var temp = pageHeight;
                    pageHeight = pageWidth;
                    pageWidth = temp;
                }
            }
            diagram.pageSettings.width = pageWidth;
            diagram.pageSettings.height = pageHeight;
        }
        else {
            diagram.pageSettings.width = 1460;
            diagram.pageSettings.height = 600;
        }
        diagram.dataBind();
    }

    // To update paper selection in menubar
    public updateSelection(menuitem: any) {
        for (let i: number = 0; i < menuitem.parentObj.items.length; i++) {
            // To check the sub items of paper size menu item.
            if (menuitem.text === menuitem.parentObj.items[i].text) {
                menuitem.parentObj.items[i].iconCss = 'sf-icon-check-tick';
            }
            else {
                menuitem.parentObj.items[i].iconCss = '';
            }
        }
    }

    // To get paper size
    public getPaperSize(args: string) {
        let paperSize: PaperSize = new PaperSize();
        switch (args) {
            case 'Letter':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1056;
                break;
            case 'Legal':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1344;
                break;
            case 'Tabloid':
                paperSize.pageWidth = 1056;
                paperSize.pageHeight = 1632;
                break;
            case 'A0':
                paperSize.pageWidth = 3179;
                paperSize.pageHeight = 4494;
                break;
            case 'A1':
                paperSize.pageWidth = 2245;
                paperSize.pageHeight = 3179;
                break;
            case 'A2':
                paperSize.pageWidth = 1587;
                paperSize.pageHeight = 2245;
                break;
            case 'A3':
                paperSize.pageWidth = 1122;
                paperSize.pageHeight = 1587;
                break;
            case 'A4':
                paperSize.pageWidth = 793;
                paperSize.pageHeight = 1122;
                break;
            case 'A5':
                paperSize.pageWidth = 559;
                paperSize.pageHeight = 793;
                break;
            case 'A6':
                paperSize.pageWidth = 396;
                paperSize.pageHeight = 559;
                break;
        }
        return paperSize
    }

    // To print the diagram.
    public btnPrintClick() {
        let options = { region: 'Content' };
        let diagram = (document.getElementById("diagram") as any).ej2_instances[0];
        let hOffset = diagram.scrollSettings.horizontalOffset;
        let vOffset = diagram.scrollSettings.verticalOffset;
        let zoom = diagram.scrollSettings.currentZoom;
        localStorage.setItem('print', diagram.saveDiagram());
        diagram.loadDiagram(localStorage.getItem('print'));
        diagram.print(options);
        if (zoom <= 0.45) {
            diagram.fitToPage({ mode: 'Page', region: 'Content' });
        } else {
            diagram.scrollSettings.horizontalOffset = hOffset;
            diagram.scrollSettings.verticalOffset = vOffset;
        }
        diagram.dataBind();
    }

    // To execute toolbar click operation
    public toolbarclick(args: ClickEventArgs) {
        let item = (args as any).item.tooltipText;
        let diagram = (document.getElementById("diagram") as any).ej2_instances[0];
        switch (item) {
            case 'Undo':
                diagram.undo();
                break;
            case 'Redo':
                diagram.redo();
                break;
            case 'Bold':
                this.applyStyle('bold');
                break;
            case 'Italic':
                this.applyStyle('italic');
                break;
            case 'Underline':
                this.applyStyle('underline');
                break;
            case 'Select Tool':
                diagram.clearSelection();
                diagram.tool = DiagramTools.Default;
                break;
            case 'Pan Tool':
                diagram.clearSelection()
                diagram.tool = DiagramTools.ZoomPan;
                break;
            case 'Overview':
                let position = (document.getElementById('overview-container') as any).style.position;
                if (position === 'absolute') {
                    (document.getElementById('overview-container') as any).style.position = '';
                    (document.getElementById('overview-container') as any).style.zIndex = "-1";
                    (args as any).item.cssClass = (args as any).item.cssClass.replace('active', '');
                } else {
                    (document.getElementById('overview-container') as any).style.position = "absolute";
                    (document.getElementById('overview-container') as any).style.zIndex = "1000";
                    (args as any).item.cssClass += ' active';
                    let overview = (document.getElementById('overview') as any).ej2_instances[0];
                    overview.refresh();
                }
                break;
        }
        if (item === 'Select Tool' || item === 'Pan Tool') {
            if ((args as any).item.cssClass.indexOf('tb-item-selected') === -1) {
                this.removeSelectedToolbarItem();
                (args as any).item.cssClass += ' tb-item-selected';
            }
        }
        diagram.dataBind();
    }

    // To apply annotation style to selected Node.
    public applyStyle(style: string) {
        let diagram = (document.getElementById("diagram") as any).ej2_instances[0];
        let node = diagram.selectedItems.nodes[0];
        switch (style) {
            case 'bold':
                node.data.IsBold = !node.data.IsBold;
                break;
            case 'italic':
                node.data.IsItalic = !node.data.IsItalic;
                break;
            case 'underline':
                node.data.Decoration = node.data.Decoration === 'Underline' ? 'None' : 'Underline';
                break;
        };
        var args = { itemData: { text: style } };
        this.fontStyleChange(args);
    };

    // To Change font style of the selected node.
    public fontStyleChange(args: any) {
        let type;
        let font = args.itemData.text;
        let diagram = (document.getElementById("diagram") as any).ej2_instances[0];
        let node = diagram.selectedItems.nodes[0];
        if (args.value) {
            type = 'fontSize';
            node.data.FontSize = font;
        } else if (args.itemData.text === 'bold') {
            type = 'bold';
        } else if (args.itemData.text === 'italic') {
            type = 'italic';
        }
        else if (args.itemData.text === 'underline') {
            type = 'underline';
        }
        else if (args.itemValue === 'fontColor') {
            type = 'fontColor';
            node.data.color = font;
        }
        else {
            type = 'fontFamily';
            node.data.FontFamily = font;
        }
        let name = document.getElementById(node.id + '_text1_text');
        if (name) {
            if (type === 'fontSize') {
                name.style.fontSize = font;
            } else if (type === 'bold') {
                name.style.fontWeight = node.data.IsBold ? 'bold' : 'normal';
            } else if (type === 'italic') {
                name.style.fontStyle = node.data.IsItalic ? 'italic' : 'normal';
            } else if (type === 'underline') {
                name.style.textDecoration = node.data.Decoration;
            } else if (type === 'fontColor') {
                name.style.fill = font;
            } else {
                name.style.fontFamily = font;
            }
        }
        let desig = document.getElementById(node.id + '_desig_text');
        if (desig) {
            if (type === 'fontSize') {
                desig.style.fontSize = font;
            } else if (type === 'bold') {
                desig.style.fontWeight = node.data.IsBold ? 'bold' : 'normal';
            }
            else if (type === 'italic') {
                desig.style.fontStyle = node.data.IsItalic ? 'italic' : 'normal';
            }
            else if (type === 'underline') {
                desig.style.textDecoration = node.data.Decoration;
            }
            else if (type === 'fontColor') {
                desig.style.fill = font;
            }
            else {
                desig.style.fontFamily = font;
            }
        }
        let team = document.getElementById(node.id + '_team_text');
        if (team) {
            if (type === 'fontSize') {
                team.style.fontSize = font;
            }
            else if (type === 'bold') {
                team.style.fontWeight = node.data.IsBold ? 'bold' : 'normal';
            }
            else if (type === 'italic') {
                team.style.fontStyle = node.data.IsItalic ? 'italic' : 'normal';
            }
            else if (type === 'underline') {
                team.style.textDecoration = node.data.Decoration;
            }
            else if (type === 'fontColor') {
                team.style.fill = font;
            }
            else {
                team.style.fontFamily = font;
            }
        }
        let email = document.getElementById(node.id + '_email_text');
        if (email) {
            if (type === 'fontSize') {
                email.style.fontSize = font;
            }
            else if (type === 'bold') {
                email.style.fontWeight = node.data.IsBold ? 'bold' : 'normal';
            }
            else if (type === 'italic') {
                email.style.fontStyle = node.data.IsItalic ? 'italic' : 'normal';
            }
            else if (type === 'underline') {
                email.style.textDecoration = node.data.Decoration;
            }
            else if (type === 'fontColor') {
                email.style.fill = font;
            }
            else {
                email.style.fontFamily = font;
            }
        }
        let phone = document.getElementById(node.id + '_phone_text');
        if (phone) {
            if (type === 'fontSize') {
                phone.style.fontSize = font;
            }
            else if (type === 'bold') {
                phone.style.fontWeight = node.data.IsBold ? 'bold' : 'normal';
            }
            else if (type === 'italic') {
                phone.style.fontStyle = node.data.IsItalic ? 'italic' : 'normal';
            }
            else if (type === 'underline') {
                phone.style.textDecoration = node.data.Decoration;
            }
            else if (type === 'fontColor') {
                phone.style.fill = font;
            }
            else {
                phone.style.fontFamily = font;
            }
        }
        let employeeID = document.getElementById(node.id + '_eid_text');
        if (employeeID) {
            if (type === 'fontSize') {
                employeeID.style.fontSize = font;
            }
            else if (type === 'bold') {
                employeeID.style.fontWeight = node.data.IsBold ? 'bold' : 'normal';
            }
            else if (type === 'italic') {
                employeeID.style.fontStyle = node.data.IsItalic ? 'italic' : 'normal';
            }
            else if (type === 'underline') {
                employeeID.style.textDecoration = node.data.Decoration;
            }
            else if (type === 'fontColor') {
                employeeID.style.fill = font;
            }
            else {
                employeeID.style.fontFamily = font;
            }
        }
    }

    // To remove toolbar selected item
    public removeSelectedToolbarItem() {
        let toolbarObj = (document.getElementById("toolbarEditor") as any).ej2_instances[0];
        for (let i: number = 0; i < toolbarObj.items.length; i++) {
            let item = toolbarObj.items[i];
            if (item.cssClass.indexOf('tb-item-selected') !== -1 && item.tooltipText !== 'Overview') {
                item.cssClass = item.cssClass.replace(' tb-item-selected', '');
            }
        }
        toolbarObj.dataBind();
    }

    // To insert or remove or delete the picture of the node.
    public insertOrRemovePicture(args: SelectEventArgs) {
        let option: string = (args.item as any).text;
        switch (option) {
            case 'Insert':
            case 'Change':
                (document.getElementsByClassName('pictureUpload')[0].querySelector('button') as any).click();
                break;
            case 'Delete':
            case 'Show/Hide':
                this.removePicture(option);
        }
    }

    // To remove the picture of the node.
    public removePicture(option: string) {
        let diagram = (document.getElementById("diagram") as any).ej2_instances[0];
        let id = diagram.selectedItems.nodes[0].data.Id;
        let nodeObj = diagram.dataSourceSettings.dataSource.dataSource.json.find((obj: any) => obj.Id === id);
        let imageTag = document.getElementById(diagram.selectedItems.nodes[0].id + '_picimage');
        if (option === 'Delete') {
            nodeObj.ImageUrl = '';
            (imageTag as any).href.baseVal = '';
        } else {
            if (nodeObj.ImageUrl !== '') {
                let getObj = { id: nodeObj.Id, imageUrl: nodeObj.ImageUrl };
                this.showHidePictures.push(getObj as never);
                nodeObj.ImageUrl = '';
                (imageTag as any).href.baseVal = '';
            } else {
                let obj = this.showHidePictures.find((item) => (item as any).id === nodeObj.Id);
                nodeObj.ImageUrl = obj ? (obj as any).imageUrl : '';
                (imageTag as any).href.baseVal = obj ? (obj as any).imageUrl : '';
                // Find the index of the object in showHidePictures
                let index = this.showHidePictures.findIndex((item) => (item as any).id === nodeObj.Id);
                // If the object exists in showHidePictures, remove it using splice()
                if (index !== -1) {
                    this.showHidePictures.splice(index, 1);
                }
            }
        }

    }

    // To modify the zoom value of diagram.
    public zoomChange(args: SliderChangeEventArgs) {
        if (args.isInteracted) {
            let zoom: Object = {};
            let diagram = (document.getElementById("diagram") as any).ej2_instances[0];
            (zoom as any).zoomFactor = (((args as any).value / 100) / diagram.scrollSettings.currentZoom) - 1;
            diagram.zoomTo(zoom);
            (document.getElementById('zoomSliderText') as any).value = args.value.toString() + '%';
            diagram.dataBind();
        }
    }

    // To choose whether to modify the image alignment or employee details.
    public modifyNodeTemplate(args: any) {
        var currentShapeTemplate = 'Image at left';
        var fieldsList = (document.getElementById("multiCheckbox") as any).ej2_instances[0];
        let template = (args as any).item ? (args as any).item.text : currentShapeTemplate;
        let newValue = (args as any).value ? (args as any).value : fieldsList.value;
        if ((args as any).item && (args as any).item.text) {
            if (template !== currentShapeTemplate) {
                currentShapeTemplate = template;
                this.updateNodeTemplate(newValue, template);
            }
            else {
                this.updateNodeTemplate(newValue, template);
            }
        }
        else {
            this.updateNodeTemplate(newValue, template);
        }
    }

    // To update the setNodeTemplate method of diagram.
    public updateNodeTemplate(newValue: any, template: any) {
        let diagram = (document.getElementById("diagram") as any).ej2_instances[0];
        diagram.setNodeTemplate = (obj: any) => {
            var fieldsList = (document.getElementById("multiCheckbox") as any).ej2_instances[0];
            let content = new StackPanel();
            content.id = obj.id + '_outerstack';
            content.orientation = 'Horizontal';
            content.style.fill = obj.data.Fill;
            content.style.strokeColor = obj.data.StrokeColor;
            content.padding = { left: 5, right: 10, top: 5, bottom: 5 };

            // Add the line at the top of the outer stack
            let line = new PathElement();
            line.data = 'M0,0 L1,0'; // Line from (0,0) to (1,0)
            line.width = 2;
            line.height = 1;
            line.style.strokeWidth = 2;
            (line.style as any).margin = { left: 20, right: 20, top: 20, bottom: 20 };
            line.style.strokeColor = (obj.data).RatingColor;
            line.horizontalAlignment = 'Stretch';
            line.verticalAlignment = 'Top';
            line.id = obj.id + '_line';

            let image = new ImageElement();
            image.width = 50;
            image.height = 50;
            image.source = (obj.data).ImageUrl ? (obj.data).ImageUrl : '';
            image.id = obj.id + '_pic';
            image.style.strokeColor = 'transparent';
            image.style.fill = 'transparent';

            let innerStack = new StackPanel();
            innerStack.style.strokeColor = 'transparent';
            innerStack.style.fill = 'transparent';
            innerStack.margin = { left: 5, right: 0, top: 0, bottom: 0 };
            innerStack.id = obj.id + '_innerstack';
            let text; let desigText; let teamText; let eidText; let emailText; let phoneText;
            let childElements = [line];
            if (newValue.indexOf('Name') !== -1) {
                text = new TextElement();
                text.content = (obj.data).Name;
                text.style.color = obj.data.color;
                text.style.bold = obj.data.IsBold;
                text.style.italic = obj.data.IsItalic;
                text.style.textDecoration = obj.data.Decoration;
                text.style.fontSize = obj.data.FontSize;
                text.style.fontFamily = obj.data.FontFamily;
                text.style.strokeColor = 'none';
                text.horizontalAlignment = 'Left';
                text.style.fill = 'none';
                text.id = obj.id + '_text1';
                childElements.push(text as any);
            }
            if (newValue.indexOf('Desig') !== -1) {
                desigText = new TextElement();
                desigText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
                desigText.content = (obj.data).Designation;
                desigText.style.color = obj.data.color;
                desigText.style.strokeColor = 'none';
                desigText.style.fontSize = obj.data.FontSize;
                desigText.style.fontFamily = obj.data.FontFamily;
                desigText.style.bold = obj.data.IsBold;
                desigText.style.italic = obj.data.IsItalic;
                desigText.style.textDecoration = obj.data.Decoration;
                desigText.style.fill = 'none';
                desigText.horizontalAlignment = 'Left';
                desigText.style.textWrapping = 'Wrap';
                desigText.id = obj.id + '_desig';
                childElements.push(desigText as any);
            }
            if (newValue.indexOf('Team') !== -1) {
                teamText = new TextElement();
                teamText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
                teamText.content = (obj.data).Team;
                teamText.style.color = obj.data.color;
                teamText.style.strokeColor = 'none';
                teamText.style.fontSize = obj.data.FontSize;
                teamText.style.fontFamily = obj.data.FontFamily;
                teamText.style.bold = obj.data.IsBold;
                teamText.style.italic = obj.data.IsItalic;
                teamText.style.textDecoration = obj.data.Decoration;
                teamText.style.fill = 'none';
                teamText.horizontalAlignment = 'Left';
                teamText.style.textWrapping = 'Wrap';
                teamText.id = obj.id + '_team';
                childElements.push(teamText as any);
            }
            if (newValue.indexOf('EID') !== -1) {
                eidText = new TextElement();
                eidText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
                eidText.content = (obj.data).EmployeeID;
                eidText.style.color = obj.data.color;
                eidText.style.strokeColor = 'none';
                eidText.style.fontSize = obj.data.FontSize;
                eidText.style.fontFamily = obj.data.FontFamily;
                eidText.style.bold = obj.data.IsBold;
                eidText.style.italic = obj.data.IsItalic;
                eidText.style.textDecoration = obj.data.Decoration;
                eidText.style.fill = 'none';
                eidText.horizontalAlignment = 'Left';
                eidText.style.textWrapping = 'Wrap';
                eidText.id = obj.id + '_eid';
                childElements.push(eidText as any);
            }
            if (newValue.indexOf('Email') !== -1) {
                emailText = new TextElement();
                emailText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
                emailText.content = (obj.data).EmailId;
                emailText.style.color = obj.data.color;
                emailText.style.strokeColor = 'none';
                emailText.style.fontSize = obj.data.FontSize;
                emailText.style.fontFamily = obj.data.FontFamily;
                emailText.style.bold = obj.data.IsBold;
                emailText.style.italic = obj.data.IsItalic;
                emailText.style.textDecoration = obj.data.Decoration;
                emailText.style.fill = 'none';
                emailText.horizontalAlignment = 'Left';
                emailText.style.textWrapping = 'Wrap';
                emailText.id = obj.id + '_email';
                childElements.push(emailText as any);
            }
            if (newValue.indexOf('Phone') !== -1) {
                phoneText = new TextElement();
                phoneText.margin = { left: 0, right: 0, top: 5, bottom: 0 };
                phoneText.content = (obj.data).PhoneNumber;
                phoneText.style.color = obj.data.color;
                phoneText.style.strokeColor = 'none';
                phoneText.style.fontSize = obj.data.FontSize;
                phoneText.style.fontFamily = obj.data.FontFamily;
                phoneText.style.bold = obj.data.IsBold;
                phoneText.style.italic = obj.data.IsItalic;
                phoneText.style.textDecoration = obj.data.Decoration;
                phoneText.style.fill = 'none';
                phoneText.horizontalAlignment = 'Left';
                phoneText.style.textWrapping = 'Wrap';
                phoneText.id = obj.id + '_phone';
                childElements.push(phoneText as any);
            }

            innerStack.children = childElements;
            if (template === 'No image') {
                content.children = [innerStack];
            } else if(template === "No image with subtext"){
                content.children = [innerStack];
            }
            else if (template === 'Image at left') {
                content.children = [image, innerStack];
            }
            else if(template === "Image at left with subtext"){
                content.children = [image, innerStack];
            }
            else {
                content.orientation = 'Vertical';
                content.children = [image, innerStack];
            }
            if (fieldsList.value.length === 0) {
                if (template === 'No image') {
                    content.width = 100;
                    content.height = 50;
                }
            }
            return content;
        };
        diagram.dataBind();
        diagram.clear();
        diagram.refresh();
        diagram.fitToPage({ mode: 'Page', region: 'Content' });
    }

}