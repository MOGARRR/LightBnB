# LightBnB Project
# By Anthony Alicea (https://github.com/MOGARRR)
 LightBnb is a simple multi-page Airbnb clone that uses a server-side Javascript to display information from queries to web pages using SQL queries.

## User Features 
- View listings and information of location
- Filter listings through several search filter options

## Registered User Features
- Create Listings for other users to view
- Store and View their created listings
- View all their reservations information

## Getting Started
1. Clone repository onto your local device.
2. Install dependencies using the `npm install` command.
3. Using SQL `Create` a database to store tables/seeds.
4. Inside database run `-i migrations/01_schema.sql` through the psql command line interface to create tables.
5. Run `-i seeds/01_seeds.sql` and `-i seeds/02_seeds.sql` through the psql command line interface to add records to tables.
6. Start the web server using the `npm run local` command. The app will be served at http://localhost:3000/.
7. Go to http://localhost:8081/ in your browser.

## Dependencies
- bycrypt
- cookie-session
- express
- nodemon 
- pg