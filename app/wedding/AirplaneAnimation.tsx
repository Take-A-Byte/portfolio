"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { Scene } from 'three'

// ========================================
// ANIMATION CONTROL
// ========================================
// Configure when each animation section starts and the plane's z-index
// scrollPercent: Controls when the section animation starts (0-100)
// zIndex: 0 = plane behind content, 50 = plane in front of content
//
// IMPORTANT: Changing scrollPercent values will update when each animation plays
const animationKeyframes = [
  { section: 0, scrollPercent: 0, zIndex: 0, opacity: 1, surfaceVisible: true },      // Initial movement
  { section: 1, scrollPercent: 9, zIndex: 0, opacity: 1, surfaceVisible: true },      // First turn
  { section: 2, scrollPercent: 18, zIndex: 0, opacity: 1, surfaceVisible: true},     // Second turn
  { section: 3, scrollPercent: 27, zIndex: 0, opacity: 1, surfaceVisible: true },     // Third turn
  { section: 4, scrollPercent: 36, zIndex: 0, opacity: 1, surfaceVisible: true },     // Center position
  { section: 5, scrollPercent: 45, zIndex: 0, opacity: 1, surfaceVisible: true },     // Rotation sequence
  { section: 6, scrollPercent: 55, zIndex: 0, opacity: 0.8, surfaceVisible: true },     // Rotation sequence continued
  { section: 7, scrollPercent: 62, zIndex: 0, opacity: 0.2, surfaceVisible: false },     // Moving forward
  { section: 8, scrollPercent: 84, zIndex: 50, opacity: 0.8, surfaceVisible: true },     // Further forward
  { section: 9, scrollPercent: 93, zIndex: 50, opacity: 1, surfaceVisible: true },    // Flying back
  { section: 10, scrollPercent: 96, zIndex: 50, opacity: 1, surfaceVisible: true },   // Final exit
]

