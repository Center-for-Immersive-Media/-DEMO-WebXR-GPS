import Experience from "@Experience/Experience.js";

let instance = null;
let coords = {
  accuracy: 0,
  lat: 0,
  long: 0,
};

export default class Location {
  constructor() {
    // Create location as singleton
    if (instance) {
      return instance;
    }
    instance = this;

    this.experience = new Experience();
    this.debug = this.experience.debug;
    // this.location = this.getLocation();

    this.setDebug();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError, {
      maximumAge: 0,
      enableHighAccuracy: true,
      timeout: 500,
    });
  }

  onSuccess(e) {
    coords.lat = e.coords.latitude;
    coords.long = e.coords.longitude;
    coords.accuracy = e.coords.accuracy;
  }

  onError(e) {
    console.log("There was an error reading location", e);
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("GPS Location");
      const debugObject = {
        Update_Location: () => {
          this.getLocation();
        },
      };
      this.debugFolder.add(coords, "accuracy").listen().disable();
      this.debugFolder.add(coords, "lat").listen().disable();
      this.debugFolder.add(coords, "long").listen().disable();
      this.debugFolder.add(debugObject, "Update_Location");
    }
  }
}
