# Financial Planner Forecast Ledger  
**Angular 15 SPA + .NET Core API (Azure Hosted)**

The **Financial Planner Forecast Ledger** is a full‑stack application designed to help users project their financial solvency across any future time frame. It combines an Angular 15 single‑page application with a .NET Core API, both deployed on Azure. Authentication is handled through **Microsoft Intra ID (Active Directory)**, and all data is stored in **Azure SQL Server** using Entity Framework Core (Code‑First).

---

## Overview

This application enables users to forecast their checking or savings account balance into the future. By entering income sources, recurring expenses, and a starting balance, users can generate a projected ledger or timeline view. Data can also be exported to Excel for offline analysis.

### Core Features
- Track recurring **credits** (income)
- Track recurring **debits** (expenses)
- Enter a **starting balance**
- Generate forecasts for any date range
- View results in:
  - **Timeline View**
  - **Ledger Display & Export** (Excel export supported)
- Secure login via **Microsoft Intra ID**
- Fully hosted on **Azure Cloud**

---

## How It Works

1. **Log in** using your Microsoft account (Intra ID).  
2. Navigate to **Item Detail**.  
3. Add your **credits** (paychecks, refunds, etc.).  
4. Add your **debits** (bills, mortgage, car payments, etc.).  
   - Enter debit amounts as positive numbers; the system handles subtraction.  
5. Enter your **starting balance**.  
6. Go to the **Display** section and choose:
   - **Timeline**
   - **Ledger Display & Export**  
7. Enter a date range and generate your forecast.  
8. Export to Excel if needed.

---

## Demo & Links

- **Demo:** Financial Planner Forecast Ledger (available upon request)  
- **GitHub (Source Code):** `https://github.com/rdonalson/Financial-Planner-Forecast-Ledger` [(github.com in Bing)](https://www.bing.com/search?q="https%3A%2F%2Fgithub.com%2Frdonalson%2FFinancial-Planner-Forecast-Ledger")  
- **LinkedIn:** `https://www.linkedin.com/in/rick-donalson-52281328/` [(linkedin.com in Bing)](https://www.bing.com/search?q="https%3A%2F%2Fwww.linkedin.com%2Fin%2Frick-donalson-52281328%2F")  
- **GitHub Profile:** [https://github.com/rdonalson](https://github.com/rdonalson)  
- **Azure Live App:** [https://fpng-ui.azurewebsites.net/home](https://fpng-ui.azurewebsites.net/home)  
- **Documentation:**  
  - Financial Planner Guide  
  - Excel Export Helper  

---

# Front End — Angular 15

### Components, Services & Models
- [ItemListComponent](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/blob/main/FPFL-UI/src/app/features/item-detail/item/item-list/item-list.component.ts)
- [ItemEditComponent](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/blob/main/FPFL-UI/src/app/features/item-detail/item/item-edit/item-edit.component.ts)  
- [ItemService](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/blob/main/FPFL-UI/src/app/features/item-detail/shared/services/item/item.service.ts)  
- [IItem](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/blob/main/FPFL-UI/src/app/features/item-detail/shared/models/item.ts)  
- [GenericValidator](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/blob/main/FPFL-UI/src/app/features/item-detail/shared/validators/generic-validator.ts)  
- [MessageUtilService](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/blob/main/FPFL-UI/src/app/features/item-detail/shared/services/common/message-util.service.ts)  

### NgRx / Redux State
- [Item State](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/tree/main/FPFL-UI/src/app/features/item-detail/shared/services/item/state)  
- [ItemType State](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/tree/main/FPFL-UI/src/app/features/item-detail/shared/services/item-type/state)  
- [Period State](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/tree/main/FPFL-UI/src/app/features/item-detail/shared/services/period/state)

### Markup
- [item-list.component.html](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/blob/main/FPFL-UI/src/app/features/item-detail/item/item-list/item-list.component.html)  
- [item-edit.component.html](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/blob/main/FPFL-UI/src/app/features/item-detail/item/item-edit/item-edit.component.html)  

### Routing & Lazy Loading
- [AppRoutingModule](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/blob/main/FPFL-UI/src/app/app-routing.module.ts)  
- [ItemDetailRoutingModule](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/blob/main/FPFL-UI/src/app/features/item-detail/item-detail-routing.module.ts)  

### Styles
- [app.component.scss](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/blob/main/FPFL-UI/src/app/app.component.scss)  
- [display-main.component.scss](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/blob/main/FPFL-UI/src/app/features/display/display-main.component.scss)  

### Miscellaneous
- [form-utility-items.json](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/blob/main/FPFL-UI/src/assets/data/form-utility-items.json)

---

# Back End — .NET Core API

### API & Repository Layer
- [ItemsController](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/blob/main/FPFL-API/FPFL.API.Web/Controllers/ItemDetail/ItemsController.cs)  
- [RepoItems](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/blob/main/FPFL-API/FPFL.API.Infrastructure/ItemDetail/Repository/RepoItems.cs)  
- [RepoPeriods](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/blob/main/FPFL-API/FPFL.API.Infrastructure/ItemDetail/Repository/RepoPeriods.cs)  

### EF Core (Code First)
- [FPFLContext](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/blob/main/FPFL-API/FPFL.API.Data/Context/FPFLContext.cs)  
- [Item](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/blob/main/FPFL-API/FPFL.API.Data/Domain/Item.cs)  
- [Migrations](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/tree/main/FPFL-API/FPFL.API.Data/Migrations)  

### SQL
- [Stored Procedure: spCreateLedgerReadout.sql](https://github.com/rdonalson/Financial-Planner-Forecast-Ledger/blob/main/FPFL-API/FPFL%20Database/Procedures/spCreateLedgerReadout.sql)

### Entities
- [Domain models for items, periods, and ledger generation](https://github.com/rdonalson/FinancialPlanner/tree/master/FinancialPlanner.Data/Entity)
---
## 06/15/2020 Improvements and Consolidations 
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

### 10/15/2022 Updates & Additions
  * Upgraded Angular 12 to 15     

### 08/06/2023 Updates & Additions
  * Incorporated Redux Pattern:
    - Items, Periods & ItemType
    - For each, you'll generally see files in services/state folders: Reducer, actions & effects
  * GetItems:
    - Changed from using database view vwItems
    - Returning a complex Item/Period/ItemType structure
  * GetItem:
    - Deprecated, now using redux feature pass Item data to Item Edit from List
    - No longer required to get item from db after Posting or Putting.
  * PostItem: 
    - Now API is returning the new Item after successful completion of Add
### 11/10/2023 Bug Fix
  * Fixed the issue of Item Types not being available for initial navigation:
    - Cause:  Recently with an update the Item Types were configured to be retrieved from an API call to the FPFL SQL Server
      database on Azure.  This caused the user to have a confusing experience when initially navigating to any of the
      Item Detail features; Initial Amount, Credits or Debits.  Clicking on the linkes results in nothing happening.
      The FPFL Database on Azure has the lowest level of availability, so when not in use it goes to sleep.  If propmted by an
      API call then it normally takes 1-2 minutes for it to awaken and return the data requested.
    - Fix:  The API call for the Item Types on login was deprecated and the Item Types are now intialized in the Item Type Service
      in the front end UI.  So now when the user initiates navigation to the Item Detail features there will be a Spinner to
      indicate that data will be avialable shortly.
