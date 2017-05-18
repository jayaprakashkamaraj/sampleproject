# EJ2 Component Development

EJ2 component development is based on the following
1. Module Loading (Require JS).
2. ECMA 6.
3. Pure JavaScript.
4. TDD Development.
5. Code Coverage.
6. Jasmine Unit Testing.
7. Node JS.

## Component Structure
We are using typescript. So every controls are create as class and with constructor.

```
export class <ControlName> {
    
    // Control Related code here.

}
```

### Control Base Class Extension
We need to extend the Component class to your control class. Please refer below snippet.

```
export class Button extends Component<HTMLElement> {

      // Control Code

}
```

_Note: If you are developing any libraries like Touch, Keyboard, etc.., you can extend the Base class to your library class._

The below diagram is to understand better how we extending class for controls and libraries.

![image](./readme/baseextention.png)

### Control Constructor
We need to follow the following structure for control constructor to maintain unique control creation.

```
export class Button extends Component<HTMLElement> {

   constructor(options?: ButtonModel, element?:Element) {
         super(options, <HTMLButtonElement | string>element);
    }

}
```
In constructor, we must pass only two arguments. One is options, which is model of your control and another one parameter is element.

_Note: We must call super in the constructor with same argument._

## Module Loading

In TypeScript based development everything is considered as module. Module is nothing but unique control part. By integrating the several modules, we can develop the component. To know about the modules please follow the below link.

