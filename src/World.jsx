/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import worldUrl from "./assets/Idea.glb"
export function World(props) {
  const { nodes, materials } = useGLTF(worldUrl)
   const meshRef = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, Math.cos(t / 2) / 200 + 0.25, 0.1)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, Math.sin(t / 4) / 200, 0.1)
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, Math.sin(t / 8) / 200, 0.1)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, (-2 + Math.sin(t / 2)) / 20, 0.1)
  })
  return (
    <group {...props} dispose={null} scale={2.9}>
      
      <group position={[0.38, 0.36, 0.31]} scale={0.36}>
        <mesh geometry={nodes.Cube001_1.geometry} material={materials.glass} />
        <mesh geometry={nodes.Cube001_2.geometry} material={materials['Material.007']} />
      </group>
      
      
      <mesh geometry={nodes.z.geometry} material={materials['Material.006']} position={[-0.93, 0, 4.72]} scale={[0.08, 0.01, 0.08]} />
     
      <mesh geometry={nodes.Plane001.geometry} material={nodes.Plane001.material} position={[0.38, 0.02, 0.31]} scale={0.33} />
      <mesh geometry={nodes.Cube001.geometry} material={materials['Material.010']} position={[0.43, 0.1, 0.32]} rotation={[0, 0.83, 0]} scale={2.04} />
      <mesh geometry={nodes.Cube002.geometry} material={materials['Material.009']} position={[0.43, 0.1, 0.32]} rotation={[0, 0.83, 0]} scale={2.04} />
      <group position={[0.43, 0.3, 0.31]} rotation={[0, 0.83, 0]} scale={2.04}>
        <mesh geometry={nodes.Cube009_1.geometry} material={materials['Material.011']} />
        <mesh geometry={nodes.Cube009_2.geometry} material={materials['Material.012']} />
      </group>
      <group ref={meshRef}>
      <mesh  castShadow receiveShadow geometry={nodes.smile_emoji001.geometry} material={materials.smile} position={[-2, 2, 0.26]} rotation={[3.09, 4.28, -2.97]} scale={0.12} />
      </group>
     
      <group position={[0, 0, -6.43]}>
        <mesh geometry={nodes.Cube012_1.geometry} material={materials.glass} />
        <mesh geometry={nodes.Cube012_2.geometry} material={materials['Material.007']} />
      </group>
      
      <group position={[-1.5, -0.1, 3.43]} rotation={[0,1,0]}>
        <mesh geometry={nodes.Cube015.geometry} material={materials['Material.011']} />
        <mesh geometry={nodes.Cube015_1.geometry} material={materials['Material.012']} />
      </group>
      <group position={[-1.77, 0, -3.16]}>
        <mesh geometry={nodes.Cube016.geometry} material={materials.glass} />
        <mesh geometry={nodes.Cube016_1.geometry} material={materials['Material.007']} />
      </group>
      <mesh geometry={nodes.Plane004.geometry} material={nodes.Plane004.material} position={[-1.77, 0, -3.16]} />
      <mesh geometry={nodes.Cube010.geometry} material={materials['Material.010']} position={[-1.34, 0.1, -2.85]} rotation={[0, Math.PI / 2, 0]} />
      <mesh geometry={nodes.Cube011.geometry} material={materials['Material.009']} position={[-1.34, 0.1, -2.85]} rotation={[0, Math.PI / 2, 0]} />
      <group position={[-1.34, 0.3, -2.85]} rotation={[0, Math.PI / 2, 0]}>
        <mesh geometry={nodes.Cube019.geometry} material={materials['Material.011']} />
        <mesh geometry={nodes.Cube019_1.geometry} material={materials['Material.012']} />
      </group>
     
     
    </group>
  )
}


