import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import astar, { Graph } from "javascript-astar";
import { useStore } from "./store";

const FloorGrid = ({ map, player }) => {
  const ref = useRef();
  const {
    setTiles,
    tiles,
    currentAction,
    currentPlayerPos,
    setCurrentAction,
  } = useStore((state) => state);

  useLayoutEffect(() => {
    let _tiles = [];
    const transform = new THREE.Matrix4();
    for (let i = 0; i < 100; ++i) {
      const x = i % 10;
      const y = Math.floor(i / 10);
      const normX = Math.floor(x);
      const normY = Math.floor(y);

      ref.current.name = "Tile";

      let z = 0;
      switch (map[normX][normY]) {
        case 2:
          z = 0.5;
          break;
        case 3:
          z = 1;
          break;
        case 4:
          z = 1.5;
          break;
        case 5:
          z = 2;
          break;
        default:
          z = 0;
      }
      _tiles.push({
        id: i,
        tile: map[normX][normY],
        pos: { x: normX, y: normY, z: z },
        tilePos: { x, z, y },
      });
      transform.setPosition(x, y, z);
      ref.current.setMatrixAt(i, transform);
    }
    setTiles(_tiles);
  }, []);

  const intersection = (e) => {
    if (e.intersections.length > 0) {
      const tile = tiles.find((t) => t.id === e.instanceId);
      if (tile.tile === 0 || currentAction !== "") return;
      const graph = new Graph(map, { diagonal: false });
      const start = graph.grid[currentPlayerPos.pos.x][currentPlayerPos.pos.y];
      const end = graph.grid[tile.pos.x][tile.pos.y];
      const result = astar.astar.search(graph, start, end);
      if (result.length === 0) return;
      setCurrentAction("walk");
      player.current.movePlayer(result);
    }
  };

  return (
    <group rotation={[-Math.PI * 0.5, 0, 0]} position={[-4.5, 0.01, 4.5]}>
      <instancedMesh
        layers={2}
        onClick={intersection}
        ref={ref}
        args={[null, null, 100]}
      >
        <planeGeometry />
        <meshStandardMaterial transparent opacity={0} />
      </instancedMesh>
    </group>
  );
};
export default FloorGrid;
