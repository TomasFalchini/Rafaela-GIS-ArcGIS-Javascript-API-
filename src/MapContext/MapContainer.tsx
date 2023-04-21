'use client'
import esriConfig from "@arcgis/core/config";
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import { loadCss, loadModules } from 'esri-loader'
import React, { useEffect, useRef, useState } from 'react'
import { MapsContainer } from './interfaceMap'
import MapContext from './MapContext'



esriConfig.apiKey =
  "AAPKab065398d9884a0cb1c8ba53a3ad519e2iKIn0i_mrN8ExODhuJrMzvrwgtq9ttYDtXRqNQxaFcYl7dIuKU7EvtFdty0cg3V"

interface Props {
  children: React.ReactNode
}

function MapContainerProvider({children}: Props) {

  const mapRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<MapsContainer | null>(null)

  async function initMapContainer(mapRef : HTMLDivElement) {
  const [Map, MapViews] = await loadModules(['esri/Map', 'esri/views/MapView'])
  loadCss("https://js.arcgis.com/4.26/@arcgis/core/assets/esri/themes/dark/main.css")

  const map : Map = new Map({
    basemap: "satellite",
  })

  const view : MapView = new MapViews({
    container: mapRef,
    map: map,
    center: [-61.4932, -31.251994],
    zoom: 12,
  })

    setData({
      map,
      currentView: view,
      loading: false
    })
}

  useEffect(() => {
    if (mapRef.current) {
      initMapContainer(mapRef.current)
    }
  }, [mapRef])

  return (
    <MapContext.Provider value={data}>
      <div className=" w-screen h-screen p-12 m-0">
      <div className="w-full h-full m-0" ref={mapRef}>
        {children}
      </div>
      </div>
    </MapContext.Provider>
  )
}

export default MapContainerProvider