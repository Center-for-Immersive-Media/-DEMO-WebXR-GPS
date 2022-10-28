import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton.js";
import Experience from "@Experience/Experience.js";

export default class Renderer {
  constructor() {
    this.ar = window.location.hash === "#ar";
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.instance.physicallyCorrectLights = true;
    // this.instance.outputEncoding = THREE.sRGBEncoding;
    // this.instance.toneMapping = THREE.CineonToneMapping;
    // this.instance.toneMappingExposure = 1.75;
    // this.instance.shadowMap.enabled = true;
    // this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    // this.instance.setClearColor("#ff0000");
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));

    this.instance.xr.enabled = true;
    document.body.appendChild(ARButton.createButton(this.instance));
    // console.log(this.instance);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  render() {
    this.instance.render(this.scene, this.camera);
  }

  update() {
    if (this.instance.xr.isPresenting) {
      this.instance.setAnimationLoop(this.render());
    }
  }
}
