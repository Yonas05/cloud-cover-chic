import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sphere, Torus, Icosahedron, Octahedron } from "@react-three/drei";
import * as THREE from "three";

// Central cloud shape made of particles
const CloudShape = () => {
  const points = useRef<THREE.Points>(null);
  const { positions, opacities } = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const opacities = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Create cloud-like distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 0.8;
      
      // Flatten vertically for cloud shape
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.3;
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.5;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      
      opacities[i] = 0.3 + Math.random() * 0.7;
    }
    return { positions, opacities };
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={points} position={[0, 0.5, -2]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#00d4aa" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

// Single network line component
const NetworkLine = ({ start, end }: { start: THREE.Vector3; end: THREE.Vector3 }) => {
  const lineRef = useRef<THREE.Line>(null);
  
  const { geometry } = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      start,
      new THREE.Vector3(
        (start.x + end.x) / 2,
        (start.y + end.y) / 2 + 0.5,
        (start.z + end.z) / 2
      ),
      end
    );
    const points = curve.getPoints(30);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return { geometry };
  }, [start, end]);

  useFrame((state) => {
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: "#00d4aa", transparent: true, opacity: 0.2 }))} ref={lineRef} />
  );
};

// Network connection lines
const NetworkLines = () => {
  const linesRef = useRef<THREE.Group>(null);
  
  const connections = useMemo(() => {
    const nodes: [number, number, number][] = [
      // Center cloud
      [0, 0.5, -2],
      // Outer nodes - screens/servers positions
      [-5.5, 1.5, -1],
      [-6, -0.5, 0],
      [-4, -1.5, -0.5],
      [-3, 1, -1.5],
      [5.5, 1.5, -1],
      [6, -0.5, 0],
      [4, -1.5, -0.5],
      [3, 1, -1.5],
      [0, 2, -3],
      [0, -1.5, -1],
    ];
    
    const lines: { start: THREE.Vector3; end: THREE.Vector3; }[] = [];
    
    // Connect center to outer nodes
    for (let i = 1; i < nodes.length; i++) {
      lines.push({
        start: new THREE.Vector3(...nodes[0]),
        end: new THREE.Vector3(...nodes[i]),
      });
    }
    
    return lines;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Line) {
          const material = child.material as THREE.LineBasicMaterial;
          material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.1;
        }
      });
    }
  });

  return (
    <group ref={linesRef}>
      {connections.map((conn, i) => (
        <NetworkLine key={i} start={conn.start} end={conn.end} />
      ))}
    </group>
  );
};

// Floating data packets along network lines
const DataPackets = ({ count = 20 }) => {
  const packets = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      startOffset: Math.random(),
      speed: 0.3 + Math.random() * 0.4,
      pathIndex: Math.floor(Math.random() * 10),
    }));
  }, [count]);

  return (
    <group>
      {packets.map((packet, i) => (
        <DataPacket key={i} {...packet} />
      ))}
    </group>
  );
};

