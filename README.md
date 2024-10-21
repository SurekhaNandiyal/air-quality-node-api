This is a simple Node.js application to manage air quality data using PostgreSQL. The application includes endpoints to retrieve, create, update, and delete air quality records. It also has unit tests for the API using Jest.

## Instructions

### 1. Create the Database


First, create a PostgreSQL database named **`air_quality`** with the following credentials:

- Host: `localhost`
- Database: `air_quality`
- User: `postgres`
- Password: `postgres`

You can use the following connection string for PostgreSQL:

```bash
host="localhost",
database="air_quality",
user="postgres",
password="postgres"
```

### 2. Import Data to Database

Go to the data folder and run the Python script netCDFToPostgres.py to convert and import the neoCDF file into records in the PostgreSQL database.

```bash
cd data
python3 netCDFToPostgres.py
```

### 3. Install Node.js Dependencies

Go to the root of the application and run the following command to install all necessary dependencies:

```bash
npm install
```

### 4. Run the Application

To start the Node.js application and expose the API, run:

```bash
npm install
```

### 5. Running Unit Tests

Unit tests have been added for the API. To run them:

```bash
npx jest
```
