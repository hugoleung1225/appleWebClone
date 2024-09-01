import React, { Suspense } from 'react'
import { Html,View, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import Lights from './Light'
import IPhone from './IPhone'
import * as THREE from 'three'
import Loader from './Loader'

const ModelView = (
  {index,
    groupRef,
    gsapType,
    controlRef,
    setRotationState,
    model,
    size}) => {
  return (
    <View
      index={index}
      id={gsapType}
      //absolute position is required when using % to control
      className={`w-full h-full absolute ${index===2?'right-[-100%]':''}`}
    >

      {/** brightness */}
      <ambientLight intensity={1}/>
      <PerspectiveCamera makeDefault position={[0,0,4]} />

      <Lights/>

      {/**To allow moving camera using mouse */}
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        
        rotateSpeed={0.3}
        //target the center of the screen
        target={new THREE.Vector3(0,0,0)}
        onEnd={()=> setRotationState(controlRef.current.getAzimuthalAngle())}
      ></OrbitControls>

      <group ref={groupRef} name={`${index===1}?'small':'large'`} position={[0,0,0]}>
        {/**Model loader */}
        <Suspense fallback={<Loader/>}>
          <IPhone
            scale={ size.value === 'small'?[15,15,15]:[17,17,17] }
            item={model}
            size={size}
          />
        </Suspense>
      </group>

    </View>
  )
}

export default ModelView