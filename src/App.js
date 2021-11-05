import * as THREE from 'three'
import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import Model from './Model'
import { PointLight } from 'three'

function Rig({ children }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (state.mouse.x * Math.PI) / 20, 0.05)
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, (state.mouse.y * Math.PI) / 20, 0.05)
  })
  return <group ref={ref}>{children}</group>
}

export default function Viewer() {
  const ref = useRef()

  // should move these funcs to utils
  const createCanvasTexture = (draw) => {
    const canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d')
    draw(ctx, canvas)
    return new THREE.CanvasTexture(canvas)
  }

  const createEmissiveMap = () => {
    let COLOR_EMISSIVE_MAP_FRONT = new THREE.Color(1, 1, 1)
    return createCanvasTexture(function (ctx, canvas) {
      ctx.strokeStyle = COLOR_EMISSIVE_MAP_FRONT.getStyle()
      ctx.strokeRect(1, 1, canvas.width - 1, canvas.height - 1)
    })
  }

  return (
    <Canvas camera={{ position: [0, -10, 65], fov: 50 }} dpr={[1, 2]}>
      <color attach="background" args={"black"} />
      <pointLight position={[100, 100, 100]} intensity={0.8} />
      <Suspense fallback={null}>
        <group position={[0, 10, 0]}>
          <Rig>
            <mesh
              position={[3, -5, -22]}
              rotation={[0, -0.2, 0]}
              geometry={
                new THREE.BoxGeometry(25, 50, 25)
              }
              material={
                new THREE.MeshStandardMaterial({
                  color: new THREE.Color(0xffffff)
                })
              }
            />
          </Rig>
          <PointLight
            position={[3, -5, -22]}
            rotation={[0, -0.2, 0]}
          />
        </group>
        <group position={[0, 10, 0]}>
          <Rig>
            <Model />
          </Rig>
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -35, 0]}
            opacity={0.5}
            width={100}
            height={100}
            blur={3}
            far={1000}
          />
        </group>
      </Suspense>
    </Canvas>
  )
}