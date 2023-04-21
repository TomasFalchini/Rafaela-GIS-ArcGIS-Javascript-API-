'use client'
import { loadModules } from 'esri-loader'
import React from 'react'
import ArcGISMap from "@arcgis/core/Map";




function UseParcelasLayer(layerUrl: string) {

  async function init(map: ArcGISMap) {
     const [FeatureLayer] = await loadModules(["esri/layers/FeatureLayer"])

    const cloaclasLayer = new FeatureLayer({
      url: layerUrl,
      title: "Poblacion",
      opacity: 0.5,
   });
   
    function turnOn() {
      if (map.initialized) {
        map.add(cloaclasLayer)
      }
     
   }
    
     function closeLayer() {
      map.remove(cloaclasLayer)
    }

    return {
      turnOn,
      closeLayer
    }
    
  }


  
    

  return {
    init
  }
}

export default UseParcelasLayer




/* 


Hello, hello!
Bye!
Tomi pete!



*/