
import WebGLTile from 'ol/layer/WebGLTile';
import TileLayer from "ol/layer/Tile";
import * as ol from "ol";
import { GeoTIFF, OSM } from "ol/source";

const source = new GeoTIFF({
  sources: [
    {
      url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/36/Q/WD/2020/7/S2A_36QWD_20200701_0_L2A/TCI.tif',
    },
  ]
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