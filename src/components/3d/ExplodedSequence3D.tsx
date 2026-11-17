import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DashcamModel } from './DashcamModel';

interface ExplodedSequence3DProps {
  stage: number; // 0 to 3
}

export const ExplodedSequence3D: React.FC<ExplodedSequence3DProps> = ({ stage }) => {
  const dashcamRef = useRef<THREE.Group>(null);
  const earbudsRef = useRef<THREE.Group>(null);
  const signalArcRef = useRef<THREE.Group>(null);
  const soundwaveGroupRef = useRef<THREE.Group>(null);

  // Compute exploded progress: 0 when stage === 0, 1 when stage >= 1
  const targetExplode = stage >= 1 ? 1 : 0;
  const currentExplode = useRef(0);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    currentExplode.current = THREE.MathUtils.damp(
      currentExplode.current,
      targetExplode,
      4,
      delta
    );

    // Rotate dashcam slightly to showcase 3D depth
    if (dashcamRef.current) {
      dashcamRef.current.rotation.y = -0.5 + Math.sin(t * 0.5) * 0.1;
      dashcamRef.current.rotation.x = 0.25;
    }

    // Animate signal arc beads if stage >= 2 (Wireless transmission stage)
    if (signalArcRef.current) {
      const isTransmitting = stage >= 2;
      signalArcRef.current.visible = isTransmitting;

      if (isTransmitting) {
        signalArcRef.current.children.forEach((child, i) => {
          const progress = ((t * 2.5 + i * 0.15) % 1);
          // Interpolate from dashcam [0, 0, 0] to earbuds [2.8, -0.2, 0]
          child.position.x = THREE.MathUtils.lerp(0.5, 2.8, progress);
          child.position.y = THREE.MathUtils.lerp(0.2, 0.4, Math.sin(progress * Math.PI));
          child.position.z = THREE.MathUtils.lerp(0, 0.5, progress);
        });
      }
    }

    // Animate soundwaves if stage >= 3 (Alert intervention stage)
    if (soundwaveGroupRef.current) {
      const isAlerting = stage >= 3;
      soundwaveGroupRef.current.visible = isAlerting;

      if (isAlerting) {
        soundwaveGroupRef.current.children.forEach((ring, idx) => {
          const mesh = ring as THREE.Mesh;
          const phase = (t * 2 + idx * 0.4) % 1.5;
          mesh.scale.set(1 + phase * 2.2, 1 + phase * 2.2, 1);
          if (mesh.material) {
            const mat = mesh.material as THREE.MeshBasicMaterial;
            mat.opacity = Math.max(0, 1 - phase / 1.5) * 0.8;
          }
        });
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 6]} intensity={1.8} color="#FFFFFF" />
      <directionalLight position={[-4, -3, -4]} intensity={0.8} color="#0D9488" />
      <pointLight position={[0, 2, 2]} intensity={stage >= 3 ? 3 : 1} color={stage >= 3 ? '#F59E0B' : '#2DD4BF'} />

      {/* Exploding Dashcam Assembly */}
      <group ref={dashcamRef} position={[-0.8, 0.1, 0]} scale={1.1}>
        <DashcamModel
          explodedProgress={currentExplode.current}
          isAlerting={stage >= 3}
        />
      </group>

      {/* Wireless Signal Arc (stage >= 2) */}
      <group ref={signalArcRef}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial
              color="#2DD4BF"
              emissive="#2DD4BF"
              emissiveIntensity={2.5}
            />
          </mesh>
        ))}
      </group>

      {/* Receiving Earbuds Unit */}
      <group ref={earbudsRef} position={[2.6, 0, 0]} rotation={[0.2, -0.6, 0]}>
        {/* Earbud Model */}
        <mesh>
          <sphereGeometry args={[0.3, 24, 24]} />
          <meshStandardMaterial color="#0A0C10" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.1, 0.08, 0.6, 24]} />
          <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Glowing Alert Ring */}
        <mesh position={[0, 0, 0.2]}>
          <ringGeometry args={[0.12, 0.2, 32]} />
          <meshStandardMaterial
            color={stage >= 3 ? '#F59E0B' : '#2DD4BF'}
            emissive={stage >= 3 ? '#F59E0B' : '#2DD4BF'}
            emissiveIntensity={stage >= 3 ? 3 : 1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Concentric Sound-wave Ripples (Stage >= 3) */}
        <group ref={soundwaveGroupRef} position={[0, 0, 0.25]}>
          {[0, 1, 2].map((idx) => (
            <mesh key={idx}>
              <ringGeometry args={[0.3, 0.35, 32]} />
              <meshBasicMaterial
                color="#F59E0B"
                transparent
                opacity={0.8}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>
      </group>
    </>
  );
};
