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