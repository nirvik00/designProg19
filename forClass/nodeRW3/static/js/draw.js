function update(){

}

function draw(){
    update();
    var axes=new THREE.AxesHelper(5);
    scene.add(axes);

    onWindowResize();
    render();
}