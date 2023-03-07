import { Physics, useBox, usePlane } from "@react-three/cannon";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React from "react";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
	nodes: {
		[nodeName: string]: THREE.Mesh;
	};
	materials: {
		[materialName: string]: THREE.Material;
	};
};

const Dashboard: React.FC = () => {
	const Box = () => {
		const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
		return (
			<>
				<mesh
					onClick={() => {
						api.velocity.set(2, 5, 2);
					}}
					ref={ref}
					position={[0, 2, 0]}
					castShadow
				>
					<boxBufferGeometry attach={"geometry"} />
					<meshLambertMaterial
						attach={"material"}
						color={"red"}
					/>
				</mesh>
			</>
		);
	};

	function Plane() {
		const [ref] = usePlane(() => ({
			rotation: [-Math.PI / 2, 0, 0],
		}));
		return (
			<mesh
				ref={ref}
				rotation={[-Math.PI / 2, 0, 0]}
				castShadow
			>
				<planeBufferGeometry
					attach="geometry"
					args={[100, 100]}
				/>
				<meshLambertMaterial
					attach="material"
					color="lightblue"
				/>
			</mesh>
		);
	}

	function PixelPlane() {
		const { nodes } = useGLTF("/earth/scene.gltf" as string) as GLTFResult;
		const [ref] = useBox(() => ({
			mass: 1,
			position: [0, 5, 0],
		}));

		console.log(nodes);

		return (
			<mesh
				ref={ref}
				castShadow
				receiveShadow
				onClick={() => {
					// actions.animationName?.reset();
					// actions.animationName?.play();
				}}
			>
				<primitive object={nodes.mesh} />
			</mesh>
		);
	}

	return (
		<Canvas className="h-screen w-screen">
			{/* <React.Suspense fallback={null}> */}
			{/* <Model url="/scene-draco.gltf" /> */}
			<Physics>
				<Box />
				{/* <PixelPlane /> */}
				<Plane />
			</Physics>
			{/* </React.Suspense> */}
			<OrbitControls autoRotate />
			<ambientLight intensity={0.5} />
			<spotLight
				position={[10, 15, 10]}
				angle={0.3}
			/>
		</Canvas>
	);
};

export default Dashboard;
