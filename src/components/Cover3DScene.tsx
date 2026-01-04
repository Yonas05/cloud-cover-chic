import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Box, Torus, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

const FloatingShape = ({ 
  position, 
  color, 
  speed = 1, 
  distort = 0.4,
  size = 1,
  type = "sphere"
}: { 
  position: [number, number, number]; 
  color: string; 
  speed?: number;
  distort?: number;
  size?: number;
  type?: "sphere" | "box" | "torus" | "icosahedron";
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  const ShapeComponent = () => {
    switch (type) {
      case "box":
        return <Box args={[size, size, size]} ref={meshRef}>
          <MeshDistortMaterial color={color} distort={distort} speed={2} roughness={0.2} metalness={0.8} />
        </Box>;
      case "torus":
        return <Torus args={[size * 0.7, size * 0.3, 16, 32]} ref={meshRef}>
          <MeshDistortMaterial color={color} distort={distort * 0.5} speed={2} roughness={0.2} metalness={0.8} />
        </Torus>;
      case "icosahedron":
        return <Icosahedron args={[size * 0.8]} ref={meshRef}>
          <MeshDistortMaterial color={color} distort={distort} speed={2} roughness={0.2} metalness={0.8} />
        </Icosahedron>;
      default:
        return <Sphere args={[size, 32, 32]} ref={meshRef}>
          <MeshDistortMaterial color={color} distort={distort} speed={2} roughness={0.2} metalness={0.8} />
        </Sphere>;
    }
  };

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        <ShapeComponent />
      </group>
    </Float>
  );
};

const Particles = ({ count = 200 }) => {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00d1b2"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const GlowRing = ({ radius, color, speed = 1 }: { radius: number; color: string; speed?: number }) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.1 * speed;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -2]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d1b2" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00b4d8" />
      <spotLight position={[0, 10, 5]} angle={0.3} penumbra={1} intensity={1} color="#ffffff" />

      {/* Main floating shapes */}
      <FloatingShape position={[-5, 0.5, -1]} color="#00d1b2" size={0.8} distort={0.5} type="sphere" />
      <FloatingShape position={[5, -0.3, -2]} color="#00b4d8" size={0.6} distort={0.4} type="icosahedron" />
      <FloatingShape position={[-3, -1, 0]} color="#ff6b35" size={0.5} distort={0.3} type="box" speed={0.8} />
      <FloatingShape position={[4, 1, -1]} color="#7c3aed" size={0.4} distort={0.4} type="torus" speed={1.2} />
      <FloatingShape position={[-6, 1.5, -3]} color="#00d1b2" size={0.3} distort={0.6} type="sphere" speed={0.6} />
      <FloatingShape position={[6, -1.5, -2]} color="#00b4d8" size={0.35} distort={0.5} type="icosahedron" speed={0.9} />
      <FloatingShape position={[0, 1.5, -4]} color="#ff6b35" size={0.4} distort={0.3} type="box" speed={0.7} />
      <FloatingShape position={[-4, -1.5, -2]} color="#7c3aed" size={0.3} distort={0.4} type="torus" speed={1.1} />

      {/* Glow rings */}
      <GlowRing radius={3} color="#00d1b2" speed={1} />
      <GlowRing radius={4} color="#00b4d8" speed={-0.7} />
      <GlowRing radius={5} color="#7c3aed" speed={0.5} />

      {/* Particles */}
      <Particles count={300} />
    </>
  );
};

const Cover3DScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Cover3DScene;
