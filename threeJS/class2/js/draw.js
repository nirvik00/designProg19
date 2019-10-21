function draw(){
    var axes=new THREE.AxesHelper(5);
    scene.add(axes);

    var g=new THREE.BoxGeometry(5,5,5);
    var m=new THREE.MeshBasicMaterial({
        color:new THREE.Color("rgb(255,0,0)"),
        wireframe:true
    });
    var me=new THREE.Mesh(g,m);
    scene.add(me);

    onWindowResize();
    render();
}