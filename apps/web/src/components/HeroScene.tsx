'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function InteractiveParticles({ count = 4200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const { positions, originalPositions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    // Warm luxury studio cognac & champagne palette
    const palette = [
      new THREE.Color('#DCA86A'), // Brushed Champagne Gold
      new THREE.Color('#E28743'), // Warm Cognac Amber
      new THREE.Color('#FAF6F0'), // Ivory Silk Sheen
      new THREE.Color('#B8854D'), // Burnt Rose Bronze
      new THREE.Color('#C96E42'), // Deep Spiced Copper
    ];

    for (let i = 0; i < count; i++) {
      const radius = 1.0 + Math.random() * 7.0;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 5.0;

      const x = Math.cos(angle) * radius;
      const y = height + Math.sin(angle * 2) * 0.45;
      const z = Math.sin(angle) * radius - 1.8;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      const col = palette[Math.floor(Math.random() * palette.length)];
      cols[i * 3] = col.r;
      cols[i * 3 + 1] = col.g;
      cols[i * 3 + 2] = col.b;
    }

    return {
      positions: pos,
      originalPositions: orig,
      colors: cols,
    };
  }, [count]);

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.set(x * (viewport.width / 2.2), y * (viewport.height / 2.2));
    };
    window.addEventListener('mousemove', handlePointerMove);
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, [viewport]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime() * 0.45;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      const ox = originalPositions[ix];
      const oy = originalPositions[iy];
      const oz = originalPositions[iz];

      const waveY = Math.sin(time + ox * 0.65) * 0.2 + Math.cos(time * 0.8 + oz * 0.5) * 0.14;
      const waveX = Math.cos(time * 0.7 + oy * 0.6) * 0.12;

      const dx = ox - mx;
      const dy = oy - my;
      const distSq = dx * dx + dy * dy;
      const influenceRadiusSq = 4.0;

      let targetX = ox + waveX;
      let targetY = oy + waveY;

      if (distSq < influenceRadiusSq) {
        const force = (1 - distSq / influenceRadiusSq) * 0.75;
        targetX += (dx / Math.sqrt(distSq + 0.1)) * force;
        targetY += (dy / Math.sqrt(distSq + 0.1)) * force;
      }

      posAttr.array[ix] += (targetX - posAttr.array[ix]) * 0.085;
      posAttr.array[iy] += (targetY - posAttr.array[iy]) * 0.085;
    }

    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.055;
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.026}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.78}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none opacity-90">
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.1} />
        <pointLight position={[3, 3, 3]} intensity={2} color="#E28743" />
        <pointLight position={[-3, -3, 2]} intensity={1.5} color="#DCA86A" />
        <InteractiveParticles />
      </Canvas>
    </div>
  );
}
