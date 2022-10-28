import EventEmitter from "@Utils/EventEmitter";
import Experience from "@Experience/Experience.js";

import Map from "@Experience/World/Map";

let coords = {
  accuracy: 0,
  lat: 0,
  long: 0,
};

const map = new Map();

export default class Location extends EventEmitter {
  constructor() {
    super();

    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.setDebug();

    // Gets initial position
    this.getLocation();
    this.watchLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError, {
      // Can't use cashed position
      maximumAge: 0,
      // Uses more power and increases call time but is more accurate
      enableHighAccuracy: true,
      // Timelimit on GPS response
      // timeout: 7500,
    });
    return coords;
  }

  // TODO: The watchPosition method can fire once every second or less. This might be a drain on resources.
  // A possible solution might be to manually poll the users location with setInterval.
  watchLocation() {
    navigator.geolocation.watchPosition(this.onSuccess, this.onError, {
      // Can't use cashed position
      maximumAge: 0,
      // Uses more power and increases call time but is more accurate
      enableHighAccuracy: false,
      // Timelimit on GPS response
      timeout: 5000,
    });
  }

  // Descructures GPS response into variable
  onSuccess(e) {
    coords.lat = e.coords.latitude;
    coords.long = e.coords.longitude;
    coords.accuracy = e.coords.accuracy;
    // notification.set("Position Updated", 2000);
    map.removeMarker();
    map.setMarker([coords.long, coords.lat]);
  }

  // Errors
  onError(e) {
    if (e.code === 3) {
      console.log(`Timeout limit reached:`);
      console.log(e);
    } else {
      console.log("There was an error reading location", { e });
    }
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("GPS Location");
      const debugObject = {
        Update_Location: () => {
          this.getLocation();
        },
      };
      this.debugFolder.add(coords, "accuracy").listen();
      this.debugFolder.add(coords, "lat").listen();
      this.debugFolder.add(coords, "long").listen();
      this.debugFolder.add(debugObject, "Update_Location");
    }
  }
}
