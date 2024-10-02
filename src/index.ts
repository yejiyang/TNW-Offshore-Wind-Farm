
import WebGLTile from 'ol/layer/WebGLTile';
import TileLayer from "ol/layer/Tile";
import * as ol from "ol";
import { GeoTIFF, OSM } from "ol/source";

interface LayerData {
  source: GeoTIFF;
  name: string;
  layer?: WebGLTile;
}

function sourceGeoTIFF(url: string, projection?: string) {
  return new GeoTIFF({
    sources: [
      {
        url: url,
      },
    ],
    projection: projection ?? 'EPSG:4326',
  });
}

let layerBase = new TileLayer({ // open street map layer
  source: new OSM(),
});

let layers = [
  {
    source: sourceGeoTIFF("/data/TNW-R00.tif"),
    name: "TNW-R00",
  },
  {
    source: sourceGeoTIFF("/data/TNW-R01.tif"),
    name: "TNW-R01",
  },
] as LayerData[];

for (let layer of layers) {
  layer.layer = new WebGLTile({
    source: layer.source,
  });
}

const map = new ol.Map({
    layers: [
      layerBase,
      ...layers.map((layer) => layer.layer!),
    ],
    target: 'map', // id of the div element
    view: new ol.View({ // view and initial position/zoom
      center: [0, 0],
      zoom: 2,
    }),
});

let mm = document.getElementById("layer_toggles") as HTMLOListElement;

for (let layer of layers) {
  let li = document.createElement("li");
  let input = document.createElement("input");
  input.type = "checkbox";
  input.checked = true;
  input.onchange = () => {
    layer.layer!.setVisible(input.checked);
  };
  li.appendChild(input);
  li.appendChild(document.createTextNode(layer.name));
  mm.appendChild(li);
}