// Mapbox CSS
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

export default class Map {
  constructor() {
    // Initial origin before Location services takes over
    this.origin = [-75.1633695, 39.9461218];

    mapboxgl.accessToken =
      "pk.eyJ1Ijoia21lcmluc2t5IiwiYSI6ImNsOXByazlhYTA2dmMzd2xtaWRyempoczEifQ.KJIqLZQiYdwQyC3aLW_suw";
    this.map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: this.origin, // starting position [lng, lat]
      zoom: 16, // starting zoom
      pitch: 60,
      projection: "globe", // display the map as a 3D globe
      style: "mapbox://styles/kmerinsky/cl9ptfb9i001r14nrrqphvroa",
    });
    this.marker = new mapboxgl.Marker({ color: "#d22630" });
    this.marker.setLngLat([-75.16479778042611, 39.94747848820139]);

    this.marker.addTo(this.map);
    this.person = new mapboxgl.Marker({ color: "#999999" });

    this.map.addControl(
      new mapboxgl.FullscreenControl({
        container: document.querySelector("body"),
      })
    );
  }

  // Calculates the distance between two markers
  calcDistance(x, y) {
    this.xLocation = x.getLngLat();
    this.yLocation = y.getLngLat();
    console.log(this.xLocation.distanceTo(this.yLocation));
  }

  setMarker(coords) {
    this.person.setLngLat(coords);
    this.person.addTo(this.map);
    this.map.setCenter(coords);
  }

  removeMarker() {
    this.person.remove();
  }

  update() {
    this.on("test");
  }
}
