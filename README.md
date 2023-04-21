# EthioFlix Movie App

This is a React application that displays movies from the TMDB API.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Installation

To run this application on your local machine, follow these steps:

1. Clone this repository to your machine:

git clone https://github.com/your-username/movie-app.git

2. Navigate to the project directory:

cd movie-app

3. Install the dependencies:

npm install

4. Set up your TMDB API key:

- Create an account on [TMDB website](https://www.themoviedb.org/signup).
- Follow the instructions in the [API documentation](https://developers.themoviedb.org/3/getting-started/introduction) to get your API key.
- Create a `.env.local` file in the project directory with the following content:

  ```
  REACT_APP_TMDB_API_KEY=your-api-key-here
  ```

  Replace `your-api-key-here` with your actual TMDB API key.

5. Start the development server:

npm run dev

6. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## Usage

This application displays a list of popular movies from the TMDB API. You can search for movies using the search box at the top of the page. Clicking on a movie card will take you to the details page for that movie.

## Features

This application has the following features:

- Display a list of popular movies
- Search for movies by title
- Display detailed information about a selected movie

## Technologies

This application was built using the following technologies:

- React.js
- React Router
- Axios
- TMDB API
- CSS

## Contributing

Contributions are welcome! To contribute to this project, follow these steps:

1. Fork this repository to your own account.
2. Create a new branch from the `main` branch: `git checkout -b my-new-feature`.
3. Make your changes and commit them: `git commit -m "Add some feature"`.
4. Push your branch to your fork: `git push origin my-new-feature`.
5. Create a pull request to the `main` branch of this repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
