import { ReactNode, createContext, useEffect, useState } from "react";
import { API_ROUTES, Composer } from "../constants";

type ComposersContextType = {
  allComposers: Composer[];
  musicComposers: Composer[];
  cinemaComposers: Composer[];
  videogameComposers: Composer[];
};

export const ComposersContext = createContext<ComposersContextType>({
  allComposers: [],
  musicComposers: [],
  cinemaComposers: [],
  videogameComposers: [],
});

interface ComposersProviderProps {
  children: ReactNode;
}

export const ComposersProvider = ({ children }: ComposersProviderProps) => {
  const [allComposers, setAllComposers] = useState<Composer[]>([]);
  const [musicComposers, setMusicComposers] = useState<Composer[]>([]);
  const [cinemaComposers, setCinemaComposers] = useState<Composer[]>([]);
  const [videogameComposers, setVideogameComposers] = useState<Composer[]>([]);

  const fetchComposersData = async () => {
    try {
      const response = await fetch(API_ROUTES.GET_COMPOSERS);
      const data: Composer[] = await response.json();

      // Filtrage et tri par catégorie
      const allComposersData = data;
      const sortedAllComposersData: Composer[] = allComposersData.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setAllComposers(sortedAllComposersData);

      const musicData: Composer[] = data.filter(
        (composer) => composer.category === "music"
      );
      setMusicComposers(musicData);

      const cinemaData: Composer[] = data.filter(
        (composer) => composer.category === "cinema"
      );
      setCinemaComposers(cinemaData);

      const videogameData: Composer[] = data.filter(
        (composer) => composer.category === "videogame"
      );
      setVideogameComposers(videogameData);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données: ",
        error
      );
    }
  };

  useEffect(() => {
    fetchComposersData();
  }, []);

  return (
    <ComposersContext.Provider
      value={{
        allComposers,
        musicComposers,
        cinemaComposers,
        videogameComposers,
      }}
    >
      {children}
    </ComposersContext.Provider>
  );
};
