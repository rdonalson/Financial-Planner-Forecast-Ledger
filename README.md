# Financial-Planner-Forecast-Ledger (Angular 15 Hosted on Azure)
## Source Code

*    The Financial Planner is an Angular 15 SPA with a .NET Core API are Web Apps hosted on Azure Cloud. The UI is a mix of PrimeNg, Material, Bootstrap 5 and NgRx-Redux.  The API is .NET Core using Entity Framework Core with a Code First approach.  The UI Login and the API security are handled by Microsoft Intra ID (Active Directory). The Database is SQL Server also hosted on Azure.

*	Financial Planner Abstract: This Application enables You to keep your checking or saving account solvent out to any future point in time. You enter expenses and incomes with a starting amount, then by entering a time frame, you can easily see a total by end of that time frame. These calculated items can be displayed in either a graphic or ledger format.
    - Once logged in go to the Item Detail section and add your credits (Income sources: paychecks, tax refunds, etc.) and the Period of Occurrence. Be sure to enter the amounts you get after taxes are taken out (take-home pay).
    - Then do the same with your debits (Bills, mortgage, car payment, etc.). Enter debit amounts in positive values, the program will take of the subtracting.
    -	Then enter your starting Balance.
    -	Then go to the Display Section. With either the Timeline or the Ledger Display & Export enter a time frame and click enter. With Ledger Display & Export you can export your data to Excel.
       

Demo on Azure: https://fpng-ui.azurewebsites.net/home
  * Login: bbusby@rdonalson.onmicrosoft.com
  * Pswd: SciFiSlackerAI-2022   
    -	**Note: When prompted click “Ask Later”, don’t click “Next”
    -	This is a workaround for the Azure MS Intra ID 2 Factor Authentication 15-day Grace Period. 

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
