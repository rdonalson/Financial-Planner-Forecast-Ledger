# Financial-Planner-Forecast-Ledger (Angular 12)
## Source Code

This version of the Financial Planner is an Angular 12 SPA using PrimeNg, Material, Bootstrap 5, a .Net Core 3.0 API and using Azure Active Directory securing both. 
The UI and API are being hosted on the Azure Cloud. 
The DAL is Entity Framework Core 3.1, designed in a Code First approach.

Demo on Azure: https://fpng-ui.azurewebsites.net/home
  * Login: bbusby@rdonalson.onmicrosoft.com
  * Pswd: SciFiSlackerAI-2022   
    -	**Note: When prompted click “Ask Later”, don’t click “Next”

## Improvements and Consolidations 
  * Better Responsive Behaviour
  * Consolidation of Debits, Credits & Initial Amount in these areas:
     - UI: 
       - Credit and Debit components, html, styling and services into single region, Item
       - VwCredit, VwDebit, Credit, Debit and InitialAmount models to one models, IItem
     - API:
       - Credit and Debit API Controllers, Data Structures and Infrastructure to single region, Item
     - Database:
       - Credit, Debit and InitialAmount merged to one table with ItemType marker into new Database, "FPFL"
       - Reconfigured the Ledger Readout procedure to use these changes
  * Added Database Project containing individual SQL Scripts that Drop and Create all of the database objects
  * Enabled Lazy Loading of Modules in the Features Section.

### 10/10/2021 Updates & Additions
  * Added ExcelJs Excel export to Display on Chart & Ledger
  * Reconfigured Ledger for better display of Credit & Debit Items
  * Excel export & Leger are styled in the same manner.

### 10/23/2021 Updates & Additions
  * Altered the Login Operations in the Header:
     - Created a Singleton Login Service
     - Handles Claims creation in the LocalStorage
     - Stores the User's OID 
     - Stores the LoggedIn status
  * Altered the Navigation Menu Array: 
     - Moved data to JSON file 
     - Created a Singleton Menu Service to provide the items to the Menu Components
     - Added new Menu on the Home Page
  * Altered the Utility Arrays in the Edit Item Component: 
     - Moved datasets to JSON file, DaysInTheMonth, WeekDays & Month
     - Created new model for datasets, an array of arrays, IUtilArray
     - Created a Singleton Utility Array Service to provide the items to the Dropdown & Radio Groups Selectors
  * Altered the Image Utility for the Home:
     - Moved image addresses to JSON file
     - Created a Singleton Image Service to provide the image addresses to the Galleria component  
