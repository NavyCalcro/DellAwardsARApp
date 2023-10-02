import { loadGLTF } from "../../libs/loader.js";
//import { mockWithVideo } from '../../libs/camera-mock.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
   
    function hide() {
        var thebod = document.getElementById("wrapper");
        thebod.style.display = "none";
    };

    const start = async () => {
      //mockWithVideo('./assets/20231001_130349.mp4');
      const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    //const light = new THREE.HemisphereLight(0xbbbbff, 0xbbbbff, 0.5);
    //scene.add(light);

    const Bot = await loadGLTF('./assets/Bot_Merge.glb');
    Bot.scene.scale.set(0.5, 0.5, 0.5);
    Bot.scene.position.set(0, -0.7, 0);

    //const geometry = new THREE.PlaneGeometry(1, 1.25);
    //const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });
    //const plane = new THREE.Mesh(geometry, material);

    //var envPath = './assets/rooftop_day_4k.exr';

    //var pmremGenerator = new THREE.PMREMGenerator(renderer);
    //pmremGenerator.compileEquirectangularShader();

    //new THREE.RGBELoader().setDataType(THREE.UnsignedByteType).load(envPath, (texture) => {
    //        envMap = pmremGenerator.fromEquirectangular(texture).texture;
    //        pmremGenerator.dispose();
    //        scene.environment = envMap;
    //        scene.background = envMap;
    //    });

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(Bot.scene);

    const mixer = new THREE.AnimationMixer(Bot.scene);
    const action1 = mixer.clipAction(Bot.animations[0]);
    //const action2 = mixer.clipAction(Bot.animations[1]);
    action1.play();
    //action2.play();

    const clock = new THREE.Clock();

    anchor.onTargetFound = () => {
        hide();
    }
    //anchor.onTargetLost = () => {

    //}

    //scene.arReady = () => {
    //    hide();
    //}

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        const delta = clock.getDelta();
        //plane.lookAt(new THREE.Vector3());
        //Bot.scene.rotation.set(0, Bot.scene.rotation.y+delta, 0);
        mixer.update(delta);
        renderer.render(scene, camera);
    });
  }
    
  //const startButton = document.createElement("button");
  //startButton.textContent = "Start";
  //startButton.addEventListener("click", start);
  //document.body.appendChild(startButton);
  
    start();

    
});

