import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Compass, 
  Zap,
  ChevronLeft,
  ChevronRight,
  FastForward,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';

export type SimulationMode = 'spix' | 'syndesmotomie' | 'luxation' | 'separation' | 'avulsion';

export interface StepDefinition {
  mode: SimulationMode;
  stepNumber: number;
  shortName: string;
  badge: string;
  cameraPreset: { theta: number; phi: number; radius: number };
}

export const SURGICAL_STEPS: StepDefinition[] = [
  {
    mode: 'spix',
    stepNumber: 1,
    shortName: "1. Repère Spix & Nerf",
    badge: "Temps Préparatoire",
    cameraPreset: { theta: 0.9, phi: 0.38, radius: 9.5 }
  },
  {
    mode: 'syndesmotomie',
    stepNumber: 2,
    shortName: "2. Syndesmotomie",
    badge: "1er Temps Opératoire",
    cameraPreset: { theta: 0.35, phi: 0.52, radius: 8.5 }
  },
  {
    mode: 'luxation',
    stepNumber: 3,
    shortName: "3. Luxation Mésiale",
    badge: "2ème Temps Opératoire",
    cameraPreset: { theta: 0.45, phi: 0.32, radius: 8.8 }
  },
  {
    mode: 'separation',
    stepNumber: 4,
    shortName: "4. Séparation Zekrya",
    badge: "Chirurgie Radiculaire",
    cameraPreset: { theta: 0.12, phi: 0.62, radius: 7.8 }
  },
  {
    mode: 'avulsion',
    stepNumber: 5,
    shortName: "5. Avulsion au Davier",
    badge: "3ème Temps Opératoire",
    cameraPreset: { theta: 0.55, phi: 0.35, radius: 10.5 }
  }
];

interface Dental3DViewerProps {
  initialMode?: SimulationMode;
}

