/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { NearestFilter } from "three";

export default function CaveEntance(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/scene.glb");

  const texture = useTexture("/tileset_master-alpha.png");
  texture.flipY = false;
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  useEffect(() => {
    materials["tileset_master"].alphaMap = texture;
  }, [texture, materials]);

  return (
    <group scale={[2, 2, 2]} ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.sign.geometry}
        material={nodes.sign.material}
        position={[2.3, 1.2, -1.25]}
      />
      <mesh
        geometry={nodes.arbol.geometry}
        material={nodes.arbol.material}
        position={[0.25, 0.68, -1.75]}
        rotation={[0, -0.81, 0]}
      />
      <mesh
        geometry={nodes.arbol001.geometry}
        material={nodes.arbol001.material}
        position={[-1.26, 0.67, 1.77]}
        rotation={[0, 0.81, 0]}
      />
      <mesh
        geometry={nodes.stone001.geometry}
        material={nodes.stone001.material}
        position={[0.73, 0.14, -0.76]}
      />
      <mesh
        geometry={nodes.stone.geometry}
        material={nodes.stone.material}
        position={[1.79, 1.02, 0.75]}
        scale={[0.86, 0.86, 0.86]}
      />
      <mesh
        geometry={nodes.shadows.geometry}
        material={materials["Material.001"]}
        position={[0.26, 0.01, -1.75]}
        scale={[0.92, 0.92, 0.92]}
      />
      <mesh geometry={nodes.Plane.geometry} material={nodes.Plane.material} />
      <mesh
        geometry={nodes.stone002.geometry}
        material={nodes.stone002.material}
        position={[-0.74, 0.13, -2.25]}
      />
      <mesh
        geometry={nodes.flowers.geometry}
        material={nodes.flowers.material}
      />
    </group>
  );
}

useGLTF.preload("/scene.glb");