# Rick and Morty Character Viewer

This project is a React-based web application that displays characters from the Rick and Morty TV show using the [Rick and Morty API](https://rickandmortyapi.com/). It features character sorting, filtering, pagination, and a dark mode toggle.

## How to Run the Project
```
cd rick-and-morty-app
```
1. Ensure you have Node.js and npm installed on your machine.
2. Clone this repository to your local machine.
3. Navigate to the project directory in your terminal.
4. Install the required dependencies by running:
   ```
   npm install
   ```
5. Start the development server by running:
   ```
   npm start
   ```
6. Open your web browser and visit `http://localhost:3000` to view the application.

## Some of my approaches to the problem.
1. **Sorting and Filtering**: Implemented client-side sorting and filtering functions to manipulate the displayed character list.
2. **Pagination**: Added pagination controls to navigate through the API's paginated results.
4. **Styling**: Separated styles into a CSS file for better maintainability and cleaner React components.

## Main challenge faced

**API Pagination**: Adjusting the application to work with the API's built-in pagination system required careful state management.