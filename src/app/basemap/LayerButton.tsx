'use client'
import React, { useState } from 'react'
import {GiTeePipe} from "react-icons/gi"
import UseParcelasLayer from './ParcelasLayer'
import ArcGISMap from "@arcgis/core/Map";


interface Props {
  map: ArcGISMap
}

function LayerButton({map}: Props) {
  const { init } = UseParcelasLayer("https://services3.arcgis.com/u64MkwGNOlDxpZQo/arcgis/rest/services/Red_Cloacal__view/FeatureServer/0")
  const [on, setOn] = useState(false)
  
 
  const turnOnLayer = async () => {
    if (!on) {
      init(map)
    }
    setOn((state)=> !state)
  }
  
  

  return (
    <button onClick={()=> turnOnLayer()} type="button" className="fixed top-12 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"><GiTeePipe /></button>
  )
}

export default LayerButton