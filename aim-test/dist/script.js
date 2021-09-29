var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor('#87ceeb');
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.append(renderer.domElement);
document.body.style.margin = 0;

document.body.style.display = 'flex';
document.body.style.height = 100 + 'vh';
document.body.style.justifyContent = 'center';
document.body.style.alignItems = 'center';
var crosshair = document.createElement('div');
crosshair.style.width = 50 + 'px';
crosshair.style.height = 50 + 'px';
crosshair.style.position = 'absolute';
crosshair.style.display = 'none';
crosshair.style.justifyContent = 'center';
crosshair.style.alignItems = 'center';
var line1 = document.createElement('div');
var line2 = document.createElement('div');
line1.style.width = 2 + 'px';
line1.style.height = 20 + 'px';
line1.style.backgroundColor = '#ffffff';
line1.style.position = 'absolute';
line2.style.width = 20 + 'px';
line2.style.height = 2 + 'px';
line2.style.backgroundColor = '#ffffff';
line2.style.position = 'absolute';
crosshair.append(line1, line2);
document.body.append(crosshair);

var groundGeo = new THREE.BoxGeometry(10, 1, 10);
var groundMat = new THREE.MeshBasicMaterial({color: 0xcccccc});
var ground = new THREE.Mesh(groundGeo, groundMat);

scene.add(ground);

ground.position.y = -1;
ground.position.z = 5;

var testGeo = new THREE.BoxGeometry(3, 3, 1);
var testMat = new THREE.MeshBasicMaterial({color: 0x000000});
var test = new THREE.Mesh(testGeo, testMat);

scene.add(test);

test.position.z = 3;

var aimGeo = new THREE.SphereGeometry(0.1, 64, 32);
var aimMat = new THREE.MeshBasicMaterial({color: 0xffcc00});
var aim = new THREE.Mesh(aimGeo, aimMat);

scene.add(aim);

aim.position.set(Math.floor(Math.random() * 3 - 1) * 0.5, Math.floor(Math.random() * 3) * 0.5, 4);

camera.position.y = 0.5;
camera.position.z = 5;

// var controls = new THREE.OrbitControls(camera, renderer.domElement);
var controls = new THREE.PointerLockControls(camera, document.body);
var raycaster = new THREE.Raycaster();

document.addEventListener('click', () => {
  if(!controls.isLocked) {
    controls.lock();
  }
});

document.addEventListener('click', () => {
  if(controls.isLocked) {
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);

    var intersects = raycaster.intersectObjects(scene.children);

    for(let i = 0; i < intersects.length; i++) {
      if(intersects[i].object == aim) {
        intersects[i].object.position.set(Math.floor(Math.random() * 3 - 1) * 0.5, Math.floor(Math.random() * 3) * 0.5, 4);
      }
    }
  }
});

controls.addEventListener('lock', () => {
  crosshair.style.display = 'flex';
});

controls.addEventListener('unlock', () => {
  crosshair.style.display = 'none';
});

function animate() {
  // controls.update();
  
  renderer.render(scene, camera);
  
  window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);