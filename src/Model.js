import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/ds5.glb')
  useFrame((state) => {
    group.current.children.forEach((child, index) => {
      child.position.y += Math.sin(index * 1000 + state.clock.elapsedTime) / 50
      child.rotation.x += (Math.sin(index * 1000 + state.clock.elapsedTime) * Math.PI) / 2000
      child.rotation.y += (Math.cos(index * 1000 + state.clock.elapsedTime) * Math.PI) / 3000
      child.rotation.z += (Math.sin(index * 1000 + state.clock.elapsedTime) * Math.PI) / 4000
    })
  })
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes['000-0-0'].geometry}
        material={materials['Material.001']}
        position={[0, -8.75, 0]}
        rotation={[-Math.PI / 2, 0, 3]}
        scale={[125, 125, 125]}
      />
    </group>
  )
}

useGLTF.preload('/ds5.glb')
