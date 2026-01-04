import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Box, Torus, Icosahedron, Octahedron, Dodecahedron, MeshWobbleMaterial, Trail } from "@react-three/drei";
import * as THREE from "three";

const InteractiveShape = ({ 
  position, 
  color,
  hoverColor,
  speed = 1, 
  distort = 0.4,
  size = 1,
  type = "sphere"
}: { 
  position: [number, number, number]; 
  color: string;
  hoverColor?: string;
  speed?: number;
  distort?: number;
  size?: number;
  type?: "sphere" | "box" | "torus" | "icosahedron" | "octahedron" | "dodecahedron";
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const targetScale = useRef(1);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
      
      // Smooth scale animation on hover
      targetScale.current = hovered ? 1.4 : clicked ? 1.2 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current),
        0.1
      );
    }
  });

  const activeColor = hovered ? (hoverColor || color) : color;
  const activeDistort = hovered ? distort * 1.5 : distort;

  const shapeProps = {
    ref: meshRef,
    onPointerOver: () => setHovered(true),
    onPointerOut: () => setHovered(false),
    onClick: () => setClicked(!clicked),
  };

  const materialProps = {
    color: activeColor,
    distort: activeDistort,
    speed: hovered ? 4 : 2,
    roughness: 0.1,
    metalness: 0.9,
    emissive: activeColor,
    emissiveIntensity: hovered ? 0.3 : 0.1,
  };

  const renderShape = () => {
    switch (type) {
      case "box":
        return <Box args={[size, size, size]} {...shapeProps}>
          <MeshDistortMaterial {...materialProps} />
        </Box>;
      case "torus":
        return <Torus args={[size * 0.7, size * 0.3, 32, 64]} {...shapeProps}>
          <MeshDistortMaterial {...materialProps} distort={activeDistort * 0.5} />
        </Torus>;
      case "icosahedron":
        return <Icosahedron args={[size * 0.8, 0]} {...shapeProps}>
          <MeshDistortMaterial {...materialProps} />
        </Icosahedron>;
      case "octahedron":
        return <Octahedron args={[size * 0.8, 0]} {...shapeProps}>
          <MeshWobbleMaterial color={activeColor} factor={hovered ? 1 : 0.4} speed={2} metalness={0.8} roughness={0.2} />
        </Octahedron>;
      case "dodecahedron":
        return <Dodecahedron args={[size * 0.7, 0]} {...shapeProps}>
          <MeshDistortMaterial {...materialProps} />
        </Dodecahedron>;
      default:
        return <Sphere args={[size, 64, 64]} {...shapeProps}>
          <MeshDistortMaterial {...materialProps} />
        </Sphere>;
    }
  };

  return (
    <Float speed={speed} rotationIntensity={hovered ? 1 : 0.5} floatIntensity={hovered ? 2 : 1}>
      <group position={position}>
        {/* Glow effect */}
        {hovered && (
          <Sphere args={[size * 1.2, 16, 16]}>
            <meshBasicMaterial color={activeColor} transparent opacity={0.15} />
          </Sphere>
        )}
        {renderShape()}
      </group>
    </Float>
  );
};

const GlassShape = ({ position, size, color }: { position: [number, number, number]; size: number; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={0.5} floatIntensity={0.5}>
      <mesh 
        ref={meshRef} 
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.3 : 1}
      >
        <torusKnotGeometry args={[size, size * 0.3, 128, 16]} />
        <meshPhysicalMaterial 
          color={color}
          transmission={0.9}
          thickness={0.5}
          roughness={0.1}
          metalness={0}
          ior={1.5}
          transparent
          opacity={0.8}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.1}
        />
      </mesh>
    </Float>
  );
};

const Particles = ({ count = 500 }) => {
  const points = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color("#00d1b2"),
      new THREE.Color("#00b4d8"),
      new THREE.Color("#7c3aed"),
      new THREE.Color("#ff6b35"),
      new THREE.Color("#f472b6"),
    ];
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.015;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
};

