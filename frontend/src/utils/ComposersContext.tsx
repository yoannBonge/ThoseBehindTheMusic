import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { API_ROUTES } from "./constants";

const ComposersContext = createContext([]);

export const useComposers = () => {
  return useContext(ComposersContext);
};

interface ComposersProviderProps {
  children: ReactNode;
}

export const ComposersProvider = ({ children }: ComposersProviderProps) => {
  const [composers, setComposers] = useState([]);

  const fetchArtistsData = async () => {
    try {
      const response = await fetch(API_ROUTES.GET_COMPOSERS);
      const data = await response.json();
      setComposers(data);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données: ",
        error
      );
    }
  };

  useEffect(() => {
    fetchArtistsData();
  }, []);

  return (
    <ComposersContext.Provider value={composers}>
      {children}
    </ComposersContext.Provider>
  );
};
