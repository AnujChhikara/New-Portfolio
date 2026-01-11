import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";

type ShapeType = "sphere" | "cube" | "torus";

function ParticleShape({ onBurst }: { onBurst: () => void }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [targetShape, setTargetShape] = useState<ShapeType>("sphere");

  // Progress tracker: 0 = current shape start, 1 = current shape end
  const progressRef = useRef(0);
  const currentShapeIndexRef = useRef(0);
  const targetShapeIndexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onBurstRef = useRef(onBurst);

  // Generate geometry data
  const { spherePos, cubePos, torusPos } = useMemo(() => {
    const count = 25000;
    const sphere = new Float32Array(count * 3);
    const cube = new Float32Array(count * 3);
    const torus = new Float32Array(count * 3);

    // 1. SPHERE
    const radius = 1.5;
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius + (Math.random() - 0.5) * 0.1;
      sphere[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      sphere[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      sphere[i * 3 + 2] = r * Math.cos(phi);
    }

    // 2. CUBE
    const size = 2.2;
    const half = size / 2;
    for (let i = 0; i < count; i++) {
      const face = Math.floor(Math.random() * 6);
      const u = (Math.random() - 0.5) * size;
      const v = (Math.random() - 0.5) * size;
      const noise = (Math.random() - 0.5) * 0.1;
      let x = 0,
        y = 0,
        z = 0;
      switch (face) {
        case 0:
          x = half + noise;
          y = u;
          z = v;
          break;
        case 1:
          x = -half - noise;
          y = u;
          z = v;
          break;
        case 2:
          x = u;
          y = half + noise;
          z = v;
          break;
        case 3:
          x = u;
          y = -half - noise;
          z = v;
          break;
        case 4:
          x = u;
          y = v;
          z = half + noise;
          break;
        case 5:
          x = u;
          y = v;
          z = -half - noise;
          break;
      }
      cube[i * 3] = x;
      cube[i * 3 + 1] = y;
      cube[i * 3 + 2] = z;
    }

    // 3. TORUS
    const majorR = 1.5;
    const minorR = 0.6;
    for (let i = 0; i < count; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;

      const x = (majorR + minorR * Math.cos(v)) * Math.cos(u);
      const y = (majorR + minorR * Math.cos(v)) * Math.sin(u);
      const z = minorR * Math.sin(v);

      const noise = (Math.random() - 0.5) * 0.1;

      torus[i * 3] = x + noise;
      torus[i * 3 + 1] = y + noise;
      torus[i * 3 + 2] = z + noise;
    }

    return {
      spherePos: sphere,
      cubePos: cube,
      torusPos: torus,
    };
  }, []);

  const shapes = useMemo(
    () => [spherePos, cubePos, torusPos],
    [spherePos, cubePos, torusPos]
  );

  // Keep onBurst ref updated
  useEffect(() => {
    onBurstRef.current = onBurst;
  }, [onBurst]);

  useEffect(() => {
    // Sequence Logic
    // Shape hold time: 0.5s
    // Morph time: 0.8s (handled in animate loop via progress speed)

    // Start with sphere (index 0)
    currentShapeIndexRef.current = 0;
    targetShapeIndexRef.current = 0;
    progressRef.current = 0;

    let step = 0;
    const cycleShapes = () => {
      step++;
      
      if (step > 2) {
        // After Torus (index 2), trigger completion
        timeoutRef.current = setTimeout(() => {
          onBurstRef.current();
        }, 800);
        return;
      }

      // Update indices: source is previous, target is current step
      currentShapeIndexRef.current = step - 1;
      targetShapeIndexRef.current = step;
      progressRef.current = 0; // Reset interpolation progress

      const nextShapeName = ["sphere", "cube", "torus"][
        step
      ] as ShapeType;
      setTargetShape(nextShapeName);

      // Schedule next cycle
      // 0.8s morph + 0.4s hold = 1.2s total per shape
      timeoutRef.current = setTimeout(cycleShapes, 1200);
    };

    // Start sequence after initial load
    timeoutRef.current = setTimeout(cycleShapes, 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []); // Empty deps - only run once on mount

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    // ROTATION
    pointsRef.current.rotation.y += 0.008;
    pointsRef.current.rotation.x += 0.004;

    // ANIMATION / MORPHING
    // Use explicit source and target indices to avoid calculation errors
    const sourceIndex = currentShapeIndexRef.current;
    const targetIndex = targetShapeIndexRef.current;

    // Only animate if we're transitioning between shapes
    if (sourceIndex !== targetIndex) {
      const sourcePos = shapes[sourceIndex];
      const targetPos = shapes[targetIndex];

      // Animate progress using delta time for frame-rate independence
      // Target duration: 0.8s for morph
      const morphDuration = 0.8;
      if (progressRef.current < 1) {
        progressRef.current = Math.min(
          1,
          progressRef.current + delta / morphDuration
        );
      }

      // Easing (Smoothstep for smooth transitions)
      const t =
        progressRef.current *
        progressRef.current *
        (3 - 2 * progressRef.current);

      // Interpolate positions
      for (let i = 0; i < positions.length; i++) {
        positions[i] = sourcePos[i] + (targetPos[i] - sourcePos[i]) * t;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    } else {
      // When transition is complete, ensure we're at the target shape
      const targetPos = shapes[targetIndex];
      for (let i = 0; i < positions.length; i++) {
        positions[i] = targetPos[i];
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Init with sphere
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={spherePos.length / 3}
          array={new Float32Array(spherePos)}
          itemSize={3}
          args={[new Float32Array(spherePos), 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#aaaaaa"
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}

export function SphereLoader({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleBurst = () => {
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 500);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 bg-black"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#000000"]} />
        <ParticleShape onBurst={handleBurst} />
      </Canvas>

      <motion.div
        animate={{ opacity: isExiting ? 0 : 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 font-mono text-sm tracking-widest uppercase"
      >
        Loading
      </motion.div>
    </motion.div>
  );
}
