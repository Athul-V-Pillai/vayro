import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LiteEarbudsModelProps {
  isAlerting?: boolean;
  color?: string;
  interactiveLid?: boolean;
}

export const LiteEarbudsModel: React.FC<LiteEarbudsModelProps> = ({
  isAlerting = false,
  color = '#12151B',
  interactiveLid = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const lidHingeRef = useRef<THREE.Group>(null);
  const ledRef = useRef<THREE.Mesh>(null);
  const leftBudRef = useRef<THREE.Group>(null);
  const rightBudRef = useRef<THREE.Group>(null);

  // Smooth lerp for lid rotation and earbud lift
  const currentAngle = useRef(0);
  const targetAngle = isOpen ? -Math.PI * 0.55 : 0;

  useFrame((_, delta) => {
    // Lerp hinge angle
    currentAngle.current = THREE.MathUtils.damp(
      currentAngle.current,
      targetAngle,
      8,
      delta
    );

    if (lidHingeRef.current) {
      lidHingeRef.current.rotation.x = currentAngle.current;
    }

    // Earbuds lift slightly when open
    const openProgress = Math.abs(currentAngle.current / (Math.PI * 0.55));
    if (leftBudRef.current && rightBudRef.current) {
      leftBudRef.current.position.y = 0.2 + openProgress * 0.35;
      rightBudRef.current.position.y = 0.2 + openProgress * 0.35;
    }

    // LED pulse
    if (ledRef.current) {
      const mat = ledRef.current.material as THREE.MeshStandardMaterial;
      const targetColor = isAlerting 
        ? new THREE.Color('#F59E0B') 
        : isOpen 
        ? new THREE.Color('#2DD4BF') 
        : new THREE.Color('#0D9488');
      
      mat.color = targetColor;
      mat.emissive = targetColor;
      mat.emissiveIntensity = isAlerting ? 2.5 : isOpen ? 1.5 : 0.6;
    }
  });

  const handlePointerDown = (e: { stopPropagation: () => void }) => {
    if (!interactiveLid) return;
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <group dispose={null} onPointerDown={handlePointerDown}>
      {/* Lower Case Base (Pebble Chassis) */}
      <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.0, 0.85, 0.7, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.35}
          metalness={0.3}
        />
      </mesh>

      {/* Internal Magnetic Docking Bed */}
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.92, 0.92, 0.05, 32]} />
        <meshStandardMaterial color="#0A0C10" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Front LED Battery / Status Pill */}
      <mesh ref={ledRef} position={[0, -0.15, 0.95]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial
          color="#2DD4BF"
          emissive="#2DD4BF"
          emissiveIntensity={1.2}
          roughness={0.2}
        />
      </mesh>

      {/* Rear Hinge Anchor */}
      <mesh position={[0, 0.15, -0.85]}>
        <boxGeometry args={[0.4, 0.1, 0.08]} />
        <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Rotating Lid Group (Pivot centered at rear hinge) */}
      <group ref={lidHingeRef} position={[0, 0.15, -0.85]}>
        {/* Lid Geometry translated relative to hinge */}
        <mesh position={[0, 0.35, 0.85]} castShadow>
          <cylinderGeometry args={[0.85, 1.0, 0.7, 32]} />
          <meshStandardMaterial
            color={color}
            roughness={0.35}
            metalness={0.3}
          />
        </mesh>
        {/* Subtle vayro logo imprint pill on top */}
        <mesh position={[0, 0.71, 0.85]}>
          <boxGeometry args={[0.4, 0.02, 0.12]} />
          <meshStandardMaterial
            color="#2DD4BF"
            roughness={0.2}
            metalness={0.7}
            emissive="#2DD4BF"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Left Earbud (Seated inside case) */}
      <group ref={leftBudRef} position={[-0.4, 0.2, 0]}>
        {/* Earbud Stem */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.07, 0.06, 0.5, 16]} />
          <meshStandardMaterial color="#0F172A" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Earbud Head */}
        <mesh position={[0, 0.1, 0.05]}>
          <sphereGeometry args={[0.15, 20, 20]} />
          <meshStandardMaterial color="#0F172A" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Silicone Ear-tip */}
        <mesh position={[0, 0.1, 0.2]}>
          <cylinderGeometry args={[0.06, 0.12, 0.12, 16]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} transparent opacity={0.9} />
        </mesh>
        {/* Capacitive Touch Sensor Rim */}
        <mesh position={[0, 0.1, -0.1]}>
          <circleGeometry args={[0.06, 16]} />
          <meshStandardMaterial
            color="#2DD4BF"
            emissive="#2DD4BF"
            emissiveIntensity={isAlerting ? 2.5 : 0.6}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Right Earbud (Seated inside case) */}
      <group ref={rightBudRef} position={[0.4, 0.2, 0]}>
        {/* Earbud Stem */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.07, 0.06, 0.5, 16]} />
          <meshStandardMaterial color="#0F172A" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Earbud Head */}
        <mesh position={[0, 0.1, 0.05]}>
          <sphereGeometry args={[0.15, 20, 20]} />
          <meshStandardMaterial color="#0F172A" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Silicone Ear-tip */}
        <mesh position={[0, 0.1, 0.2]}>
          <cylinderGeometry args={[0.06, 0.12, 0.12, 16]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} transparent opacity={0.9} />
        </mesh>
        {/* Capacitive Touch Sensor Rim */}
        <mesh position={[0, 0.1, -0.1]}>
          <circleGeometry args={[0.06, 16]} />
          <meshStandardMaterial
            color="#2DD4BF"
            emissive="#2DD4BF"
            emissiveIntensity={isAlerting ? 2.5 : 0.6}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
};
