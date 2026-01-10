"use client"

import { useEffect, useRef, useCallback } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

// ========================================
// BAS (Buffer Animation System) Implementation
// ========================================
// BAS provides shader utilities for animating particles along curved paths
// These shaders run on the GPU for high-performance particle animation
const BAS = {
  ShaderChunk: {
    // Catmull-Rom spline interpolation - creates smooth curves through control points
    // Used to make particles flow smoothly along the path
    "catmull-rom": `vec3 catmullRom(vec3 p0, vec3 p1, vec3 p2, vec3 p3, float t)
{
    vec3 v0 = (p2 - p0) * 0.5;
    vec3 v1 = (p3 - p1) * 0.5;
    float t2 = t * t;
    float t3 = t * t * t;

    return vec3((2.0 * p1 - 2.0 * p2 + v0 + v1) * t3 + (-3.0 * p1 + 3.0 * p2 - 2.0 * v0 - v1) * t2 + v0 * t + p1);
}

vec3 catmullRom(vec3 p0, vec3 p1, vec3 p2, vec3 p3, vec2 c, float t)
{
    vec3 v0 = (p2 - p0) * c.x;
    vec3 v1 = (p3 - p1) * c.y;
    float t2 = t * t;
    float t3 = t * t * t;

    return vec3((2.0 * p1 - 2.0 * p2 + v0 + v1) * t3 + (-3.0 * p1 + 3.0 * p2 - 2.0 * v0 - v1) * t2 + v0 * t + p1);
}

float catmullRom(float p0, float p1, float p2, float p3, float t)
{
    float v0 = (p2 - p0) * 0.5;
    float v1 = (p3 - p1) * 0.5;
    float t2 = t * t;
    float t3 = t * t * t;

    return float((2.0 * p1 - 2.0 * p2 + v0 + v1) * t3 + (-3.0 * p1 + 3.0 * p2 - 2.0 * v0 - v1) * t2 + v0 * t + p1);
}

float catmullRom(float p0, float p1, float p2, float p3, vec2 c, float t)
{
    float v0 = (p2 - p0) * c.x;
    float v1 = (p3 - p1) * c.y;
    float t2 = t * t;
    float t3 = t * t * t;

    return float((2.0 * p1 - 2.0 * p2 + v0 + v1) * t3 + (-3.0 * p1 + 3.0 * p2 - 2.0 * v0 - v1) * t2 + v0 * t + p1);
}
`,
    // Cubic easing function - creates smooth acceleration/deceleration
    "ease_in_out_cubic": `float ease(float t, float b, float c, float d) {
  if ((t/=d/2.0) < 1.0) return c/2.0*t*t*t + b;
  return c/2.0*((t-=2.0)*t*t + 2.0) + b;
}
`,
    // Quaternion rotation - allows smooth 3D rotation of particles without gimbal lock
    "quaternion_rotation": `vec3 rotateVector(vec4 q, vec3 v)
{
    return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}

vec4 quatFromAxisAngle(vec3 axis, float angle)
{
    float halfAngle = angle * 0.5;
    return vec4(axis.xyz * sin(halfAngle), cos(halfAngle));
}
`,
  },
}

// ========================================
// PrefabBufferGeometry Class
// ========================================
// This class creates many copies of a base geometry (prefab) to efficiently render
// thousands of particles. Instead of creating 250k separate objects, we create one
// large buffer with all the geometry data, which is much faster to render.
class PrefabBufferGeometry extends THREE.BufferGeometry {
  prefabGeometry: THREE.BufferGeometry // The base geometry to duplicate (plane)
  prefabCount: number // How many copies to create (250k particles)
  prefabVertexCount: number // Vertices in the base geometry

  constructor(prefab: THREE.BufferGeometry, count: number) {
    super()
    this.prefabGeometry = prefab
    this.prefabCount = count

    const posAttr = prefab.getAttribute("position")
    this.prefabVertexCount = posAttr.count

    this.bufferDefaults()
  }

