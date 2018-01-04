# ng5-time-picker
This module is a fork from https://github.com/SteveDunlap13/MaterialTimeControl.

It provides beautiful time picker for Angular Material 5 as it does not provide any time picker yet (only date pickers).

## Environment 
The component works with Angular 5 and Angular CLI 1.5.

## Customization 

It provides also many options for customization:
- you can set the color theme by assigning a primary color.
- you can also tell which format you want (12H or 24H).

## Install
Install the module via npm:

    npm install ng5-time-picker --save

## Usage
Import the this module into your module as follows:

    import { Ng5TimePickerModule } from 'ng5-time-picker';

	@NgModule({
        imports: [
            BrowserModule,
            BrowserAnimationsModule,

            Ng5TimePickerModule,
            MatCardModule,
            MatSnackBarModule,
        ]

    })
    export class AppModule {
        ...
    }

Set up the config of time pickers in your AppModule.ts (format 12H)
```

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Configuration of the time picker (format 12H with a default date and time)
  private config = { hour: 7, minute: 15, meriden: 'PM', format: 12 };
  ... 
}
```


Update your HTML (app.component.html) and instantiate the time picker :

```
<div class="container">
  <form class="demo-form">
    <timepicker color="primary" [(userTime)]="exportTime"></timepicker>
  </form>
</div>
```

Update your CSS (app.component.css) :
```
.container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: relative;
    margin: 1em;
  }
  
  .demo-form {
    padding: 4em;
  }
  
  .mat-card {
    padding: 0;
    max-width: 600px;
    margin: 3rem auto;
  }
```

## Angular Material 5 style to import (use default or your own theme)

Please use the default theme from https://material.angular.io/guide/theming as follows:

Update your index.html to include the following style

```
<head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">    
</head>
```

Update your 'styles.css' to use the beautiful Angular Material theme: 

```
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
```

## Build

    npm install
    npm build

## Running with Angular CLI

    ng serve