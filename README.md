# News-Article
This is a simple news article website that allows users to view news articles and their details. It also allows users to create, update and delete news articles.

## Preview of the website
![Screenshot 2025-02-24 214648](https://github.com/user-attachments/assets/25279012-c181-402b-8771-38d9e1a4f330)

## Features implemented
- Users can view the latest news articles from a database. 
- Users can create their very own news article.
- Users can update news articles of their choice.
- Users can delete news articles of their choice.
- Website should be responsive for most desktop devices.
- Website has implemented pagination for easier navigation through news articles.

## Things to note before running:
- This project uses an SQLite database to store news articles. The database being used is an in-memory database, so make sure to load the data into the database before running the application.(optional).
- If you want to load some data from a csv file into the database, you can do so by following the steps below:
    - Navigate to the backend directory of the project.
    - Open the /lib/db.js file and uncomment line 16 which calls the insertTableData function. Make sure to provide the correct path to the csv file.
    - Run the application and the data should be loaded into the database.
- The PORT of the backend server is set to 8000 and is stored inside an environment variable inside the .env file in the backend directory. The frontend stores the HOST address of the backend server inside another .env file. Make sure to create these files before running the application:
    - For the backend, create a .env file in the root of the backend directory and add the following line: 
        ``` bash
        PORT=8000
        ```
    - For the frontend, create a .env file in the root of the frontend directory and add the following line:
        ``` bash
        VITE_BACKEND_HOST="http://localhost:8000"
        ```
## How to run

### Backend
- Navigate to the backend directory of the project:
    ``` bash
    cd backend
    ```
- Install the required dependencies:
    ``` bash
    npm install
    ```
- Run the application:
    ``` bash
    npm start
    ```
- The backend server should be running on http://localhost:8000

The backend server has the following endpoints:
- GET /api/article/count - This endpoint returns the total number of news articles in the database.
- GET /api/article - This endpoint returns all the news articles in the database.
- POST /api/article - This endpoint allows users to create a new news article.
- PUT /api/article/:id - This endpoint allows users to update a news article with the specified id.
- DELETE /api/article/:id - This endpoint allows users to delete a news article with the specified id.

### Frontend
- Navigate to the frontend directory of the project.
- Install the required dependencies:
    ``` bash
    npm install
    ```
- Run the application:
    ``` bash
    npm run dev
    ```
- The frontend server should be running on http://localhost:5173/