  // Sets up the position and index buffers for all particle copies
  bufferDefaults() {
    const prefab = this.prefabGeometry
    const posAttr = prefab.getAttribute("position") as THREE.BufferAttribute
    const prefabVertexCount = (this.prefabVertexCount = posAttr.count)

    const prefabIndex = prefab.getIndex()
    const prefabIndexCount = prefabIndex ? prefabIndex.count : prefabVertexCount
    const prefabIndices: number[] = prefabIndex ? Array.from(prefabIndex.array) : []

    if (!prefabIndex) {
      for (let i = 0; i < prefabVertexCount; i++) prefabIndices.push(i)
    }

    const indexBuffer = new Uint32Array(this.prefabCount * prefabIndexCount)
    const positionBuffer = new Float32Array(this.prefabCount * prefabVertexCount * 3)

    this.setIndex(new THREE.BufferAttribute(indexBuffer, 1))
    this.setAttribute("position", new THREE.BufferAttribute(positionBuffer, 3))

    for (let i = 0, offset = 0; i < this.prefabCount; i++) {
      for (let j = 0; j < prefabVertexCount; j++, offset += 3) {
        positionBuffer[offset] = posAttr.getX(j)
        positionBuffer[offset + 1] = posAttr.getY(j)
        positionBuffer[offset + 2] = posAttr.getZ(j)
      }

      for (let k = 0; k < prefabIndexCount; k++) {
        indexBuffer[i * prefabIndexCount + k] = prefabIndices[k] + i * prefabVertexCount
      }
    }
  }

  // Helper to create custom vertex attributes for animation data
  // (e.g., delay timing, rotation axis, color for each particle)
  createAttribute(name: string, itemSize: number) {
    const buffer = new Float32Array(this.prefabCount * this.prefabVertexCount * itemSize)
    const attribute = new THREE.BufferAttribute(buffer, itemSize)
    this.setAttribute(name, attribute)
    return attribute
  }
}

// ========================================
// PhongAnimationMaterial Class
// ========================================
// Custom shader material that extends Three.js's Phong lighting model with animation capabilities
// This allows particles to have realistic lighting while animating along paths
interface PhongAnimationMaterialParameters {
  vertexColors?: boolean
  flatShading?: boolean
  side?: THREE.Side
  defines?: Record<string, unknown>
  uniforms?: Record<string, THREE.IUniform>
  shaderFunctions?: string[]
  shaderParameters?: string[]
  shaderVertexInit?: string[]
  shaderTransformNormal?: string[]
  shaderTransformPosition?: string[]
}

interface PhongUniformValues {
  diffuse?: number
  shininess?: number
  specular?: number
  emissive?: number
  map?: THREE.Texture
  normalMap?: THREE.Texture
}

class PhongAnimationMaterial extends THREE.ShaderMaterial {
  shaderFunctions: string[]
  shaderParameters: string[]
  shaderVertexInit: string[]
  shaderTransformNormal: string[]
  shaderTransformPosition: string[]

  constructor(parameters: PhongAnimationMaterialParameters, uniformValues: PhongUniformValues) {
    super()

    this.shaderFunctions = parameters.shaderFunctions || []
    this.shaderParameters = parameters.shaderParameters || []
    this.shaderVertexInit = parameters.shaderVertexInit || []
    this.shaderTransformNormal = parameters.shaderTransformNormal || []
    this.shaderTransformPosition = parameters.shaderTransformPosition || []

    const phongShader = THREE.ShaderLib["phong"]

    this.uniforms = THREE.UniformsUtils.merge([phongShader.uniforms, parameters.uniforms || {}])
    this.lights = true
    this.vertexShader = this._concatVertexShader()
    this.fragmentShader = this._concatFragmentShader()

    this.defines = parameters.defines || {}
    if (parameters.vertexColors) this.defines["USE_COLOR"] = ""
    if (parameters.flatShading) this.defines["FLAT_SHADED"] = ""
    if (uniformValues.map) this.defines["USE_MAP"] = ""
    if (uniformValues.normalMap) this.defines["USE_NORMALMAP"] = ""

    if (parameters.side) this.side = parameters.side

    this.setUniformValues(uniformValues)
  }

  _concatFunctions() {
    return this.shaderFunctions.join("\n")
  }
  _concatParameters() {
    return this.shaderParameters.join("\n")
  }
  _concatVertexInit() {
    return this.shaderVertexInit.join("\n")
  }
  _concatTransformNormal() {
    return this.shaderTransformNormal.join("\n")
  }
  _concatTransformPosition() {
    return this.shaderTransformPosition.join("\n")
  }