const DataPacket = ({ startOffset, speed, pathIndex }: { startOffset: number; speed: number; pathIndex: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  const nodes: [number, number, number][] = [
    [0, 0.5, -2],
    [-5.5, 1.5, -1],
    [-6, -0.5, 0],
    [-4, -1.5, -0.5],
    [-3, 1, -1.5],
    [5.5, 1.5, -1],
    [6, -0.5, 0],
    [4, -1.5, -0.5],
    [3, 1, -1.5],
    [0, 2, -3],
    [0, -1.5, -1],
  ];
  
  const endNode = nodes[(pathIndex % 10) + 1] || nodes[1];
  const curve = useMemo(() => new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(...nodes[0]),
    new THREE.Vector3(
      (nodes[0][0] + endNode[0]) / 2,
      (nodes[0][1] + endNode[1]) / 2 + 0.5,
      (nodes[0][2] + endNode[2]) / 2
    ),
    new THREE.Vector3(...endNode)
  ), [endNode]);

  useFrame((state) => {
    if (ref.current) {
      const t = ((state.clock.elapsedTime * speed + startOffset) % 1);
      const pos = curve.getPoint(t);
      ref.current.position.copy(pos);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#00ffcc" transparent opacity={0.9} />
    </mesh>
  );
};

// Glow rings around center
const GlowRings = () => {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ring1.current) {
      ring1.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      ring1.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
    if (ring2.current) {
      ring2.current.rotation.x = Math.PI / 2 + Math.cos(state.clock.elapsedTime * 0.25) * 0.15;
      ring2.current.rotation.z = -state.clock.elapsedTime * 0.08;
    }
    if (ring3.current) {
      ring3.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.2) * 0.12;
      ring3.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group position={[0, 0.5, -2]}>
      <mesh ref={ring1}>
        <torusGeometry args={[2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#00d4aa" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00b4d8" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[3, 0.008, 16, 100]} />
        <meshBasicMaterial color="#00d4aa" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

// Floating geometric shapes
const FloatingShape = ({ 
  position, 
  type,
  color = "#00d4aa",
  size = 0.5 
}: { 
  position: [number, number, number]; 
  type: "octahedron" | "icosahedron" | "torus";
  color?: string;
  size?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const renderShape = () => {
    const props = {
      ref: meshRef,
      onPointerOver: () => setHovered(true),
      onPointerOut: () => setHovered(false),
    };

    switch (type) {
      case "octahedron":
        return (
          <Octahedron {...props} args={[size, 0]}>
            <meshBasicMaterial color={color} wireframe transparent opacity={hovered ? 0.8 : 0.4} />
          </Octahedron>
        );
      case "icosahedron":
        return (
          <Icosahedron {...props} args={[size, 0]}>
            <meshBasicMaterial color={color} wireframe transparent opacity={hovered ? 0.8 : 0.4} />
          </Icosahedron>
        );
      case "torus":
        return (
          <Torus {...props} args={[size, size * 0.3, 8, 16]}>
            <meshBasicMaterial color={color} wireframe transparent opacity={hovered ? 0.8 : 0.4} />
          </Torus>
        );
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position} scale={hovered ? 1.2 : 1}>
        {renderShape()}
      </group>
    </Float>
  );
};

// Server/screen nodes at edges
const ServerNode = ({ position }: { position: [number, number, number] }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <Float speed={1.5} floatIntensity={0.5}>
      <group 
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.15 : 1}
      >
        {/* Server frame */}
        <mesh>
          <boxGeometry args={[0.8, 0.5, 0.05]} />
          <meshBasicMaterial color="#1a3a4a" transparent opacity={0.9} />
        </mesh>
        {/* Screen glow */}
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[0.7, 0.4]} />
          <meshBasicMaterial color="#00d4aa" transparent opacity={hovered ? 0.4 : 0.2} />
        </mesh>
        {/* Border */}
        <mesh>
          <boxGeometry args={[0.82, 0.52, 0.02]} />
          <meshBasicMaterial color="#00d4aa" transparent opacity={0.3} wireframe />
        </mesh>
      </group>
    </Float>
  );
};

// Background particles
const BackgroundParticles = ({ count = 400 }) => {
  const points = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00d4aa" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
};

const Scene = () => {
  return (
    <>
      {/* Minimal lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 5]} intensity={0.5} color="#00d4aa" />

      {/* Central cloud */}
      <CloudShape />
      
      {/* Network connections */}
      <NetworkLines />
      <DataPackets count={25} />
      
      {/* Glow rings */}
      <GlowRings />

      {/* Server nodes around the edges */}
      <ServerNode position={[-5.5, 1.5, -1]} />
      <ServerNode position={[-6, -0.5, 0]} />
      <ServerNode position={[-4, -1.5, -0.5]} />
      <ServerNode position={[5.5, 1.5, -1]} />
      <ServerNode position={[6, -0.5, 0]} />
      <ServerNode position={[4, -1.5, -0.5]} />
      <ServerNode position={[0, 2, -3]} />

      {/* Floating geometric shapes */}
      <FloatingShape position={[-7, 0, 0]} type="octahedron" color="#00d4aa" size={0.4} />
      <FloatingShape position={[7, -1, 0]} type="octahedron" color="#00b4d8" size={0.35} />
      <FloatingShape position={[-6.5, -2, -1]} type="icosahedron" color="#00d4aa" size={0.3} />
      <FloatingShape position={[6.5, 1.8, -1]} type="icosahedron" color="#00d4aa" size={0.25} />
      <FloatingShape position={[-3, 2.2, -2]} type="torus" color="#00b4d8" size={0.2} />
      <FloatingShape position={[3, -2, -1.5]} type="torus" color="#00d4aa" size={0.25} />
      <FloatingShape position={[0, -2.5, -1]} type="octahedron" color="#00b4d8" size={0.3} />

      {/* Background particles */}
      <BackgroundParticles count={500} />
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
