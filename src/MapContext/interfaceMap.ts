import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic"


export interface MapsContainer {
  map: ArcGISMap;
  currentView: MapView;
  loading: boolean 
}