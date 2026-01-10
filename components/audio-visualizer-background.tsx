"use client"

import { useEffect, useRef } from "react"
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function AudioVisualizerBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const sceneRef = useRef<any>(null)

  useEffect(() => {
    initThreeJS()

    return () => {
      if (sceneRef.current?.cleanup) {
        sceneRef.current.cleanup()
      }
      cleanup()
    }
  }, [])

  const cleanup = () => {
    if (sceneRef.current) {
      const { renderer, controls, animationId } = sceneRef.current
      if (animationId) cancelAnimationFrame(animationId)
      if (controls) controls.dispose()
      if (renderer) {
        renderer.dispose()
        renderer.domElement.remove()
      }
      sceneRef.current = null
    }
  }

  const initThreeJS = () => {
    if (!containerRef.current || !audioRef.current || sceneRef.current) {
      return
    }
    const mShadowColor = 0x13091b
    const mUseAA = true
    const mParticleCount = 250000
    const mPathLength = 32
    const initialCameraZ = 800
    const initialCameraY = 0
    let targetCameraY = 0
    let targetCameraZ = 800
    const maxVolume = 0.05

    // Audio setup
    const mAudioElement = audioRef.current
    mAudioElement.crossOrigin = "anonymous"
    mAudioElement.src = 'https://raw.githubusercontent.com/zadvorsky/three.bas/master/examples/_audio/song.mp3'
    mAudioElement.volume = maxVolume

    const mAnalyser = new SpectrumAnalyzer(mPathLength * 0.5, 0.80)
    mAnalyser.setSource(mAudioElement)

    let audioStarted = false
    let audioIsPlaying = false

    mAudioElement.addEventListener('playing', () => {
      audioIsPlaying = true
    })

    const startAudio = () => {
      if (audioStarted || !audioIsPlaying) return
      audioStarted = true
      mAudioElement.muted = false
      mAudioElement.volume = maxVolume
    }

    // THREE.js setup
    const mRenderer = new THREE.WebGLRenderer({ antialias: mUseAA })
    mRenderer.setSize(window.innerWidth, window.innerHeight)
    mRenderer.setClearColor(mShadowColor)
    mRenderer.domElement.style.display = 'block'
    mRenderer.domElement.style.width = '100%'
    mRenderer.domElement.style.height = '100%'
    containerRef.current.appendChild(mRenderer.domElement)

    const mCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 5000)
    mCamera.position.set(0, initialCameraY, initialCameraZ)

    const mScene = new THREE.Scene()

    const mLight = new THREE.PointLight(0xffffff, 1, 1200, 2)
    mLight.position.set(0, 0, 0)
    mScene.add(mLight)

    const mLight2 = new THREE.DirectionalLight(0xFF311F, 0.25)
    mLight2.position.set(0, 1, 1)
    mScene.add(mLight2)

    const mLight3 = new THREE.DirectionalLight(0x007A99, 0.25)
    mLight3.position.set(0, 1, -1)
    mScene.add(mLight3)

    const mControls = new OrbitControls(mCamera, mRenderer.domElement)
    mControls.autoRotate = true
    mControls.enableZoom = false
    mControls.enablePan = false
    mControls.minDistance = 10
    mControls.maxDistance = 1200
    mControls.minPolarAngle = Math.PI * 0.4
    mControls.maxPolarAngle = Math.PI * 0.6

    // Initialize THREE.BAS if not already done
    if (!(THREE as any).BAS) {
      initTHREEBAS()
    }

    // Particle system
    const mParticleSystem = initParticleSystem(mParticleCount, mPathLength, mShadowColor)
    mScene.add(mParticleSystem)

    // Event listeners
    const handleResize = () => {
      mCamera.aspect = window.innerWidth / window.innerHeight
      mCamera.updateProjectionMatrix()
      mRenderer.setSize(window.innerWidth, window.innerHeight)
    }

    const handleScroll = () => {
      const parallaxFactorY = 0.05
      const parallaxFactorZ = 0.5
      const scrollY = window.scrollY
      targetCameraY = initialCameraY + (scrollY * parallaxFactorY)
      targetCameraZ = initialCameraZ - (scrollY * parallaxFactorZ)
      startAudio()
    }

    const handleInteraction = () => startAudio()

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('click', handleInteraction)
    window.addEventListener('mousemove', handleInteraction)
    window.addEventListener('touchstart', handleInteraction)
    window.addEventListener('keydown', handleInteraction)

    mAudioElement.addEventListener('canplay', () => {
      mAnalyser.context.resume()
      mCamera.position.set(0, initialCameraY, initialCameraZ)
    })

    // Animation loop
    const tick = () => {
      mControls.update()
      mCamera.position.y = targetCameraY
      mCamera.position.z = targetCameraZ

      mAnalyser.updateSample()

      const uniform = mParticleSystem.material.uniforms['uRadius'].value
      const data = mAnalyser.frequencyByteData
      const dataArray: number[] = []
      const cap = data.length * 0.5

      for (let i = 0; i < cap; i++) dataArray.push(data[i])
      for (let i = cap - 1; i >= 0; i--) dataArray.push(data[i])
      for (let i = 0; i < cap; i++) dataArray.push(data[i])
      for (let i = cap - 1; i >= 0; i--) dataArray.push(data[i])

      for (let i = 0; i < dataArray.length; i++) {
        if (i && dataArray.length - i > 1) {
          const val = dataArray[i] / 255
          uniform[i] = Math.max(1, val * val * val * 50)
        } else {
          uniform[i] = 128
        }
      }

      const a0 = mAnalyser.getAverageFloat()
      const r = 100 * a0 * a0 * a0 + 1
      mParticleSystem.material.uniforms['uRoundness'].value.set(r, r)

      const a1 = mAnalyser.getAverageFloat() * 8
      mLight.intensity = a1 * a1
      mLight2.intensity = a1 * a1 * a1 * a1 * 0.5
      mLight3.intensity = a1 * a1 * a1 * a1 * 0.5

      mParticleSystem.material.uniforms['uTime'].value = mAudioElement.currentTime || 0

      mRenderer.render(mScene, mCamera)
      const animationId = requestAnimationFrame(tick)
      sceneRef.current.animationId = animationId
    }

    tick()

    sceneRef.current = {
      renderer: mRenderer,
      controls: mControls,
      animationId: null,
      cleanup: () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('click', handleInteraction)
        window.removeEventListener('mousemove', handleInteraction)
        window.removeEventListener('touchstart', handleInteraction)
        window.removeEventListener('keydown', handleInteraction)
      }
    }

  }

  return (
      <div className="w-full h-full relative">
        <audio ref={audioRef} autoPlay loop muted style={{ display: 'none' }} />
        <div
          ref={containerRef}
          className="absolute left-0 top-0 w-full h-full"
          style={{
            background: '#13091B',
            overflow: 'hidden'
          }}
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>
  )
}

