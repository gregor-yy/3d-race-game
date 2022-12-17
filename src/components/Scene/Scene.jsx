import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";

import { useState, useEffect } from "react";

import { Track } from "../Track";
import { Ground } from "../Ground";
import { Car } from "../Car";

export const Scene = () => {
    const [thirdPerson, setThirdPerson] = useState(false);
    const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);
    const handleKeyDown = ({ key }) => {
        if (key === "v") {
            setThirdPerson((prevstate) => !prevstate);
        }
    };
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    return (
        <Suspense fallback={null}>
            <Environment files={process.env.PUBLIC_URL + "/textures/envmap.hdr"} background="both" />
            <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />

            {!thirdPerson && <OrbitControls target={[-2.64, -0.71, 0.03]} />}

            <Car thirdPerson={thirdPerson} />
            <Track />
            <Ground />
        </Suspense>
    );
};
