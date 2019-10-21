function setup(){
    scene=new THREE.Scene();
        
    camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
    camera.position.set(10,10,10);
    camera.lookAt(new THREE.Vector3(0,0,0));
    camera.up=new THREE.Vector3(0,0,1);        
    
    renderer=new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    div3d.appendChild(renderer.domElement);

    controls=new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", render);

    draw();
}

function onWindowResize(){
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}


function render(){
    renderer.render(scene,camera);
}