// Three.js를 사용하여 장면, 카메라, 렌더러 초기화
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 땅 추가
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// 간단한 큐브 추가
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.y = 2; // 카메라 높이 설정
camera.position.z = 5;

// 키보드 입력 처리
const keys = { w: false, a: false, s: false, d: false, space: false };
document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        keys.space = true;
    } else {
        keys[event.key] = true;
    }
});
document.addEventListener('keyup', (event) => {
    if (event.key === ' ') {
        keys.space = false;
    } else {
        keys[event.key] = false;
    }
});

// 마우스 이동 처리
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (event) => {
    if (document.pointerLockElement) {
        mouseX += event.movementX;
        mouseY += event.movementY;
    }
});

// Pointer Lock API 초기화
document.body.addEventListener('click', () => {
    document.body.requestPointerLock();
});

// 카메라 회전 제한 함수
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// 중력 변수
const gravity = 0.05;
let velocityY = 0;
const jumpStrength = 1.5;

// 집 구조물 추가
function createHouse() {
    // 벽
    const wallGeometry = new THREE.BoxGeometry(4, 2.5, 0.1);
    const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
    frontWall.position.set(0, 1.25, -2);
    scene.add(frontWall);
    
    const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
    backWall.position.set(0, 1.25, 2);
    scene.add(backWall);
    
    const sideWall1 = new THREE.Mesh(wallGeometry, wallMaterial);
    sideWall1.rotation.y = Math.PI / 2;
    sideWall1.position.set(2, 1.25, 0);
    scene.add(sideWall1);
    
    const sideWall2 = new THREE.Mesh(wallGeometry, wallMaterial);
    sideWall2.rotation.y = Math.PI / 2;
    sideWall2.position.set(-2, 1.25, 0);
    scene.add(sideWall2);
    
    // 지붕
    const roofGeometry = new THREE.ConeGeometry(2.5, 1, 4);
    const roofMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(0, 3, 0);
    roof.rotation.y = Math.PI / 4; // 사각뿔 회전
    scene.add(roof);
}

createHouse();

function animate() {
    requestAnimationFrame(animate);

    // 카메라의 전방 및 오른쪽 방향 벡터 계산
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    const right = new THREE.Vector3().crossVectors(camera.up, direction).normalize();

    // WASD 키에 따라 카메라 이동
    if (keys.w) camera.position.addScaledVector(direction, 0.1);
    if (keys.s) camera.position.addScaledVector(direction, -0.1);
    if (keys.a) camera.position.addScaledVector(right, 0.1);  // 왼쪽 이동
    if (keys.d) camera.position.addScaledVector(right, -0.1);  // 오른쪽 이동

    // 점프 기능
    if (keys.space && camera.position.y <= 2) { // 지면에 있을 때만 점프
        velocityY = jumpStrength;
    }

    // 중력 적용
    velocityY -= gravity;
    camera.position.y += velocityY;
    if (camera.position.y < 2) {
        camera.position.y = 2;
        velocityY = 0;
    }

    // 마우스 이동에 따라 시점 변경
    camera.rotation.y = -mouseX * 0.002;
    camera.rotation.x = clamp(-mouseY * 0.002, -Math.PI / 2, Math.PI / 2); // x축 회전을 제한

    renderer.render(scene, camera);
}

animate();
