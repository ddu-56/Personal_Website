"use client";

/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface InnerProps {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  autoAnimate?: boolean;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  particleShape?: "capsule" | "sphere" | "box" | "tetrahedron";
  fieldStrength?: number;
}

// Pre-allocated math objects — avoids GC pressure in the render loop
const _pos = new THREE.Vector3();
const _scale = new THREE.Vector3();
const _quat = new THREE.Quaternion();
const _mat = new THREE.Matrix4();
const _lookMat = new THREE.Matrix4();
const _up = new THREE.Vector3(0, 1, 0);
const _target = new THREE.Vector3();
const _rotX = new THREE.Quaternion().setFromAxisAngle(
  new THREE.Vector3(1, 0, 0),
  Math.PI / 2,
);

function AntigravityInner({
  count = 100,
  magnetRadius = 10,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = "#2d5a8e",
  autoAnimate = true,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = "capsule",
  fieldStrength = 10,
}: InnerProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();

  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(0);
  const virtualMouse = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    const temp = [];
    const width = viewport.width || 100;
    const height = viewport.height || 100;

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * width;
      const y = (Math.random() - 0.5) * height;
      const z = (Math.random() - 0.5) * 20;

      temp.push({
        t: Math.random() * 100,
        speed: 0.01 + Math.random() / 200,
        mx: x,
        my: y,
        mz: z,
        cx: x,
        cy: y,
        cz: z,
        randomRadiusOffset: (Math.random() - 0.5) * 2,
      });
    }
    return temp;
  }, [count, viewport.width, viewport.height]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const { viewport: v, pointer: m } = state;

    // Detect mouse movement — mutate in place instead of allocating new object
    const dxMouse = m.x - lastMousePos.current.x;
    const dyMouse = m.y - lastMousePos.current.y;
    if (dxMouse * dxMouse + dyMouse * dyMouse > 1e-6) {
      lastMouseMoveTime.current = Date.now();
      lastMousePos.current.x = m.x;
      lastMousePos.current.y = m.y;
    }

    let destX = (m.x * v.width) / 2;
    let destY = (m.y * v.height) / 2;

    if (autoAnimate && Date.now() - lastMouseMoveTime.current > 2000) {
      const time = state.clock.getElapsedTime();
      destX = Math.sin(time * 0.5) * (v.width / 4);
      destY = Math.cos(time) * (v.height / 4);
    }

    const smoothFactor = 0.05;
    virtualMouse.current.x +=
      (destX - virtualMouse.current.x) * smoothFactor;
    virtualMouse.current.y +=
      (destY - virtualMouse.current.y) * smoothFactor;

    const targetX = virtualMouse.current.x;
    const targetY = virtualMouse.current.y;
    const globalRotation = state.clock.getElapsedTime() * rotationSpeed;

    // Hoist loop-invariant computations
    const magnetRadiusSq = magnetRadius * magnetRadius;
    const deviationScale = 5 / (fieldStrength + 0.1);
    const halfWaveAmp = 0.5 * waveAmplitude;
    const invRingFalloff = 0.1; // 1/10 — replaces division in loop

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const t = (p.t += p.speed * 0.5);

      const projFactor = 1 - p.cz / 50;
      const projTargetX = targetX * projFactor;
      const projTargetY = targetY * projFactor;

      const dx = p.mx - projTargetX;
      const dy = p.my - projTargetY;
      const distSq = dx * dx + dy * dy;

      let tPosX = p.mx;
      let tPosY = p.my;
      let tPosZ = p.mz * depthFactor;

      if (distSq < magnetRadiusSq) {
        const angle = Math.atan2(dy, dx) + globalRotation;
        const wave = Math.sin(t * waveSpeed + angle) * halfWaveAmp;
        const r =
          ringRadius + wave + p.randomRadiusOffset * deviationScale;

        tPosX = projTargetX + r * Math.cos(angle);
        tPosY = projTargetY + r * Math.sin(angle);
        tPosZ =
          p.mz * depthFactor +
          Math.sin(t) * waveAmplitude * depthFactor;
      }

      // Lerp current position toward target
      p.cx += (tPosX - p.cx) * lerpSpeed;
      p.cy += (tPosY - p.cy) * lerpSpeed;
      p.cz += (tPosZ - p.cz) * lerpSpeed;

      // Scale based on distance from the ring
      const ddx = p.cx - projTargetX;
      const ddy = p.cy - projTargetY;
      const distToMouse = Math.sqrt(ddx * ddx + ddy * ddy);
      const distFromRing = Math.abs(distToMouse - ringRadius);
      const scaleFactor = Math.max(
        0,
        Math.min(1, 1 - distFromRing * invRingFalloff),
      );
      const s =
        scaleFactor *
        (0.8 + Math.sin(t * pulseSpeed) * 0.2 * particleVariance) *
        particleSize;

      // Build instance matrix directly — avoids Object3D overhead
      _pos.set(p.cx, p.cy, p.cz);
      _target.set(projTargetX, projTargetY, p.cz);
      _lookMat.lookAt(_pos, _target, _up);
      _quat.setFromRotationMatrix(_lookMat).multiply(_rotX);
      _scale.set(s, s, s);
      _mat.compose(_pos, _quat, _scale);

      mesh.setMatrixAt(i, _mat);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      {particleShape === "capsule" && (
        <capsuleGeometry args={[0.1, 0.4, 2, 6]} />
      )}
      {particleShape === "sphere" && (
        <sphereGeometry args={[0.2, 8, 8]} />
      )}
      {particleShape === "box" && <boxGeometry args={[0.3, 0.3, 0.3]} />}
      {particleShape === "tetrahedron" && (
        <tetrahedronGeometry args={[0.3]} />
      )}
      <meshBasicMaterial color={color} />
    </instancedMesh>
  );
}

export default function Antigravity(props: InnerProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 35 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <AntigravityInner {...props} />
    </Canvas>
  );
}
