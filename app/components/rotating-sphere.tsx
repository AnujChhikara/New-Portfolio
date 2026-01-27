import { useRef, useMemo, useState, useEffect } from "react";

// Client-only component - dynamically imports three.js and react-three/fiber
function RotatingSphereInner() {
  const [components, setComponents] = useState<{
    Canvas: any;
    useFrame: any;
    THREE: any;
  } | null>(null);

  useEffect(() => {
    // Dynamically import client-only dependencies
    Promise.all([import("@react-three/fiber"), import("three")]).then(
      ([r3f, three]) => {
        setComponents({
          Canvas: r3f.Canvas,
          useFrame: r3f.useFrame,
          THREE: three,
        });
      }
    );
  }, []);

  if (!components) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-neutral-400 text-sm">Loading...</div>
      </div>
    );
  }

  const { Canvas, useFrame, THREE } = components;

  function RotatingSphere() {
    const pointsRef = useRef<any>(null);

    // Generate sphere geometry data
    const spherePos = useMemo(() => {
      const count = 25000;
      const sphere = new Float32Array(count * 3);
      const radius = 1.5;

      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = radius + (Math.random() - 0.5) * 0.1;
        sphere[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        sphere[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        sphere[i * 3 + 2] = r * Math.cos(phi);
      }

      return sphere;
    }, []);

    useFrame(() => {
      if (!pointsRef.current) return;

      // Rotate the sphere
      pointsRef.current.rotation.y += 0.008;
      pointsRef.current.rotation.x += 0.004;
    });

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
          size={0.02}
          color="#aaaaaa"
          transparent
          opacity={0.8}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <RotatingSphere />
      </Canvas>
    </div>
  );
}

export function RotatingSphereView() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-neutral-400 text-sm">Loading...</div>
      </div>
    );
  }

  return <RotatingSphereInner />;
}
