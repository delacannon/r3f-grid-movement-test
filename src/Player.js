import { useEffect, forwardRef, useState } from "react";
import * as THREE from "three";
import { PlainAnimator } from "three-plain-animator/lib/plain-animator";
import { useTexture } from "@react-three/drei";
import { useStore } from "./store";
import gsap from "gsap";

const Player = forwardRef((props, ref) => {
  const {
    tiles,
    setCurrentAction,
    setCurrentPlayerPos,
    currentPlayerPos,
    currentAction,
  } = useStore((state) => state);

  const offset = 4.5;
  const texture = useTexture("/boy.png");
  texture.flipY = false;
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;

  const [animator] = useState(() => new PlainAnimator(texture, 3, 1, 0, 15));

  useEffect(() => {
    const initialTile = tiles.find((t) => t.tile === 9);
    if (!initialTile) return;
    setCurrentPlayerPos(initialTile);
  }, [tiles]);

  const animateSpriteHandler = () => {
    animator.animate();
    if (currentAction === "walk") {
      animator.tilesTotalAmount = 3;
    } else {
      animator.tilesTotalAmount = 0;
    }
  };

  const movePlayer = (pathNodes) => {
    pathNodes.forEach((node, i) => {
      const tile = tiles.find((t) => node.x === t.pos.x && node.y === t.pos.y);
      gsap.to(ref.current.position, {
        duration: 0.16,
        delay: i * 0.16,
        onComplete: () => {
          if (i === pathNodes.length - 1) {
            setCurrentPlayerPos(tile);
            setCurrentAction("");
          }
        },
        x: tile.tilePos.x - offset,
        y: tile.tilePos.z,
        z: offset - tile.tilePos.y,
      });
    });
  };

  return (
    <group
      ref={ref}
      movePlayer={movePlayer}
      animateSprite={animateSpriteHandler}
      position={[
        currentPlayerPos.pos.x - offset,
        currentPlayerPos.pos.z,
        offset - currentPlayerPos.pos.y,
      ]}
    >
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[0.5, 12]} />
        <meshBasicMaterial color="black" transparent opacity={0.5} />
      </mesh>
      <mesh
        name="Player"
        position={[null, 0.75, null]}
        rotation={[-Math.PI * 0.5, 0, 0]}
      >
        <boxGeometry args={[1, 0, 1.5]} />
        <meshStandardMaterial map={texture} transparent={true} />
      </mesh>
    </group>
  );
});

export default Player;
