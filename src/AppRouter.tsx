import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import LoadingSpinner from './components/LoadingSpinner'
import HomePage from './pages/HomePage';
import FindingsPage from './pages/FindingsPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import { Finding } from './interfaces/finding';

/**
 * A React functional component that sets up the app router and fetches the initial data for the application.
 * @returns {JSX.Element} - Returns a JSX element that renders the app routes and a loading spinner until data is fetched.
 */
const AppRouter = () => {
  const [findings, setFindings] = useState<Finding[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initializeApp = async () => {
      try {
        const response = await fetch('http://localhost:8000/findings');
        const data = await response.json();
        if (isMounted) {
          setFindings(data?.findings ?? []);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    initializeApp();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/findings" element={<FindingsPage data={findings} />} />
            <Route path="/dashboard" element={<DashboardPage data={findings} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default AppRouter;

