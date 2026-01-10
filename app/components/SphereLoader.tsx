import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";

type ShapeType = "sphere" | "cube" | "pyramid" | "torus" | "burst";

function ParticleShape({ onBurst }: { onBurst: () => void }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [targetShape, setTargetShape] = useState<ShapeType>("sphere");

  // Progress tracker: 0 = current shape start, 1 = current shape end
  const progressRef = useRef(0);
  const currentShapeIndexRef = useRef(0);

  // Generate geometry data
  const { spherePos, cubePos, pyramidPos, torusPos } = useMemo(() => {
    const count = 25000;
    const sphere = new Float32Array(count * 3);
    const cube = new Float32Array(count * 3);
    const pyramid = new Float32Array(count * 3);
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

    // 3. PYRAMID (Tetrahedron)
    // 4 faces. Vertices: (1,1,1), (1,-1,-1), (-1,1,-1), (-1,-1,1) * scale
    const pSize = 1.8;
    const v0 = [pSize, pSize, pSize];
    const v1 = [pSize, -pSize, -pSize];
    const v2 = [-pSize, pSize, -pSize];
    const v3 = [-pSize, -pSize, pSize];
    const faces = [
      [v0, v1, v2],
      [v0, v3, v1],
      [v0, v2, v3],
      [v1, v3, v2],
    ];

    for (let i = 0; i < count; i++) {
      const fIndex = Math.floor(Math.random() * 4);
      const faceVertices = faces[fIndex];
      // Random point in triangle (barycentric)
      let r1 = Math.random();
      let r2 = Math.random();
      if (r1 + r2 > 1) {
        r1 = 1 - r1;
        r2 = 1 - r2;
      }
      const r3 = 1 - r1 - r2;

      const A = faceVertices[0];
      const B = faceVertices[1];
      const C = faceVertices[2];

      const x = A[0] * r1 + B[0] * r2 + C[0] * r3 + (Math.random() - 0.5) * 0.1;
      const y = A[1] * r1 + B[1] * r2 + C[1] * r3 + (Math.random() - 0.5) * 0.1;
      const z = A[2] * r1 + B[2] * r2 + C[2] * r3 + (Math.random() - 0.5) * 0.1;

      pyramid[i * 3] = x;
      pyramid[i * 3 + 1] = y;
      pyramid[i * 3 + 2] = z;
    }

    // 4. TORUS
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
      pyramidPos: pyramid,
      torusPos: torus,
    };
  }, []);

  const shapes = useMemo(
    () => [spherePos, cubePos, pyramidPos, torusPos],
    [spherePos, cubePos, pyramidPos, torusPos]
  );

  useEffect(() => {
    // Sequence Logic
    // Shape hold time: 0.5s
    // Morph time: 0.8s (handled in animate loop via progress speed)

    let step = 0;
    const cycleShapes = () => {
      if (step >= 3) {
        // After Torus (index 3), trigger burst
        setTimeout(() => {
          setTargetShape("burst");
          onBurst();
        }, 800);
        return;
      }

      step++;
      currentShapeIndexRef.current = step - 1; // Start from prev
      progressRef.current = 0; // Reset interpolation progress

      const nextShapeName = ["sphere", "cube", "pyramid", "torus"][
        step
      ] as ShapeType;
      setTargetShape(nextShapeName);

      // Schedule next cycle
      // 0.8s morph + 0.4s hold = 1.2s total per shape
      setTimeout(cycleShapes, 1200);
    };

    // Start sequence after initial load
    const startTimer = setTimeout(cycleShapes, 1000);

    return () => clearTimeout(startTimer);
  }, [onBurst]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    if (targetShape !== "burst") {
      // ROTATION
      pointsRef.current.rotation.y += 0.008;
      pointsRef.current.rotation.x += 0.004;

      // ANIMATION / MORPHING
      // currentShapeIndexRef tells us "Source". targetShape tells us logic, but we implies "Source + 1"
      const sourceIndex = currentShapeIndexRef.current;
      const targetIndex =
        sourceIndex + 1 < shapes.length ? sourceIndex + 1 : sourceIndex;

      const sourcePos = shapes[sourceIndex];
      const targetPos = shapes[targetIndex];

      // Animate progress (Morph Speed)
      // 0 to 1 at ~0.02 per frame (~0.8s)
      if (progressRef.current < 1) {
        progressRef.current += 0.02;
        if (progressRef.current > 1) progressRef.current = 1;
      }

      // Easing (Smoothstep)
      const t =
        progressRef.current *
        progressRef.current *
        (3 - 2 * progressRef.current);

      for (let i = 0; i < positions.length; i++) {
        positions[i] = sourcePos[i] + (targetPos[i] - sourcePos[i]) * t;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    } else {
      // BURST
      for (let i = 0; i < positions.length; i += 3) {
        // Radial expansion
        positions[i] *= 1.1;
        positions[i + 1] *= 1.1;
        positions[i + 2] *= 1.1;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;

      if (pointsRef.current.material instanceof THREE.PointsMaterial) {
        pointsRef.current.material.opacity *= 0.9;
      }
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
