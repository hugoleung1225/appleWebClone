import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap/src'
import ModelView from './ModelView'
import { models as modelList} from '../constants'
import { sizes as sizeList } from '../constants'
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'

const Model = () => {
  //size choosing state variable
  const [size, setSize] = useState(sizeList[0]);

  //phone model state variable
  const [model, setModel] = useState(modelList[0]);

  //camera Controll for the model view
  const cameraControllSmall = useRef();
  const cameraControllLarge = useRef();

  //3D model state variable
  const smallPhone =  useRef(new THREE.Group());
  const LargePhone =  useRef(new THREE.Group());

  //rotation value
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation , setLargeRotation ] = useState(0);



  useGSAP(()=>{
    gsap.to( '#heading',{
      //current to y position 0
      y:0, 
      //transparency
     opacity:1,
     duration: 2
    })
  },[])

  return (
    <section className='common-padding'>
      <div className='screen-max-width'>
        <h1 id='heading' className='section-heading'>
          Take a closer look.
        </h1>

        {/**The phone model */}
        <div className='flex flex-col items-center mt-5'>
          <div className='w-full h-[75vh] md:h-[90vh] relative overflow-hidden'>
            <ModelView
              index={1}
              groupRef={smallPhone}
              gsapType='view1'
              controlRef={cameraControllSmall}
              setRotationState={setSmallRotation}
              model={model}
              size={size}
            />

            <ModelView
              index={2}
              groupRef={LargePhone}
              gsapType='view2'
              controlRef={cameraControllLarge}
              setRotationState={setLargeRotation}
              model={model}
              size={size}
            />

            {/**Three JS 3D model 
             * View.Port is for rendering multiple views of the  model on the same Canvas
            */}
            <Canvas
              className='w-full h-full'
              style={{
                position:'fixed',
                top:0,
                bottom:0,
                left:0,
                right:0,
                overflow:'hidden'
              }}
              eventSource={document.getElementById('root')}
            >
              <View.Port/>
            </Canvas>
          </div>

          <div className='mx-auto w-full'>
            <p className='mb-5 text-center text-sm font-light'>{model.title}</p>

            <div className='flex-center'>
              <ul className='color-container'>
                {modelList.map((item, i)=>(
                  <li key={i} 
                    className='m-2 w-6 h-6 rounded-full cursor-pointer'
                    style={{backgroundColor: item.color[0]}}
                    onClick={()=> setModel(item)}
                  ></li>
                ))}
              </ul>

              <button className='size-btn-container'>
                {sizeList.map((item,i)=>(
                  <span 
                    key={item.value} className='size-btn'
                    style={ {backgroundColor: size===item?"white":"transparent" , color: size===item?"black":'white'}  }
                    onClick={()=> setSize(item)}
                  >
                    {item.label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Model