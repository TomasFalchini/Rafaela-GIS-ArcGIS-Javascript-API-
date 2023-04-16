'use client';
import esriConfig from "@arcgis/core/config";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic"
import { loadModules, loadCss } from 'esri-loader';

import React, { useEffect, useRef } from "react";

esriConfig.apiKey =
  "AAPKab065398d9884a0cb1c8ba53a3ad519e2iKIn0i_mrN8ExODhuJrMzvrwgtq9ttYDtXRqNQxaFcYl7dIuKU7EvtFdty0cg3V";

interface MapApp {
  view?: MapView;
  map?: ArcGISMap;
  savedExtent?: any;
}

const app: MapApp = {};



function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null);

  async function initialize(container: HTMLDivElement, filter: string) {
  if (app.view) {
    app.view.destroy();
  }

  const [Map, MapViews, Search, BasemapToggle, Graphic, GraphicsLayer, FeatureLayer] = await loadModules(['esri/Map', 'esri/views/MapView', "esri/widgets/Search", "esri/widgets/BasemapGallery", "esri/Graphic", "esri/layers/GraphicsLayer", "esri/layers/FeatureLayer"])
    loadCss("https://js.arcgis.com/4.26/@arcgis/core/assets/esri/themes/dark/main.css")
   
  const map = new Map({
    basemap: "satellite",
  }); 
    
    
    const trailheadsLayer = new FeatureLayer({
      url: "https://soluciones.aeroterra.com/server/rest/services/Argentina_Poblaci%C3%B3n_Viviendas_Hogares/MapServer/0",
      outFields: ["totalpobl", "varon", "mujer", "viviendasp", "hogares"],
      popupTemplate: {
        title: "Datos de población",
        content: [{
          type: "fields",
          fieldInfos: [{
            fieldName: "totalpobl",
            label: "Poblacion total"
          }, {
            fieldName: "varon",
            label: "Hombres"
          }, {
            fieldName: "mujer",
            label: "Mujeres"
          }]
        }]
      }
   });
    
  const view = new MapViews({
    container: container,
    map: map,
    center: [-61.4932, -31.251994],
    zoom: 12,
  });

     
  const search = new Search({
          view: view
  })
    
     map.add(trailheadsLayer);
    
    const basemapToggle = new BasemapToggle({
      view: view,  
     nextBasemap: "hybrid" 
    }); 
    
   /*  const graphicLayer = new GraphicsLayer()
    map.add(graphicLayer)

   
    const polygon = {
    type: "polygon",
    rings: [
        [-61.496528, -31.246974], //Longitude, latitude
        [-61.483843, -31.249298], //Longitude, latitude
        [-61.486370, -31.258308], //Longitude, latitude
        [-61.500724, -31.256025]   //Longitude, latitude
    
    ]
 }; */
  /* 
 Possible Values:"simple-marker"|"picture-marker"|"simple-line"|"simple-fill"|"picture-fill"|"text"|"shield-label-symbol"|"point-3d"|"line-3d"|"polygon-3d"|"web-style"|"mesh-3d"|"label-3d"|"cim" */
    /* const simpleFillSymbol =  {
      type: "simple-fill",  
      color: [227, 139, 79, 0.5],
      outline: {
        color: "black",
        width: 3
      }
    }
    
    const attributes = {
      Name: "RAFAELA",
      Region: "Dpto Castellanos",
      Description: "La mejor city"
    }

    function zoomOut() {
  // In this case the view zooms out two LODs on each click
     view.goTo({
       zoom: view.zoom - 2,
       });
}

    const popupTemplate = {
      title: "{Name}",
      actions: [{
        title: "zoom-out",
        id: "zoom-out",
        className: "esri-icon-zoom-out"
      }],
      content: [{
     // Pass in the fields to display
      type: "fields",
      fieldInfos: [{
       fieldName: "Name",
       label: "Name"
     }, {
       fieldName: "Region",
       label: "Region"
    }, {
       fieldName: "Description",
       label: "Description"
    }]
   }]
}

    const poligonGraphic : Graphic = new Graphic({
    geometry: polygon,
    symbol: simpleFillSymbol,

    attributes: attributes,
    popupTemplate: popupTemplate

 });
    graphicLayer.add(poligonGraphic) */
    view.ui.add(search, "top-right");
    view.ui.add(basemapToggle,"bottom-right");
    app.map = map;
    app.view = view;
    

    /* view.popup.on("trigger-action", function(event: any){
  // If the zoom-out action is clicked, fire the zoomOut() function
    if(event.action.id === "zoom-out"){
    zoomOut();
  }
}) */
  
  return cleanup;
}

function cleanup() {
  app.view?.destroy();
}

async function loadMap(container: HTMLDivElement, filter: string) {
  return await initialize(container, filter);
}

  useEffect(() => {
    let asyncCleanup: Promise<() => void>;
    if (mapRef.current) {
      asyncCleanup = loadMap(mapRef.current, "filtro");
    }
    return () => {
      asyncCleanup && asyncCleanup.then((cleanup) => cleanup());
    };
  }, []);

 

  return <div className="p-2 w-screen h-screen"> <div className="w-full h-full p-12" ref={mapRef}>
    
  </div> </div>;
}


export default MapComponent