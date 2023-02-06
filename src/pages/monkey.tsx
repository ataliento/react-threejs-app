import { Suzi } from '@/componentes/Monkey';
import { Center, AccumulativeShadows, RandomizedLight, OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { Canvas } from "@react-three/fiber";
import { useRouter } from 'next/router';

export default function Monkey() {
    const {push} = useRouter();

    return (
        <>
        <button onClick={() => push("/")}>Redirect to Home</button>
        
        <Canvas shadows camera={{ position: [8, 1.5, 8], fov: 25 }}>
            <group position={[0, -0.5, 0]}>
                <Center top>
                    <Suzi rotation={[-0.63, 0, 0]} scale={1}  />
                </Center>
                <Center top position={[-2, 0, 1]}>
                    <mesh castShadow>
                        <sphereGeometry args={[0.25, 64, 64]} />
                        <meshStandardMaterial color="lightblue" />
                    </mesh>
                </Center>
                <Center top position={[2.5, 0, 1]}>
                    <mesh castShadow rotation={[0, Math.PI / 4, 0]}>
                        <boxGeometry args={[0.5, 0.5, 0.5]} />
                        <meshStandardMaterial color="indianred" />
                    </mesh>
                </Center>
                <AccumulativeShadows temporal frames={100} color="orange" colorBlend={2} toneMapped={true} alphaTest={0.9} opacity={2} scale={12}>
                    <RandomizedLight amount={8} radius={4} ambient={0.5} intensity={1} position={[5, 5, -10]} bias={0.001} />
                </AccumulativeShadows>
            </group>
            <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
            <Environment preset="city" />
        </Canvas>
        </>
    )
}


