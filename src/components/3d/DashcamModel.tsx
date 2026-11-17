import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DashcamModelProps {
  explodedProgress?: number; // 0 (assembled) to 1 (fully separated)
  isAlerting?: boolean;
  color?: string;
}

export const DashcamModel: React.FC<DashcamModelProps> = ({
  explodedProgress = 0,
  isAlerting = false,
  color = '#12151B'
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const irRingRef = useRef<THREE.Group>(null);
  const roadCamRef = useRef<THREE.Group>(null);
  const driverCamRef = useRef<THREE.Group>(null);
  const npuChipRef = useRef<THREE.Group>(null);
  const gSensorRef = useRef<THREE.Group>(null);
  const microSdRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Pulse the stealth infrared LEDs
    if (irRingRef.current) {
      const pulse = Math.sin(t * 3.5) * 0.3 + 0.7;
      irRingRef.current.children.forEach((child) => {
        if ((child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = isAlerting ? 2.5 : pulse * 1.2;
        }
      });
    }

    // Apply exploded displacement based on explodedProgress
    const p = explodedProgress;

    // Road camera separates forward (+Z)
    if (roadCamRef.current) {
      roadCamRef.current.position.z = 0.5 + p * 1.2;
    }
    // Driver camera separates backward (-Z)
    if (driverCamRef.current) {
      driverCamRef.current.position.z = -0.5 - p * 1.2;
    }
    // Edge-AI NPU chip floats upward (+Y)
    if (npuChipRef.current) {
      npuChipRef.current.position.y = 0.1 + p * 1.4;
      npuChipRef.current.rotation.y = p * 0.3;
    }
     // Impact sensor floats downward (-Y)
    if (gSensorRef.current) {
      gSensorRef.current.position.y = -0.3 - p * 1.0;
    }
    // MicroSD floats to the right (+X)
    if (microSdRef.current) {
      microSdRef.current.position.x = 1.1 + p * 0.9;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* Central Chassis Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.0, 1.2, 0.9]} />
        <meshStandardMaterial
          color={color}
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>

      {/* Decorative Bevel Strip */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.05, 0.08, 0.95]} />
        <meshStandardMaterial
          color="#2DD4BF"
          roughness={0.2}
          metalness={0.8}
          emissive="#2DD4BF"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Road-Facing Optical Camera Assembly (Front) */}
      <group ref={roadCamRef} position={[0, 0, 0.5]}>
        {/* Outer Lens Barrel */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.45, 0.35, 32]} />
          <meshStandardMaterial color="#0A0C10" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Metallic Bevel Ring */}
        <mesh position={[0, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.38, 0.03, 16, 32]} />
          <meshStandardMaterial color="#64748B" roughness={0.1} metalness={0.9} />
        </mesh>
        {/* 4K Multi-Element Optical Glass Element */}
        <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.08, 32]} />
          <meshStandardMaterial
            color="#083344"
            roughness={0.05}
            metalness={0.95}
            emissive="#06B6D4"
            emissiveIntensity={0.15}
          />
        </mesh>
      </group>

      {/* Driver-Facing Cabin Eye-Tracker & IR Array (Back) */}
      <group ref={driverCamRef} position={[0, 0, -0.5]}>
        {/* Lens Barrel */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.32, 0.25, 32]} />
          <meshStandardMaterial color="#0A0C10" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Glass Lens */}
        <mesh position={[0, 0, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.05, 32]} />
          <meshStandardMaterial
            color="#27110C"
            roughness={0.1}
            metalness={0.9}
            emissive={isAlerting ? '#F59E0B' : '#DC2626'}
            emissiveIntensity={isAlerting ? 0.9 : 0.4}
          />
        </mesh>

        {/* 940nm Stealth Infrared LED Ring Array */}
        <group ref={irRingRef} position={[0, 0, -0.1]}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * 0.36;
            const y = Math.sin(rad) * 0.36;
            return (
              <mesh key={i} position={[x, y, 0]}>
                <sphereGeometry args={[0.035, 16, 16]} />
                <meshStandardMaterial
                  color="#DC2626"
                  emissive={isAlerting ? '#F59E0B' : '#DC2626'}
                  emissiveIntensity={1.0}
                  roughness={0.2}
                />
              </mesh>
            );
          })}
        </group>
      </group>

      {/* Edge-AI Neural Processing Unit (Floats up when exploded) */}
      <group ref={npuChipRef} position={[0, 0.1, 0]}>
        <mesh>
          <boxGeometry args={[0.7, 0.08, 0.7]} />
          <meshStandardMaterial
            color="#0F172A"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Glowing Neural Core */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.4, 0.02, 0.4]} />
          <meshStandardMaterial
            color="#2DD4BF"
            emissive="#2DD4BF"
            emissiveIntensity={isAlerting ? 2.5 : 1.2}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* 6-Axis High-G Sensor (Floats down when exploded) */}
      <group ref={gSensorRef} position={[-0.5, -0.2, 0]}>
        <mesh>
          <boxGeometry args={[0.3, 0.06, 0.3]} />
          <meshStandardMaterial
            color="#334155"
            metalness={0.8}
            roughness={0.3}
            emissive="#F59E0B"
            emissiveIntensity={isAlerting ? 1.8 : 0.3}
          />
        </mesh>
      </group>

      {/* High-Endurance MicroSD Slot & Card (Floats right when exploded) */}
      <group ref={microSdRef} position={[1.05, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.06, 0.45, 0.28]} />
          <meshStandardMaterial
            color="#2DD4BF"
            metalness={0.5}
            roughness={0.3}
            emissive="#2DD4BF"
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>

      {/* Windshield Mounting Arm & Ball Socket */}
      <group position={[0, 0.75, 0]}>
        {/* Ball socket */}
        <mesh position={[0, -0.1, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Mount stem */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.4, 16]} />
          <meshStandardMaterial color="#0F172A" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Windshield adhesive suction puck */}
        <mesh position={[0, 0.42, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.05, 32]} />
          <meshStandardMaterial color="#0A0C10" metalness={0.3} roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
};
