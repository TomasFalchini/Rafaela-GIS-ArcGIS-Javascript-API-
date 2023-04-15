import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

esriConfig.apiKey =
  "AAPKab065398d9884a0cb1c8ba53a3ad519e2iKIn0i_mrN8ExODhuJrMzvrwgtq9ttYDtXRqNQxaFcYl7dIuKU7EvtFdty0cg3V";

const map = new Map({
  basemap: "streets-vector",
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [-61.4932, -31.251994],
  zoom: 10,
});

import React from "react";

function Home() {
  return <div id="viewDiv"></div>;
}

export default Home;