const GlowRing = ({ radius, color, speed = 1, thickness = 0.02 }: { radius: number; color: string; speed?: number; thickness?: number }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.1 * speed;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <mesh 
      ref={ringRef} 
      position={[0, 0, -3]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <torusGeometry args={[radius, hovered ? thickness * 2 : thickness, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={hovered ? 0.8 : 0.4} />
    </mesh>
  );
};

const FloatingOrb = ({ position, color, size }: { position: [number, number, number]; color: string; size: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.5 : 1}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={hovered ? 0.9 : 0.6} />
      {/* Outer glow */}
      <mesh scale={1.5}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </mesh>
  );
};

const DataStream = ({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  const progress = useRef(0);

  useFrame((state, delta) => {
    if (ref.current) {
      progress.current = (progress.current + delta * 0.5) % 1;
      const t = progress.current;
      ref.current.position.set(
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t + Math.sin(t * Math.PI * 4) * 0.2,
        start[2] + (end[2] - start[2]) * t
      );
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

const Scene = () => {
  const { viewport } = useThree();

  return (
    <>
      {/* Enhanced lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d1b2" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#00b4d8" />
      <pointLight position={[0, 5, 5]} intensity={1} color="#7c3aed" />
      <spotLight position={[0, 10, 5]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" castShadow />
      <spotLight position={[-5, 5, 5]} angle={0.4} penumbra={0.5} intensity={1} color="#ff6b35" />

      {/* Main interactive shapes - Left side */}
      <InteractiveShape position={[-6, 0.5, -1]} color="#00d1b2" hoverColor="#00ffcc" size={0.7} distort={0.5} type="sphere" />
      <InteractiveShape position={[-4.5, -1, 0]} color="#ff6b35" hoverColor="#ff9966" size={0.5} distort={0.3} type="box" speed={0.8} />
      <InteractiveShape position={[-5.5, 1.5, -2]} color="#7c3aed" hoverColor="#a855f7" size={0.4} distort={0.4} type="octahedron" speed={0.6} />
      <InteractiveShape position={[-3.5, -0.5, -1.5]} color="#f472b6" hoverColor="#fb7185" size={0.35} distort={0.5} type="dodecahedron" speed={1.1} />

      {/* Main interactive shapes - Right side */}
      <InteractiveShape position={[6, -0.3, -1]} color="#00b4d8" hoverColor="#22d3ee" size={0.6} distort={0.4} type="icosahedron" />
      <InteractiveShape position={[4.5, 1, -1.5]} color="#7c3aed" hoverColor="#a855f7" size={0.45} distort={0.4} type="torus" speed={1.2} />
      <InteractiveShape position={[5.5, -1.5, -2]} color="#00d1b2" hoverColor="#00ffcc" size={0.35} distort={0.5} type="sphere" speed={0.9} />
      <InteractiveShape position={[3.5, 0.5, -1]} color="#ff6b35" hoverColor="#ff9966" size={0.4} distort={0.3} type="box" speed={0.7} />

      {/* Background shapes */}
      <InteractiveShape position={[-7, 1.5, -4]} color="#00d1b2" hoverColor="#00ffcc" size={0.3} distort={0.6} type="sphere" speed={0.5} />
      <InteractiveShape position={[7, -1.5, -3]} color="#00b4d8" hoverColor="#22d3ee" size={0.35} distort={0.5} type="icosahedron" speed={0.8} />
      <InteractiveShape position={[0, 2, -5]} color="#ff6b35" hoverColor="#ff9966" size={0.4} distort={0.3} type="dodecahedron" speed={0.6} />
      <InteractiveShape position={[-2, -1.8, -3]} color="#f472b6" hoverColor="#fb7185" size={0.3} distort={0.4} type="octahedron" speed={0.9} />
      <InteractiveShape position={[2, -1.5, -4]} color="#7c3aed" hoverColor="#a855f7" size={0.25} distort={0.5} type="torus" speed={1} />

      {/* Glass shapes for extra flair */}
      <GlassShape position={[-2, 0.8, -2]} size={0.25} color="#00d1b2" />
      <GlassShape position={[2.5, -0.5, -2.5]} size={0.2} color="#7c3aed" />

      {/* Floating orbs */}
      <FloatingOrb position={[-7.5, 0, -1]} color="#00d1b2" size={0.15} />
      <FloatingOrb position={[7.5, 0.5, -1.5]} color="#00b4d8" size={0.12} />
      <FloatingOrb position={[-6, -1.8, -0.5]} color="#ff6b35" size={0.1} />
      <FloatingOrb position={[6, 1.8, -0.5]} color="#7c3aed" size={0.1} />
      <FloatingOrb position={[0, -2, -2]} color="#f472b6" size={0.08} />

      {/* Data streams connecting shapes */}
      <DataStream start={[-6, 0.5, -1]} end={[-4.5, -1, 0]} color="#00d1b2" />
      <DataStream start={[6, -0.3, -1]} end={[4.5, 1, -1.5]} color="#00b4d8" />
      <DataStream start={[-3.5, -0.5, -1.5]} end={[3.5, 0.5, -1]} color="#7c3aed" />

      {/* Enhanced glow rings */}
      <GlowRing radius={2.5} color="#00d1b2" speed={1} thickness={0.03} />
      <GlowRing radius={3.5} color="#00b4d8" speed={-0.7} thickness={0.025} />
      <GlowRing radius={4.5} color="#7c3aed" speed={0.5} thickness={0.02} />
      <GlowRing radius={5.5} color="#ff6b35" speed={-0.3} thickness={0.015} />
      <GlowRing radius={6.5} color="#f472b6" speed={0.4} thickness={0.01} />

      {/* Enhanced particles */}
      <Particles count={600} />
    </>
  );
};

const Cover3DScene = () => {
  return (
    <div className="absolute inset-0 z-0 cursor-pointer">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Cover3DScene;
