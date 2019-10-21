// update
function update() {
    for (var i=0; i<meshArr.length; i++){
        meshArr[i].geometry.dispose();
        meshArr[i].material.dispose();
        scene.remove(meshArr[i]);
        delete(meshArr[i]);
    }
    meshArr=[];
}

// draw
function draw() {
    update();

    // axes
    var axes = new THREE.AxesHelper(3);
    scene.add(axes);

    // get slider values
    var sliderval, sliderval2, sliderval3;
    sliderval = document.getElementById("range").value;
    sliderval2 =  document.getElementById("range2").value;
    sliderval3 =  document.getElementById("range3").value;


    sliderval2 *= 2; // makes the sine wave more pronounced at higher values.
    sliderval3 *= 2; // ibid


    // 2d array 

    let imax = 10; let jmax = 10; let zmax = 5;
    var i, j;
    var scale = sliderval * 3; // slider goes 0 to 1, this increases height *3.
    for (i = -imax; i < imax; i++) {
        var pts=[];
        for (j = -jmax; j < jmax; j++) {
            zmax = ((Math.sin(i * sliderval2) + Math.cos(j * sliderval3)) * scale) + 2;
            var p = new THREE.Vector3(i, j, zmax);
            pts.push(p);
            // var g = new THREE.BoxGeometry(0.5, 0.5, zmax);
            var g=extrShape(p.x,p.y,p.z,0.5,0.5);
            var m = new THREE.MeshPhongMaterial({
                color: new THREE.Color(p.z / 2, 2 / p.z, 0),
                wireframe: false,
                opacity: 0.75,
                transparent: true
            });
            var me = new THREE.Mesh(g, m);
            // me.position.set(p.x, p.y, p.z / 2);
            // scene.add(me);
            me.castShadow=true;
            meshArr.push(me);
        }
        var c=new THREE.CatmullRomCurve3(pts);
        var g= new THREE.TubeGeometry(c,200,0.1,10);
        var m=new THREE.MeshPhongMaterial({color:0xffffff});
        var me3=new THREE.Mesh(g,m);
        me3.position.z+=1;
        meshArr.push(me3);
    }

    var g2=new THREE.PlaneGeometry(100,100,10,10);
    var m2=new THREE.MeshPhongMaterial({color:0xffffff});
    var me2=new THREE.Mesh(g2,m2);
    me2.receiveShadow=true;
     meshArr.push(me2);

    for(var i=0; i<meshArr.length; i++){
        scene.add(meshArr[i]);
    }

    onWindowResize();
    render();
}


