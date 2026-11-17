import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProEarbudsModelProps {
  isAlerting?: boolean;
  color?: string;
}

export const ProEarbudsModel: React.FC<ProEarbudsModelProps> = ({
  isAlerting = false,
  color = '#12151B'
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftIndicatorRef = useRef<THREE.Mesh>(null);
  const rightIndicatorRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = Math.sin(t * 4) * 0.5 + 0.5;

    if (leftIndicatorRef.current && rightIndicatorRef.current) {
      const targetIntensity = isAlerting ? 2.5 : pulse * 0.8;
      const targetColor = isAlerting ? new THREE.Color('#F59E0B') : new THREE.Color('#2DD4BF');

      const matLeft = leftIndicatorRef.current.material as THREE.MeshStandardMaterial;
      const matRight = rightIndicatorRef.current.material as THREE.MeshStandardMaterial;

      matLeft.color = targetColor;
      matLeft.emissive = targetColor;
      matLeft.emissiveIntensity = targetIntensity;

      matRight.color = targetColor;
      matRight.emissive = targetColor;
      matRight.emissiveIntensity = targetIntensity;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* Flexible Ergonomic U-Neckband Collar */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        {/* Arc of a torus for the ergonomic neckband */}
        <torusGeometry args={[1.3, 0.08, 16, 64, Math.PI * 1.15]} />
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Left Control Pod (with tactile buttons) */}
      <group position={[-1.25, -0.6, 0]}>
        <mesh rotation={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.13, 0.13, 0.8, 24]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.25} />
        </mesh>
        {/* Tactile buttons */}
        <mesh position={[0.14, 0.1, 0]}>
          <boxGeometry args={[0.04, 0.12, 0.06]} />
          <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.14, -0.1, 0]}>
          <boxGeometry args={[0.04, 0.12, 0.06]} />
          <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Left LED status pill */}
        <mesh ref={leftIndicatorRef} position={[0, 0.35, 0.1]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial
            color="#2DD4BF"
            emissive="#2DD4BF"
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Right Battery & Micro-controller Pod */}
      <group position={[1.25, -0.6, 0]}>
        <mesh rotation={[0, 0, -0.2]}>
          <cylinderGeometry args={[0.13, 0.13, 0.8, 24]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.25} />
        </mesh>
        {/* Right LED status pill */}
        <mesh ref={rightIndicatorRef} position={[0, 0.35, 0.1]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial
            color="#2DD4BF"
            emissive="#2DD4BF"
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Left Earbud Lead Cable & Driver Unit */}
      <group position={[-0.8, -1.2, 0.2]}>
        {/* Cable segment */}
        <mesh position={[-0.15, 0.25, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 12]} />
          <meshStandardMaterial color="#0A0C10" roughness={0.6} />
        </mesh>
        {/* Earbud driver body */}
        <mesh>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial color="#0F172A" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Metallic accent ring */}
        <mesh position={[0, 0, 0.12]}>
          <cylinderGeometry args={[0.12, 0.12, 0.08, 24]} />
          <meshStandardMaterial color="#2DD4BF" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Ergonomic silicone ear tip */}
        <mesh position={[0, 0, 0.22]}>
          <cylinderGeometry args={[0.08, 0.14, 0.15, 24]} />
          <meshStandardMaterial color="#1E293B" roughness={0.7} transparent opacity={0.9} />
        </mesh>
      </group>

      {/* Right Earbud Lead Cable & Driver Unit */}
      <group position={[0.8, -1.2, 0.2]}>
        {/* Cable segment */}
        <mesh position={[0.15, 0.25, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 12]} />
          <meshStandardMaterial color="#0A0C10" roughness={0.6} />
        </mesh>
        {/* Earbud driver body */}
        <mesh>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial color="#0F172A" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Metallic accent ring */}
        <mesh position={[0, 0, 0.12]}>
          <cylinderGeometry args={[0.12, 0.12, 0.08, 24]} />
          <meshStandardMaterial color="#2DD4BF" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Ergonomic silicone ear tip */}
        <mesh position={[0, 0, 0.22]}>
          <cylinderGeometry args={[0.08, 0.14, 0.15, 24]} />
          <meshStandardMaterial color="#1E293B" roughness={0.7} transparent opacity={0.9} />
        </mesh>
      </group>
    </group>
  );
};
