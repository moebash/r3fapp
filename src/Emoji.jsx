/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import emojUrl from "./assets/emoji.glb"

export function Model({id, ...props}) {
  const ref = useRef()
  const { nodes, materials } = useGLTF(emojUrl)
  

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.smile_emoji005.geometry} material={materials.smile} rotation={[0,0.4,0]} scale={0.13} />
      <Text
                position={[0, 0.2, 0]}
                rotation={[0,1.5,0]}
                color="orange"
                anchorX="center"
                anchorY="middle"
                fontSize={0.03}
            >
                {id}
            </Text>
    </group>
  )
}


