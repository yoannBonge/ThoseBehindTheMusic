import { ReactNode, createContext, useEffect, useState } from "react";
import { API_ROUTES, Composer } from "../../constants";

type ComposersContextType = {
  musicComposers: Composer[];
  cinemaComposers: Composer[];
  videogameComposers: Composer[];
};

export const ComposersContext = createContext<ComposersContextType>({
  musicComposers: [],
  cinemaComposers: [],
  videogameComposers: [],
});

interface ComposersProviderProps {
  children: ReactNode;
}

export const ComposersProvider = ({ children }: ComposersProviderProps) => {
  const [cinemaComposers, setCinemaComposers] = useState<Composer[]>([]);
  const [musicComposers, setMusicComposers] = useState<Composer[]>([]);
  const [videogameComposers, setVideogameComposers] = useState<Composer[]>([]);

  const fetchComposersData = async () => {
    try {
      const response = await fetch(API_ROUTES.GET_COMPOSERS);
      const data: Composer[] = await response.json();

      // Filtrage et tri par catégorie
      const musicData: Composer[] = data.filter(
        (composer) => composer.category === "music"
      );
      const sortedMusicData: Composer[] = musicData.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setMusicComposers(sortedMusicData);

      const cinemaData: Composer[] = data.filter(
        (composer) => composer.category === "cinema"
      );
      const sortedCinemaData: Composer[] = cinemaData.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setCinemaComposers(sortedCinemaData);

      const videogameData: Composer[] = data.filter(
        (composer) => composer.category === "videogame"
      );
      const sortedVideogameData: Composer[] = videogameData.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setVideogameComposers(sortedVideogameData);
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
      value={{ cinemaComposers, musicComposers, videogameComposers }}
    >
      {children}
    </ComposersContext.Provider>
  );
};