function initParticleSystem(mParticleCount: number, mPathLength: number, mShadowColor: number) {
  // Create a simple plane geometry in the old format (with vertices and faces)
  const prefabGeometry = createLegacyPlaneGeometry(4, 4)
  const bufferGeometry = new (THREE.BAS as any).PrefabBufferGeometry(prefabGeometry, mParticleCount)

  const aDelayDuration = bufferGeometry.createAttribute('aDelayDuration', 2)
  const aPivot = bufferGeometry.createAttribute('aPivot', 3)
  const aAxisAngle = bufferGeometry.createAttribute('aAxisAngle', 4)
  const aColor = bufferGeometry.createAttribute('color', 3)

  let i: number, j: number, offset: number

  const prefabDelay = 0.00015
  const vertexDelay = 0.0175
  const minDuration = 32.0
  const maxDuration = 56.5

  for (i = 0, offset = 0; i < mParticleCount; i++) {
    const delay = i * prefabDelay
    const duration = THREE.MathUtils.randFloat(minDuration, maxDuration)
    for (j = 0; j < prefabGeometry.vertices.length; j++) {
      aDelayDuration.array[offset++] = delay + j * vertexDelay
      aDelayDuration.array[offset++] = duration
    }
  }

  const pivot = new THREE.Vector3()
  for (i = 0, offset = 0; i < mParticleCount; i++) {
    pivot.x = THREE.MathUtils.randFloat(0, 2)
    pivot.y = THREE.MathUtils.randFloat(0, 2)
    pivot.z = THREE.MathUtils.randFloat(0, 2)
    for (j = 0; j < prefabGeometry.vertices.length; j++) {
      aPivot.array[offset++] = pivot.x
      aPivot.array[offset++] = pivot.y
      aPivot.array[offset++] = pivot.z
    }
  }

  const axis = new THREE.Vector3()
  let angle = 0
  for (i = 0, offset = 0; i < mParticleCount; i++) {
    axis.x = THREE.MathUtils.randFloatSpread(2)
    axis.y = THREE.MathUtils.randFloatSpread(2)
    axis.z = THREE.MathUtils.randFloatSpread(2)
    axis.normalize()
    angle = Math.PI * THREE.Math.randInt(48, 64)
    for (j = 0; j < prefabGeometry.vertices.length; j++) {
      aAxisAngle.array[offset++] = axis.x
      aAxisAngle.array[offset++] = axis.y
      aAxisAngle.array[offset++] = axis.z
      aAxisAngle.array[offset++] = angle
    }
  }

  const color = new THREE.Color()
  for (i = 0, offset = 0; i < mParticleCount; i++) {
    const h = THREE.MathUtils.randFloat(0.5, 1.00)
    const s = THREE.MathUtils.randFloat(0.5, 0.75)
    const l = THREE.MathUtils.randFloat(0.25, 0.5)
    color.setHSL(h, s, l)
    for (j = 0; j < prefabGeometry.vertices.length; j++) {
      aColor.array[offset++] = color.r
      aColor.array[offset++] = color.g
      aColor.array[offset++] = color.b
    }
  }

  const pathArray: number[] = []
  const radiusArray: number[] = []
  for (i = 0; i < mPathLength; i++) {
    let x, y, z
    if (!i) {
      x = 0; y = -1400; z = 0
    } else if (!(i - mPathLength + 1)) {
      x = 0; y = 1200; z = 0
    } else {
      x = THREE.MathUtils.randFloatSpread(600)
      y = (-400 + (800 / mPathLength) * i) + THREE.MathUtils.randFloatSpread(200)
      z = THREE.MathUtils.randFloatSpread(600)
    }
    pathArray.push(x, y, z)
    radiusArray.push(0)
  }

  const material = new (THREE.BAS as any).PhongAnimationMaterial(
    {
      vertexColors: THREE.VertexColors,
      shading: THREE.FlatShading,
      side: THREE.DoubleSide,
      defines: { PATH_LENGTH: pathArray.length / 3 },
      uniforms: {
        uTime: { type: 'f', value: 0 },
        uPath: { type: 'fv', value: pathArray },
        uRadius: { type: 'fv1', value: radiusArray },
        uRoundness: { type: 'v2', value: new THREE.Vector2(2, 2) }
      },
      shaderFunctions: [
        (THREE.BAS as any).ShaderChunk['quaternion_rotation'],
        (THREE.BAS as any).ShaderChunk['catmull-rom'],
        (THREE.BAS as any).ShaderChunk['ease_in_out_cubic']
      ],
      shaderParameters: [
        'uniform float uTime;',
        'uniform vec3 uPath[PATH_LENGTH];',
        'uniform float uRadius[PATH_LENGTH];',
        'uniform vec2 uRoundness;',
        'attribute vec2 aDelayDuration;',
        'attribute vec3 aPivot;',
        'attribute vec4 aAxisAngle;'
      ],
      shaderVertexInit: [
        'float tDelay = aDelayDuration.x;',
        'float tDuration = aDelayDuration.y;',
        'float tTime = clamp(uTime - tDelay, 0.0, tDuration);',
        'float tProgress = tTime / tDuration;',
        'float angle = aAxisAngle.w * tProgress;',
        'vec4 tQuat = quatFromAxisAngle(aAxisAngle.xyz, angle);'
      ],
      shaderTransformNormal: ['objectNormal = rotateVector(tQuat, objectNormal);'],
      shaderTransformPosition: [
        'float tMax = float(PATH_LENGTH - 1);',
        'float tPoint = tMax * tProgress;',
        'float tIndex = floor(tPoint);',
        'float tWeight = tPoint - tIndex;',
        'int i0 = int(max(0.0, tIndex - 1.0));',
        'int i1 = int(tIndex);',
        'int i2 = int(min(tIndex + 1.0, tMax));',
        'int i3 = int(min(tIndex + 2.0, tMax));',
        'vec3 p0 = uPath[i0];',
        'vec3 p1 = uPath[i1];',
        'vec3 p2 = uPath[i2];',
        'vec3 p3 = uPath[i3];',
        'float radius = catmullRom(uRadius[i0], uRadius[i1], uRadius[i2], uRadius[i3], tWeight);',
        'transformed += aPivot * radius;',
        'transformed = rotateVector(tQuat, transformed);',
        'transformed += catmullRom(p0, p1, p2, p3, uRoundness, tWeight);'
      ]
    },
    { shininess: 16, specular: 0xffd700, emissive: mShadowColor }
  )

  return new THREE.Mesh(bufferGeometry, material)
}

