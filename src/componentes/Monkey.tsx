
import * as THREE from 'three'
import { useLayoutEffect } from 'react'
import { type PrimitiveProps, applyProps } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { FlakesTexture } from 'three-stdlib'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Instance } from '@react-three/fiber/dist/declarations/src/core/renderer'

type GLTFResult = GLTF & {
    nodes: {
        Suzanne: THREE.Mesh
    }
    materials: {
        ['Material.001']: THREE.MeshStandardMaterial,
        default: Instance,
    },
}

export function Suzi(props: Omit<PrimitiveProps, "object">) {
    const { scene, materials } = useGLTF('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/suzanne-high-poly/model.gltf') as GLTFResult;

    useLayoutEffect(() => {
        scene.traverse((obj) => obj.isObject3D && (obj.receiveShadow = obj.castShadow = true))
        applyProps(materials.default, {
            color: 'orange',
            roughness: 0,
            normalMap: new THREE.CanvasTexture(new FlakesTexture() as TexImageSource | THREE.OffscreenCanvas, THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping),
            'normalMap-repeat': [40, 40],
            normalScale: [0.05, 0.05]
        })
    })

    return <primitive  {...props} object={scene} />
}