export const Dental3DViewer: React.FC<Dental3DViewerProps> = ({ initialMode = 'luxation' }) => {
  // Dedicated container for Three.js canvas ONLY (no React children inside)
  const canvasMountRef = useRef<HTMLDivElement>(null);

  // Active step state
  const initialIndex = Math.max(0, SURGICAL_STEPS.findIndex(s => s.mode === initialMode));
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(initialIndex >= 0 ? initialIndex : 2);
  const currentStep = SURGICAL_STEPS[currentStepIdx];
  const mode = currentStep.mode;

  // Active mode ref for animation loop closure
  const modeRef = useRef<SimulationMode>(mode);
  modeRef.current = mode;

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const isPlayingRef = useRef<boolean>(true);
  isPlayingRef.current = isPlaying;

  const [isAutoTour, setIsAutoTour] = useState<boolean>(false);
  const [showBone, setShowBone] = useState<boolean>(true);
  const [showLigament, setShowLigament] = useState<boolean>(true);
  const [showNerve, setShowNerve] = useState<boolean>(true);
  const [showInstrument, setShowInstrument] = useState<boolean>(true);

  // Three.js scene refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const toothGroupRef = useRef<THREE.Group | null>(null);
  const boneMeshRef = useRef<THREE.Mesh | null>(null);
  const ligamentMeshRef = useRef<THREE.Group | null>(null);
  const nerveMeshRef = useRef<THREE.Mesh | null>(null);
  const instrumentGroupRef = useRef<THREE.Group | null>(null);
  const fulcrumIndicatorRef = useRef<THREE.Mesh | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const clockRef = useRef(new THREE.Clock());

  // Mouse / camera state
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const cameraRotationRef = useRef({ theta: 0.45, phi: 0.35, radius: 9 });
  const targetRotationRef = useRef({ theta: 0.45, phi: 0.35, radius: 9 });
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Synchronize when initialMode prop changes from external tabs
  useEffect(() => {
    if (initialMode) {
      const idx = SURGICAL_STEPS.findIndex(s => s.mode === initialMode);
      if (idx !== -1 && idx !== currentStepIdx) {
        setCurrentStepIdx(idx);
      }
    }
  }, [initialMode]);

  // Main Three.js Scene Setup (Mounts once)
  useEffect(() => {
    if (!canvasMountRef.current) return;
    const mountEl = canvasMountRef.current;
    const width = mountEl.clientWidth || 800;
    const height = mountEl.clientHeight || 480;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x090d16);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    cameraRef.current = camera;
    applyCameraTransform();

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Attach canvas into dedicated container
    mountEl.replaceChildren(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.8);
    dirLight1.position.set(6, 10, 8);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf472b6, 0.6);
    dirLight2.position.set(-6, -4, -6);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.3, 20);
    pointLight.position.set(0, 4, 3);
    scene.add(pointLight);

    // Grid Floor
    const grid = new THREE.GridHelper(16, 24, 0x1e293b, 0x0f172a);
    grid.position.y = -2.8;
    scene.add(grid);

    // 5. Construct Anatomy Meshes
    buildAnatomy(scene);

    // 6. Handle Resizing
    const handleResize = () => {
      if (!mountEl || !rendererRef.current || !cameraRef.current) return;
      const w = mountEl.clientWidth;
      const h = mountEl.clientHeight || 480;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 7. Mouse Orbit Controls
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - prevMousePosRef.current.x;
      const deltaY = e.clientY - prevMousePosRef.current.y;
      cameraRotationRef.current.theta -= deltaX * 0.008;
      cameraRotationRef.current.phi = Math.max(0.08, Math.min(Math.PI / 2.2, cameraRotationRef.current.phi + deltaY * 0.008));
      targetRotationRef.current = { ...cameraRotationRef.current };
      prevMousePosRef.current = { x: e.clientX, y: e.clientY };
      applyCameraTransform();
    };
    const onMouseUp = () => {
      isDraggingRef.current = false;
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      cameraRotationRef.current.radius = Math.max(4.5, Math.min(18, cameraRotationRef.current.radius + e.deltaY * 0.01));
      targetRotationRef.current.radius = cameraRotationRef.current.radius;
      applyCameraTransform();
    };

    // Touch controls for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePosRef.current.x;
      const deltaY = e.touches[0].clientY - prevMousePosRef.current.y;
      cameraRotationRef.current.theta -= deltaX * 0.01;
      cameraRotationRef.current.phi = Math.max(0.08, Math.min(Math.PI / 2.2, cameraRotationRef.current.phi + deltaY * 0.01));
      targetRotationRef.current = { ...cameraRotationRef.current };
      prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      applyCameraTransform();
    };
    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    mountEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    mountEl.addEventListener('wheel', onWheel, { passive: false });
    mountEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 8. Animation Render Loop
    let t = 0;
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clockRef.current.getDelta();
      t += delta;

      // Smooth camera interpolation towards target
      const cur = cameraRotationRef.current;
      const tar = targetRotationRef.current;
      cur.theta += (tar.theta - cur.theta) * 0.08;
      cur.phi += (tar.phi - cur.phi) * 0.08;
      cur.radius += (tar.radius - cur.radius) * 0.08;
      applyCameraTransform();

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        if (isPlayingRef.current) {
          runSimulationPhysics(t);
        }
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      mountEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      mountEl.removeEventListener('wheel', onWheel);
      mountEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
    };
  }, []);

  // Update instrument and camera preset safely whenever currentStepIdx changes
  useEffect(() => {
    // 1. Reset tooth position and rotation
    if (toothGroupRef.current) {
      toothGroupRef.current.position.set(0, 0, 0);
      toothGroupRef.current.rotation.set(0, 0, 0);
    }
    // 2. Rebuild instrument safely
    rebuildInstrument(mode);
    // 3. Smoothly target preset camera angle
    targetRotationRef.current = { ...currentStep.cameraPreset };
  }, [currentStepIdx]);

  // Auto-tour timer
  useEffect(() => {
    if (!isAutoTour) return;
    const interval = setInterval(() => {
      setCurrentStepIdx(prev => (prev + 1) % SURGICAL_STEPS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoTour]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextStep();
      } else if (e.key === 'ArrowLeft') {
        goToPrevStep();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const applyCameraTransform = () => {
    if (!cameraRef.current) return;
    const { theta, phi, radius } = cameraRotationRef.current;
    const safeRadius = Math.max(4, Math.min(18, Number.isFinite(radius) ? radius : 9));
    const safePhi = Math.max(0.08, Math.min(Math.PI / 2.2, Number.isFinite(phi) ? phi : 0.35));
    const safeTheta = Number.isFinite(theta) ? theta : 0.45;

    cameraRef.current.position.x = safeRadius * Math.sin(safeTheta) * Math.cos(safePhi);
    cameraRef.current.position.y = safeRadius * Math.sin(safePhi);
    cameraRef.current.position.z = safeRadius * Math.cos(safeTheta) * Math.cos(safePhi);
    cameraRef.current.lookAt(0, 0.4, 0);
  };

  const goToNextStep = () => {
    setCurrentStepIdx(prev => Math.min(SURGICAL_STEPS.length - 1, prev + 1));
  };

  const goToPrevStep = () => {
    setCurrentStepIdx(prev => Math.max(0, prev - 1));
  };

  const setStepByIndex = (idx: number) => {
    if (idx >= 0 && idx < SURGICAL_STEPS.length) {
      setCurrentStepIdx(idx);
      setIsAutoTour(false);
    }
  };

  const buildAnatomy = (scene: THREE.Scene) => {
    // === 1. TOOTH GROUP ===
    const toothGroup = new THREE.Group();
    toothGroupRef.current = toothGroup;

    const enamelMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.15,
      metalness: 0.05,
    });
    const dentinMaterial = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      roughness: 0.3,
    });

    // Anatomical Crown (Molar)
    const crownGeo = new THREE.CylinderGeometry(1.15, 1.0, 1.4, 16);
    const crownMesh = new THREE.Mesh(crownGeo, enamelMaterial);
    crownMesh.position.y = 1.3;
    crownMesh.castShadow = true;
    toothGroup.add(crownMesh);

    // Cusps
    const cuspGeo = new THREE.SphereGeometry(0.35, 12, 12);
    const cuspPositions = [
      [-0.45, 1.95, -0.45],
      [0.45, 1.95, -0.45],
      [-0.45, 1.95, 0.45],
      [0.45, 1.95, 0.45],
    ];
    cuspPositions.forEach(([cx, cy, cz]) => {
      const cusp = new THREE.Mesh(cuspGeo, enamelMaterial);
      cusp.position.set(cx, cy, cz);
      cusp.scale.set(1.1, 0.5, 1.1);
      toothGroup.add(cusp);
    });

    // Cervical Line / Collet
    const neckGeo = new THREE.CylinderGeometry(1.0, 0.9, 0.4, 16);
    const neckMesh = new THREE.Mesh(neckGeo, dentinMaterial);
    neckMesh.position.y = 0.5;
    toothGroup.add(neckMesh);

    // Mesial Root
    const rootMaterial = new THREE.MeshStandardMaterial({
      color: 0xfde047,
      roughness: 0.4,
    });
    const mesialRoot = new THREE.Mesh(new THREE.ConeGeometry(0.42, 2.2, 16), rootMaterial);
    mesialRoot.position.set(-0.45, -0.8, 0);
    mesialRoot.rotation.z = -0.12;
    mesialRoot.rotation.x = 0.05;
    mesialRoot.castShadow = true;
    toothGroup.add(mesialRoot);

    // Distal Root
    const distalRoot = new THREE.Mesh(new THREE.ConeGeometry(0.4, 2.1, 16), rootMaterial);
    distalRoot.position.set(0.45, -0.75, 0);
    distalRoot.rotation.z = 0.14;
    distalRoot.rotation.x = -0.04;
    distalRoot.castShadow = true;
    toothGroup.add(distalRoot);

    // Furcation
    const furcationMesh = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.6), rootMaterial);
    furcationMesh.position.set(0, 0.1, 0);
    toothGroup.add(furcationMesh);

    scene.add(toothGroup);

    // === 2. PERIODONTAL LIGAMENT (DESMODONTE) ===
    const ligamentMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      roughness: 0.6,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide
    });
    const ligGroup = new THREE.Group();
    const lm = new THREE.Mesh(new THREE.ConeGeometry(0.5, 2.25, 14, 1, true), ligamentMat);
    lm.position.set(-0.45, -0.8, 0);
    lm.rotation.z = -0.12;
    const ld = new THREE.Mesh(new THREE.ConeGeometry(0.48, 2.15, 14, 1, true), ligamentMat);
    ld.position.set(0.45, -0.75, 0);
    ld.rotation.z = 0.14;
    ligGroup.add(lm);
    ligGroup.add(ld);
    ligamentMeshRef.current = ligGroup;
    scene.add(ligGroup);

    // === 3. ALVEOLAR BONE BLOCK ===
    const boneMaterial = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.8,
      metalness: 0.1,
      transparent: true,
      opacity: 0.55,
    });
    const boneMesh = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3.2, 3.4), boneMaterial);
    boneMesh.position.set(0, -1.3, 0);
    boneMesh.receiveShadow = true;
    boneMeshRef.current = boneMesh;
    scene.add(boneMesh);

    // === 4. INFERIOR ALVEOLAR NERVE CANAL ===
    const nerveMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      roughness: 0.2,
      emissive: 0xca8a04,
      emissiveIntensity: 0.4,
    });
    const nerveMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 5.0, 16), nerveMat);
    nerveMesh.rotation.z = Math.PI / 2;
    nerveMesh.position.set(0, -2.3, 0.1);
    nerveMeshRef.current = nerveMesh;
    scene.add(nerveMesh);

    // === 5. FULCRUM POINT INDICATOR ===
    const fulcrumMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x059669,
        emissiveIntensity: 0.7,
      })
    );
    fulcrumMesh.position.set(-1.1, 0.2, 0);
    fulcrumIndicatorRef.current = fulcrumMesh;
    scene.add(fulcrumMesh);

    // === 6. SURGICAL INSTRUMENTS GROUP ===
    const instGroup = new THREE.Group();
    instrumentGroupRef.current = instGroup;
    scene.add(instGroup);

    rebuildInstrument(mode);
  };

  const rebuildInstrument = (simMode: SimulationMode) => {
    if (!instrumentGroupRef.current) return;
    const group = instrumentGroupRef.current;
    
    // Clear previous instrument children cleanly
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }
    // Reset group transforms
    group.position.set(0, 0, 0);
    group.rotation.set(0, 0, 0);

    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.15,
    });
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.1,
    });

    if (simMode === 'syndesmotomie') {
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3.2, 16), metalMat);
      handle.position.set(-1.4, 2.1, 0.8);
      handle.rotation.z = 0.55;
      handle.rotation.x = -0.3;

      const bladeCurve = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.05, 8, 24, Math.PI / 1.8), steelMat);
      bladeCurve.position.set(-0.95, 0.7, 0.35);
      bladeCurve.rotation.z = 1.1;

      group.add(handle);
      group.add(bladeCurve);
    } else if (simMode === 'luxation') {
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 2.6, 16), metalMat);
      handle.position.set(-2.4, 1.6, 0.4);
      handle.rotation.z = 0.75;

      const shank = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.8, 16), steelMat);
      shank.position.set(-1.4, 0.8, 0.2);
      shank.rotation.z = 0.75;

      const blade = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.6, 12), steelMat);
      blade.position.set(-0.85, 0.3, 0.05);
      blade.rotation.z = -1.4;

      group.add(handle);
      group.add(shank);
      group.add(blade);
    } else if (simMode === 'avulsion') {
      const handleL = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.14, 3.0, 16), metalMat);
      handleL.position.set(-1.6, 3.4, 0.6);
      handleL.rotation.x = 0.3;

      const handleR = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.14, 3.0, 16), metalMat);
      handleR.position.set(1.6, 3.4, 0.6);
      handleR.rotation.x = -0.3;

      const joint = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.4, 16), steelMat);
      joint.position.set(0, 2.2, 0.4);
      joint.rotation.z = Math.PI / 2;

      const beakV = new THREE.Mesh(new THREE.BoxGeometry(0.25, 1.2, 0.2), steelMat);
      beakV.position.set(-0.95, 1.2, 0.2);
      beakV.rotation.z = -0.3;

      const beakL = new THREE.Mesh(new THREE.BoxGeometry(0.25, 1.2, 0.2), steelMat);
      beakL.position.set(0.95, 1.2, 0.2);
      beakL.rotation.z = 0.3;

      group.add(handleL);
      group.add(handleR);
      group.add(joint);
      group.add(beakV);
      group.add(beakL);
    } else if (simMode === 'separation') {
      const turbineHead = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.9, 16), metalMat);
      turbineHead.position.set(0, 3.2, 0);
      turbineHead.rotation.x = Math.PI / 2;

      const burShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.2, 12), steelMat);
      burShaft.position.set(0, 1.8, 0);

      const zekryaBur = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.9, 12), new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        metalness: 0.8,
        roughness: 0.3,
      }));
      zekryaBur.position.set(0, 0.5, 0);
      zekryaBur.rotation.x = Math.PI;

      group.add(turbineHead);
      group.add(burShaft);
      group.add(zekryaBur);
    } else if (simMode === 'spix') {
      const syringeBody = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 2.8, 16), metalMat);
      syringeBody.position.set(-2.8, 1.6, 1.8);
      syringeBody.rotation.z = 0.9;
      syringeBody.rotation.y = -0.4;

      const needle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.6, 8), steelMat);
      needle.position.set(-1.2, 0.6, 0.8);
      needle.rotation.z = 0.9;
      needle.rotation.y = -0.4;

      group.add(syringeBody);
      group.add(needle);
    }
  };

  const runSimulationPhysics = (t: number) => {
    if (!toothGroupRef.current) return;
    const tooth = toothGroupRef.current;
    const inst = instrumentGroupRef.current;
    const activeMode = modeRef.current; // Read from ref, never stale

    if (activeMode === 'syndesmotomie') {
      const angle = t * 1.8;
      const radius = 1.05;
      tooth.rotation.set(0, 0, 0);
      tooth.position.set(0, 0, 0);
      if (inst) {
        inst.position.x = Math.cos(angle) * radius * 0.4;
        inst.position.z = Math.sin(angle) * radius * 0.4;
        inst.position.y = Math.sin(t * 3.5) * 0.08;
      }
    } else if (activeMode === 'luxation') {
      const cycle = Math.sin(t * 2.2);
      tooth.rotation.z = Math.max(0, cycle) * 0.14;
      tooth.rotation.y = cycle * 0.08;
      tooth.position.y = Math.max(0, cycle) * 0.18;
      tooth.position.x = Math.max(0, cycle) * 0.12;

      if (inst) {
        inst.rotation.z = Math.sin(t * 2.2) * 0.2;
        inst.position.y = Math.sin(t * 2.2) * 0.06;
      }
    } else if (activeMode === 'avulsion') {
      const phase = (t * 1.2) % (Math.PI * 2);
      const amp = 0.18;
      tooth.rotation.z = Math.sin(phase) * amp;
      tooth.rotation.x = Math.cos(phase) * amp;
      const lift = Math.min(1.8, Math.max(0, (Math.sin(t * 0.8) + 1) * 0.8));
      tooth.position.y = lift;

      if (inst) {
        inst.position.y = lift;
        inst.rotation.z = Math.sin(phase) * (amp * 0.6);
        inst.rotation.x = Math.cos(phase) * (amp * 0.6);
      }
    } else if (activeMode === 'separation') {
      tooth.position.set(0, 0, 0);
      tooth.rotation.set(0, 0, 0);
      if (inst) {
        inst.position.x = Math.sin(t * 14) * 0.04;
        inst.position.z = Math.sin(t * 3) * 0.25;
      }
    } else if (activeMode === 'spix') {
      tooth.position.set(0, 0, 0);
      tooth.rotation.set(0, 0, 0);
      if (inst) {
        inst.position.x = Math.sin(t * 1.5) * 0.1;
      }
    }
  };

  const resetCamera = () => {
    targetRotationRef.current = { ...currentStep.cameraPreset };
  };

  // Toggle visual layers
  useEffect(() => {
    if (boneMeshRef.current) boneMeshRef.current.visible = showBone;
  }, [showBone]);
  useEffect(() => {
    if (ligamentMeshRef.current) ligamentMeshRef.current.visible = showLigament;
  }, [showLigament]);
  useEffect(() => {
    if (nerveMeshRef.current) nerveMeshRef.current.visible = showNerve;
  }, [showNerve]);
  useEffect(() => {
    if (instrumentGroupRef.current) instrumentGroupRef.current.visible = showInstrument;
  }, [showInstrument]);

  // Mode information
  const modeInfo: Record<SimulationMode, {
    title: string;
    step: string;
    instruments: string;
    biomechanics: string;
    axiom: string;
    keyPoints: string[];
  }> = {
    spix: {
      title: "Étape 1 : Anatomie & Repérage de l'Épine de Spix",
      step: "Repérage anatomique de l'épine de Spix (Spina mandibularis) et du canal dentaire inférieur avant toute exodontie mandibulaire.",
      instruments: "Seringue à carpule avec aiguille longue stérile (27G, 35 mm).",
      biomechanics: "Pénétration 1 cm au-dessus du plan occlusal. Contact osseux franc puis injection lente.",
      axiom: "« La Spix est réservée aux molaires inférieures et doit OBLIGATOIREMENT être complétée par l'infiltration du nerf buccal. » (Slide 23)",
      keyPoints: [
        "Infiltration du nerf buccal indispensable pour la gencive vestibulaire",
        "Aspiration préalable obligatoire pour exclure l'injection intravasculaire",
        "Éviter l'injection trop postérieure (loge parotidienne) prévenant la paralysie faciale"
      ]
    },
    syndesmotomie: {
      title: "Étape 2 : Syndesmotomie Circonférentielle",
      step: "Section franche de l'attache épithéliale et des fibres coronaires du ligament alvéolo-dentaire jusqu'au contact osseux.",
      instruments: "Syndesmotome faucille (tenue en porte-plume / stylo, appui digital ferme sur dents voisines).",
      biomechanics: "Section circonférentielle 360° pour libérer le collet anatomique sans déchirer la gencive.",
      axiom: "« Le syndesmotome est tenu comme un stylo et on prend appui par les autres doigts pour éviter tout dérapage. » (Slide 24)",
      keyPoints: [
        "Tenue en porte-plume (stylo) obligatoire",
        "Appui digital strict sur dents voisines pour éviter tout dérapage vers le nerf lingual",
        "Le syndesmotome faucille participe aussi à la luxation initiale"
      ]
    },
    luxation: {
      title: "Étape 3 : Luxation Mésiale & Biomécanique",
      step: "Élargissement de l'alvéole osseuse et rupture des fibres desmodontales profondes par bras de levier et rotation.",
      instruments: "Élévateur droit (manche en paume, concavité vers la face mésiale), Coupland, Winter.",
      biomechanics: "Effet de Levier (L/H = 2.5) + Effet d'Axe de Roue (R/r = 4.6). Point d'appui ferme sur l'os vestibulaire mésial, demi-tour anti-horaire.",
      axiom: "« Attention pour ne pas luxer la dent voisine ! Toujours commencer par la dent la plus distale lors d'extractions multiples. » (Slide 26)",
      keyPoints: [
        "Point d'appui strict sur l'os alvéolaire ou le septum mésial (interdit sur la dent voisine)",
        "Rotation d'un demi-tour dans le sens inverse des aiguilles d'une montre",
        "Commencer toujours par la dent la plus distale lors d'extractions adjacentes"
      ]
    },
    separation: {
      title: "Étape 4 : Odontosection (Séparation Radiculaire)",
      step: "Section chirurgicale de la furcation des molaires délabrées ou divergentes avant luxation unitaire.",
      instruments: "Fraise Zekrya chirurgicale sous irrigation abondante, puis élévateur de Winter triangulaire.",
      biomechanics: "Transforme une molaire pluriradiculée bloquée en deux entités monoradiculées luxables séparément.",
      axiom: "« Évite la fracture de la corticale osseuse ou de l'angle mandibulaire lors d'extractions complexes. » (Slide 54-55)",
      keyPoints: [
        "Indiquée sur molaire délabrée sans prise ou à racines divergentes",
        "Section de la furcation de part en part à la fraise Zekrya",
        "Luxation indépendante de chaque racine résiduelle à l'élévateur de Winter"
      ]
    },
    avulsion: {
      title: "Étape 5 : Avulsion Finale au Davier & Hémostase",
      step: "Préhension sous-gingivale au collet osseux, mouvements de dilatation et extraction définitive hors de l'alvéole.",
      instruments: "Davier mandibulaire à angle droit (90°) à mors striés concaves et éperons de furcation.",
      biomechanics: "Circumduction pour pluriradiculées afin de dilater l'alvéole et rompre les fibres sans fracturer les corticales.",
      axiom: "« Règle d'or : Maxillaire = mors et branches dans une même ligne (180°) ; Mandibule = angle droit (90°). » (Slide 40)",
      keyPoints: [
        "Davier mandibulaire à angle droit (90°) à 2 éperons inter-radiculaires",
        "Mouvement de circumduction ample (latéralité pure très peu recommandée)",
        "Curetage uniquement si lésion apicale à la radio ; morsure 20-30 min sur compresse"
      ]
    }
  };

  const current = modeInfo[mode];

  return (
    <div className="relative flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-0">
      
      {/* Top Surgical Stepper Bar */}
      <div className="bg-slate-950 border-b border-slate-800 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">
            Protocole Chirurgical 3D :
          </span>
          <span className="text-xs text-slate-400 font-semibold">
            Étape {currentStep.stepNumber} sur {SURGICAL_STEPS.length}
          </span>
        </div>

        {/* 5-Step Segmented Navigation Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {SURGICAL_STEPS.map((s, idx) => {
            const isActive = idx === currentStepIdx;
            return (
              <button
                key={s.mode}
                onClick={() => setStepByIndex(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-teal-500 text-slate-950 shadow-md scale-102'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono ${
                  isActive ? 'bg-slate-950 text-teal-400 font-bold' : 'bg-slate-800 text-slate-400'
                }`}>
                  {s.stepNumber}
                </span>
                <span className="hidden sm:inline">{s.shortName.replace(/^\d+\.\s*/, '')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Stage Container */}
      <div className="relative w-full h-[460px] sm:h-[500px] overflow-hidden select-none">
        
        {/* Dedicated Canvas Mount (ZERO React children inside to prevent DOM conflict) */}
        <div 
          ref={canvasMountRef} 
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        />

        {/* Floating Top Controls Overlay */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <div className="pointer-events-auto flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3.5 py-2 border border-slate-700/80 rounded-xl text-xs shadow-lg">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="font-bold text-slate-100">{currentStep.badge} :</span>
            <span className="text-teal-400 font-mono font-semibold">{currentStep.shortName}</span>
          </div>

          <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md p-1 border border-slate-700/80 rounded-xl text-xs shadow-lg">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Mettre en pause l'animation 3D" : "Lancer l'animation 3D"}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-teal-400" />}
            </button>
            <button
              onClick={resetCamera}
              title="Réorienter vers l'angle chirurgical idéal"
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsAutoTour(!isAutoTour)}
              title="Défilement automatique des étapes"
              className={`p-2 rounded-lg transition-colors font-mono text-[11px] flex items-center gap-1 ${
                isAutoTour ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FastForward className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Auto-Tour</span>
            </button>
          </div>
        </div>

        {/* Large Navigation Arrows Overlay */}
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
          <button
            onClick={goToPrevStep}
            disabled={currentStepIdx === 0}
            title="Étape Précédente"
            className={`pointer-events-auto p-3 rounded-2xl backdrop-blur-md border transition-all shadow-xl ${
              currentStepIdx === 0
                ? 'opacity-25 cursor-not-allowed bg-slate-950/40 border-slate-800 text-slate-600'
                : 'bg-slate-950/80 border-slate-700 text-white hover:bg-teal-500 hover:text-slate-950 hover:scale-110 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none z-10">
          <button
            onClick={goToNextStep}
            disabled={currentStepIdx === SURGICAL_STEPS.length - 1}
            title="Étape Suivante"
            className={`pointer-events-auto p-3 rounded-2xl backdrop-blur-md border transition-all shadow-xl ${
              currentStepIdx === SURGICAL_STEPS.length - 1
                ? 'opacity-25 cursor-not-allowed bg-slate-950/40 border-slate-800 text-slate-600'
                : 'bg-slate-950/80 border-slate-700 text-white hover:bg-teal-500 hover:text-slate-950 hover:scale-110 active:scale-95'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* 3D Interaction Tip */}
        <div className="absolute bottom-4 left-4 pointer-events-none flex items-center gap-2 text-xs text-slate-400 bg-slate-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-800/80">
          <Compass className="w-4 h-4 text-teal-400 animate-spin-slow" />
          <span>Faites glisser pour tourner à 360° · Molette pour zoomer</span>
        </div>

        {/* Live Fulcrum & Physics Overlay in Luxation mode */}
        {mode === 'luxation' && (
          <div className="absolute top-20 right-4 pointer-events-none bg-slate-950/90 backdrop-blur-md p-3.5 border border-emerald-500/40 rounded-xl text-xs max-w-[220px] space-y-1.5 shadow-xl">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Zap className="w-4 h-4" />
              <span>Biomécanique Active (Slide 36-37)</span>
            </div>
            <div className="text-slate-300 text-[11px] leading-tight">
              • Appui : <strong className="text-emerald-300">Os vestibulaire mésial</strong>
            </div>
            <div className="text-slate-300 text-[11px] leading-tight">
              • Levier : <strong className="font-mono text-teal-300">L/H = 10/4 = 2.5</strong>
            </div>
            <div className="text-slate-300 text-[11px] leading-tight">
              • Axe de roue : <strong className="font-mono text-teal-300">42/9 = 4.6</strong>
            </div>
            <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
              Rotation 1/2 tour anti-horaire
            </div>
          </div>
        )}

        {/* Layer Toggles Floating */}
        <div className="absolute bottom-4 right-4 pointer-events-auto flex items-center gap-1 bg-slate-950/85 backdrop-blur-md p-1.5 border border-slate-800 rounded-xl text-xs shadow-lg">
          <span className="text-[11px] text-slate-400 px-1.5 hidden sm:inline">Calques :</span>
          <button
            onClick={() => setShowBone(!showBone)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              showBone ? 'bg-slate-800 text-slate-200 font-bold' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Os
          </button>
          <button
            onClick={() => setShowLigament(!showLigament)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              showLigament ? 'bg-rose-950/70 text-rose-300 border border-rose-800/50 font-bold' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Ligament
          </button>
          <button
            onClick={() => setShowNerve(!showNerve)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              showNerve ? 'bg-amber-950/70 text-amber-300 border border-amber-800/50 font-bold' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Nerf
          </button>
          <button
            onClick={() => setShowInstrument(!showInstrument)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              showInstrument ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-800/50 font-bold' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Instrument
          </button>
        </div>
      </div>

      {/* Interactive Step Navigator Banner Below Canvas */}
      <div className="bg-slate-950 border-t border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={goToPrevStep}
          disabled={currentStepIdx === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            currentStepIdx === 0
              ? 'opacity-30 cursor-not-allowed bg-slate-900 text-slate-500'
              : 'bg-slate-800 hover:bg-slate-700 text-white shadow-sm'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Étape Précédente</span>
        </button>

        {/* Step Progress Pills */}
        <div className="flex items-center justify-center gap-2">
          {SURGICAL_STEPS.map((s, idx) => (
            <button
              key={s.mode}
              onClick={() => setStepByIndex(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentStepIdx
                  ? 'w-8 bg-teal-400'
                  : idx < currentStepIdx
                  ? 'w-3 bg-emerald-500'
                  : 'w-3 bg-slate-800 hover:bg-slate-700'
              }`}
              title={`Aller à l'étape ${s.stepNumber} : ${s.shortName}`}
            />
          ))}
        </div>

        <button
          onClick={goToNextStep}
          disabled={currentStepIdx === SURGICAL_STEPS.length - 1}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            currentStepIdx === SURGICAL_STEPS.length - 1
              ? 'opacity-30 cursor-not-allowed bg-slate-900 text-slate-500'
              : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md'
          }`}
        >
          <span>Étape Suivante</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Explanatory Clinical Deck (Large, readable, high eye-comfort) */}
      <div className="p-6 sm:p-8 bg-slate-950/95 border-t border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-6 bg-teal-500 rounded-full" />
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
                {current.title}
              </h3>
            </div>
            
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
              {current.step}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-medium block mb-1">Instrumentation Requise :</span>
                <span className="text-slate-100 font-semibold">{current.instruments}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-medium block mb-1">Biomécanique & Physique :</span>
                <span className="text-teal-300 font-semibold">{current.biomechanics}</span>
              </div>
            </div>

            {/* Checklist items for this step */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Directives Opératoires de l'Étape :
              </span>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                {current.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl text-xs sm:text-sm space-y-2 shadow-lg">
              <div className="flex items-center gap-2 text-teal-400 font-bold uppercase tracking-wider text-xs">
                <Sparkles className="w-4 h-4" />
                <span>Principe Universitaire</span>
              </div>
              <p className="text-slate-200 italic leading-relaxed font-medium">
                {current.axiom}
              </p>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                Clinique Dentaire de Monastir · Pr Ag Adel BOUGUEZZI
              </div>
            </div>

            <div className="p-4 rounded-xl bg-teal-950/20 border border-teal-800/40 text-xs text-slate-300 flex items-center justify-between">
              <span>Raccourcis : <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-slate-200">←</kbd> et <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-slate-200">→</kbd> pour naviguer</span>
              <Info className="w-4 h-4 text-teal-400 shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
