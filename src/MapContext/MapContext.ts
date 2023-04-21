import { createContext, useContext } from "react";
import { MapsContainer } from "./interfaceMap";

const MapContext = createContext< MapsContainer  | null>(null)


export function useMapContext() {
  const context = useContext(MapContext)
  if (!context) {
    throw new Error("You have to use this context between Esri maps components")
  }


  return context
}


export default MapContext