import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { audioEngine } from './AudioEngine';
import { Sparkles, Sliders, RefreshCw, Target } from 'lucide-react';

export type VisualizerMode = 'saturn' | 'nebula' | 'acoustic' | 'warp';

interface CosmicScene3DProps {
  mode?: VisualizerMode;
  onModeChange?: (mode: VisualizerMode) => void;
  onImpact?: () => void;
  interactive?: boolean;
}

interface AsteroidData {
  mesh: THREE.Mesh;
  radius: number;
  angle: number;
  speed: number;
  rotSpeed: THREE.Vector3;
  yOffset: number;
}

interface IncomingMeteor {
  mesh: THREE.Mesh;
  trail: THREE.Points;
  trailPositions: Float32Array;
  trailColors: Float32Array;
  startPos: THREE.Vector3;
  targetPos: THREE.Vector3;
  progress: number;
  speed: number;
  size: number;
  rotAxis: THREE.Vector3;
}

interface ImpactExplosion {
  position: THREE.Vector3;
  age: number;
  maxAge: number;
  shockwaveMesh: THREE.Mesh;
  debrisPoints: THREE.Points;
  velocities: Float32Array;
  lightIntensity: number;
}

export const CosmicScene3D: React.FC<CosmicScene3DProps> = ({
  mode: controlledMode,
  onModeChange,
  onImpact,
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [internalMode, setInternalMode] = useState<VisualizerMode>('saturn');
  const [showControls, setShowControls] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [isAudioReactive, setIsAudioReactive] = useState(true);
  const [meteorFrequency, setMeteorFrequency] = useState(5.0); // slowed down default to 5.0 seconds

  const activeMode = controlledMode || internalMode;
  const triggerManualMeteorRef = useRef<(() => void) | null>(null);

  const handleModeSelect = (newMode: VisualizerMode) => {
    setInternalMode(newMode);
    onModeChange?.(newMode);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070709, 0.0035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 35, 110);
    camera.lookAt(0, -5, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root Group for Saturn & Rings System (Centered)
    const saturnSystem = new THREE.Group();
    saturnSystem.position.set(0, -3, -8);
    saturnSystem.rotation.x = THREE.MathUtils.degToRad(27);
    saturnSystem.rotation.z = THREE.MathUtils.degToRad(-14);
    scene.add(saturnSystem);

    // ------------------------------------------------------------------
    // 1. SATURN PLANET SPHERE IN THE CENTER OF THE RING
    // ------------------------------------------------------------------
    const PLANET_RADIUS = 16.0;
    const planetCanvas = document.createElement('canvas');
    planetCanvas.width = 1024;
    planetCanvas.height = 512;
    const pCtx = planetCanvas.getContext('2d')!;

    // Base background warm ochre tone
    pCtx.fillStyle = '#b88344';
    pCtx.fillRect(0, 0, 1024, 512);

    // Latitudinal Atmospheric Bands
    const bands = [
      { y: 0, h: 45, color: '#4a331c' }, // North polar dark vortex
      { y: 45, h: 30, color: '#7a542a' },
      { y: 75, h: 40, color: '#ba8545' },
      { y: 115, h: 50, color: '#dfa65f' },
      { y: 165, h: 35, color: '#f5c687' }, // Bright northern temperate band
      { y: 200, h: 45, color: '#e09e53' },
      { y: 245, h: 30, color: '#99632f' }, // Equatorial dark shadow band
      { y: 275, h: 55, color: '#e8af67' }, // Equatorial bright storm
      { y: 330, h: 40, color: '#bf8441' },
      { y: 370, h: 45, color: '#d99c56' },
      { y: 415, h: 40, color: '#8e5d2b' },
      { y: 455, h: 57, color: '#422d19' }, // South polar dark hood
    ];

    bands.forEach((b) => {
      const grad = pCtx.createLinearGradient(0, b.y, 0, b.y + b.h);
      grad.addColorStop(0, b.color);
      grad.addColorStop(0.5, b.color);
      grad.addColorStop(1, '#b57f40');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, b.y, 1024, b.h);
    });

    // Atmospheric micro-striations & turbulence
    for (let j = 0; j < 300; j++) {
      const y = Math.random() * 512;
      const h = 1 + Math.random() * 3;
      pCtx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 235, 205, 0.08)' : 'rgba(40, 20, 5, 0.08)';
      pCtx.fillRect(0, y, 1024, h);
    }

    const planetTexture = new THREE.CanvasTexture(planetCanvas);
    const planetGeo = new THREE.SphereGeometry(PLANET_RADIUS, 64, 48);
    const planetMat = new THREE.MeshStandardMaterial({
      map: planetTexture,
      roughness: 0.6,
      metalness: 0.1,
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    planetMesh.castShadow = true;
    planetMesh.receiveShadow = true;
    saturnSystem.add(planetMesh);

    // Glowing Atmospheric Haze (Fresnel Rim Layer)
    const hazeGeo = new THREE.SphereGeometry(PLANET_RADIUS * 1.025, 48, 36);
    const hazeMat = new THREE.MeshBasicMaterial({
      color: 0xf3b775,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const hazeMesh = new THREE.Mesh(hazeGeo, hazeMat);
    saturnSystem.add(hazeMesh);

    // ------------------------------------------------------------------
    // 2. CONCENTRIC RINGS & STARFIELD PARTICLE SYSTEM
    // ------------------------------------------------------------------
    const PARTICLE_COUNT = 14000;
    const ringGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const originalRadii = new Float32Array(PARTICLE_COUNT);
    const angles = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);

    const colorPalette = [
      new THREE.Color('#E29D52'), // Saturn Bronze Gold
      new THREE.Color('#F3B775'), // Light Amber
      new THREE.Color('#C97834'), // Ochre Amber
      new THREE.Color('#FFF1DE'), // Warm Pearl Starlight
      new THREE.Color('#824E1E'), // Deep Umber
      new THREE.Color('#E8D8C3'), // Champagne
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const isStar = i < 2000;

      if (isStar) {
        // Deep background starfield
        const r = 120 + Math.random() * 250;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = r * Math.cos(phi);

        originalRadii[i] = r;
        angles[i] = theta;
        speeds[i] = (Math.random() - 0.5) * 0.001;

        const starColor = colorPalette[3].clone().lerp(new THREE.Color('#ffffff'), Math.random() * 0.5);
        colors[i3] = starColor.r;
        colors[i3 + 1] = starColor.g;
        colors[i3 + 2] = starColor.b;
      } else {
        // Saturn Rings: Concentric bands with gaps (C, B, Cassini Division, A)
        const angle = Math.random() * Math.PI * 2;
        angles[i] = angle;

        let radius = 25;
        const bandRoll = Math.random();

        if (bandRoll < 0.22) {
          // C Ring (Inner faint ring: 25 - 42)
          radius = 25 + Math.random() * 17;
        } else if (bandRoll < 0.65) {
          // B Ring (Main dense ring: 42 - 57)
          radius = 42 + Math.random() * 15;
        } else if (bandRoll < 0.70) {
          // Cassini Division (Sparse gap: 57 - 62)
          radius = 57 + Math.random() * 5;
        } else {
          // A Ring (Outer ring: 62 - 82)
          radius = 62 + Math.random() * 20;
        }

        originalRadii[i] = radius;
        speeds[i] = 0.003 * Math.pow(40 / radius, 1.5);

        const discThickness = (Math.random() - 0.5) * (0.8 + (radius / 80) * 1.2);
        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = discThickness;
        positions[i3 + 2] = Math.sin(angle) * radius;

        let pColor: THREE.Color;
        if (radius < 42) {
          pColor = colorPalette[4].clone().lerp(colorPalette[0], Math.random() * 0.6);
        } else if (radius < 57) {
          pColor = colorPalette[0].clone().lerp(colorPalette[1], Math.random());
        } else if (radius < 62) {
          pColor = colorPalette[4].clone().multiplyScalar(0.35);
        } else {
          pColor = colorPalette[1].clone().lerp(colorPalette[3], Math.random() * 0.7);
        }

        colors[i3] = pColor.r;
        colors[i3 + 1] = pColor.g;
        colors[i3 + 2] = pColor.b;
      }
    }

    ringGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    ringGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Circular particle texture
    const dotCanvas = document.createElement('canvas');
    dotCanvas.width = 64;
    dotCanvas.height = 64;
    const dCtx = dotCanvas.getContext('2d')!;
    const gradient = dCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.25, 'rgba(243, 183, 117, 0.85)');
    gradient.addColorStop(0.65, 'rgba(226, 157, 82, 0.25)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    dCtx.fillStyle = gradient;
    dCtx.fillRect(0, 0, 64, 64);
    const dotTexture = new THREE.CanvasTexture(dotCanvas);

    const ringMaterial = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      map: dotTexture,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const ringParticleSystem = new THREE.Points(ringGeometry, ringMaterial);
    saturnSystem.add(ringParticleSystem);

    // ------------------------------------------------------------------
    // 3. 3D ASTEROIDS EMBEDDED IN THE RING (Orbiting Rock Boulders)
    // Reduced count from 45 to 26 for cleaner cosmic balance
    // ------------------------------------------------------------------
    const asteroidGroup = new THREE.Group();
    saturnSystem.add(asteroidGroup);

    const orbitingAsteroids: AsteroidData[] = [];
    const ASTEROID_COUNT = 26;
    const rockMaterial = new THREE.MeshStandardMaterial({
      color: 0x6e5c4d,
      roughness: 0.85,
      metalness: 0.25,
      flatShading: true,
    });

    for (let k = 0; k < ASTEROID_COUNT; k++) {
      const baseSize = 0.4 + Math.random() * 0.9;
      const rockGeo = new THREE.DodecahedronGeometry(baseSize, 1);
      const posAttr = rockGeo.attributes.position;
      for (let v = 0; v < posAttr.count; v++) {
        const vx = posAttr.getX(v) * (1 + (Math.random() - 0.5) * 0.35);
        const vy = posAttr.getY(v) * (1 + (Math.random() - 0.5) * 0.35);
        const vz = posAttr.getZ(v) * (1 + (Math.random() - 0.5) * 0.35);
        posAttr.setXYZ(v, vx, vy, vz);
      }
      rockGeo.computeVertexNormals();

      const rockMesh = new THREE.Mesh(rockGeo, rockMaterial);
      const radius = 28 + Math.random() * 50;
      const angle = Math.random() * Math.PI * 2;
      const yOffset = (Math.random() - 0.5) * 1.2;

      rockMesh.position.set(
        Math.cos(angle) * radius,
        yOffset,
        Math.sin(angle) * radius
      );
      asteroidGroup.add(rockMesh);

      orbitingAsteroids.push({
        mesh: rockMesh,
        radius,
        angle,
        speed: 0.0025 * Math.pow(40 / radius, 1.5),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        ),
        yOffset,
      });
    }

    // ------------------------------------------------------------------
    // 4. INCOMING ROGUE METEORS (Small, Refined, Gentle Impacts)
    // ------------------------------------------------------------------
    const meteorGroup = new THREE.Group();
    saturnSystem.add(meteorGroup);

    const activeMeteors: IncomingMeteor[] = [];
    const activeExplosions: ImpactExplosion[] = [];

    // Shared meteor rock material (incandescent burning head)
    const meteorHeadMat = new THREE.MeshStandardMaterial({
      color: 0xffaa44,
      emissive: 0xff6600,
      emissiveIntensity: 2.0,
      roughness: 0.5,
    });

    // Helper: Spawn an incoming rogue asteroid aimed at Saturn/Center
    const spawnIncomingMeteor = (isUrgent = false) => {
      const spawnTheta = Math.random() * Math.PI * 2;
      const spawnPhi = 0.2 + Math.random() * 0.8;
      const spawnDist = 110 + Math.random() * 30;

      const startPos = new THREE.Vector3(
        spawnDist * Math.sin(spawnPhi) * Math.cos(spawnTheta),
        (isUrgent ? 50 : 35 + Math.random() * 40),
        spawnDist * Math.cos(spawnPhi)
      );

      // Target: Near the center of the ring or planet atmosphere
      const targetR = Math.random() < 0.65 ? Math.random() * PLANET_RADIUS * 0.9 : 17 + Math.random() * 5;
      const targetAngle = Math.random() * Math.PI * 2;
      const targetPos = new THREE.Vector3(
        Math.cos(targetAngle) * targetR,
        (Math.random() - 0.5) * 0.4,
        Math.sin(targetAngle) * targetR
      );

      // Smaller meteor size for refined visual impact
      const meteorSize = 0.45 + Math.random() * 0.5;
      const meteorGeo = new THREE.DodecahedronGeometry(meteorSize, 1);
      const mPosAttr = meteorGeo.attributes.position;
      for (let v = 0; v < mPosAttr.count; v++) {
        mPosAttr.setXYZ(
          v,
          mPosAttr.getX(v) * (1 + (Math.random() - 0.5) * 0.35),
          mPosAttr.getY(v) * (1 + (Math.random() - 0.5) * 0.35),
          mPosAttr.getZ(v) * (1 + (Math.random() - 0.5) * 0.35)
        );
      }
      meteorGeo.computeVertexNormals();

      const meteorMesh = new THREE.Mesh(meteorGeo, meteorHeadMat);
      meteorMesh.position.copy(startPos);
      meteorGroup.add(meteorMesh);

      // Incandescent Trail Particles
      const TRAIL_POINTS = 24;
      const trailGeo = new THREE.BufferGeometry();
      const trailPositions = new Float32Array(TRAIL_POINTS * 3);
      const trailColors = new Float32Array(TRAIL_POINTS * 3);

      for (let t = 0; t < TRAIL_POINTS; t++) {
        const t3 = t * 3;
        trailPositions[t3] = startPos.x;
        trailPositions[t3 + 1] = startPos.y;
        trailPositions[t3 + 2] = startPos.z;

        const col = new THREE.Color('#fff2d1').lerp(new THREE.Color('#e29d52'), t / TRAIL_POINTS);
        trailColors[t3] = col.r;
        trailColors[t3 + 1] = col.g;
        trailColors[t3 + 2] = col.b;
      }

      trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
      trailGeo.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));

      const trailMat = new THREE.PointsMaterial({
        size: 1.4,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const trailPoints = new THREE.Points(trailGeo, trailMat);
      meteorGroup.add(trailPoints);

      activeMeteors.push({
        mesh: meteorMesh,
        trail: trailPoints,
        trailPositions,
        trailColors,
        startPos,
        targetPos,
        progress: 0,
        speed: (0.28 + Math.random() * 0.22) * (isUrgent ? 1.5 : 1), // slower and more majestic
        size: meteorSize,
        rotAxis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(),
      });
    };

    // Helper: Trigger refined small impact at collision point and notify parent
    const triggerImpact = (impactPos: THREE.Vector3, meteorSize: number) => {
      // Notify parent to trigger subtle font tremor
      onImpact?.();

      // 1. Refined Shockwave Ring
      const shockwaveGeo = new THREE.RingGeometry(0.25, 0.75, 32);
      shockwaveGeo.rotateX(-Math.PI / 2);
      const shockwaveMat = new THREE.MeshBasicMaterial({
        color: 0xffe8c2,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat);
      shockwaveMesh.position.copy(impactPos);
      saturnSystem.add(shockwaveMesh);

      // 2. Refined Debris Particles (smaller quantity and speed)
      const DEBRIS_COUNT = 22;
      const debrisGeo = new THREE.BufferGeometry();
      const debrisPos = new Float32Array(DEBRIS_COUNT * 3);
      const debrisVel = new Float32Array(DEBRIS_COUNT * 3);
      const debrisCols = new Float32Array(DEBRIS_COUNT * 3);

      for (let d = 0; d < DEBRIS_COUNT; d++) {
        const d3 = d * 3;
        debrisPos[d3] = impactPos.x;
        debrisPos[d3 + 1] = impactPos.y;
        debrisPos[d3 + 2] = impactPos.z;

        const blastAngle = Math.random() * Math.PI * 2;
        const blastSpeed = 4 + Math.random() * 11 * (meteorSize / 0.7);
        const elevation = 0.2 + Math.random() * 0.9;

        debrisVel[d3] = Math.cos(blastAngle) * blastSpeed;
        debrisVel[d3 + 1] = elevation * blastSpeed;
        debrisVel[d3 + 2] = Math.sin(blastAngle) * blastSpeed;

        const c = new THREE.Color(Math.random() > 0.4 ? '#fffae8' : '#e29d52');
        debrisCols[d3] = c.r;
        debrisCols[d3 + 1] = c.g;
        debrisCols[d3 + 2] = c.b;
      }

      debrisGeo.setAttribute('position', new THREE.BufferAttribute(debrisPos, 3));
      debrisGeo.setAttribute('color', new THREE.BufferAttribute(debrisCols, 3));

      const debrisMat = new THREE.PointsMaterial({
        size: 1.3,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const debrisPoints = new THREE.Points(debrisGeo, debrisMat);
      saturnSystem.add(debrisPoints);

      // Subtle Flash point light
      impactPointLight.position.copy(impactPos);
      impactPointLight.intensity = 3.6;

      activeExplosions.push({
        position: impactPos.clone(),
        age: 0,
        maxAge: 0.9,
        shockwaveMesh,
        debrisPoints,
        velocities: debrisVel,
        lightIntensity: 3.6,
      });
    };

    triggerManualMeteorRef.current = () => {
      spawnIncomingMeteor(true);
    };

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffecd6, 0.45);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffeedd, 2.8);
    sunLight.position.set(60, 30, 70);
    scene.add(sunLight);

    // Impact blast light source
    const impactPointLight = new THREE.PointLight(0xffe2aa, 0, 100);
    saturnSystem.add(impactPointLight);

    // Parallax mouse interaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 2;
      targetMouseY = y * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Audio frequency buffer
    const freqArray = new Uint8Array(128);

    // Animation variables
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let meteorTimer = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime() * speedMultiplier;

      // Mouse smooth interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX * 12;
      camera.position.y = 35 + mouseY * -10;
      camera.lookAt(mouseX * 4, -5 + mouseY * -2, 0);

      // Audio Reactivity
      let audioBoost = 0;
      if (isAudioReactive) {
        audioEngine.getFrequencyData(freqArray);
        audioBoost = audioEngine.getAverageFrequency();
      }

      // Rotate planet on its axis
      planetMesh.rotation.y = time * 0.035;

      // Rotate particles and update ripples
      const posAttr = ringGeometry.attributes.position;
      const posArray = posAttr.array as Float32Array;

      for (let i = 2000; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const currentSpeed = speeds[i] * (1 + audioBoost * 2.5);
        angles[i] += currentSpeed;

        const baseRadius = originalRadii[i];
        let r = baseRadius;
        let yDisp = 0;

        if (activeMode === 'saturn') {
          const wave = Math.sin(angles[i] * 6 + time * 2) * (0.4 + audioBoost * 2.2);
          r = baseRadius + Math.cos(angles[i] * 3 + time) * (audioBoost * 1.5);
          yDisp = wave * (baseRadius / 60);

          posArray[i3] = Math.cos(angles[i]) * r;
          posArray[i3 + 1] = yDisp;
          posArray[i3 + 2] = Math.sin(angles[i]) * r;
        } else if (activeMode === 'nebula') {
          const spiralFactor = Math.sin(time * 0.5 + baseRadius * 0.05) * 10;
          r = baseRadius + spiralFactor;
          yDisp = Math.sin(angles[i] * 4 + time * 3) * (6 + audioBoost * 12);

          posArray[i3] = Math.cos(angles[i]) * r;
          posArray[i3 + 1] = yDisp;
          posArray[i3 + 2] = Math.sin(angles[i]) * r;
        } else if (activeMode === 'acoustic') {
          const binIdx = Math.floor(i % 64);
          const freqVal = (freqArray[binIdx] || 0) / 255;
          const wave = Math.sin(baseRadius * 0.2 + time * 3) * (2 + freqVal * 8);

          posArray[i3] = Math.cos(angles[i]) * baseRadius;
          posArray[i3 + 1] = wave;
          posArray[i3 + 2] = Math.sin(angles[i]) * baseRadius;
        } else if (activeMode === 'warp') {
          posArray[i3 + 2] += (baseRadius * 0.1 + audioBoost * 15) * delta * 20;
          if (posArray[i3 + 2] > 100) {
            posArray[i3 + 2] = -120;
          }
        }
      }
      posAttr.needsUpdate = true;

      // Update Orbiting 3D Asteroids in Ring
      orbitingAsteroids.forEach((ast) => {
        ast.angle += ast.speed * (1 + audioBoost * 2.0);
        ast.mesh.position.x = Math.cos(ast.angle) * ast.radius;
        ast.mesh.position.z = Math.sin(ast.angle) * ast.radius;
        ast.mesh.rotation.x += ast.rotSpeed.x;
        ast.mesh.rotation.y += ast.rotSpeed.y;
        ast.mesh.rotation.z += ast.rotSpeed.z;
      });

      // Spawn meteors periodically (slowed down pacing)
      meteorTimer += delta;
      if (meteorTimer >= meteorFrequency) {
        meteorTimer = 0;
        spawnIncomingMeteor();
      }

      // Update Incoming Meteors
      for (let m = activeMeteors.length - 1; m >= 0; m--) {
        const meteor = activeMeteors[m];
        meteor.progress += delta * meteor.speed;

        const t = Math.min(1, meteor.progress);
        const easeT = t * t;
        const currentPos = new THREE.Vector3().lerpVectors(meteor.startPos, meteor.targetPos, easeT);
        meteor.mesh.position.copy(currentPos);

        meteor.mesh.rotateOnAxis(meteor.rotAxis, delta * 6);

        // Update trail
        const tPositions = meteor.trailPositions;
        const trailCount = tPositions.length / 3;
        for (let pt = trailCount - 1; pt > 0; pt--) {
          tPositions[pt * 3] = tPositions[(pt - 1) * 3];
          tPositions[pt * 3 + 1] = tPositions[(pt - 1) * 3 + 1];
          tPositions[pt * 3 + 2] = tPositions[(pt - 1) * 3 + 2];
        }
        tPositions[0] = currentPos.x;
        tPositions[1] = currentPos.y;
        tPositions[2] = currentPos.z;
        meteor.trail.geometry.attributes.position.needsUpdate = true;

        // Collision Hit
        if (meteor.progress >= 1.0) {
          triggerImpact(meteor.targetPos, meteor.size);

          meteorGroup.remove(meteor.mesh);
          meteorGroup.remove(meteor.trail);
          meteor.mesh.geometry.dispose();
          meteor.trail.geometry.dispose();
          (meteor.trail.material as THREE.Material).dispose();

          activeMeteors.splice(m, 1);
        }
      }

      // Update Explosions & Shockwaves (refined & small)
      for (let ex = activeExplosions.length - 1; ex >= 0; ex--) {
        const exp = activeExplosions[ex];
        exp.age += delta;
        const progress = exp.age / exp.maxAge;

        if (progress >= 1.0) {
          saturnSystem.remove(exp.shockwaveMesh);
          saturnSystem.remove(exp.debrisPoints);
          exp.shockwaveMesh.geometry.dispose();
          (exp.shockwaveMesh.material as THREE.Material).dispose();
          exp.debrisPoints.geometry.dispose();
          (exp.debrisPoints.material as THREE.Material).dispose();

          activeExplosions.splice(ex, 1);
          continue;
        }

        // Refined small shockwave expansion
        const shockScale = 1 + progress * 10;
        exp.shockwaveMesh.scale.set(shockScale, shockScale, shockScale);
        (exp.shockwaveMesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, (1 - progress) * 0.85);

        // Disperse debris fragments gently
        const dPosAttr = exp.debrisPoints.geometry.attributes.position;
        const dPositions = dPosAttr.array as Float32Array;
        const dVel = exp.velocities;
        const count = dPositions.length / 3;

        for (let dp = 0; dp < count; dp++) {
          const dp3 = dp * 3;
          dPositions[dp3] += dVel[dp3] * delta;
          dPositions[dp3 + 1] += dVel[dp3 + 1] * delta;
          dPositions[dp3 + 2] += dVel[dp3 + 2] * delta;
          dVel[dp3 + 1] -= 5.5 * delta;
        }
        dPosAttr.needsUpdate = true;
        (exp.debrisPoints.material as THREE.PointsMaterial).opacity = Math.max(0, 1 - progress);

        // Light flash decay
        impactPointLight.intensity = (1 - progress) * 3.6;
      }

      if (activeExplosions.length === 0) {
        impactPointLight.intensity = THREE.MathUtils.lerp(impactPointLight.intensity, 0, 0.1);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      planetGeo.dispose();
      planetMat.dispose();
      planetTexture.dispose();
      hazeGeo.dispose();
      hazeMat.dispose();

      ringGeometry.dispose();
      ringMaterial.dispose();
      dotTexture.dispose();

      orbitingAsteroids.forEach((a) => a.mesh.geometry.dispose());
      rockMaterial.dispose();

      activeMeteors.forEach((m) => {
        m.mesh.geometry.dispose();
        m.trail.geometry.dispose();
      });

      activeExplosions.forEach((e) => {
        e.shockwaveMesh.geometry.dispose();
        e.debrisPoints.geometry.dispose();
      });

      renderer.dispose();
    };
  }, [activeMode, speedMultiplier, isAudioReactive, meteorFrequency, onImpact]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      <div ref={mountRef} className="w-full h-full" />

      {/* Subtle Bottom-Right 3D Visualizer Mode Controller (No HUD Counter) */}
      {interactive && (
        <div className="absolute bottom-6 right-6 pointer-events-auto flex items-center gap-2 z-20">
          <div className="relative">
            {showControls && (
              <div className="absolute bottom-full right-0 mb-3 p-4 bg-[#0d0d12]/95 border border-[#e29d52]/25 rounded-xl shadow-2xl backdrop-blur-md w-72 text-xs space-y-3.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="font-semibold text-white tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#e29d52]" /> 3D Saturn & Meteor Lab
                  </span>
                  <button
                    onClick={() => {
                      setSpeedMultiplier(1);
                      setIsAudioReactive(true);
                      setMeteorFrequency(5.0);
                      handleModeSelect('saturn');
                    }}
                    className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    title="Reset parameters"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>

                {/* Direct Meteor Launch Action */}
                <div>
                  <button
                    onClick={() => triggerManualMeteorRef.current?.()}
                    className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#e29d52] to-[#f3b775] text-neutral-950 font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-[#e29d52]/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                  >
                    <Target className="w-3.5 h-3.5" />
                    <span>Launch Asteroid Strike</span>
                  </button>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1.5">Geometry Mode</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(
                      [
                        { id: 'saturn', label: 'Saturn Rings' },
                        { id: 'nebula', label: 'Sonic Nebula' },
                        { id: 'acoustic', label: 'Harmonic Wave' },
                        { id: 'warp', label: 'Deep Warp' },
                      ] as const
                    ).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleModeSelect(item.id)}
                        className={`px-2 py-1.5 rounded text-left transition-colors truncate cursor-pointer ${
                          activeMode === item.id
                            ? 'bg-[#e29d52] text-black font-semibold'
                            : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Meteor Shower Frequency Slider (Slowed down pacing) */}
                <div className="space-y-1 pt-1 border-t border-white/5">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Impact Pace</span>
                    <span className="font-mono text-[10px] text-[#e29d52]">
                      {meteorFrequency.toFixed(1)}s interval
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2.5"
                    max="9.0"
                    step="0.5"
                    value={meteorFrequency}
                    onChange={(e) => setMeteorFrequency(parseFloat(e.target.value))}
                    className="w-full accent-[#e29d52] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Audio Reactivity</span>
                    <button
                      onClick={() => setIsAudioReactive(!isAudioReactive)}
                      className={`w-8 h-4.5 rounded-full transition-colors relative flex items-center p-0.5 cursor-pointer ${
                        isAudioReactive ? 'bg-[#e29d52]' : 'bg-neutral-700'
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                          isAudioReactive ? 'translate-x-3.5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between text-neutral-400 mb-1">
                      <span>Rotation Speed</span>
                      <span className="font-mono text-[10px] text-[#e29d52]">{speedMultiplier.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="3.0"
                      step="0.1"
                      value={speedMultiplier}
                      onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
                      className="w-full accent-[#e29d52] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowControls(!showControls)}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#121118]/80 hover:bg-[#1b1924] border border-[#e29d52]/25 rounded-lg text-xs text-neutral-300 hover:text-white shadow-lg backdrop-blur-md transition-all duration-150 cursor-pointer"
              aria-label="3D Scene Settings"
            >
              <Sliders className="w-3.5 h-3.5 text-[#e29d52]" />
              <span className="font-mono">SATURN ORBIT SYSTEM</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
