import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { DashcamModel } from './DashcamModel';

export const HeroScene3D: React.FC<{ isAlerting?: boolean }> = ({ isAlerting = false }) => {
  const centralGroupRef = useRef<THREE.Group>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);
  const earbud1Ref = useRef<THREE.Group>(null);
  const earbud2Ref = useRef<THREE.Group>(null);

  const { pointer } = useThree();

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    // Central dashcam gentle rotation + floating hover
    if (centralGroupRef.current) {
      centralGroupRef.current.position.y = Math.sin(t * 1.2) * 0.12;

      // Subtle mouse parallax reaction
      const targetRotX = pointer.y * 0.35 + Math.sin(t * 0.8) * 0.05;
      const targetRotY = pointer.x * 0.6 + t * 0.25;

      centralGroupRef.current.rotation.x = THREE.MathUtils.damp(
        centralGroupRef.current.rotation.x,
        targetRotX,
        4,
        delta
      );
      centralGroupRef.current.rotation.y = THREE.MathUtils.damp(
        centralGroupRef.current.rotation.y,
        targetRotY,
        4,
        delta
      );
    }

    // Earbuds orbiting in a tilted plane
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y = -t * 0.45;
      orbitGroupRef.current.rotation.x = 0.3;
    }

    // Earbud self-rotation
    if (earbud1Ref.current && earbud2Ref.current) {
      earbud1Ref.current.rotation.y = t * 1.2;
      earbud2Ref.current.rotation.y = t * 1.2 + Math.PI;
    }
  });

  return (
    <>
      {/* Studio Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFFFFF" />
      <directionalLight position={[-5, -2, -3]} intensity={0.6} color="#0E7490" />
      <pointLight position={[0, 1, 2]} intensity={isAlerting ? 3 : 1.2} color={isAlerting ? '#F59E0B' : '#2DD4BF'} distance={8} />
      <pointLight position={[0, 0, -2.5]} intensity={2.0} color="#DC2626" distance={5} />

      {/* Central Dashcam Unit */}
      <group ref={centralGroupRef} scale={1.35}>
        <DashcamModel isAlerting={isAlerting} />
      </group>

      {/* Orbiting Wireless Earbuds */}
      <group ref={orbitGroupRef}>
        {/* Orbiting Bud 1 */}
        <group ref={earbud1Ref} position={[2.6, 0.4, 0]} scale={0.85}>
          {/* Earbud driver body */}
          <mesh>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color="#0A0C10" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.07, 0.05, 0.45, 16]} />
            <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.12]}>
            <circleGeometry args={[0.08, 16]} />
            <meshStandardMaterial
              color={isAlerting ? '#F59E0B' : '#2DD4BF'}
              emissive={isAlerting ? '#F59E0B' : '#2DD4BF'}
              emissiveIntensity={1.8}
            />
          </mesh>
        </group>

        {/* Orbiting Bud 2 */}
        <group ref={earbud2Ref} position={[-2.6, -0.4, 0]} scale={0.85}>
          <mesh>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color="#0A0C10" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.07, 0.05, 0.45, 16]} />
            <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.12]}>
            <circleGeometry args={[0.08, 16]} />
            <meshStandardMaterial
              color={isAlerting ? '#F59E0B' : '#2DD4BF'}
              emissive={isAlerting ? '#F59E0B' : '#2DD4BF'}
              emissiveIntensity={1.8}
            />
          </mesh>
        </group>
      </group>

      {/* Orbit Track Rings */}
      <mesh rotation={[Math.PI / 2 + 0.3, 0, 0]}>
        <ringGeometry args={[2.58, 2.62, 64]} />
        <meshBasicMaterial color="#2DD4BF" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};
