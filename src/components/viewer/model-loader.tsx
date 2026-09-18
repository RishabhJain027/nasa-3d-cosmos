'use client';

import { useEffect, useRef } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ModelLoaderProps {
  url: string;
  wireframe?: boolean;
  onError?: (msg: string) => void;
}

export function ModelLoader({ url, wireframe = false, onError }: ModelLoaderProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  let scene: THREE.Group;
  try {
    const gltf = useGLTF(url);
    scene = gltf.scene;
  } catch (err) {
    if (onError) {
      onError(
        err instanceof Error
          ? err.message
          : 'Unable to load model. The file may be too large or unavailable.'
      );
    }
    return null;
  }

  // Apply wireframe mode
  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (mat.wireframe !== undefined) {
          mat.wireframe = wireframe;
        }
      }
    });
  }, [scene, wireframe]);

  // Auto-frame the model
  useEffect(() => {
    if (!scene) return;
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 3 / maxDim : 1;

    if (groupRef.current) {
      groupRef.current.scale.setScalar(scale);
      groupRef.current.position.set(
        -center.x * scale,
        -center.y * scale + (size.y * scale) / 2,
        -center.z * scale
      );
    }

    // Move camera to frame the model
    const perspCamera = camera as THREE.PerspectiveCamera;
    if (perspCamera.isPerspectiveCamera) {
      perspCamera.position.set(3, 2, 5);
      perspCamera.lookAt(0, size.y * scale * 0.4, 0);
      perspCamera.updateProjectionMatrix();
    }
  }, [scene, camera]);

  if (!scene) return null;

  return (
    <Center>
      <group ref={groupRef}>
        <primitive object={scene.clone(true)} />
      </group>
    </Center>
  );
}
