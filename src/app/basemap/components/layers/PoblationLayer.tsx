'use client'
import MapContext from '@/MapContext/MapContext';
import Map from '@arcgis/core/Map';
import FeatureLayers from "@arcgis/core/layers/FeatureLayer.js"
import {GiTeePipe} from "react-icons/gi"

import { loadModules } from 'esri-loader';

import React, { useContext, useEffect, useState } from 'react'

async function chargeLayer(map: Map) {

  const [FeatureLayer] = await loadModules(["esri/layers/FeatureLayer"])
  function createFillSymbol(value: string) {
      
       return {
            "color": value,
            "type": "simple-fill",
            "style": "solid",
            "outline": {
              color: [50, 50, 50, 0.95],
              width: 5
            }
          }
        
      
      
    }
    
    const regiones = {
        type: "class-breaks",
      field: "totalpobl",
     
      defaultSymbol: {
        type: "simple-fill",
        color: "black",
        style: "backward-diagonal",
        outline: {
          width: 0.5,
          color: [50, 50, 50, 0.6]
        }
      },
        classBreakInfos: [
            {
              minValue: 0,
              maxValue: 500,
            symbol: createFillSymbol("#17B6B6"),
              label: "< 500"
          },
          {
              minValue: 500,
              maxValue: 1000,
            symbol: createFillSymbol("#149ECE"),
              label: "< 1000"
          },
          {
              minValue: 1000,
              maxValue: 1500,
            symbol: createFillSymbol("#8c96c6"),
              label: "< 1500"
          },
          {
              minValue: 1500,
              maxValue: 10500,
            symbol: createFillSymbol("#88419d"),
              label: "> 1500"
             },
          
        ]
      };

    
    const trailheadsLayer : FeatureLayers  = new FeatureLayer({
      url: "https://soluciones.aeroterra.com/server/rest/services/Argentina_Poblaci%C3%B3n_Viviendas_Hogares/MapServer/0",
      outFields: ["totalpobl", "varon", "mujer", "viviendasp", "hogares"],
      title: "Poblacion",
      renderer: regiones,
      opacity: 0.5,
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
        },
        {
        
         type: "media",
          mediaInfos: [{
            title: "<b>Hombres y Mujeres</b>",
            type: "pie-chart",
            caption: "",
            value: {
              fields: [ "varon","mujer" ],
              normalizeField: true,
              tooltipField: "Hombres y mujeres"
              }
            }]
        }]
      
      }
    });
  

    map.add(trailheadsLayer)

    return trailheadsLayer
}

function PoblationLayer() {

  const [layer, setLayer] = useState<FeatureLayers | null>(null)
  const map = useContext(MapContext)

  useEffect(() => {
    if (!map) {
      return
    }
    
    (async () => {
      let layer = await chargeLayer(map.map)
      setLayer(layer)
      
    })()

    
    
  }, [map])

  const setOff = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (!layer) {
      return setOn()
    }
    layer.destroy()
    setLayer(null)
  }

  const setOn = () => {
    if (layer) {
      return
    }
    if (map) {
       (async () => {
      let layer = await chargeLayer(map.map)
      setLayer(layer)
      
    })()

    }
  }


   return (
    <button onClick={setOff} type="button" className="fixed top-12 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"><GiTeePipe /></button>
  )
}

export default PoblationLayer


/* 
function createFillSymbol(value: string) {
      
       return {
            "color": value,
            "type": "simple-fill",
            "style": "solid",
            "outline": {
              color: [50, 50, 50, 0.95],
              width: 5
            }
          }
        
      
      
    }
    
    const regiones = {
        type: "class-breaks",
      field: "totalpobl",
     
      defaultSymbol: {
        type: "simple-fill",
        color: "black",
        style: "backward-diagonal",
        outline: {
          width: 0.5,
          color: [50, 50, 50, 0.6]
        }
      },
        classBreakInfos: [
            {
              minValue: 0,
              maxValue: 500,
            symbol: createFillSymbol("#17B6B6"),
              label: "< 500"
          },
          {
              minValue: 500,
              maxValue: 1000,
            symbol: createFillSymbol("#149ECE"),
              label: "< 1000"
          },
          {
              minValue: 1000,
              maxValue: 1500,
            symbol: createFillSymbol("#8c96c6"),
              label: "< 1500"
          },
          {
              minValue: 1500,
              maxValue: 10500,
            symbol: createFillSymbol("#88419d"),
              label: "> 1500"
             },
          
        ]
      };

    
    const trailheadsLayer = new FeatureLayer({
      url: "https://soluciones.aeroterra.com/server/rest/services/Argentina_Poblaci%C3%B3n_Viviendas_Hogares/MapServer/0",
      outFields: ["totalpobl", "varon", "mujer", "viviendasp", "hogares"],
      title: "Poblacion",
      renderer: regiones,
      opacity: 0.5,
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
        },
        {
        
         type: "media",
          mediaInfos: [{
            title: "<b>Hombres y Mujeres</b>",
            type: "pie-chart",
            caption: "",
            value: {
              fields: [ "varon","mujer" ],
              normalizeField: true,
              tooltipField: "Hombres y mujeres"
              }
            }]
        }]
      
      }
   });


*/