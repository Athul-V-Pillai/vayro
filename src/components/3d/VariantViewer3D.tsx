import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { ProEarbudsModel } from './ProEarbudsModel';
import { LiteEarbudsModel } from './LiteEarbudsModel';

interface VariantViewer3DProps {
  modelType: 'pro' | 'lite';
  color?: string;
  autoRotate?: boolean;
}

export const VariantViewer3D: React.FC<VariantViewer3DProps> = ({
  modelType,
  color = '#12151B',
  autoRotate = false
}) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFFFFF" />
      <directionalLight position={[-5, -4, -4]} intensity={0.7} color="#0D9488" />
      <pointLight position={[0, 3, 2]} intensity={1.2} color="#2DD4BF" />

      {/* OrbitControls for full 360 degree drag-to-rotate and zoom */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={2}
        maxDistance={7}
        autoRotate={autoRotate}
        autoRotateSpeed={1.5}
        dampingFactor={0.05}
      />

      {/* Conditional 3D Model Rendering */}
      <group position={[0, 0, 0]}>
        {modelType === 'pro' ? (
          <group scale={1.35} position={[0, 0.4, 0]}>
            <ProEarbudsModel color={color} />
          </group>
        ) : (
          <group scale={1.4} position={[0, -0.2, 0]}>
            <LiteEarbudsModel color={color} interactiveLid={true} />
          </group>
        )}
      </group>

      {/* Subtle Ground Shadow Plane */}
      <mesh position={[0, -1.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color="#040608" transparent opacity={0.6} />
      </mesh>
    </>
  );
};
