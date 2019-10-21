function setup(){
    scene=new THREE.Scene();

    camera=new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.up=new THREE.Vector3(0,0,1);
    camera.lookAt(new THREE.Vector3(0,0,0));
    camera.position.set(250,250,50);

    renderer=new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled=true; 
    div3d.appendChild(renderer.domElement);

    controls=new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", render);

    addLight();
    draw();
}

function addLight(){
    light=new THREE.DirectionalLight(0xffffff);
    light.position.set(100,100,100);
    light.target.position.set(0,0,0);

    var t=100;
    light.shadow.camera.bottom=-t;
    light.shadow.camera.left=-t;
    light.shadow.camera.top=t;
    light.shadow.camera.right=t;

    light.shadow.mapSize.width=10048;
    light.shadow.mapSize.height=10048;

    light.castShadow=true;
    scene.add(light);

    var l2=new THREE.PointLight(0xffffff);
    l2.position.set(-100,-100,100);
    scene.add(l2);
}

function onWindowResize(){
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function render(){
    renderer.render(scene, camera);
}