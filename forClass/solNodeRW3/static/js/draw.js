function update(){

    for(var i=0; i<meshArr.length; i++){
        meshArr[i].geometry.dispose();
        meshArr[i].material.dispose();
        scene.remove(meshArr[i]);
        delete meshArr[i];
    }
    meshArr=[];

    ang+=Math.PI/180;
    var t=120;
    var p=new THREE.Vector3(t*Math.cos(ang), t*Math.sin(ang), 0);
    light.position.set(p.x,p.y,p.z);
}

function draw(){
    update();
    var axes=new THREE.AxesHelper(5);
    scene.add(axes);

    var g=new THREE.BoxGeometry(10,10,10);
    var m=new THREE.MeshPhongMaterial({
        color: 0xff9900,
        opacity:0.750,
        transparent:true
    });
    var me=new THREE.Mesh(g,m);
    var t=115;
    var p=new THREE.Vector3(t*Math.cos(ang), t*Math.sin(ang), 0);
    me.position.set(p.x,p.y,p.z);
    me.castShadow=true;
    meshArr.push(me);

    var g2=new THREE.SphereGeometry(100,100,100,100);
    var m2=new THREE.MeshPhongMaterial({
        color:0xffffff,
        wireframe:0,
        map:txtr0
    });
    var me2=new THREE.Mesh(g2, m2);
    me2.rotation.y=Math.PI/2;
    me2.rotation.x=Math.PI/2;

    me2.receiveShadow=true;
    meshArr.push(me2);

    for(var i=0; i<meshArr.length; i++){
        scene.add(meshArr[i]);
    }

    onWindowResize();
    render();
}