  _concatVertexShader() {
    return [
      "#define PHONG",
      "#define USE_COLOR",
      "varying vec3 vViewPosition;",
      THREE.ShaderChunk["common"],
      THREE.ShaderChunk["uv_pars_vertex"],
      THREE.ShaderChunk["displacementmap_pars_vertex"],
      THREE.ShaderChunk["envmap_pars_vertex"],
      THREE.ShaderChunk["color_pars_vertex"],
      THREE.ShaderChunk["fog_pars_vertex"],
      THREE.ShaderChunk["normal_pars_vertex"],
      THREE.ShaderChunk["morphtarget_pars_vertex"],
      THREE.ShaderChunk["skinning_pars_vertex"],
      THREE.ShaderChunk["shadowmap_pars_vertex"],
      THREE.ShaderChunk["logdepthbuf_pars_vertex"],
      THREE.ShaderChunk["clipping_planes_pars_vertex"],
      this._concatFunctions(),
      this._concatParameters(),
      "void main() {",
      "vColor = color;",
      this._concatVertexInit(),
      THREE.ShaderChunk["uv_vertex"],
      THREE.ShaderChunk["beginnormal_vertex"],
      this._concatTransformNormal(),
      THREE.ShaderChunk["morphnormal_vertex"],
      THREE.ShaderChunk["skinbase_vertex"],
      THREE.ShaderChunk["skinnormal_vertex"],
      THREE.ShaderChunk["defaultnormal_vertex"],
      THREE.ShaderChunk["normal_vertex"],
      THREE.ShaderChunk["begin_vertex"],
      this._concatTransformPosition(),
      THREE.ShaderChunk["morphtarget_vertex"],
      THREE.ShaderChunk["skinning_vertex"],
      THREE.ShaderChunk["displacementmap_vertex"],
      THREE.ShaderChunk["project_vertex"],
      THREE.ShaderChunk["logdepthbuf_vertex"],
      THREE.ShaderChunk["clipping_planes_vertex"],
      "vViewPosition = - mvPosition.xyz;",
      THREE.ShaderChunk["worldpos_vertex"],
      THREE.ShaderChunk["envmap_vertex"],
      THREE.ShaderChunk["shadowmap_vertex"],
      THREE.ShaderChunk["fog_vertex"],
      "}",
    ].join("\n")
  }

  _concatFragmentShader() {
    return [
      "#define PHONG",
      "#define USE_COLOR",
      "uniform vec3 diffuse;",
      "uniform vec3 emissive;",
      "uniform vec3 specular;",
      "uniform float shininess;",
      "uniform float opacity;",
      THREE.ShaderChunk["common"],
      THREE.ShaderChunk["packing"],
      THREE.ShaderChunk["dithering_pars_fragment"],
      THREE.ShaderChunk["color_pars_fragment"],
      THREE.ShaderChunk["uv_pars_fragment"],
      THREE.ShaderChunk["map_pars_fragment"],
      THREE.ShaderChunk["alphamap_pars_fragment"],
      THREE.ShaderChunk["alphatest_pars_fragment"],
      THREE.ShaderChunk["alphahash_pars_fragment"],
      THREE.ShaderChunk["aomap_pars_fragment"],
      THREE.ShaderChunk["lightmap_pars_fragment"],
      THREE.ShaderChunk["emissivemap_pars_fragment"],
      THREE.ShaderChunk["envmap_common_pars_fragment"],
      THREE.ShaderChunk["envmap_pars_fragment"],
      THREE.ShaderChunk["fog_pars_fragment"],
      THREE.ShaderChunk["bsdfs"],
      THREE.ShaderChunk["lights_pars_begin"],
      THREE.ShaderChunk["normal_pars_fragment"],
      THREE.ShaderChunk["lights_phong_pars_fragment"],
      THREE.ShaderChunk["shadowmap_pars_fragment"],
      THREE.ShaderChunk["bumpmap_pars_fragment"],
      THREE.ShaderChunk["normalmap_pars_fragment"],
      THREE.ShaderChunk["specularmap_pars_fragment"],
      THREE.ShaderChunk["logdepthbuf_pars_fragment"],
      THREE.ShaderChunk["clipping_planes_pars_fragment"],
      "void main() {",
      THREE.ShaderChunk["clipping_planes_fragment"],
      "vec4 diffuseColor = vec4( diffuse, opacity );",
      "ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );",
      "vec3 totalEmissiveRadiance = emissive;",
      THREE.ShaderChunk["logdepthbuf_fragment"],
      THREE.ShaderChunk["map_fragment"],
      THREE.ShaderChunk["color_fragment"],
      THREE.ShaderChunk["alphamap_fragment"],
      THREE.ShaderChunk["alphatest_fragment"],
      THREE.ShaderChunk["alphahash_fragment"],
      THREE.ShaderChunk["specularmap_fragment"],
      THREE.ShaderChunk["normal_fragment_begin"],
      THREE.ShaderChunk["normal_fragment_maps"],
      THREE.ShaderChunk["emissivemap_fragment"],
      THREE.ShaderChunk["lights_phong_fragment"],
      THREE.ShaderChunk["lights_fragment_begin"],
      THREE.ShaderChunk["lights_fragment_maps"],
      THREE.ShaderChunk["lights_fragment_end"],
      THREE.ShaderChunk["aomap_fragment"],
      "vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;",
      THREE.ShaderChunk["envmap_fragment"],
      THREE.ShaderChunk["opaque_fragment"],
      THREE.ShaderChunk["tonemapping_fragment"],
      THREE.ShaderChunk["colorspace_fragment"],
      THREE.ShaderChunk["fog_fragment"],
      THREE.ShaderChunk["premultiplied_alpha_fragment"],
      THREE.ShaderChunk["dithering_fragment"],
      "}",
    ].join("\n")
  }

