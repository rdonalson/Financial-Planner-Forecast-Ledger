# FPFLUI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.5.

## Configuration
  * Setup an Azure Account with a Subscription
  * Create a Web App Service for the FPFL-UI Angular 12 SPA; 
      - Stack:    .Net
      - Version:  .Net Core 3.1, Integrated
      - Pipeline: Integrated
      - Everything else, take default settings 
  * Create another Webb App Service for the FPFL-API Core API with the same settings
  * Create a free (Simplest Pricing Structure) SQL Server Database "FPFL"
  * Click on Azure Active Directory and register both Web Apps
  * Expose the API with 3 scopes; access_as_user, basic.read and basic.write with Admin and User consent
  * Goto the UI and add those scopes and grant admin consent for the domain "my-new-domain.onmicrosoft.com"
  * Creat a couple of users for this domain
  * Download the entire repository to your local repository
  * Create a new database, "FPFL", in a local SQL Server "MyDefaultSQLSeverInstance" or in the "(localdb)\MSSQLLocalDB"
  * Get both UI and API up and running, assuming that you're experienced with this so I won't go into the particulars.
      - UI will be http://localhost:1000/
      - API will be https://localhost:5001/api
  * In the UI Project goto the "auth-config.json" file located here: ~/FPFL-UI/src/app/shared/auth-config.json add these highlighted values 
          ![image](https://user-images.githubusercontent.com/6240981/134772164-33e459be-afda-4f8d-9d6f-766ad0ae2ea5.png)

  * In the API Project goto the "auth-config.json" file located here: ~/FPFL-API/FPFL.API.Web/appsettings.json add these highlighted values
          ![image](https://user-images.githubusercontent.com/6240981/134772334-5830b562-7002-4e93-8d81-1af9c6200fcb.png)

  * Run the API and the UI and verify you can log into the UI and it integrates with the API by adding some data, initial amount, credits, etc.          
  * Once everything is working on the local deploy the UI and API projects to their respective Azure Web Apps after making these changes to 
      - the auth-config
          ![image](https://user-images.githubusercontent.com/6240981/134772753-1742d3fa-6927-40e6-aedb-1f702e8c882a.png)
      - and the AppSetting
          ![image](https://user-images.githubusercontent.com/6240981/134772806-9fc5b1bc-8f20-4cce-b1c4-ebc42b845018.png)
  * This is greatly abreviated, so you'll need to do your own study of Azure Development 



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:1000/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
