import React, { useEffect, useState, useRef } from "react";
import "./3D copy.css";
import { Canvas, useFrame } from "@react-three/fiber";

import { OrbitControls, useGLTF } from "@react-three/drei";
import model_path from './Freecad_SDI.glb';

//import ModelPath from './views/Test_Freecad.gltf'
//need 3 libs: @react-three/fiber, @react-three/drei, three
//need data: freecad -> object > convert into glb

function Three_D_Temp() {
    
  function Model_3D(){
    const modelRef = useRef();

    useFrame(() => {
      if (modelRef.current){
          modelRef.current.rotation.y += 0.01;
        }
      })

    const {scene} = useGLTF(model_path);

    return <primitive ref= {modelRef} object={scene} scale={0.03}></primitive>
}    

  return (
      <div className="model">
            <Canvas gl={{preserveDrawingBuffer:true}}>
                <ambientLight intensity={0.5}>
                </ambientLight>
                <directionalLight position={[5, 5, 5]} intensity={1}></directionalLight>

                <Model_3D></Model_3D>
                <OrbitControls></OrbitControls>
            </Canvas>
      </div>    
  )
}

export default Three_D_Temp;