class SpectrumAnalyzer {
  context: AudioContext
  analyzerNode: AnalyserNode
  source: MediaElementAudioSourceNode | null = null
  binCount: number = 0
  frequencyByteData: Uint8Array = new Uint8Array()
  timeByteData: Uint8Array = new Uint8Array()

  constructor(binCount: number, smoothingTimeConstant: number) {
    const Context = window.AudioContext || (window as any).webkitAudioContext
    this.context = new Context()
    this.analyzerNode = this.context.createAnalyser()
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

// Create a plane geometry in the old THREE.js format (with vertices and faces)
function createLegacyPlaneGeometry(width: number, height: number) {
  const widthHalf = width / 2
  const heightHalf = height / 2

  return {
    vertices: [
      new THREE.Vector3(-widthHalf, -heightHalf, 0),
      new THREE.Vector3(widthHalf, -heightHalf, 0),
      new THREE.Vector3(-widthHalf, heightHalf, 0),
      new THREE.Vector3(widthHalf, heightHalf, 0)
    ],
    faces: [
      { a: 0, b: 1, c: 2 },
      { a: 1, b: 3, c: 2 }
    ]
  }
}

// Initialize THREE.BAS library
function initTHREEBAS() {
  (THREE as any).BAS = {};
  (THREE as any).BAS.ShaderChunk = {};

  (THREE as any).BAS.ShaderChunk["catmull-rom"] = "vec3 catmullRom(vec3 p0, vec3 p1, vec3 p2, vec3 p3, float t)\n{\n    vec3 v0 = (p2 - p0) * 0.5;\n    vec3 v1 = (p3 - p1) * 0.5;\n    float t2 = t * t;\n    float t3 = t * t * t;\n\n    return vec3((2.0 * p1 - 2.0 * p2 + v0 + v1) * t3 + (-3.0 * p1 + 3.0 * p2 - 2.0 * v0 - v1) * t2 + v0 * t + p1);\n}\n\nvec3 catmullRom(vec3 p0, vec3 p1, vec3 p2, vec3 p3, vec2 c, float t)\n{\n    vec3 v0 = (p2 - p0) * c.x;\n    vec3 v1 = (p3 - p1) * c.y;\n    float t2 = t * t;\n    float t3 = t * t * t;\n\n    return vec3((2.0 * p1 - 2.0 * p2 + v0 + v1) * t3 + (-3.0 * p1 + 3.0 * p2 - 2.0 * v0 - v1) * t2 + v0 * t + p1);\n}\n\nfloat catmullRom(float p0, float p1, float p2, float p3, float t)\n{\n    float v0 = (p2 - p0) * 0.5;\n    float v1 = (p3 - p1) * 0.5;\n    float t2 = t * t;\n    float t3 = t * t * t;\n\n    return float((2.0 * p1 - 2.0 * p2 + v0 + v1) * t3 + (-3.0 * p1 + 3.0 * p2 - 2.0 * v0 - v1) * t2 + v0 * t + p1);\n}\n\nfloat catmullRom(float p0, float p1, float p2, float p3, vec2 c, float t)\n{\n    float v0 = (p2 - p0) * c.x;\n    float v1 = (p3 - p1) * c.y;\n    float t2 = t * t;\n    float t3 = t * t * t;\n\n    return float((2.0 * p1 - 2.0 * p2 + v0 + v1) * t3 + (-3.0 * p1 + 3.0 * p2 - 2.0 * v0 - v1) * t2 + v0 * t + p1);\n}\n";

  (THREE as any).BAS.ShaderChunk["ease_in_out_cubic"] = "float ease(float t, float b, float c, float d) {\n  if ((t/=d/2.0) < 1.0) return c/2.0*t*t*t + b;\n  return c/2.0*((t-=2.0)*t*t + 2.0) + b;\n}\n";

  (THREE as any).BAS.ShaderChunk["quaternion_rotation"] = "vec3 rotateVector(vec4 q, vec3 v)\n{\n    return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);\n}\n\nvec4 quatFromAxisAngle(vec3 axis, float angle)\n{\n    float halfAngle = angle * 0.5;\n    return vec4(axis.xyz * sin(halfAngle), cos(halfAngle));\n}\n";

  // PrefabBufferGeometry class
  class PrefabBufferGeometry extends THREE.BufferGeometry {
    prefabGeometry: any;
    prefabCount: number;
    prefabVertexCount: number;

    constructor(prefab: any, count: number) {
      super();
      this.prefabGeometry = prefab;
      this.prefabCount = count;
      this.prefabVertexCount = prefab.vertices.length;
      this.bufferDefaults();
    }

    bufferDefaults() {
      const prefabFaceCount = this.prefabGeometry.faces.length;
      const prefabIndexCount = this.prefabGeometry.faces.length * 3;
      const prefabVertexCount = this.prefabVertexCount = this.prefabGeometry.vertices.length;
      const prefabIndices: number[] = [];

      for (let h = 0; h < prefabFaceCount; h++) {
        const face = this.prefabGeometry.faces[h];
        prefabIndices.push(face.a, face.b, face.c);
      }

      const indexBuffer = new Uint32Array(this.prefabCount * prefabIndexCount);
      const positionBuffer = new Float32Array(this.prefabCount * prefabVertexCount * 3);

      this.setIndex(new THREE.BufferAttribute(indexBuffer, 1));
      this.setAttribute('position', new THREE.BufferAttribute(positionBuffer, 3));

      for (let i = 0, offset = 0; i < this.prefabCount; i++) {
        for (let j = 0; j < prefabVertexCount; j++, offset += 3) {
          const prefabVertex = this.prefabGeometry.vertices[j];
          positionBuffer[offset] = prefabVertex.x;
          positionBuffer[offset + 1] = prefabVertex.y;
          positionBuffer[offset + 2] = prefabVertex.z;
        }
        for (let k = 0; k < prefabIndexCount; k++) {
          indexBuffer[i * prefabIndexCount + k] = prefabIndices[k] + i * prefabVertexCount;
        }
      }
    }

    createAttribute(name: string, itemSize: number) {
      const buffer = new Float32Array(this.prefabCount * this.prefabVertexCount * itemSize);
      const attribute = new THREE.BufferAttribute(buffer, itemSize);
      this.setAttribute(name, attribute);
      return attribute;
    }
  }

  (THREE as any).BAS.PrefabBufferGeometry = PrefabBufferGeometry;

  // BaseAnimationMaterial class
  class BaseAnimationMaterial extends THREE.ShaderMaterial {
    shaderFunctions: string[];
    shaderParameters: string[];
    shaderVertexInit: string[];
    shaderTransformNormal: string[];
    shaderTransformPosition: string[];

    constructor(parameters: any) {
      super();
      this.shaderFunctions = [];
      this.shaderParameters = [];
      this.shaderVertexInit = [];
      this.shaderTransformNormal = [];
      this.shaderTransformPosition = [];
      this.setValues(parameters);
    }

    _concatVertexShader() { return ''; }
    _concatFunctions() { return this.shaderFunctions.join('\n'); }
    _concatParameters() { return this.shaderParameters.join('\n'); }
    _concatVertexInit() { return this.shaderVertexInit.join('\n'); }
    _concatTransformNormal() { return this.shaderTransformNormal.join('\n'); }
    _concatTransformPosition() { return this.shaderTransformPosition.join('\n'); }

    setUniformValues(values: any) {
      for (const key in values) {
        if (key in this.uniforms) {
          const uniform = this.uniforms[key];
          const value = values[key];
          switch (uniform.type) {
            case 'c': uniform.value.set(value); break;
            case 'v2': case 'v3': case 'v4': uniform.value.copy(value); break;
            case 'f': case 't': default: uniform.value = value;
          }
        }
      }
    }
  }

  (THREE as any).BAS.BaseAnimationMaterial = BaseAnimationMaterial;

  // PhongAnimationMaterial class
  class PhongAnimationMaterial extends BaseAnimationMaterial {
    constructor(parameters: any, uniformValues: any) {
      super(parameters);
      const phongShader = (THREE as any).ShaderLib['phong'];
      this.uniforms = THREE.UniformsUtils.merge([phongShader.uniforms, this.uniforms]);
      this.lights = true;
      this.vertexShader = this._concatVertexShader();
      this.fragmentShader = phongShader.fragmentShader;
      uniformValues.map && (this.defines['USE_MAP'] = '');
      uniformValues.normalMap && (this.defines['USE_NORMALMAP'] = '');
      this.setUniformValues(uniformValues);
    }

    _concatVertexShader() {
      return [
        "#define PHONG",
        "varying vec3 vViewPosition;",
        "#ifndef FLAT_SHADED",
        "	varying vec3 vNormal;",
        "#endif",
        (THREE as any).ShaderChunk["common"],
        (THREE as any).ShaderChunk["uv_pars_vertex"],
        (THREE as any).ShaderChunk["uv2_pars_vertex"],
        (THREE as any).ShaderChunk["displacementmap_pars_vertex"],
        (THREE as any).ShaderChunk["envmap_pars_vertex"],
        (THREE as any).ShaderChunk["lights_phong_pars_vertex"],
        (THREE as any).ShaderChunk["color_pars_vertex"],
        (THREE as any).ShaderChunk["morphtarget_pars_vertex"],
        (THREE as any).ShaderChunk["skinning_pars_vertex"],
        (THREE as any).ShaderChunk["shadowmap_pars_vertex"],
        (THREE as any).ShaderChunk["logdepthbuf_pars_vertex"],
        this._concatFunctions(),
        this._concatParameters(),
        "void main() {",
        this._concatVertexInit(),
        (THREE as any).ShaderChunk["uv_vertex"],
        (THREE as any).ShaderChunk["uv2_vertex"],
        (THREE as any).ShaderChunk["color_vertex"],
        (THREE as any).ShaderChunk["beginnormal_vertex"],
        this._concatTransformNormal(),
        (THREE as any).ShaderChunk["morphnormal_vertex"],
        (THREE as any).ShaderChunk["skinbase_vertex"],
        (THREE as any).ShaderChunk["skinnormal_vertex"],
        (THREE as any).ShaderChunk["defaultnormal_vertex"],
        "#ifndef FLAT_SHADED",
        "	vNormal = normalize( transformedNormal );",
        "#endif",
        (THREE as any).ShaderChunk["begin_vertex"],
        this._concatTransformPosition(),
        (THREE as any).ShaderChunk["displacementmap_vertex"],
        (THREE as any).ShaderChunk["morphtarget_vertex"],
        (THREE as any).ShaderChunk["skinning_vertex"],
        (THREE as any).ShaderChunk["project_vertex"],
        (THREE as any).ShaderChunk["logdepthbuf_pars_vertex"],
        "	vViewPosition = - mvPosition.xyz;",
        (THREE as any).ShaderChunk["worldpos_vertex"],
        (THREE as any).ShaderChunk["envmap_vertex"],
        (THREE as any).ShaderChunk["lights_phong_vertex"],
        (THREE as any).ShaderChunk["shadowmap_vertex"],
        "}"
      ].join("\n");
    }
  }

  (THREE as any).BAS.PhongAnimationMaterial = PhongAnimationMaterial;
}

const THREE_BAS_CODE_UNUSED = `
THREE.BAS = {};
THREE.BAS.ShaderChunk = {};

THREE.BAS.ShaderChunk["catmull-rom"] = "vec3 catmullRom(vec3 p0, vec3 p1, vec3 p2, vec3 p3, float t)\\n{\\n    vec3 v0 = (p2 - p0) * 0.5;\\n    vec3 v1 = (p3 - p1) * 0.5;\\n    float t2 = t * t;\\n    float t3 = t * t * t;\\n\\n    return vec3((2.0 * p1 - 2.0 * p2 + v0 + v1) * t3 + (-3.0 * p1 + 3.0 * p2 - 2.0 * v0 - v1) * t2 + v0 * t + p1);\\n}\\n\\nvec3 catmullRom(vec3 p0, vec3 p1, vec3 p2, vec3 p3, vec2 c, float t)\\n{\\n    vec3 v0 = (p2 - p0) * c.x;\\n    vec3 v1 = (p3 - p1) * c.y;\\n    float t2 = t * t;\\n    float t3 = t * t * t;\\n\\n    return vec3((2.0 * p1 - 2.0 * p2 + v0 + v1) * t3 + (-3.0 * p1 + 3.0 * p2 - 2.0 * v0 - v1) * t2 + v0 * t + p1);\\n}\\n\\nfloat catmullRom(float p0, float p1, float p2, float p3, float t)\\n{\\n    float v0 = (p2 - p0) * 0.5;\\n    float v1 = (p3 - p1) * 0.5;\\n    float t2 = t * t;\\n    float t3 = t * t * t;\\n\\n    return float((2.0 * p1 - 2.0 * p2 + v0 + v1) * t3 + (-3.0 * p1 + 3.0 * p2 - 2.0 * v0 - v1) * t2 + v0 * t + p1);\\n}\\n\\nfloat catmullRom(float p0, float p1, float p2, float p3, vec2 c, float t)\\n{\\n    float v0 = (p2 - p0) * c.x;\\n    float v1 = (p3 - p1) * c.y;\\n    float t2 = t * t;\\n    float t3 = t * t * t;\\n\\n    return float((2.0 * p1 - 2.0 * p2 + v0 + v1) * t3 + (-3.0 * p1 + 3.0 * p2 - 2.0 * v0 - v1) * t2 + v0 * t + p1);\\n}\\n";

THREE.BAS.ShaderChunk["ease_in_out_cubic"] = "float ease(float t, float b, float c, float d) {\\n  if ((t/=d/2.0) < 1.0) return c/2.0*t*t*t + b;\\n  return c/2.0*((t-=2.0)*t*t + 2.0) + b;\\n}\\n";

THREE.BAS.ShaderChunk["quaternion_rotation"] = "vec3 rotateVector(vec4 q, vec3 v)\\n{\\n    return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);\\n}\\n\\nvec4 quatFromAxisAngle(vec3 axis, float angle)\\n{\\n    float halfAngle = angle * 0.5;\\n    return vec4(axis.xyz * sin(halfAngle), cos(halfAngle));\\n}\\n";

THREE.BAS.PrefabBufferGeometry = function (prefab, count) {
  THREE.BufferGeometry.call(this);
  this.prefabGeometry = prefab;
  this.prefabCount = count;
  this.prefabVertexCount = prefab.vertices.length;
  this.bufferDefaults();
};
THREE.BAS.PrefabBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
THREE.BAS.PrefabBufferGeometry.prototype.constructor = THREE.BAS.PrefabBufferGeometry;

THREE.BAS.PrefabBufferGeometry.prototype.bufferDefaults = function () {
  var prefabFaceCount = this.prefabGeometry.faces.length;
  var prefabIndexCount = this.prefabGeometry.faces.length * 3;
  var prefabVertexCount = this.prefabVertexCount = this.prefabGeometry.vertices.length;
  var prefabIndices = [];

  for (var h = 0; h < prefabFaceCount; h++) {
    var face = this.prefabGeometry.faces[h];
    prefabIndices.push(face.a, face.b, face.c);
  }

  var indexBuffer = new Uint32Array(this.prefabCount * prefabIndexCount);
  var positionBuffer = new Float32Array(this.prefabCount * prefabVertexCount * 3);

  this.setIndex(new THREE.BufferAttribute(indexBuffer, 1));
  this.addAttribute('position', new THREE.BufferAttribute(positionBuffer, 3));

  for (var i = 0, offset = 0; i < this.prefabCount; i++) {
    for (var j = 0; j < prefabVertexCount; j++, offset += 3) {
      var prefabVertex = this.prefabGeometry.vertices[j];
      positionBuffer[offset] = prefabVertex.x;
      positionBuffer[offset + 1] = prefabVertex.y;
      positionBuffer[offset + 2] = prefabVertex.z;
    }
    for (var k = 0; k < prefabIndexCount; k++) {
      indexBuffer[i * prefabIndexCount + k] = prefabIndices[k] + i * prefabVertexCount;
    }
  }
};

THREE.BAS.PrefabBufferGeometry.prototype.createAttribute = function (name, itemSize) {
  var buffer = new Float32Array(this.prefabCount * this.prefabVertexCount * itemSize);
  var attribute = new THREE.BufferAttribute(buffer, itemSize);
  this.addAttribute(name, attribute);
  return attribute;
};

THREE.BAS.BaseAnimationMaterial = function (parameters) {
  THREE.ShaderMaterial.call(this);
  this.shaderFunctions = [];
  this.shaderParameters = [];
  this.shaderVertexInit = [];
  this.shaderTransformNormal = [];
  this.shaderTransformPosition = [];
  this.setValues(parameters);
};
THREE.BAS.BaseAnimationMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);
THREE.BAS.BaseAnimationMaterial.prototype.constructor = THREE.BAS.BaseAnimationMaterial;

THREE.BAS.BaseAnimationMaterial.prototype._concatVertexShader = function () { return ''; };
THREE.BAS.BaseAnimationMaterial.prototype._concatFunctions = function () { return this.shaderFunctions.join('\\n'); };
THREE.BAS.BaseAnimationMaterial.prototype._concatParameters = function () { return this.shaderParameters.join('\\n'); };
THREE.BAS.BaseAnimationMaterial.prototype._concatVertexInit = function () { return this.shaderVertexInit.join('\\n'); };
THREE.BAS.BaseAnimationMaterial.prototype._concatTransformNormal = function () { return this.shaderTransformNormal.join('\\n'); };
THREE.BAS.BaseAnimationMaterial.prototype._concatTransformPosition = function () { return this.shaderTransformPosition.join('\\n'); };

THREE.BAS.BaseAnimationMaterial.prototype.setUniformValues = function (values) {
  for (var key in values) {
    if (key in this.uniforms) {
      var uniform = this.uniforms[key];
      var value = values[key];
      switch (uniform.type) {
        case 'c': uniform.value.set(value); break;
        case 'v2': case 'v3': case 'v4': uniform.value.copy(value); break;
        case 'f': case 't': default: uniform.value = value;
      }
    }
  }
};

THREE.BAS.PhongAnimationMaterial = function(parameters, uniformValues) {
  THREE.BAS.BaseAnimationMaterial.call(this, parameters);
  var phongShader = THREE.ShaderLib['phong'];
  this.uniforms = THREE.UniformsUtils.merge([phongShader.uniforms, this.uniforms]);
  this.lights = true;
  this.vertexShader = this._concatVertexShader();
  this.fragmentShader = phongShader.fragmentShader;
  uniformValues.map && (this.defines['USE_MAP'] = '');
  uniformValues.normalMap && (this.defines['USE_NORMALMAP'] = '');
  this.setUniformValues(uniformValues);
};
THREE.BAS.PhongAnimationMaterial.prototype = Object.create(THREE.BAS.BaseAnimationMaterial.prototype);
THREE.BAS.PhongAnimationMaterial.prototype.constructor = THREE.BAS.PhongAnimationMaterial;

THREE.BAS.PhongAnimationMaterial.prototype._concatVertexShader = function() {
  return [
    "#define PHONG",
    "varying vec3 vViewPosition;",
    "#ifndef FLAT_SHADED",
    "	varying vec3 vNormal;",
    "#endif",
    THREE.ShaderChunk["common"],
    THREE.ShaderChunk["uv_pars_vertex"],
    THREE.ShaderChunk["uv2_pars_vertex"],
    THREE.ShaderChunk["displacementmap_pars_vertex"],
    THREE.ShaderChunk["envmap_pars_vertex"],
    THREE.ShaderChunk["lights_phong_pars_vertex"],
    THREE.ShaderChunk["color_pars_vertex"],
    THREE.ShaderChunk["morphtarget_pars_vertex"],
    THREE.ShaderChunk["skinning_pars_vertex"],
    THREE.ShaderChunk["shadowmap_pars_vertex"],
    THREE.ShaderChunk["logdepthbuf_pars_vertex"],
    this._concatFunctions(),
    this._concatParameters(),
    "void main() {",
    this._concatVertexInit(),
    THREE.ShaderChunk["uv_vertex"],
    THREE.ShaderChunk["uv2_vertex"],
    THREE.ShaderChunk["color_vertex"],
    THREE.ShaderChunk["beginnormal_vertex"],
    this._concatTransformNormal(),
    THREE.ShaderChunk["morphnormal_vertex"],
    THREE.ShaderChunk["skinbase_vertex"],
    THREE.ShaderChunk["skinnormal_vertex"],
    THREE.ShaderChunk["defaultnormal_vertex"],
    "#ifndef FLAT_SHADED",
    "	vNormal = normalize( transformedNormal );",
    "#endif",
    THREE.ShaderChunk["begin_vertex"],
    this._concatTransformPosition(),
    THREE.ShaderChunk["displacementmap_vertex"],
    THREE.ShaderChunk["morphtarget_vertex"],
    THREE.ShaderChunk["skinning_vertex"],
    THREE.ShaderChunk["project_vertex"],
    THREE.ShaderChunk["logdepthbuf_vertex"],
    "	vViewPosition = - mvPosition.xyz;",
    THREE.ShaderChunk["worldpos_vertex"],
    THREE.ShaderChunk["envmap_vertex"],
    THREE.ShaderChunk["lights_phong_vertex"],
    THREE.ShaderChunk["shadowmap_vertex"],
    "}"
  ].join("\\n");
};
  `
