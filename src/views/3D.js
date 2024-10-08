import React, { useEffect, useState } from "react";
import "./3D.css";
import { Canvas } from "@react-three/fiber";

import { OrbitControls, useGLTF } from "@react-three/drei";
import model_path from './Freecad_SDI.glb';
import part_path from './Part.glb';
//import { TextGeometry } from "three/examples/jsm/Addons.js";

//import ModelPath from './views/Test_Freecad.gltf'
//need 3 libs: @react-three/fiber, @react-three/drei, three
//need data: freecad -> object > convert into glb

function Three_D() {
    
  function Model_3D(){
    //url ='http://127.0.0.1:5000/models/model'
    const {scene, error} = useGLTF(part_path);

    if (error){
      console.error('Error loading model: ', error);
    }
    
    return <primitive object={scene}></primitive>
}    


  return (
    <section className="report">
       <div className="model">
            <Canvas>
                <ambientLight intensity={0.5}>
                </ambientLight>
                <directionalLight position={[5, 5, 5]} intensity={1}></directionalLight>

                <Model_3D></Model_3D>
                <OrbitControls></OrbitControls>
            </Canvas>
       </div>

    </section>
    
  )
}

export default Three_D;