[https://www.typescriptlang.org/docs/handbook/modules.html](https://www.typescriptlang.org/docs/handbook/modules.html)


### Dependency Module
We can import module in different ways. Here we import our control as [scoped packages](https://docs.npmjs.com/misc/scope).

```
import { Dom } from '@syncfusion/ej2-base';

Dom.addClass([<element>], <classname>);
```

Or you can refer dependency directly like below.

```
import { Dom } from './dom';

Dom.addClass([<element>], <classname>);
```
### Module Injection
The dependent modules should be injecting from the sample side and the component should have a protected method `requiredModules`, which needs to be return the list of dependent module declarations. The component will accept the injected modules, if it only contains the same module declaration in the `requiredModules` method. The `requiredModules` should have the same module name return from `getModuleName` method of dependent module.

For example, if “allowEditing” property is enabled in the component, then the `Editing` module should be inject from sample side and the `requiredModules` method must have the same module declaration at source side.

The static method `Inject` can be used to inject the modules on the components.

_sample.ts_

```
import {Grid, Editing} from '@syncfusion/ej2-grids';
import { Paging } from '@syncfusion/ej2-pagers';

Grid.Inject( Editing, Paging );

let grid: Grid = new Grid({
    allowEditing: true
});
```

_source.ts_
```
public requiredModules(): ModuleDeclaration[] {
    let modules: ModuleDeclaration[] = [];
    if(this.allowEditing){
        modules.push({
        // needed arguments to the module
        args: [],
        // member name as same as getModuleName method
        member: 'editing'
    });
    }
    if(this.allowPaging) {
        modules.push({args:[],member:'paging'});  
    }
  
    return modules;    
}
```

_editing.ts_
```
@NotifyPropertyChanges
export class Editing extends Grid<HTMLElement> implements INotifyPropertyChanged {
    ......
    ......

    public getModuleName(): string {
        return 'editing';
    }
}
```

#### Access injected modules
We can access the injected module using the member name along with prepended “Module” text. For Example, **Editing** can access with the **editingModule** member of your class.

```
// Accessing variable of injected module.
private editingModule: EditingModel;

```

## API Property (Model)
In ECMA 6 Standards we need to declare the class properties using getter and setter. For creating properties, we have used [property decorator](https://github.com/arolson101/typescript-decorators#property-decorator) to define properties in each component.

The module **“notify-property-change”** needs to decorate to component class to enable notify able properties.  
1.	Import this module before we implement API Properties.
2.	Implement the **"INotifyPropertyChanged"** interface to your class.
3.	Add class decorator **"NotifyPropertyChanges"** for your class.

### Property creation
The decorator **@Property()** can be used to define a property. This property obtains the following argument.

**defaultValue** – Specifies the default value of the property.

**isComplex** – Specifies the is complex property.

**type** – Class type of properties(Use only if Complex).


The below snippet is creating a simple property.

```
import {Property,  INotifyPropertyChanged, NotifyPropertyChanges} from '@syncfusion/ej2-base';

@NotifyPropertyChanges
export class Button extends Component<HTMLElement> implements NotifyPropertyChanges {

   @Property('')
    public text: string;

   constructor(options?: ButtonModel, element?:Element) {
           // Common 
    }

    public onPropertyChanged(newProp: ButtonModel, oldProp: ButtonModel): void {
         // Model Changed
    }

}
```
### Event creation
The decorator **@Event()** can be used to define an event.On changing the event value onPropertyChanged method will not be triggered. This property has no arguments.
The below snippet is used to  create a simple Event
```
import {Event,  INotifyPropertyChanged, NotifyPropertyChanges} from '@syncfusion/ej2-base';

@NotifyPropertyChanges
export class Button extends Component<HTMLElement> implements NotifyPropertyChanges {

    /**
     * specifies the event to triggered on click happen 
     * @event
     */
    @Event()
    public click:Function;
   constructor(options?: ButtonModel, element?:Element) {
           // Common 
    }

    public onPropertyChanged(newProp: ButtonModel, oldProp: ButtonModel): void {
         // Model Changed
    }

}
```
*Note:@event must be given in the jsdoc for events*
### Complex Property Creation
Our most of controls large control like grid, spreadsheet, schedule.., mostly uses the complex properties(Fields and etc.,) and complex array properties(Columns and etc.,) for this case we need to extend another module **ChildProperty** and use **@Complex** , **@Collection** decorators.

**@Complex** – Use this decorator for complex object.

**@Collection** – Use this decorator for complex array object.


```
import {ChildProperty, Event, Property, Collection, INotifyPropertyChanged} from ' @syncfusion/ej2-base';


class Subject extends ChildProperty<Subject> {
    @Property('')
    public subID: string;

    @Property(0)
    public subScore: number;

    @Property(0)
    public practicalScore: number;
    /**
    *@event
    */
    @Event()
    public childEvent: Function;
}

class DemoClass extends Base<HTMLElement> implements INotifyPropertyChanged {

    @Property('')
    public name: string;

    @Property('')
    public id: string;

    @Complex<SubjectModel>({} Subject)
    public subject1: SubjectModel;

    @Collection<SubjectModel>([], Subject)
    public subjectCollection: SubjectModel[];

    
    @Event()
    public parentEvent: Function;
    protected getModuleName(): string {
        return 'demo';
    }

    constructor(ele: HTMLElement) {
        super({}, ele);
    }

    public onPropertyChanged(newProp: Object, oldProp: Object): void {
        /** Implement change logics*/
    }

}
```

In the above example Subject is Complex property of demo class. So we need to create separate class for Subject like and also pass the type as Subject in demo class subject property.

### Triggering the complex property events.
In order to trigger the complex property event, we must specify the event name as **propName-subPropertyName**. The below snippet shows how to call the childevent in subject1 complex property.
```
let demo:DemoClass = new DemoClass();
            //property-subProperty
demo.trigger('subject1-childEvent');
```

### Add and remove additonal handlers for public events.

#### addEventListener
This method is used to  add additional handlers to the  the public events. 
```
import {DemoClass} from './demo';
function handler(): boolean {
    return true;
}
function handler1() :boolean {
    return true;
}
let demo:DemoClass = new DemoClass();
demo.parentEvent = handler1;
demo.addEventListener('parentEvent', handler);
// triggering the event.
demo.trigger('parentEvent');
//Both handler1 and handler will be called wheh parentEvent function is triggered.
```
#### removeEventListener
This method is used to  remove  handlers to the  the public events. 
```
import {DemoClass} from './demo';
function handler(): boolean {
    return true;
}
function handler1() :boolean {
    return true;
}
let demo:DemoClass = new DemoClass();
demo.parentEvent = handler1;
demo.addEventListener('parentEvent', handler);
demo.removeEventListener('parentEvent', handler);
//handler will be removed from the event. 
```
## Add Property Model
We will generate the Property model based on your control properties. You can use this as a model of your control. After adding your model, you can access all you public properties.

button.ts
```
import {Property,  INotifyPropertyChanged, NotifyPropertyChanges} from '@syncfusion/ej2-base';
import {ButtonModel} from './button-model';

@NotifyPropertyChanges
export class Button extends Component<HTMLElement> implements NotifyPropertyChanges {

   @Property('')
    public text: string;

   constructor(options?: ButtonModel, element?:Element) {
           // Common 
    }

    public onPropertyChanged(newProp: ButtonModel, oldProp: ButtonModel): void {
         // Model Changed
    }

}
```

_Note: Model file will create automatically on building scripts. The file name of model file is like your model name prepended with “–model”. Ex: button-model_

## OnPropertyChanged

**onPropertyChanged** is another abstract method declared in the **INotifyPropertyChanged** interface which is similar to **setModel** in EJ.

The method will trigger while changing the API of the control. Please refer the below snippet for better understanding.

```
public onPropertyChanged(newProp: ButtonModel, oldProp: ButtonModel): void {
        for (let prop of Object.keys(newProp)) {
            switch (prop) {
                case 'text':
                             …………..//set the text to Dom element
                             break;
                Case ‘width’:
                           ……………..//set the width to Dom element
                             break;
            }
       } 
}
```

## Event Mechanism

### Trigger Events
To trigger an event by using **trigger()** function. It will accept eventName and an argument object as an argument.

```
import {Property, Event, INotifyPropertyChanged, NotifyPropertyChanges} from '@syncfusion/ej2-base';

@NotifyPropertyChanges
export class Button extends Component<HTMLElement> implements NotifyPropertyChanges {

   @Property('')
    public text: string;

   /** 
    *@event
    */
   @Event('')
    public click: Function;


   constructor(options?: ButtonModel, element?:Element) {
           // Common 
    }

    private buttonClickEventHandler(){
        this.trigger(“click”,<arguments>)
    }

}
```

_Here, click is the event property. It will automatically call the function when it event is triggered._

### Event Binding
To bind the event for the internal control Dom elements first we need to import the `eventhandler` module as below in the source file and then use the **EventHandler**  like below.

```
import {EventHandler} from '@syncfusion/ej2-base ';

EventHandler.add(this.element, 'mousedown', this.buttonClickEventHandler, this);
```

_Note: To create proxy use arrow function. This is from ES6 standard._

## Component Destroy

We have a destroy method in every control in which we can destroy our control and need to call super.destroy() to call a destroy method in the component. In super.destroy() we cleared all the modules that are loaded relevant to this control since we need to clean and unbind some events while destroy.

```
export class Button extends Component<HTMLElement> {

   constructor(options?: ButtonModel, element?:Element) {
         super(options, <HTMLButtonElement | string>element);
    }

    public destroy(): void {
        super.destroy();
    }

}
```

## Enums
Enum value needs to be exported for selecting the option in the sample side for that we need to export the enum values.
```
export enum ButtonType {
    Submit,
    Button,
    Reset
}
```

## State Persistence
State persistence has been implemented. While rendering the control, values are merged from the local storage getItem method and while navigating or destroying the control the value updated in the local storage by using setItem method().

For maintaining state persistence we have used two methods such as addOnPersist() and ignoreOnPersist(). Based on the control requirement, we can use any one of it.

### Add On Persistence
```
protected getPersistData(): string {
  let keyEntity: string[] = ['enable', 'enableRtl', 'cssClass'];
  return this.addOnPersist(keyEntity);
}
``` 

### Ignore On Persistence
```
protected getPersistData(): string {
  let keyEntity: string[] = ['enable', 'enableRtl', 'cssClass'];
  return this.ignoreOnPersist (keyEntity);
}
```

## Add Control Dependency
All dependencies are configured based on your ‘package.json’ file. If your control needs any dependency, means need to add respective dependency in a devDependencies section of package.json file.

package.json
```
"devDependencies": {
    "@syncfusion/ej2-build": "*",
  },
```
_Here, ‘*’ denote the latest version of the packages._

## Control Flow on Initialize
1.	Constructor
2.	Pre Render 
3.	Require module
4.	Render 

### Constructor
When control flow starts, your component constructor will trigger. For creating constructor, we must follow unique code handling Please refer Control Constructor section.

### PreRender
Here we can initialize the necessary thing before going to render. For example, you can add your event handler which you going to bind.

_Note: You cannot get an element from here_

### RequireModule
In requiredModule function, it will load dynamically required module based on need and then once success it will process to next stage.

### Render
This is beginning of control rendering. In this function, you can get the element and your control processing starts from here.

Refer below diagram

![control initial flow diagram](./readme/onInitialize.png)

## Control Flow on Property change

![property change flow diagram](./readme/onpropertychange.png)

## Control Rendering
We can render the control in three different formats as below on sample page.

### ID with object

sample.ts
```
import {Button, ButtonSize} from '@syncfusion/ej2-buttons';

let button: Button = new Button({
    text: 'Button',
    size: ButtonSize.Medium,
    showRoundedCorner: true, enablePersistance: true
}, <element>);
```

### ID in appendTo() method

sample.ts
```
import {Button, ButtonSize} from 'ej2-buttons';

let button: Button = new Button({
    text: 'Button',
    size: ButtonSize.Medium,
    showRoundedCorner: true, enablePersistance: true
});
button.appendTo(<element> or  <selector>);
```
### Fluent builder
We have another way to render the controls using fluent builder. The helper function will be automatically generated based on the control properties. To generate the helper function, we need to include the **builderFileList** property in the **config.json** file.

*Config.json*	
```
//"builderFileList":{filename: className}
  "builderFileList":{"listview":"ListView"}   

```
Note: In the above snippet the “listview” specifies the filename and “ListView” is the class name of the component.
#### Initialize builder 
For this we need to import **CreateBuilder** form base library and also import helper function form your control builder. For example, **listview-builder** is listview builder module.

*listview.ts*
```
// include the createBuilder from base-library

import { NotifyPropertyChanges, INotifyPropertyChanged, ChildProperty, KeyboardEvents, CreateBuilder} from '@syncfusion/ej2-base';

// include the helper  form the control builder 
import {ListViewHelper} from './listview-builder'

class ListView {
}
// Add the builder variable after class declaration
export let ListViewBuilder: ListViewHelper = <ListViewHelper> CreateBuilder(ListView);

```

#### Render control using Builder
To render a control using the builder we need to import the builder variable from the component library.

*Sample.ts*
```
import {ListViewBuilder, ListView} from '@syncfusion/ej2-lists;
let list: ListView = new ListViewBuilder('#newTree').dataSource(
                    new DataManager({ url: '/api', adaptor: new ODataV4Adaptor })).fields(f => 
                    { f.id('EmployeeID').text('FirstName').tableName('Employees') }).create();

```
Note: It is mandatory to call the **create()** function at last which will trigger the control rendering.

## TypeDoc
TypeDoc is automatically generate API’s list for your control. TypeDoc gather its type and other required information based on property type.

**Property**
```
   /**
     * Specifies the RTL is enable or not.
     * @default false
     */
    @Property(false)
    public enableRtl: boolean;

```

**Event**
```
    /**
     * Specifies the callback function for create event.
     * @event
     */
    @Property()
    public create: Function;
```

**Method**
```
    /**
     * To destroy the widget
     */
    public destroy(): void {
        super.destroy();
        this.element.classList.remove('e-button');
        this.unwireEvents(this.repeatButton);
    }

```
## Local event binding in the component.
Local event are used within the component for performing certain operations. A component can have any number of private events.The following functions are used for private event operations in the component.
### on
**on** method is used to attaches one or more  event handler to the current component context. An event can have more than one handlers.The below code snippet shows how to bind a handler to event.
```
import {Event,  INotifyPropertyChanged, NotifyPropertyChanges} from '@syncfusion/ej2-base';

@NotifyPropertyChanges
export class Button extends Component<HTMLElement> implements NotifyPropertyChanges {

    /**
     * specifies the event to triggered on click happen 
     *@event
     */
    @Event()
    public click:Function;
   constructor(options?: ButtonModel, element?:Element) {
           // Common 
    }

    public onPropertyChanged(newProp: ButtonModel, oldProp: ButtonModel): void {
         // Model Changed
    }
    public preRender():void {
        //binding private handler to private event 'rendercomplete'.
           // bind single event
        this.on('render',this.rendered,this)
        // bind collection of events
        this.on([{event:'renderComplete',handler: this.renderComplete}]);
    }
    public rendered() :void {

    }
    public renderComplete(): void {

    }
}
```
### off
**Off** method is used to undind one or more  handlers from the event.The below snippet shows how to unbind a handler.
```
// to unbind particular handler 
this.off([{event:'renderComplete',handler:this.rendered}]);
// to unbind all handlers
this.off('renderComplete');
```
### notify
**notify** method is used to call all handlers binded to the event. The below snippet shows how to notify a event.
```
this.notify('renderComplete',args);
```

## Localization
We can customize your local language using localization library. Which will return the desired locale string based on the culture id and control name and property passed.

### How to use in sample Side 
#### Set Global Locale Object and culture
To set the locale object which are common to all components, we need to set the locale object throw static function **load** in L10n library. To set default locale culture for all components set value by using methos **setCulture**
```
import { L10n , setCulture} from '@syncfusion/ts-base-library';
// globale locale  object must be given in the  format {cultureName:{ controlName:{//labels}}}
L10n.load({
    'fr-BE': {
        'button': {
            locale: ‘lieu’
        }
    }
});
setCulture(‘fr-BE’);

```
Note: If **L10n.default** value is not set it takes **‘en-Us’** as value by default.

### How to use in Component Side
#### Initialize the localization 
To initialize the L10n in our component, we need to create a new instance of the Localization class by passing the default **controlName** and component default **locale object** to the constructor.
```
import {L10n} '@syncfusion/ts-base-library';
//default locale  object must be given in format {propertyName: value}
let l10n: L10n = new L10n('button', {
    locale: 'locale'
});

```
#### Get localized text
To get the localized constant for current property, we need to call the function getConstant which will return the localized text based on the property name.
```
// l10n.getConstant(propertyName: string)
l10n. getConstant ('global');

```
#### Dynamically Change locale culture
To change locale culture in a  component, we need to call setLocale function which will change the locale culture.
```
// l10n. setLocale (cultureName)
l10n.setLocale('en-US');

```
## Internationalization
We can format number and date using the Internationalization library.
### How to use in sample Side 
#### Set global culture and currency code.
By using the function **setCulture** we can set the global culture which is common for all components and using **setCurrencyCode** we can set the currency code globally. Default value for culture is **en-US** and currency code is  **USD** will be considered for formatting if values are not set.
```
import {setCulture,setCurrencyCode} from '@syncfusion/ts-base-library';
// To change default culture.
setCulture('de-DE');
// To change default currency code.
setCurrencyCode('EUR');
``` 
### How to use in Component Side
#### Initialize the Internationalization
 To use the Internationalization in the component. We need to create a instance of the module in your component. We can pass the culture name which is specific to the component on creating instance.It is recommended  not to set the culture in the component side, since the culture value is taken from global culture value.
 ```
 import {Internationalization} from '@syncfusion/ts-base-library';
 // Create instance using the global culture settings. 
 let Intl: Internationalization = Internationalization();
 // Create instance using the local culture for individual component.
 let Intl: Internationalization = Internationalization('ar-QA');
 ``` 
##### Using getDateFormat and getNumberFormat
In some component we may use same formatting options repeatedly in such scenarios we need use the **getDateFormat** function for getting date formatter  and **getNumberFormat** function for getting number formatter with given options.The return value will be function for formating specified format options.
```
import {Internationalization} from '@syncfusion/ts-base-library';
let Intl: Internationalization = Internationalization();
\\Date formatter.
let dateformat:Function = Intl.getDateFormat({skeleton:'long',type:'dateTime'});
let date1:string = dateformat(new Date('1/5/2016'));
let date2: string = dateformat(new Date('1/5/2016'));
\\Number fromatter.
let numberformat:Function = Intl.getDateFormat({skeleton:'C', maximumFractionDigits:4, curreny:'INR'});
let num1:string = numberformat(123687.34);
let num2: string = numberformat(128863.453);
``` 
##### Using formatDate and formatNumber.
If we different format options each time we can use **formatDate** for date formatting and  **formatNumber** for number formatting.
```
import {Internationalization} from '@syncfusion/ts-base-library';
let Intl: Internationalization = Internationalization();
\\format date.
let date1:string = Intl.formatDate(new Date(),{skeleton:'full'});
\\Number fromatter.
let num1:string =  Intl.formatDate(234534345,{skeleton:'C', maximumFractionDigits:4, curreny:'INR'});
``` 

## Reference Links

1.	API’s –(Can get List of APIs in controls)  [http://syncfusion.bitbucket.org/api/](http://syncfusion.bitbucket.org/api/) 
2.	TypeScript Repositories – (Can see the type script repositories) [https://gitlab.syncfusion.com/dashboard?utf8=%E2%9C%93&filter_projects=ej2-](https://gitlab.syncfusion.com/dashboard?utf8=%E2%9C%93&filter_projects=ej2-)  
3.	Component Repository Template –(Can use if you create new control) [https://gitlab.syncfusion.com/essential-studio/ej2-component-template](https://gitlab.syncfusion.com/essential-studio/ej2-component-template) 
4.	Samples – (Can see the sample browser) [http://syncfusion.bitbucket.org/samples/](http://syncfusion.bitbucket.org/samples/) 
