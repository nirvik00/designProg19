
// setup
function setup() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(45, divwidth / divheight, 0.1, 1000);
    camera.up = new THREE.Vector3(0, 0, 1);
    camera.position.set(20, 20, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(divwidth, divheight); 
    renderer.shadowMap.enabled=true; /////////////

    div3d.appendChild(renderer.domElement);

    //mouse
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", render);

    addLight(); ////////////////

    draw();
}

function addLight(){
    light=new THREE.DirectionalLight(0xffffff);
    light.position.set(50,50,50);
    light.target.position.set(0,0,0);

    light.shadow.camera.left= -500;
    light.shadow.camera.bottom= -500;
    light.shadow.camera.top= 500;
    light.shadow.camera.right= 500;

    light.shadow.mapSize.width=2048;
    light.shadow.mapSize.height=2048;
    
    light.castShadow=true;
    scene.add(light);

}

// window resize
function onWindowResize() {
    camera.aspect = divwidth / divheight;
    camera.updateProjectionMatrix();
    renderer.setSize(divwidth, divheight);
}

// renderer
function render() {
    renderer.render(scene, camera);
}


var extrShape = (x=0,y=0,z=0,l=0.25,w=0.25) => {
    var a=new THREE.Vector3(x,y,0);
    var b=new THREE.Vector3(x+l,y,0);
    var c=new THREE.Vector3(x+l,y+w,0);
    var d=new THREE.Vector3(x,y+w,0);
    var pts=[a,b,c,d];
    var s=new THREE.Shape();
    s.moveTo(pts[0].x,pts[0].y);
    for(var i=1; i<pts.length; i++){
        s.lineTo(pts[i].x, pts[i].y);
    }
    s.autoClose=true;
    var extr={
        steps:1,
        depth:z,
        bevelEnabled:false
    }
    var g=new THREE.ExtrudeGeometry(s,extr);
    return g;
}