  setUniformValues(values: PhongUniformValues) {
    for (const key in values) {
      if (key in this.uniforms) {
        const uniform = this.uniforms[key]
        const value = values[key as keyof PhongUniformValues]
        if (uniform.value && uniform.value.isColor && typeof value === "number") {
          uniform.value.set(value)
        } else if (uniform.value && typeof uniform.value.copy === "function") {
          uniform.value.copy(value)
        } else {
          uniform.value = value
        }
      }
    }
  }
}

// ========================================
// SpectrumAnalyzer Class
// ========================================
// Analyzes audio frequencies in real-time using the Web Audio API
// Splits audio into frequency bins and provides amplitude data for visualization
class SpectrumAnalyzer {
  context: AudioContext // Web Audio API context
  analyzerNode: AnalyserNode // Performs FFT analysis on audio
  source: MediaElementAudioSourceNode | null = null // Audio source connection
  binCount: number // Number of frequency bands to analyze
  frequencyByteData: Uint8Array // Current frequency data (0-255)
  timeByteData: Uint8Array // Current waveform data (0-255)

  constructor(binCount: number, smoothingTimeConstant: number) {
    const Context = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    this.context = new Context()
    this.analyzerNode = this.context.createAnalyser()
    this.binCount = binCount
    this.frequencyByteData = new Uint8Array(binCount)
    this.timeByteData = new Uint8Array(binCount)

    this.setBinCount(binCount)
    this.setSmoothingTimeConstant(smoothingTimeConstant)
  }

  setSource(source: HTMLAudioElement) {
    this.source = this.context.createMediaElementSource(source)
    this.source.connect(this.analyzerNode)
    this.analyzerNode.connect(this.context.destination)
  }

  setBinCount(binCount: number) {
    this.binCount = binCount
    this.analyzerNode.fftSize = binCount * 2
    this.frequencyByteData = new Uint8Array(binCount)
    this.timeByteData = new Uint8Array(binCount)
  }

  setSmoothingTimeConstant(smoothingTimeConstant: number) {
    this.analyzerNode.smoothingTimeConstant = smoothingTimeConstant
  }

  getAverage(index?: number, count?: number) {
    let total = 0
    const start = index || 0
    const end = start + (count || this.binCount)

    for (let i = start; i < end; i++) {
      total += this.frequencyByteData[i]
    }

    return total / (end - start)
  }

  getAverageFloat(index?: number, count?: number) {
    return this.getAverage(index, count) / 255
  }

  updateSample() {
    this.analyzerNode.getByteFrequencyData(this.frequencyByteData)
    this.analyzerNode.getByteTimeDomainData(this.timeByteData)
  }
}

// ========================================
// Main Component
// ========================================
/**
 * AudioVisualizerBackground Component
 *
 * Creates a 3D particle system that reacts to audio in real-time.
 * - 250,000 particles flow along a curved path
 * - Tube radius expands/contracts based on audio frequencies
 * - Lights pulse with music volume
 * - Particles rotate and tumble as they move
 * - Camera orbits automatically with parallax scrolling
 *
 * Technical overview:
 * - Uses Three.js for 3D rendering
 * - Custom shaders for GPU-accelerated particle animation
 * - Web Audio API for frequency analysis
 * - Phong lighting model for realistic shading
 */
