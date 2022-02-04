import './styles/style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import waterVertexShader from './shaders/water/vertex.glsl'
import waterFragmentShader from './shaders/water/fragment.glsl'

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const env = 'prod'

/**
 * Water
 */
// Geometry
const width = 4
const height = 2
const waterGeometry = new THREE.PlaneGeometry(width, height, 512, 512)

// Color
let debugObject = {
    depthColor: '#00006b',
    surfaceColor: '#0571ff'
}

debugObject = {
    surfaceColor: '#ff8585', 
    depthColor: '#6b0002'
}

// Material
let waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms: {
        uTime: { value: 0 },

        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new THREE.Vector2(4.0, 1.5) }, // x and z
        uBigWavesSpeed: { value: 0.75 },

        // previously .15
        uSmallWavesElevation: { value: 0.15 },
        uSmallWavesFrequency: { value: 3 },
        uSmallWavesSpeed: { value: 0.2 },
        uSmallWavesIteration: { value: 4 },

        uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
        uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
        // previously .25
        uColorOffset: { value: 0.15 },
        uColorMultiplier: { value: 1.826 },
        uColorDarkener: { value: 0.0 },
        uColorDarkenerLimit: { value: 1.0 }
    }
})

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5
scene.add(water)

// Debug
if (env === 'test') {
    // Debug
    const gui = new dat.GUI({ width: 340 })
    gui.add(waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation')
    gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX')
    gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyZ')
    gui.add(waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(2).step(0.001).name('uBigWavesSpeed')
    gui.addColor(debugObject, 'depthColor')
        .onChange(() => waterMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor))
    gui.addColor(debugObject, 'surfaceColor')
        .onChange(() => waterMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor))
    gui.add(waterMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset')
    gui.add(waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')
    gui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
    gui.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
    gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
    gui.add(waterMaterial.uniforms.uSmallWavesIteration, 'value').min(0).max(5).step(1).name('uSmallIterations')
    gui.add(waterMaterial.uniforms.uColorDarkener, 'value').min(0).max(3).step(.001).name('uColorDarkener')
}


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


let positionY = 0
window.addEventListener('scroll', e => {
    let darkenerValue = waterMaterial.uniforms.uColorDarkener.value
    let darkenerLimit = waterMaterial.uniforms.uColorDarkenerLimit
    if (window.scrollY > positionY) {
        darkenerValue += .01
        positionY = window.scrollY
    } else {
        darkenerValue -= .01
        positionY = window.scrollY
    }
    if (darkenerValue < 0) darkenerValue = 0
    if (darkenerValue > darkenerLimit) darkenerValue = darkenerLimit
    if (window.scrollY < 100) darkenerValue = 0
    waterMaterial.uniforms.uColorDarkener.value = darkenerValue
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
if (env === 'test') {
    camera.position.set(3, 3, 3)
} else {
    camera.position.set(0, 2, 0)
    camera.rotation.x = - Math.PI * .5
}

scene.add(camera)

// Controls
let controls = null
if (env === 'test') {
    controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color('#0a0000'))

/**
 * Animate
 */
let clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update water
    waterMaterial.uniforms.uTime.value = elapsedTime

    // Update controls
    if (controls) controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()