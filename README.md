# Financial-Planner-Forecast-Ledger
## Source Code

This version of the Financial Planner is an Angular 12 SPA using PrimeNg, Material, Bootstrap 5, a .Net Core 3.0 API and using Azure Active Directory securing both. 
The UI and API are being hosted on the Azure Cloud. 
The DAL is Entity Framework Core 3.1, designed in a Code First approach.

Demo on Azure: https://fpng-ui.azurewebsites.net/home
  * Login: bbusby@rdonalson.onmicrosoft.com
  * Pswd: I'amAFullStackDevIn2021
  * Additional Login: ttutone@rdonalson.onmicrosoft.com
  * Pswd: BSM@B4rRyG6qX5ph

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

## 10/10/2021 Updates & Additions
  * Added ExcelJs Excel export to Display on Chart & Ledger
  * Reconfigured Ledger for better display of Credit & Debit Items
  * Excel export & Leger are styled in the same manner.
