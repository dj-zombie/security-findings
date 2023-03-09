import React, { createContext, useContext, useState, useEffect } from "react";
import { Finding } from '../interfaces/finding'

// NOTE: This is left over code from I would normally delete but I'll leave this
// here just for review. This API Context was a direction I decided no to take.

interface ApiContextValue {
  apiResponse: Finding[];
  setApiResponse: (response: Finding[]) => void;
}

// Create a context with an initial value
const ApiContext = createContext<ApiContextValue>({
  apiResponse: [],
  setApiResponse: () => {},
});

// Create a provider component to wrap the parts of the application that need access to the context
const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiResponse, setApiResponseState] = useState<Finding[]>([]);
  const setApiResponse = (response: Finding[]) => {
    setApiResponseState(response);
  };

  // This could be expanded to accept a prop or api interface instead of
  // a hardcoded string.
  useEffect(() => {
    fetch('http://localhost:8000/findings')
      .then((response) => response.json())
      .then((data) => {
        setApiResponse(data.findings);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ApiContext.Provider value={{ apiResponse, setApiResponse }}>
      {children}
    </ApiContext.Provider>
  );
};

// Define a custom hook to easily consume the context in any component
const useApi = () => useContext(ApiContext);

export { ApiProvider, useApi };