export default function AirplaneAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<Scene | null>(null)

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin)

    interface View {
      bottom: number
      height: number
      camera?: THREE.PerspectiveCamera
    }

    class Scene {
      views: View[]
      renderer: THREE.WebGLRenderer
      scene: THREE.Scene
      light: THREE.PointLight
      softLight: THREE.AmbientLight
      modelGroup: THREE.Group
      w: number
      h: number

      constructor(model: THREE.Group) {
        this.views = [
          { bottom: 0, height: 1 },
          { bottom: 0, height: 0 }
        ]

        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          canvas: canvasRef.current!
        })

        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        this.renderer.setPixelRatio(window.devicePixelRatio)

        // scene
        this.scene = new THREE.Scene()

        for (let ii = 0; ii < this.views.length; ++ii) {
          const view = this.views[ii]
          const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000)
          camera.position.fromArray([0, 0, 180])
          camera.layers.disableAll()
          camera.layers.enable(ii)
          view.camera = camera
          camera.lookAt(new THREE.Vector3(0, 5, 0))
        }

        // light
        this.light = new THREE.PointLight(0xffffff, 0.75)
        this.light.position.z = 150
        this.light.position.x = 70
        this.light.position.y = -20
        this.scene.add(this.light)

        this.softLight = new THREE.AmbientLight(0xffffff, 1.5)
        this.scene.add(this.softLight)

        // group
        this.w = window.innerWidth
        this.h = window.innerHeight

        this.onResize()
        window.addEventListener('resize', this.onResize, false)

        const edges = new THREE.EdgesGeometry(model.children[0].geometry as THREE.BufferGeometry)
        const line = new THREE.LineSegments(edges)
        line.position.x = 0.5
        line.position.z = -1
        line.position.y = 0.2

        this.modelGroup = new THREE.Group()

        model.layers.set(0)
        line.layers.set(1)

        this.modelGroup.add(model)
        this.modelGroup.add(line)
        this.scene.add(this.modelGroup)
      }

      render = () => {
        for (let ii = 0; ii < this.views.length; ++ii) {
          const view = this.views[ii]
          const camera = view.camera

          const bottom = Math.floor(this.h * view.bottom)
          const height = Math.floor(this.h * view.height)

          this.renderer.setViewport(0, 0, this.w, this.h)
          this.renderer.setScissor(0, bottom, this.w, height)
          this.renderer.setScissorTest(true)

          camera.aspect = this.w / this.h
          this.renderer.render(this.scene, camera)
        }
      }

      onResize = () => {
        this.w = window.innerWidth
        this.h = window.innerHeight

        for (let ii = 0; ii < this.views.length; ++ii) {
          const view = this.views[ii]
          const camera = view.camera
          camera.aspect = this.w / this.h
          const camZ = (screen.width - this.w * 1) / 3
          camera.position.z = camZ < 180 ? 180 : camZ
          camera.updateProjectionMatrix()
        }

        this.renderer.setSize(this.w, this.h)
        this.render()
      }
    }

    function setupAnimation(model: THREE.Group, scene: Scene) {
      const plane = scene.modelGroup
      const surface = plane.children[0]
      const line = plane.children[1]

      gsap.fromTo('canvas', { x: "50%", autoAlpha: 0 }, { duration: 1, x: "0%", autoAlpha: 1 })

      const tau = Math.PI * 2

      gsap.set(plane.rotation, { y: tau * -0.25 })
      gsap.set(plane.position, { x: 80, y: -32, z: -60 })

      scene.render()

      const tl : gsap.core.Timeline = gsap.timeline({
        onUpdate: scene.render,
        scrollTrigger: {
          trigger: ".wedding-content",
          scrub: true,
          start: "top top",
          end: "bottom bottom"
        }
      })

      // Helper: Convert scroll percentage to timeline position (0-1)
      const percentToPosition = (percent: number) => percent / 100

      // Helper: Calculate duration between two keyframes
      const getDuration = (startPercent: number, endPercent: number) => {
        return (endPercent - startPercent) / 100
      }

      // Define all animation sections with their movements
      const sections = [
        // Section 0: Initial movement
        {
          ...animationKeyframes[0],
          end: animationKeyframes[1].scrollPercent,
          animations: [
            { target: plane.position, props: { x: -10 }, ease: 'power1.in' }
          ]
        },
        // Section 1: First turn
        {
          ...animationKeyframes[1],
          start: animationKeyframes[1].scrollPercent,
          end: animationKeyframes[2].scrollPercent,
          animations: [
            { target: plane.rotation, props: { x: tau * 0.25, y: 0, z: -tau * 0.05 }, ease: 'power1.inOut' },
            { target: plane.position, props: { x: -40, y: 0, z: -60 }, ease: 'power1.inOut' }
          ]
        },
        // Section 2: Second turn
        {
          ...animationKeyframes[2],
          start: animationKeyframes[2].scrollPercent,
          end: animationKeyframes[3].scrollPercent,
          animations: [
            { target: plane.rotation, props: { x: tau * 0.25, y: 0, z: tau * 0.05 }, ease: 'power3.inOut' },
            { target: plane.position, props: { x: 40, y: 0, z: -60 }, ease: 'power2.inOut' }
          ]
        },
        // Section 3: Third turn
        {
          ...animationKeyframes[3],
          start: animationKeyframes[3].scrollPercent,
          end: animationKeyframes[4].scrollPercent,
          animations: [
            { target: plane.rotation, props: { x: tau * 0.2, y: 0, z: -tau * 0.1 }, ease: 'power3.inOut' },
            { target: plane.position, props: { x: -40, y: 0, z: -30 }, ease: 'power2.inOut' }
          ]
        },
        // Section 4: Center position
        {
          ...animationKeyframes[4],
          start: animationKeyframes[4].scrollPercent,
          end: animationKeyframes[5].scrollPercent,
          animations: [
            { target: plane.rotation, props: { x: 0, z: 0, y: tau * 0.25 }, ease: 'power2.inOut' },
            { target: plane.position, props: { x: 0, y: -10, z: 50 }, ease: 'power2.inOut' }
          ]
        },
        // Section 5: Rotation sequence
        {
          ...animationKeyframes[5],
          start: animationKeyframes[5].scrollPercent,
          end: animationKeyframes[6].scrollPercent,
          animations: [
            { target: plane.rotation, props: { x: tau * 0.25, y: tau * 0.5, z: 0 }, ease: 'power4.inOut' },
            { target: plane.position, props: { z: 30 }, ease: 'power4.inOut' }
          ]
        },
        // Section 6: Rotation sequence continued
        {
          ...animationKeyframes[6],
          start: animationKeyframes[6].scrollPercent,
          end: animationKeyframes[7].scrollPercent,
          animations: [
            { target: plane.rotation, props: { x: tau * 0.25, y: tau * 0.5, z: 0 }, ease: 'power4.inOut' },
            { target: plane.position, props: { z: 60, x: 30 }, ease: 'power4.inOut' }
          ]
        },
        // Section 7: Moving forward
        {
          ...animationKeyframes[7],
          start: animationKeyframes[7].scrollPercent,
          end: animationKeyframes[8].scrollPercent,
          animations: [
            { target: plane.rotation, props: { x: tau * 0.25, y: tau * 0.5, z: 0 }, ease: 'power4.inOut' },
            { target: plane.position, props: { z: 60, x: 30 }, ease: 'power4.inOut' }
          ]
        },
        // Section 8: Further forward
        {
          ...animationKeyframes[8],
          start: animationKeyframes[8].scrollPercent,
          end: animationKeyframes[9].scrollPercent,
          animations: [
            { target: plane.rotation, props: { x: tau * 0.35, y: tau * 0.75, z: tau * 0.6 }, ease: 'power4.inOut' },
            { target: plane.position, props: { z: 100, x: 20, y: 0 }, ease: 'power4.inOut' }
          ]
        },
        // Section 9: Flying back
        {
          ...animationKeyframes[9],
          start: animationKeyframes[9].scrollPercent,
          end: animationKeyframes[10].scrollPercent,
          animations: [
            { target: plane.rotation, props: { x: tau * 0.15, y: tau * 0.85, z: -tau * 0 }, ease: 'power1.in' },
            { target: plane.position, props: { z: -150, x: 0, y: 0 }, ease: 'power1.inOut' }
          ]
        },
        // Section 10: Final exit
        {
          ...animationKeyframes[10],
          start: animationKeyframes[10].scrollPercent,
          end: 100,
          animations: [
            { target: plane.rotation, props: { x: -tau * 0.05, y: tau, z: -tau * 0.1 }, ease: 'none' },
            { target: plane.position, props: { x: 0, y: 30, z: 320 }, ease: 'power1.in' },
            { target: scene.light.position, props: { x: 0, y: 0, z: 0 }, ease: 'power2.inOut' }
          ]
        }
      ]

      // Apply all sections to timeline
      sections.forEach((section) => {
        const startPosition = percentToPosition(section.start)
        const duration = getDuration(section.start, section.end)

        // Apply z-index change at the start of this section
        if (containerRef.current) {
          tl.to(
            containerRef.current,
            {
              zIndex: section.zIndex,
              duration: 0.01,
              opacity: section.opacity
            },
            startPosition)
        }

        // Switch between surface (layer 0) and wireframe (layer 1) views
        if (section.surfaceVisible !== undefined) {
          tl.to(
            scene.views[1],
            {
              height: section.surfaceVisible ? 0 : 1,
              bottom: section.surfaceVisible ? 0 : 0,
              duration: 0.01,
              ease: 'none'
            },
            startPosition
          )
          tl.to(
            scene.views[0],
            {
              height: section.surfaceVisible ? 1 : 0,
              bottom: section.surfaceVisible ? 0 : 0,
              duration: 0.01,
              ease: 'none'
            },
            startPosition
          )
        }

        // Apply all animations for this section
        section.animations.forEach((anim) => {
          tl.to(anim.target, {
            ...anim.props,
            duration: duration,
            ease: anim.ease || 'power2.inOut'
          }, startPosition)
        })
      })
    }

    function loadModel() {
      function onModelLoaded(object: THREE.Group) {
        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            const mat = new THREE.MeshPhongMaterial({
              color: 0xffffff,
              specular: 0xD0CBC7,
              shininess: 1,
              flatShading: true,
              transparent: true,
              opacity: 0.5
            })
            child.material = mat
          }
        })

        const scene = new Scene(object)
        sceneRef.current = scene
        setupAnimation(object, scene)
      }

      const manager = new THREE.LoadingManager(() => {
        if (object) {
          onModelLoaded(object)
        }
      })

      let object: THREE.Group | null = null

      const loader = new OBJLoader(manager)
      loader.load('https://assets.codepen.io/557388/1405+Plane_1.obj', function (obj) {
        object = obj
      })
    }

    loadModel()

    return () => {
      // Cleanup
      if (sceneRef.current) {
        window.removeEventListener('resize', sceneRef.current.onResize)
        sceneRef.current.renderer.dispose()
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ opacity: 0 }}
      />
    </div>
  )
}
