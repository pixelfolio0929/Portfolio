"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as THREE from "three"

const SESSION_KEY = "sinan_cinematic_intro_seen"

export function replayCinematicIntro() {
  try {
    sessionStorage.removeItem(SESSION_KEY)
    window.location.reload()
  } catch {
    window.location.reload()
  }
}

export function CinematicIntro({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [isVisible, setIsVisible] = useState(false)
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter")
  const [textVisible, setTextVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Exit handler with smooth fade
  const handleExit = useCallback(() => {
    if (phase === "exit") return
    setPhase("exit")
    try {
      sessionStorage.setItem(SESSION_KEY, "true")
    } catch {
      // ignore storage errors
    }
    setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, 900)
  }, [phase, onComplete])

  // Check session storage on mount
  useEffect(() => {
    // Respect reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true)
      setIsVisible(false)
      return
    }

    try {
      const alreadySeen = sessionStorage.getItem(SESSION_KEY)
      if (alreadySeen) {
        setIsVisible(false)
        return
      }
    } catch {
      // proceed if storage is disabled
    }

    setIsVisible(true)
  }, [])

  // Keyboard shortcut (Escape or Space to skip)
  useEffect(() => {
    if (!isVisible) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        e.preventDefault()
        handleExit()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isVisible, handleExit])

  // Animation Choreography Timing
  useEffect(() => {
    if (!isVisible || prefersReducedMotion) return

    // T = 2.0s: "UI Engineer" slowly animates in
    const textTimer = setTimeout(() => {
      setTextVisible(true)
    }, 2000)

    // T = 5.6s: Complete animation hold state
    const holdTimer = setTimeout(() => {
      setPhase("hold")
    }, 5600)

    // T = 6.6s: Smooth transition into homepage
    const exitTimer = setTimeout(() => {
      handleExit()
    }, 6600)

    return () => {
      clearTimeout(textTimer)
      clearTimeout(holdTimer)
      clearTimeout(exitTimer)
    }
  }, [isVisible, prefersReducedMotion, handleExit])

  // Three.js 3D Scene Initialization
  useEffect(() => {
    if (!isVisible || !canvasRef.current) return

    const canvas = canvasRef.current
    const width = window.innerWidth
    const height = window.innerHeight
    const cameraZ = width < 640 ? 10.4 : width < 1024 ? 8.8 : 7.8

    // 1. Scene & Camera
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x020605, 0.04)

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 1.2, cameraZ)

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0x061e14, 2.5)
    scene.add(ambientLight)

    // Emerald overhead light
    const overheadLight = new THREE.DirectionalLight(0x00ff87, 2.0)
    overheadLight.position.set(4, 8, 3)
    scene.add(overheadLight)

    // Soft cyan-blue fill light for contrast
    const fillLight = new THREE.DirectionalLight(0x00b4d8, 0.8)
    fillLight.position.set(-5, -2, -2)
    scene.add(fillLight)

    // Central neon emerald point light (inside the cube)
    const corePointLight = new THREE.PointLight(0x00ff87, 3.5, 9, 1.2)
    corePointLight.position.set(0, 0.7, 0)
    scene.add(corePointLight)

    // Platform glow light
    const platformLight = new THREE.PointLight(0x10b981, 4.0, 6, 1.5)
    platformLight.position.set(0, -1.0, 0)
    scene.add(platformLight)

    // 4. Undulating Particle Waves (Floor Grid)
    const particleCount = 2000
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const gridX = 50
    const gridZ = 40
    let pIdx = 0

    for (let i = 0; i < gridX; i++) {
      for (let j = 0; j < gridZ; j++) {
        const x = (i - gridX / 2) * 0.4
        const z = (j - gridZ / 2) * 0.35
        const y = -1.6

        positions[pIdx * 3] = x
        positions[pIdx * 3 + 1] = y
        positions[pIdx * 3 + 2] = z

        // Emerald gradient coloring
        const distFromCenter = Math.sqrt(x * x + z * z)
        const intensity = Math.max(0.1, 1 - distFromCenter / 10)
        colors[pIdx * 3] = 0.05 * intensity
        colors[pIdx * 3 + 1] = 0.95 * intensity
        colors[pIdx * 3 + 2] = 0.5 * intensity

        pIdx++
      }
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    // Particle texture
    const pCanvas = document.createElement("canvas")
    pCanvas.width = 32
    pCanvas.height = 32
    const pCtx = pCanvas.getContext("2d")!
    const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16)
    pGrad.addColorStop(0, "rgba(255, 255, 255, 1)")
    pGrad.addColorStop(0.3, "rgba(0, 255, 135, 0.8)")
    pGrad.addColorStop(0.8, "rgba(0, 255, 135, 0.1)")
    pGrad.addColorStop(1, "rgba(0, 0, 0, 0)")
    pCtx.fillStyle = pGrad
    pCtx.fillRect(0, 0, 32, 32)
    const pTexture = new THREE.CanvasTexture(pCanvas)

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleSystem)

    // 5. Circular Neon Platform
    const platformGroup = new THREE.Group()
    platformGroup.position.set(0, -1.25, 0)

    // Dark metallic cylinder base
    const baseGeo = new THREE.CylinderGeometry(2.1, 2.3, 0.28, 48)
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x08100d,
      roughness: 0.25,
      metalness: 0.9,
    })
    const baseMesh = new THREE.Mesh(baseGeo, baseMat)
    platformGroup.add(baseMesh)

    // Beveled upper ring
    const upperDiscGeo = new THREE.CylinderGeometry(1.95, 2.05, 0.08, 48)
    const upperDiscMat = new THREE.MeshStandardMaterial({
      color: 0x0b1812,
      roughness: 0.3,
      metalness: 0.85,
    })
    const upperDisc = new THREE.Mesh(upperDiscGeo, upperDiscMat)
    upperDisc.position.y = 0.16
    platformGroup.add(upperDisc)

    // Glowing Neon Emerald Rim Ring
    const ringGeo = new THREE.TorusGeometry(2.0, 0.045, 16, 64)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00ff87,
    })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.rotation.x = Math.PI / 2
    ringMesh.position.y = 0.2
    platformGroup.add(ringMesh)

    // Inner subtle glow ring
    const innerRingGeo = new THREE.TorusGeometry(1.6, 0.02, 16, 64)
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.6,
    })
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat)
    innerRing.rotation.x = Math.PI / 2
    innerRing.position.y = 0.205
    platformGroup.add(innerRing)

    scene.add(platformGroup)

    // 6. Orbital Rings (Fine subtle elliptic guide lines)
    const orbitGroup = new THREE.Group()
    orbitGroup.position.set(0, 0.6, 0)

    const createOrbitLine = (radiusX: number, radiusY: number, rotX: number, rotY: number) => {
      const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusY, 0, 2 * Math.PI, false, 0)
      const points = curve.getPoints(80)
      const geo = new THREE.BufferGeometry().setFromPoints(points)
      const mat = new THREE.LineBasicMaterial({
        color: 0x00ff87,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
      })
      const line = new THREE.Line(geo, mat)
      line.rotation.x = rotX
      line.rotation.y = rotY
      return line
    }

    const orbit1 = createOrbitLine(3.4, 1.8, Math.PI / 2.3, 0.2)
    const orbit2 = createOrbitLine(3.1, 1.6, Math.PI / 2.1, -0.3)
    orbitGroup.add(orbit1)
    orbitGroup.add(orbit2)
    scene.add(orbitGroup)

    // 7. Central Floating Glass Cube
    const cubeGroup = new THREE.Group()
    cubeGroup.position.set(0, 0.65, 0)

    // Outer Translucent Glass Cube
    const cubeSize = 1.7
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x98f8d0,
      transmission: 0.88,
      opacity: 0.65,
      transparent: true,
      roughness: 0.08,
      metalness: 0.1,
      ior: 1.45,
      thickness: 1.4,
      specularIntensity: 1.0,
      specularColor: 0xffffff,
      envMapIntensity: 1.2,
      side: THREE.DoubleSide,
    })
    const outerCube = new THREE.Mesh(cubeGeo, glassMat)
    cubeGroup.add(outerCube)

    // Internal Glass Facet / Refraction Layer
    const innerCubeGeo = new THREE.BoxGeometry(cubeSize * 0.94, cubeSize * 0.94, cubeSize * 0.94)
    const innerGlassMat = new THREE.MeshBasicMaterial({
      color: 0x00ff87,
      transparent: true,
      opacity: 0.12,
      wireframe: false,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    })
    const innerCube = new THREE.Mesh(innerCubeGeo, innerGlassMat)
    cubeGroup.add(innerCube)

    // Glowing Neon Glass Edges (Chamfered look)
    const edgesGeo = new THREE.EdgesGeometry(cubeGeo)
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0x00ff87,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      linewidth: 2,
    })
    const edges = new THREE.LineSegments(edgesGeo, edgesMat)
    cubeGroup.add(edges)

    // Inner Glowing Code Symbol `</>`
    const codeCanvas = document.createElement("canvas")
    codeCanvas.width = 512
    codeCanvas.height = 512
    const codeCtx = codeCanvas.getContext("2d")!

    // Clear
    codeCtx.clearRect(0, 0, 512, 512)

    // Draw multi-layered glowing `</>`
    codeCtx.textAlign = "center"
    codeCtx.textBaseline = "middle"
    codeCtx.font = "bold 210px 'Geist Mono', 'Courier New', monospace"

    // Deep outer neon haze
    codeCtx.shadowColor = "#00ff87"
    codeCtx.shadowBlur = 55
    codeCtx.fillStyle = "#00ff87"
    codeCtx.fillText("</>", 256, 256)

    // Intense inner core
    codeCtx.shadowBlur = 25
    codeCtx.fillStyle = "#a8ffdb"
    codeCtx.fillText("</>", 256, 256)

    // Ultra crisp white-green center
    codeCtx.shadowBlur = 8
    codeCtx.fillStyle = "#ffffff"
    codeCtx.fillText("</>", 256, 256)

    const codeTexture = new THREE.CanvasTexture(codeCanvas)
    const codePlaneMat = new THREE.MeshBasicMaterial({
      map: codeTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    })

    const codePlane1 = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.2), codePlaneMat)
    cubeGroup.add(codePlane1)

    // Orthogonal cross-plane so code symbol is bright from all viewing angles
    const codePlane2 = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.2), codePlaneMat)
    codePlane2.rotation.y = Math.PI / 2
    cubeGroup.add(codePlane2)

    scene.add(cubeGroup)

    // 8. Helper to create Floating Glass Panels
    const createFloatingPanel = (
      type: "figma" | "desktop" | "browser" | "mobile",
      width: number,
      height: number
    ) => {
      const pCanvas = document.createElement("canvas")
      pCanvas.width = 320
      pCanvas.height = 240
      const ctx = pCanvas.getContext("2d")!

      ctx.clearRect(0, 0, 320, 240)

      // Draw frosted glass card background
      const r = 24
      const x = 12
      const y = 12
      const w = 296
      const h = 216

      // Rounded rect path
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.arcTo(x + w, y, x + w, y + h, r)
      ctx.arcTo(x + w, y + h, x, y + h, r)
      ctx.arcTo(x, y + h, x, y, r)
      ctx.arcTo(x, y, x + w, y, r)
      ctx.closePath()

      // Frosted gradient fill
      const grad = ctx.createLinearGradient(x, y, x + w, y + h)
      grad.addColorStop(0, "rgba(20, 45, 35, 0.75)")
      grad.addColorStop(1, "rgba(8, 20, 16, 0.85)")
      ctx.fillStyle = grad
      ctx.fill()

      // Glowing border
      ctx.lineWidth = 4
      ctx.strokeStyle = "rgba(0, 255, 135, 0.6)"
      ctx.shadowColor = "#00ff87"
      ctx.shadowBlur = 14
      ctx.stroke()

      // Reset shadow for icon details
      ctx.shadowBlur = 0

      const cx = 160
      const cy = 120

      if (type === "figma") {
        // Authentic 5-lobed Figma Icon
        const lobeR = 20
        const spacing = 38

        // Top Left: Orange #F24E1E
        ctx.fillStyle = "#F24E1E"
        ctx.beginPath()
        ctx.arc(cx - spacing / 2, cy - spacing, lobeR, 0, Math.PI * 2)
        ctx.fill()

        // Top Right: Purple #A259FF
        ctx.fillStyle = "#A259FF"
        ctx.beginPath()
        ctx.arc(cx + spacing / 2, cy - spacing, lobeR, 0, Math.PI * 2)
        ctx.fill()

        // Mid Left: Light Blue #1ABCFE
        ctx.fillStyle = "#1ABCFE"
        ctx.beginPath()
        ctx.arc(cx - spacing / 2, cy, lobeR, 0, Math.PI * 2)
        ctx.fill()

        // Mid Right: Pink/Salmon #FF7262
        ctx.fillStyle = "#FF7262"
        ctx.beginPath()
        ctx.arc(cx + spacing / 2, cy, lobeR, 0, Math.PI * 2)
        ctx.fill()

        // Bottom Left: Green #0ACF83
        ctx.fillStyle = "#0ACF83"
        ctx.beginPath()
        ctx.arc(cx - spacing / 2, cy + spacing, lobeR, 0, Math.PI * 2)
        ctx.fill()
      } else if (type === "desktop") {
        // Desktop Monitor Icon
        ctx.strokeStyle = "#00ff87"
        ctx.lineWidth = 6
        ctx.shadowColor = "#00ff87"
        ctx.shadowBlur = 16

        // Screen bezel
        const sw = 130
        const sh = 85
        ctx.strokeRect(cx - sw / 2, cy - sh / 2 - 12, sw, sh)

        // Stand neck
        ctx.beginPath()
        ctx.moveTo(cx, cy + sh / 2 - 12)
        ctx.lineTo(cx, cy + sh / 2 + 15)
        ctx.stroke()

        // Stand base
        ctx.beginPath()
        ctx.moveTo(cx - 36, cy + sh / 2 + 15)
        ctx.lineTo(cx + 36, cy + sh / 2 + 15)
        ctx.stroke()

        // Screen glowing inner lines
        ctx.fillStyle = "rgba(0, 255, 135, 0.45)"
        ctx.fillRect(cx - 45, cy - 25, 90, 8)
        ctx.fillRect(cx - 45, cy - 8, 60, 6)
      } else if (type === "browser") {
        // Browser Window with `</>`
        ctx.strokeStyle = "#00ff87"
        ctx.lineWidth = 6
        ctx.shadowColor = "#00ff87"
        ctx.shadowBlur = 16

        const bw = 136
        const bh = 92
        ctx.strokeRect(cx - bw / 2, cy - bh / 2, bw, bh)

        // Title bar line
        ctx.beginPath()
        ctx.moveTo(cx - bw / 2, cy - bh / 2 + 24)
        ctx.lineTo(cx + bw / 2, cy - bh / 2 + 24)
        ctx.stroke()

        // 3 Browser window dots
        ctx.fillStyle = "#00ff87"
        ctx.beginPath()
        ctx.arc(cx - bw / 2 + 16, cy - bh / 2 + 12, 4, 0, Math.PI * 2)
        ctx.arc(cx - bw / 2 + 30, cy - bh / 2 + 12, 4, 0, Math.PI * 2)
        ctx.arc(cx - bw / 2 + 44, cy - bh / 2 + 12, 4, 0, Math.PI * 2)
        ctx.fill()

        // Code symbol inside browser
        ctx.font = "bold 34px 'Geist Mono', monospace"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillStyle = "#ffffff"
        ctx.fillText("</>", cx, cy + 14)
      } else if (type === "mobile") {
        // Mobile Smartphone Icon
        ctx.strokeStyle = "#00ff87"
        ctx.lineWidth = 6
        ctx.shadowColor = "#00ff87"
        ctx.shadowBlur = 16

        const mw = 70
        const mh = 120
        const mr = 16
        const mx = cx - mw / 2
        const my = cy - mh / 2

        ctx.beginPath()
        ctx.moveTo(mx + mr, my)
        ctx.arcTo(mx + mw, my, mx + mw, my + mh, mr)
        ctx.arcTo(mx + mw, my + mh, mx, my + mh, mr)
        ctx.arcTo(mx, my + mh, mx, my, mr)
        ctx.arcTo(mx, my, mx + mw, my, mr)
        ctx.closePath()
        ctx.stroke()

        // Speaker slot
        ctx.fillStyle = "#00ff87"
        ctx.fillRect(cx - 14, my + 12, 28, 4)

        // Home indicator line
        ctx.fillRect(cx - 18, my + mh - 14, 36, 4)

        // Screen center glow
        ctx.fillStyle = "rgba(0, 255, 135, 0.3)"
        ctx.fillRect(cx - 22, cy - 20, 44, 40)
      }

      const texture = new THREE.CanvasTexture(pCanvas)
      const planeGeo = new THREE.PlaneGeometry(width, height)
      const planeMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      })

      return new THREE.Mesh(planeGeo, planeMat)
    }

    // Four panels positioned in 3D around the cube
    // 1. Top-Left: Figma
    const figmaPanel = createFloatingPanel("figma", 1.25, 0.95)
    figmaPanel.position.set(-2.4, 1.4, -0.6)
    figmaPanel.rotation.y = 0.35
    figmaPanel.rotation.x = -0.1
    scene.add(figmaPanel)

    // 2. Bottom-Left: Desktop Monitor
    const desktopPanel = createFloatingPanel("desktop", 1.25, 0.95)
    desktopPanel.position.set(-2.55, 0.15, 0.4)
    desktopPanel.rotation.y = 0.45
    desktopPanel.rotation.x = 0.08
    scene.add(desktopPanel)

    // 3. Top-Right: Browser Window `</>`
    const browserPanel = createFloatingPanel("browser", 1.25, 0.95)
    browserPanel.position.set(2.4, 1.35, -0.5)
    browserPanel.rotation.y = -0.38
    browserPanel.rotation.x = -0.08
    scene.add(browserPanel)

    // 4. Bottom-Right: Mobile Phone
    const mobilePanel = createFloatingPanel("mobile", 1.25, 0.95)
    mobilePanel.position.set(2.5, 0.1, 0.5)
    mobilePanel.rotation.y = -0.42
    mobilePanel.rotation.x = 0.08
    scene.add(mobilePanel)

    // Panels Group for collective entry animation
    const panels = [
      { mesh: figmaPanel, basePos: new THREE.Vector3(-2.4, 1.4, -0.6), phaseOffset: 0.0 },
      { mesh: desktopPanel, basePos: new THREE.Vector3(-2.55, 0.15, 0.4), phaseOffset: 1.5 },
      { mesh: browserPanel, basePos: new THREE.Vector3(2.4, 1.35, -0.5), phaseOffset: 3.0 },
      { mesh: mobilePanel, basePos: new THREE.Vector3(2.5, 0.1, 0.5), phaseOffset: 4.5 },
    ]

    // Set initial scale to 0 for entry reveal
    panels.forEach((p) => p.mesh.scale.set(0, 0, 0))
    cubeGroup.scale.set(0, 0, 0)
    platformGroup.scale.set(0, 0, 0)

    // 9. Resize Listener
    const handleResize = () => {
      if (!canvasRef.current) return
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.position.z = w < 640 ? 10.4 : w < 1024 ? 8.8 : 7.8
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener("resize", handleResize)

    // 10. Animation Render Loop
    let animationFrameId: number
    const clock = new THREE.Clock()
    const startTime = performance.now()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const elapsedTime = (performance.now() - startTime) / 1000
      const delta = clock.getDelta()

      // Wave Particle Simulation
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute
      const posArray = posAttr.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        const x = posArray[i * 3]
        const z = posArray[i * 3 + 2]
        // Sinusoidal undulating wave motion
        posArray[i * 3 + 1] =
          -1.6 +
          Math.sin(x * 0.55 + elapsedTime * 1.8) * 0.18 +
          Math.cos(z * 0.5 + elapsedTime * 1.4) * 0.15
      }
      posAttr.needsUpdate = true

      // Entry Animations (Staggered emergence)
      // 1. Platform emerges (0.4s to 1.6s)
      if (elapsedTime > 0.4 && platformGroup.scale.x < 1) {
        const t = Math.min(1, (elapsedTime - 0.4) / 1.1)
        const ease = 1 - Math.pow(1 - t, 3)
        platformGroup.scale.set(ease, ease, ease)
      }

      // 2. Central Cube emerges & floats (0.9s to 2.2s)
      if (elapsedTime > 0.9 && cubeGroup.scale.x < 1) {
        const t = Math.min(1, (elapsedTime - 0.9) / 1.2)
        // Gentle spring overshoot
        const ease = Math.sin((t * Math.PI) / 2)
        cubeGroup.scale.set(ease, ease, ease)
      }

      // 3. Floating Technology Panels emerge (1.6s to 2.8s)
      if (elapsedTime > 1.6) {
        panels.forEach((p, idx) => {
          const panelDelay = 1.6 + idx * 0.15
          if (elapsedTime > panelDelay && p.mesh.scale.x < 1) {
            const t = Math.min(1, (elapsedTime - panelDelay) / 0.8)
            const ease = 1 - Math.pow(1 - t, 3)
            p.mesh.scale.set(ease, ease, ease)
          }
        })
      }

      // Dynamic Idle 3D Animations
      // Cube smooth rotation & floating bob
      cubeGroup.rotation.y = elapsedTime * 0.45
      cubeGroup.rotation.x = Math.sin(elapsedTime * 0.6) * 0.12
      cubeGroup.rotation.z = Math.cos(elapsedTime * 0.5) * 0.08
      cubeGroup.position.y = 0.65 + Math.sin(elapsedTime * 1.6) * 0.09

      // Code texture internal rotation counterbalance
      codePlane1.rotation.y = Math.sin(elapsedTime * 0.8) * 0.15

      // Orbiting panels gentle bobbing & breathing
      panels.forEach((p) => {
        p.mesh.position.y =
          p.basePos.y + Math.sin(elapsedTime * 1.8 + p.phaseOffset) * 0.08
        p.mesh.position.x =
          p.basePos.x + Math.cos(elapsedTime * 1.2 + p.phaseOffset) * 0.04
      })

      // Orbit rings subtle rotation
      orbit1.rotation.z = elapsedTime * 0.05
      orbit2.rotation.z = -elapsedTime * 0.04

      // Platform neon ring breathing intensity
      const pulse = 1.0 + Math.sin(elapsedTime * 2.8) * 0.25
      ringMat.color.setRGB(0.0 * pulse, 1.0, 0.53 * pulse)
      corePointLight.intensity = 3.5 + Math.sin(elapsedTime * 3.2) * 0.8

      // Camera gentle cinematic push / sway
      camera.position.x = Math.sin(elapsedTime * 0.35) * 0.2
      camera.position.y = 1.2 + Math.cos(elapsedTime * 0.4) * 0.1
      camera.lookAt(0, 0.4, 0)

      renderer.render(scene, camera)
    }

    animate()

    // 11. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
      particleGeometry.dispose()
      particleMaterial.dispose()
      pTexture.dispose()
      baseGeo.dispose()
      baseMat.dispose()
      ringGeo.dispose()
      ringMat.dispose()
      cubeGeo.dispose()
      glassMat.dispose()
      edgesGeo.dispose()
      edgesMat.dispose()
      codeTexture.dispose()
    }
  }, [isVisible])

  if (!isVisible || prefersReducedMotion) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 1 }}
          animate={{
            opacity: phase === "exit" ? 0 : 1,
            scale: phase === "exit" ? 1.08 : 1,
            filter: phase === "exit" ? "blur(12px)" : "blur(0px)",
          }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(16px)" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between overflow-hidden bg-[#020605] select-none pointer-events-auto"
        >
          {/* Top Bar: Minimal Skip Option */}
          <div className="w-full max-w-7xl px-6 pt-6 flex items-center justify-end z-20">
            {/* Skip Intro Button */}
            <button
              onClick={handleExit}
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/25 hover:border-emerald-400/60 backdrop-blur-md transition-all duration-200 cursor-pointer text-xs font-mono text-emerald-300 hover:text-white"
            >
              <span>Skip</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-black/40 border border-emerald-500/30 rounded text-emerald-400/70 group-hover:text-emerald-300">
                ESC
              </kbd>
              <svg
                className="w-3.5 h-3.5 text-emerald-400 transform group-hover:translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Center 3D WebGL Canvas Layer */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <canvas ref={canvasRef} className="w-full h-full block" />
          </div>

          {/* Volumetric Green Vignette Overlays */}
          <div className="absolute inset-0 pointer-events-none z-15 bg-[radial-gradient(circle_at_50%_45%,transparent_35%,rgba(2,6,5,0.75)_80%,rgba(2,6,5,0.95)_100%)]" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none z-10" />
          <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none z-10" />

          {/* Bottom Content: Clean Professional Text (Only "UI Engineer" slowly animated + glowing animated bar) */}
          <div className="w-full max-w-4xl px-6 pb-12 sm:pb-16 flex flex-col items-center text-center z-20">
            <AnimatePresence>
              {textVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-4"
                >
                  {/* Title: UI Engineer with slow, elegant letter-by-letter animation */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_0_25px_rgba(0,255,135,0.45)] flex items-center justify-center">
                    {"UI Engineer".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                          delay: index * 0.08,
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`bg-gradient-to-r from-emerald-300 via-white to-emerald-200 bg-clip-text text-transparent inline-block ${
                          char === " " ? "w-2.5 sm:w-3.5" : ""
                        }`}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </h1>

                  {/* Sleek Animated Glowing Emerald Bar (matches reference image, text only, no extra labels) */}
                  <div className="w-60 sm:w-72 h-1.5 sm:h-2 rounded-full bg-emerald-950/60 border border-emerald-500/30 overflow-hidden relative shadow-[0_0_15px_rgba(0,255,135,0.3)] mt-1">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.4, duration: 2.8, ease: "easeInOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-white shadow-[0_0_12px_#00ff87] relative"
                    >
                      {/* Leading edge glow pulse */}
                      <span className="absolute right-0 top-0 bottom-0 w-3 bg-white/90 blur-[2px] rounded-full" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