export function AudioVisualizerBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const particleSystemRef = useRef<THREE.Mesh | null>(null)
  const lightsRef = useRef<{
    light: THREE.PointLight
    light2: THREE.DirectionalLight
    light3: THREE.DirectionalLight
    ambientLight: THREE.AmbientLight
    light4: THREE.DirectionalLight
    hemiLight: THREE.HemisphereLight
  } | null>(null)
  const analyserRef = useRef<SpectrumAnalyzer | null>(null)
  const audioElementRef = useRef<HTMLAudioElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const audioStartedRef = useRef(false)

  // Visual constants
  const SHADOW_COLOR = 0x13091b // Dark purple background color
  const PARTICLE_COUNT = 250000 // Total number of particles to render
  const PATH_LENGTH = 32 // Number of points defining the particle path
  const MAX_VOLUME = 0.05 // Audio volume (5%)
  const INITIAL_CAMERA_Z = 800 // Camera distance from origin
  const INITIAL_CAMERA_Y = 0 // Camera height

  const targetCameraYRef = useRef(INITIAL_CAMERA_Y)
  const targetCameraZRef = useRef(INITIAL_CAMERA_Z)
  const mouseXRef = useRef(0)
  const mouseYRef = useRef(0)
  const lastScrollTimeRef = useRef(0)

  const startAudio = useCallback(() => {
    if (audioStartedRef.current || !audioElementRef.current || !analyserRef.current) return

    // Resume audio context first (required in many browsers)
    if (analyserRef.current.context.state === 'suspended') {
      analyserRef.current.context.resume()
    }

    audioStartedRef.current = true

    audioElementRef.current
      .play()
      .then(() => {
        if (audioElementRef.current) {
          audioElementRef.current.muted = false
          audioElementRef.current.volume = MAX_VOLUME
        }
      })
      .catch((error) => {
        console.log('Audio playback prevented:', error)
        audioStartedRef.current = false
      })
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    // Create audio element
    const audioElement = document.createElement("audio")
    audioElement.src = "/audio-visualizer/song.mp3"
    audioElement.autoplay = true
    audioElement.loop = true
    audioElement.muted = true
    audioElement.style.display = "none"
    document.body.appendChild(audioElement)
    audioElementRef.current = audioElement

    // Initialize spectrum analyzer
    const analyser = new SpectrumAnalyzer(PATH_LENGTH * 0.5, 0.8)
    analyser.setSource(audioElement)
    analyserRef.current = analyser

    // Initialize THREE.js
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(SHADOW_COLOR)
    // Limit pixel ratio to prevent over-rendering on high-DPI displays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // Disable color management for legacy shader compatibility
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 5000)
    camera.position.set(0, INITIAL_CAMERA_Y, INITIAL_CAMERA_Z)
    cameraRef.current = camera

    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Lighting setup - multiple lights create depth and dimension

    // Ambient light: ensures all particles have base visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Hemisphere light: simulates sky/ground lighting for natural feel
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xff88ff, 0.6)
    scene.add(hemiLight)

    // Point light: positioned at center, pulses with music
    const light = new THREE.PointLight(0xffffff, 1, 100, 2)
    light.position.set(0, 0, 0)
    scene.add(light)

    // Directional lights: colored lights from different angles create visual interest
    const light2 = new THREE.DirectionalLight(0xff311f, 0.1) // Red from above
    light2.position.set(0, 1, 1)
    scene.add(light2)

    const light3 = new THREE.DirectionalLight(0xffd633, 1) // Yellow from side
    light3.position.set(1, 1, 0)
    scene.add(light3)

    const light4 = new THREE.DirectionalLight(0x4466ff, 1) // Blue from opposite side
    light4.position.set(-1, -1, -1)
    scene.add(light4)

    lightsRef.current = { light, light2, light3, ambientLight, light4, hemiLight }

    // Camera controls - disable auto-rotate for mouse control
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.autoRotate = false // Disabled - using mouse control instead
    controls.enableZoom = false // Disable user zoom
    controls.enablePan = false // Disable user panning
    controls.enableRotate = false // Disable manual rotation - using mouse control
    controls.minDistance = 10 // Min camera distance
    controls.maxDistance = 1200 // Max camera distance
    controlsRef.current = controls

    // Initialize particle system
    // Each particle is a small plane (4x4 units)
    const prefabGeometry = new THREE.PlaneGeometry(4, 4)
    const prefabVertexCount = prefabGeometry.getAttribute("position").count
    const bufferGeometry = new PrefabBufferGeometry(prefabGeometry, PARTICLE_COUNT)

    // Create custom attributes for animation
    const aDelayDuration = bufferGeometry.createAttribute("aDelayDuration", 2) // When to start, how long to animate
    const aPivot = bufferGeometry.createAttribute("aPivot", 3) // Rotation pivot point
    const aAxisAngle = bufferGeometry.createAttribute("aAxisAngle", 4) // Rotation axis and angle
    const aColor = bufferGeometry.createAttribute("color", 3) // Particle color

    let i, j, offset

    // Animation timing parameters - create staggered wave effect
    const prefabDelay = 0.00015 // Delay between each particle starting
    const vertexDelay = 0.0175 // Delay between vertices of same particle
    const minDuration = 32.0 // Minimum animation loop duration (seconds)
    const maxDuration = 56.5 // Maximum animation loop duration (seconds)

    // Set animation timing for each particle
    // Each particle starts at a different time and loops at a different rate
    for (i = 0, offset = 0; i < PARTICLE_COUNT; i++) {
      const delay = i * prefabDelay
      const duration = THREE.MathUtils.randFloat(minDuration, maxDuration)

      for (j = 0; j < prefabVertexCount; j++) {
        aDelayDuration.array[offset++] = delay + j * vertexDelay
        aDelayDuration.array[offset++] = duration
      }
    }

    // Set pivot points for rotation
    // Randomized pivots create varied spinning effects
    const pivot = new THREE.Vector3()
    for (i = 0, offset = 0; i < PARTICLE_COUNT; i++) {
      pivot.x = THREE.MathUtils.randFloat(0, 2)
      pivot.y = THREE.MathUtils.randFloat(0, 2)
      pivot.z = THREE.MathUtils.randFloat(0, 2)

      for (j = 0; j < prefabVertexCount; j++) {
        aPivot.array[offset++] = pivot.x
        aPivot.array[offset++] = pivot.y
        aPivot.array[offset++] = pivot.z
      }
    }

    // Set rotation axis and angle for each particle
    // Random axes create organic, tumbling motion
    const axis = new THREE.Vector3()
    let angle = 0

    for (i = 0, offset = 0; i < PARTICLE_COUNT; i++) {
      axis.x = THREE.MathUtils.randFloatSpread(2)
      axis.y = THREE.MathUtils.randFloatSpread(2)
      axis.z = THREE.MathUtils.randFloatSpread(2)
      axis.normalize()

      angle = Math.PI * THREE.MathUtils.randInt(48, 64)

      for (j = 0; j < prefabVertexCount; j++) {
        aAxisAngle.array[offset++] = axis.x
        aAxisAngle.array[offset++] = axis.y
        aAxisAngle.array[offset++] = axis.z
        aAxisAngle.array[offset++] = angle
      }
    }

    // Assign colors to particles
    // Uses HSL color space for vibrant, varied hues
    const color = new THREE.Color()

    for (i = 0, offset = 0; i < PARTICLE_COUNT; i++) {
      const h = THREE.MathUtils.randFloat(0.5, 1.0)
      const s = THREE.MathUtils.randFloat(0.5, 0.75)
      const l = THREE.MathUtils.randFloat(0.25, 0.5)

      color.setHSL(h, s, l, THREE.SRGBColorSpace)
      // Convert to linear space for proper lighting calculations
      color.convertSRGBToLinear()

      for (j = 0; j < prefabVertexCount; j++) {
        aColor.array[offset++] = color.r
        aColor.array[offset++] = color.g
        aColor.array[offset++] = color.b
      }
    }

    // Define the 3D path that particles follow
    // Creates a vertical flow with random wandering
    const pathArray: number[] = []
    const radiusArray: number[] = []

    for (i = 0; i < PATH_LENGTH; i++) {
      let x, y, z

      if (!i) {
        // First point: particles start below the view
        x = 0
        y = -1400
        z = 0
      } else if (!(i - PATH_LENGTH + 1)) {
        // Last point: particles end above the view
        x = 0
        y = 1200
        z = 0
      } else {
        // Middle points: random wandering creates organic flow
        x = THREE.MathUtils.randFloatSpread(600)
        y = -400 + (800 / PATH_LENGTH) * i + THREE.MathUtils.randFloatSpread(200)
        z = THREE.MathUtils.randFloatSpread(600)
      }

      pathArray.push(x, y, z)
      radiusArray.push(0)
    }

    // Create the animated material with Phong lighting
    // Combines realistic lighting with custom animation shaders
    const material = new PhongAnimationMaterial(
      {
        vertexColors: true,
        flatShading: true,
        side: THREE.DoubleSide,
        defines: {
          PATH_LENGTH: pathArray.length / 3,
        },
        uniforms: {
          uTime: { value: 0 },
          uPath: { value: pathArray },
          uRadius: { value: radiusArray },
          uRoundness: { value: new THREE.Vector2(2, 2) },
        },
        shaderFunctions: [
          BAS.ShaderChunk["quaternion_rotation"],
          BAS.ShaderChunk["catmull-rom"],
          BAS.ShaderChunk["ease_in_out_cubic"],
        ],
        shaderParameters: [
          "uniform float uTime;",
          "uniform vec3 uPath[PATH_LENGTH];",
          "uniform float uRadius[PATH_LENGTH];",
          "uniform vec2 uRoundness;",
          "attribute vec2 aDelayDuration;",
          "attribute vec3 aPivot;",
          "attribute vec4 aAxisAngle;",
        ],
        shaderVertexInit: [
          // Calculate animation timing for this particle
          "float tDelay = aDelayDuration.x;", // When this particle starts
          "float tDuration = aDelayDuration.y;", // How long animation takes
          "float tTime = clamp(uTime - tDelay, 0.0, tDuration);", // Current time in animation
          "float tProgress = tTime / tDuration;", // Progress from 0 to 1
          "float angle = aAxisAngle.w * tProgress;", // Current rotation angle
          "vec4 tQuat = quatFromAxisAngle(aAxisAngle.xyz, angle);", // Rotation quaternion
        ],
        shaderTransformNormal: ["objectNormal = rotateVector(tQuat, objectNormal);"],
        shaderTransformPosition: [
          // Calculate position along the curved path
          "float tMax = float(PATH_LENGTH - 1);", // Last path index
          "float tPoint = tMax * tProgress;", // Current position on path (0 to PATH_LENGTH-1)
          "float tIndex = floor(tPoint);", // Index of current segment
          "float tWeight = tPoint - tIndex;", // How far along the segment (0-1)
          // Get 4 surrounding points for Catmull-Rom interpolation
          "int i0 = int(max(0.0, tIndex - 1.0));",
          "int i1 = int(tIndex);",
          "int i2 = int(min(tIndex + 1.0, tMax));",
          "int i3 = int(min(tIndex + 2.0, tMax));",
          "vec3 p0 = uPath[i0];",
          "vec3 p1 = uPath[i1];",
          "vec3 p2 = uPath[i2];",
          "vec3 p3 = uPath[i3];",
          // Calculate tube radius at this point (audio-reactive)
          "float radius = catmullRom(uRadius[i0], uRadius[i1], uRadius[i2], uRadius[i3], tWeight);",
          "transformed += aPivot * radius;", // Offset from center based on radius
          "transformed = rotateVector(tQuat, transformed);", // Apply rotation
          "transformed += catmullRom(p0, p1, p2, p3, uRoundness, tWeight);", // Move along path
        ],
      },
      {
        diffuse: 0xffffff,
        shininess: 16,
        specular: 0xffd700,
        emissive: 0xffd63300, // Brighter emissive for self-illumination
      }
    )

    const particleSystem = new THREE.Mesh(bufferGeometry, material)
    particleSystem.frustumCulled = false
    scene.add(particleSystem)
    particleSystemRef.current = particleSystem

    // Animation loop - runs every frame (~60fps)
    const tick = () => {
      if (!controlsRef.current || !analyserRef.current || !particleSystemRef.current || !audioElementRef.current) {
        animationFrameRef.current = requestAnimationFrame(tick)
        return
      }

      controlsRef.current.update()

      // Smoothly interpolate camera to target position (parallax + mouse)
      if (cameraRef.current) {
        // Lerp factor - lower = smoother but slower, higher = faster but jerkier
        const lerpFactor = 0.05

        // Smooth camera movement toward target
        cameraRef.current.position.y += (targetCameraYRef.current - cameraRef.current.position.y) * lerpFactor
        cameraRef.current.position.z += (targetCameraZRef.current - cameraRef.current.position.z) * lerpFactor

        // Subtle mouse-based look-at adjustment
        const mouseInfluence = 50
        const targetX = mouseXRef.current * mouseInfluence
        const targetY = mouseYRef.current * mouseInfluence
        cameraRef.current.lookAt(targetX, targetY, 0)
      }

      // Get latest audio frequency data
      analyserRef.current.updateSample()

      // Map audio frequencies to path radius (makes tube expand with music)
      const uniform = (particleSystemRef.current.material as PhongAnimationMaterial).uniforms["uRadius"].value
      const data = analyserRef.current.frequencyByteData

      // Mirror frequency data to create symmetrical effect
      // Pattern: forward, backward, forward, backward
      const dataArray: number[] = []
      const cap = data.length * 0.5

      for (let i = 0; i < cap; i++) {
        dataArray.push(data[i])
      }
      for (let i = cap - 1; i >= 0; i--) {
        dataArray.push(data[i])
      }
      for (let i = 0; i < cap; i++) {
        dataArray.push(data[i])
      }
      for (let i = cap - 1; i >= 0; i--) {
        dataArray.push(data[i])
      }

      // Convert frequency data to path radius
      // Higher frequencies = wider tube at that point
      for (let i = 0; i < dataArray.length; i++) {
        if (i && dataArray.length - i > 1) {
          const val = dataArray[i] / 255 // Normalize to 0-1
          uniform[i] = Math.max(10, val * val * val * 150) // Cubic for dramatic effect, min 10 for base width
        } else {
          uniform[i] = 128 // End caps stay constant
        }
      }

      // Update path curvature based on overall audio volume
      // Louder music = smoother, rounder curves
      const a0 = analyserRef.current.getAverageFloat()
      const r = 100 * a0 * a0 * a0 + 1
      ;(particleSystemRef.current.material as PhongAnimationMaterial).uniforms["uRoundness"].value.set(r, r)

      // Update light intensity based on audio volume
      // Creates pulsing effect synchronized with music
      const a1 = analyserRef.current.getAverageFloat() * 15
      if (lightsRef.current) {
        lightsRef.current.light.intensity = Math.max(0.5, a1 * a1)
        lightsRef.current.light2.intensity = Math.max(0.5, a1 * a1 * a1 * 1)
        lightsRef.current.light3.intensity = Math.max(0.5, a1 * a1 * a1 * a1 * 1)
      }

      // Update animation time from audio playback position
      ;(particleSystemRef.current.material as PhongAnimationMaterial).uniforms["uTime"].value = audioElementRef.current.currentTime || 0

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }

      animationFrameRef.current = requestAnimationFrame(tick)
    }

    // Resize handler
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return

      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }

    // Throttled scroll handler for parallax effect
    // Only updates camera target every 50ms to reduce performance impact
    const handleScroll = () => {
      const now = Date.now()
      const throttleDelay = 50 // milliseconds

      // Throttle: only update if enough time has passed
      if (now - lastScrollTimeRef.current < throttleDelay) {
        return
      }
      lastScrollTimeRef.current = now

      const parallaxFactorY = 0.05 // Vertical movement sensitivity
      const parallaxFactorZ = 0.5 // Zoom in/out sensitivity
      const scrollY = window.scrollY

      // Move camera up and zoom in as user scrolls down
      targetCameraYRef.current = INITIAL_CAMERA_Y + scrollY * parallaxFactorY
      targetCameraZRef.current = INITIAL_CAMERA_Z - scrollY * parallaxFactorZ

      // Start audio on scroll interaction
      startAudio()
    }

    // Mouse move handler for interactive camera rotation
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      mouseXRef.current = (event.clientX / window.innerWidth) * 2 - 1
      mouseYRef.current = -(event.clientY / window.innerHeight) * 2 + 1
    }

    // Audio context resume on user interaction
    audioElement.addEventListener("canplay", () => {
      if (analyserRef.current?.context) {
        analyserRef.current.context.resume()
      }
      if (cameraRef.current) {
        cameraRef.current.position.set(0, INITIAL_CAMERA_Y, INITIAL_CAMERA_Z)
      }
    })

    // Event listeners
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("click", startAudio)
    window.addEventListener("touchstart", startAudio)
    window.addEventListener("keydown", startAudio)

    // Start animation
    tick()

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", startAudio)
      window.removeEventListener("touchstart", startAudio)
      window.removeEventListener("keydown", startAudio)

      if (audioElementRef.current) {
        audioElementRef.current.pause()
        audioElementRef.current.remove()
      }

      if (analyserRef.current?.context) {
        analyserRef.current.context.close()
      }

      if (rendererRef.current) {
        rendererRef.current.dispose()
        containerRef.current?.removeChild(rendererRef.current.domElement)
      }

      if (particleSystemRef.current) {
        particleSystemRef.current.geometry.dispose()
        ;(particleSystemRef.current.material as THREE.Material).dispose()
      }
    }
  }, [startAudio])

  return (
    <div className="w-full h-full" style={{ backgroundColor: "#13091B" }}>
      <div ref={containerRef} className="w-full h-full" />
      {/* Dark tint overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </div>
  )
}
