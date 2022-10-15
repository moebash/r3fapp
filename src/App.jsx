import * as THREE from "three"
import { useRef, useEffect, useState, Suspense } from "react"
import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber"
import { Sky, PointerLockControls, useGLTF, Stars, Stats, MeshReflectorMaterial } from "@react-three/drei"
import { Physics, useSphere, usePlane } from "@react-three/cannon"
import { World } from "./World"
import { io } from 'socket.io-client'
import { Model } from "./Emoji"
import { Portalx } from "./Portal"
import axeUrl from "./assets/axe.glb"
import grass from "./assets/marble.jpg"
import { MeshStandardMaterial } from "three"


const SPEED = 5
const keys = { KeyW: "forward", KeyS: "backward", KeyA: "left", KeyD: "right" }
const moveFieldByKey = (key) => keys[key]
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const rotation = new THREE.Vector3()
const speed = new THREE.Vector3()


const UserWrapper = ({ position, rotation, id }) => {
    return (
       <>
          <Model id={id}  position={[position[0],position[1] - 0.5 ,position[2]]}
        rotation={[0, rotation[1] - 5, 0]} />
            {/* Optionally show the ID above the user's mesh */}
           
            </>
        
    )
}



function usePlayerControls() {
  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false })
  useEffect(() => {
    const handleKeyDown = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }))
    const handleKeyUp = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }))
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    return () => (document.removeEventListener("keydown", handleKeyDown), document.removeEventListener("keyup", handleKeyUp))
  }, [])
  return movement
}

export default function App() {
const [pointer, setPointer] = useState(true)
 const pointerRef = useRef()
 const [socketClient, setSocketClient] = useState(null)
 const [clients, setClients] = useState({})

 useEffect(() => {
     // On mount initialize the socket connection
     setSocketClient(io())

     
     // Dispose gracefuly
     return () => {
         if (socketClient) socketClient.disconnect()
     }
 }, [])

 useEffect(() => {
     if (socketClient) {
         socketClient.on('move', (clients) => {
             setClients(clients)
         })
     }
 }, [socketClient])
    

  return (
    socketClient && ( <Canvas
    frameloop="demand"
      shadows
      gl={{ alpha: false }}
      camera={{ fov: 45 }}
      raycaster={{ computeOffsets: (e) => ({ offsetX: e.target.width / 2, offsetY: e.target.height / 2 }) }}>
      <Sky  sunPosition={[100, 20, 100]} inclination={2} azimuth={0.25}/>
     
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={1} fade speed={1} />
      <ambientLight intensity={0.7} />
      <Stats/>
      <Suspense fallback={null}>
      <pointLight castShadow intensity={1} position={[100, 10, 100]} color={'#9966a3'} />

      <Physics gravity={[0, -30, 0]}>
      <World position={[0,0,-16]}/>
      <Ground />
        
       <Player socket={socketClient}/>
       {Object.keys(clients)
                    .filter((clientKey) => clientKey !== socketClient.id)
                    .map((client) => {
                        const { position, rotation } = clients[client]
                        return (
                            
                            <UserWrapper
                                key={client}
                                id={client}
                                position={position}
                                rotation={rotation}
                               
                            />
                           
                        )
                    })}
      
      </Physics>
    <PointerLockControls /> 
      </Suspense>
      
    </Canvas>)
  )
}

function Ground(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  const texture = useLoader(THREE.TextureLoader, grass)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial map={texture} map-repeat={[5, 5]}  />
    </mesh>
  )
}

function Axe({position, rotation, ...props}) {
  const group = useRef()
  const { nodes, materials } = useGLTF(axeUrl)
  
  return (
    <group position={position} rotation={rotation} ref={group} dispose={null} {...props}>
      <group rotation={[0, Math.PI / 1.8, -0.3]} scale={0.5}>
      <mesh>
  <boxGeometry />
  <meshPhongMaterial color="#ff0000" opacity={0} transparent />
</mesh>
      </group>
    </group>
  )
}

function Player({socket, ...props}) {
  
  const axe = useRef()
  const [ref, api] = useSphere(() => ({ mass: 1, type: "Dynamic", position: [0, 10, 0], ...props }))
  const { forward, backward, left, right } = usePlayerControls()
  const { camera } = useThree()
  
  const velocity = useRef([0, 0, 0])

 
  useFrame((state) => {
    
    ref.current.getWorldPosition(camera.position)
    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation)
    speed.fromArray(velocity.current)
    axe.current.children[0].rotation.x = THREE.MathUtils.lerp(
      axe.current.children[0].rotation.x,
      Math.sin((speed.length() > 1) * state.clock.elapsedTime * 10) / 8,
      1,
    )
    axe.current.rotation.copy(camera.rotation)
    axe.current.position.copy(camera.position).add(camera.getWorldDirection(rotation).multiplyScalar(1))

    api.velocity.set(direction.x, velocity.current[1], direction.z)
    
    if (camera.position) {
      camera.rotation.order = 'YXZ';
      const rotation =  axe.current.rotation
      const position = camera.position
        const { id } = socket
        const posArry = []
        const rotArry = []
        position.toArray(posArry)
        rotation.toArray(rotArry)
        
        
        socket.emit('move', {
            id,
            rotation: rotArry,
            position: posArry,
        })
      }
     
        
  })
  return (
    <>
      <mesh ref={ref} />
      <group ref={axe} onPointerMissed={(e) => (axe.current.children[0].rotation.x = -0.5)}>
        <Axe position={[0.15, -0.35, 0.5]} />
      </group>
    </>
  )
}



