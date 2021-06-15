import { Suspense, useRef } from "react";
import { Canvas, useThree, useFrame } from "react-three-fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import * as THREE from "three";
import CaveEntrance from "./CaveEntrance";
import Player from "./Player";
import FloorGrid from "./FloorGrid";
import "./App.css";

const LevelOne = ({ player }) => {
  const scene = useRef();
  const { camera } = useThree();

  useFrame(({ gl }) => {
    // Scene Manager
    player.current.animateSprite();

    player.current.rotation.y = Math.atan2(
      player.current.position.x - camera.position.x,
      player.current.position.z - camera.position.z
    );

    gl.autoClear = false;
    gl.clearDepth();
    gl.render(scene.current, camera);
  }, 0);

  return (
    <scene ref={scene}>
      <CaveEntrance />
      <FloorGrid
        map={[
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
          [2, 2, 0, 1, 1, 1, 1, 1, 0, 1],
          [3, 3, 0, 1, 1, 1, 0, 1, 1, 1],
          [4, 4, 0, 0, 0, 0, 0, 0, 0, 0],
          [5, 5, 5, 0, 5, 5, 5, 5, 5, 5],
          [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        ]}
        player={player}
      />
    </scene>
  );
};

function App() {
  const player = useRef();

  return (
    <div className="App">
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 50, position: [-12, 6, -6] }}
        gl={{ antialias: false }}
        onCreated={({ camera, raycaster }) => {
          camera.layers.enableAll();
          raycaster.layers.set(2);
        }}
      >
        <Stats />
        <OrbitControls
          maxDistance={12}
          maxPolarAngle={Math.PI * 0.5}
          minPolarAngle={Math.PI * 0.25}
          minDistance={4}
          maxAzimuthAngle={0}
          minAzimuthAngle={-Math.PI}
          mouseButtons={{ RIGHT: THREE.MOUSE.LEFT }}
        />
        <ambientLight />
        <Suspense fallback={null}>
          <LevelOne player={player} />
          <Player ref={player} />
        </Suspense>
      </Canvas>
      <div className="hud">
        <p>Left Mouse Btn: Move Player</p>
        <p>Right Mouse Btn: Rotate Camera</p>
      </div>
    </div>
  );
}

export default App;
