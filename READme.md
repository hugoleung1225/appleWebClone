# 1 init react project by build toos vite
npm create vite@latest my-project

# 2 install tailwindcss
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3 update tailwind.config.js 
adjust content to include all the related source file type 

# 4 update ./src/index.css to use tailwind css directives
@tailwind base;
@tailwind components;
@tailwind utilities;

# 5  scan the template files for classes and build  CSS.
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch

# 6 start the program with basic tailwind css class
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )

# 7 update constant variables , public images and videos
# 8 update tab icon, title on index.html 
# 9 update App.jsx
# 10 create components 
can type rafce to quickly create default component, needs to install es7+

# 10.1 build Navbar
# 10.1.1 define the structure of functional component
# 10.1.2 add styles

## Install THREE JS 
npm install three @react-three/drei @react-three/fiber


# 3D model generation: gltfsx ( glb to jsx )
https://github.com/pmndrs/gltfjsx  / https://gltf.pmnd.rs/