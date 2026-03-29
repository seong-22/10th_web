import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/home';
import NotFound from './pages/ErrorPage';
import MoviesPage from './pages/movies';
import RootLayout from './layout/root-layout';
import MovieDetailPage from './pages/MovieDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        // /movies/뒤에 오는 값을 movieId라는 이름으로 받겠다는 뜻
        path: 'movies/:category', //틀은 같지만 해당 값으로만 바꾸겠다
        element: <MoviesPage />,
      },
      {
        path: 'movies/:movieID',
        element: <MovieDetailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;