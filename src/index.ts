
import WebGLTile from 'ol/layer/WebGLTile';
import TileLayer from "ol/layer/Tile";
import * as ol from "ol";
import { GeoTIFF, OSM } from "ol/source";

const source = new GeoTIFF({
  sources: [
    {
      url: "/data/TNW-R00.tif",
    },
  ],
  projection: 'EPSG:4326',
});

const map = new ol.Map({
    layers: [
      new TileLayer({ // open street map layer
        source: new OSM(),
      }),
      new WebGLTile({ // GeoTIFF layer
        source: source,
      }),
    ],
    target: 'map', // id of the div element
    view: new ol.View({ // view and initial position/zoom
      center: [0, 0],
      zoom: 2,
    }),
});