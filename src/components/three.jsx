import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function Sphere() {
  useEffect(() => {
    //Scene
    const scene = new THREE.Scene();
    //Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 20;
    scene.add(camera);

    //Sphere
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff83 });
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff83 });

    const sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    scene.add(sphere);

    //Light
    // const light = new THREE.PointLight(0xffffff, 1, 2000);
    // light.position.set(0, 10, 10);
    // scene.add(light);
    const light = new THREE.PointLight(0xffffff, 100, 1000);
    light.position.set(0, 10, 10);
    light.castShadow = true; // default false
    scene.add(light);

    //Renderer
    const canvas = document.querySelector(".webgl");
    const renderer = new THREE.WebGLRenderer({
    //   alpha: true,   //add transparency
      canvas: canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    const loop = () => {
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(loop);
    };
    loop();
    // const animate = function () {
    //   requestAnimationFrame(animate);

    //   sphere.rotation.x += 0.01;
    //   sphere.rotation.y += 0.01;

    //   renderer.render(scene, camera);
    // };

    // animate();
  }, []);

  return (
    <>
      <canvas className="webgl w-screen h-screen"></canvas>
    </>
  );
}

export default Sphere;
