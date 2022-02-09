import '../styles/projects.css'
// import * as THREE from 'three'

// const canvas = document.querySelector('canvas.projects-menu')

// const scene = new THREE.Scene()

// const textureLoader = new THREE.TextureLoader()

// const imagePaths = [
//     'screenshots/onlyfoods.jpg',
//     'screenshots/spotify.png',
//     'screenshots/dabblr.jpg',
//     'screenshots/dashboard.png',
// ]

// // TODO: Maybe go crazy, put projects in space
// // Or create 3d things out of images. 

// const shift = .1
// const positionsX = [0, -shift, -shift * 2, -shift * 3]
// const positionsY = [0, shift, shift * 2, shift * 3]
// const positionsZ = [shift, -shift, -shift * 2, -shift * 3]

// function getImage(imagePath) {
//     return new Promise(resolve => {
//         textureLoader.load(imagePath, texture => {
//             resolve(texture)
//         })
//     })
// }

// async function createImagePlane(imagePath, i) {
//     const imageTexture = await getImage(imagePath)
//     const [imageWidth, imageHeight] = [imageTexture.image.naturalWidth, imageTexture.image.naturalHeight]
//     const widthToHeightRatio = imageWidth / imageHeight
//     const mesh = new THREE.Mesh(
//         new THREE.PlaneGeometry(widthToHeightRatio, 1),
//         new THREE.MeshBasicMaterial({ map: imageTexture})
//     )
//     // mesh.position.x = positionsX[i]
//     mesh.position.y = positionsY[i]
//     mesh.position.z = positionsZ[i]
//     // mesh.rotateY(.25)
//     scene.add(mesh)
// }


// async function add3DScreenshots() {
//     for (let i = 0; i < imagePaths.length; i++) {
//         await createImagePlane(imagePaths[i], i)
//     }
// }

// add3DScreenshots()

// /**
//  * Sizes
//  */
// const sizes = {
//     width: canvas.clientWidth,
//     height: window.innerHeight
// }

// const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
// camera.position.z = 3
// scene.add(camera)

// window.addEventListener('resize', () => {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.setClearColor('#101011')

// const tick = () => {
//     renderer.render(scene, camera)

//     requestAnimationFrame(tick)
// }

// tick()