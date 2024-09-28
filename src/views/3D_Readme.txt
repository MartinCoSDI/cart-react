
//import ModelPath from './views/Test_Freecad.gltf'
//need 3 libs: @react-three/fiber, @react-three/drei, three
//need data: freecad -> object > convert into glb


<Canvas>
    <ambientLight intensity={0.5}></ambientLight>
        
    <directionalLight position={[5, 5, 5]} intensity={1}></directionalLight>

    <Model_3D></Model_3D>
    
    <OrbitControls></OrbitControls>
</Canvas>


//Rotating automatically by y-axis
//Need to import useFrame, useRef

function Model_3D(){
      const modelRef = useRef();

      useFrame(() => {
        if (modelRef.current){
          modelRef.current.rotation.y += 0.01;
        }
      })

      const {scene} = useGLTF(sdi_model_path);

      return <primitive ref= {modelRef} object={scene}></primitive>
}    