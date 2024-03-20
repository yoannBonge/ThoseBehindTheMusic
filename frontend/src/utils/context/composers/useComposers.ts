import { useContext } from "react";
import { ComposersContext } from "./ComposersContext";

export const useComposers = () => {
  return useContext(ComposersContext);
};
