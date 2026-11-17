import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AmbientModeScene3DProps {
  mode: 'anc' | 'ambient';
}

export const AmbientModeScene3D: React.FC<AmbientModeScene3DProps> = ({ mode }) => {
  const earbudGroupRef = useRef<THREE.Group>(null);
  const waveGroupRef = useRef<THREE.Group>(null);
  const shieldRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Gentle floating
    if (earbudGroupRef.current) {
      earbudGroupRef.current.position.y = Math.sin(t * 1.5) * 0.08;
      earbudGroupRef.current.rotation.y = t * 0.4;
    }

    // Dynamic wave ripples based on active mode
    if (waveGroupRef.current) {
      waveGroupRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        if (mode === 'ambient') {
          // Dynamic pulsating sound waves penetrating into the earbud
          const phase = (t * 2.5 + i * 0.3) % 2;
          mesh.scale.set(1 + phase * 1.5, 1 + phase * 1.5, 1 + phase * 1.5);
          if (mesh.material) {
            const mat = mesh.material as THREE.MeshBasicMaterial;
            mat.opacity = Math.max(0, 1 - phase / 2) * 0.7;
            mat.color.set(i % 2 === 0 ? '#2DD4BF' : '#F59E0B');
          }
        } else {
          // ANC: Flat, dampened, contained sound waves neutralized at the boundary
          const phase = (t * 0.8 + i * 0.2) % 1;
          mesh.scale.set(1.4 + phase * 0.2, 1.4 + phase * 0.2, 1.4 + phase * 0.2);
          if (mesh.material) {
            const mat = mesh.material as THREE.MeshBasicMaterial;
            mat.opacity = 0.15;
            mat.color.set('#0E7490');
          }
        }
      });
    }

    // ANC Shield sphere opacity
    if (shieldRef.current && shieldRef.current.material) {
      const mat = shieldRef.current.material as THREE.MeshStandardMaterial;
      const targetOpacity = mode === 'anc' ? 0.25 : 0.04;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.1);
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={1.5} color="#FFFFFF" />
      <pointLight
        position={[0, 0, 2]}
        intensity={mode === 'ambient' ? 2 : 1}
        color={mode === 'ambient' ? '#F59E0B' : '#2DD4BF'}
      />

      {/* Center Earbud Model */}
      <group ref={earbudGroupRef} scale={1.2}>
        <mesh>
          <sphereGeometry args={[0.35, 24, 24]} />
          <meshStandardMaterial color="#0A0C10" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.1, 0.08, 0.7, 24]} />
          <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.25]}>
          <circleGeometry args={[0.14, 24]} />
          <meshStandardMaterial
            color={mode === 'ambient' ? '#F59E0B' : '#2DD4BF'}
            emissive={mode === 'ambient' ? '#F59E0B' : '#2DD4BF'}
            emissiveIntensity={1.8}
          />
        </mesh>
      </group>

      {/* ANC Acoustic Isolation Shield */}
      <mesh ref={shieldRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#06B6D4"
          transparent
          opacity={0.05}
          roughness={0.1}
          metalness={0.9}
          wireframe={mode === 'anc'}
        />
      </mesh>

      {/* Animated Sound-Wave Ripples */}
      <group ref={waveGroupRef}>
        {[0, 1, 2, 3].map((idx) => (
          <mesh key={idx} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[0.8 + idx * 0.2, 0.02, 16, 64]} />
            <meshBasicMaterial
              color={mode === 'ambient' ? '#2DD4BF' : '#0E7490'}
              transparent
              opacity={0.4}
            />
          </mesh>
        ))}
      </group>
    </>
  );
};
