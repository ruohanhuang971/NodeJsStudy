**Set up tailwind**
-
[Link to tailwind website](https://tailwindcss.com/docs/installation/using-vite)
1. Create project
    ```
        npm create vite@latest my-project
        cd my-project
    ```
2. Install Tailwind
    ```js
        npm install tailwindcss @tailwindcss/vite
    ```
3. Config vite.config.js
    ```js
        // ...
        import tailwindcss from '@tailwindcss/vite' // update import
        
        export default defineConfig({
            plugins: [
                    // ...
                    tailwindcss(), // add as plugin
            ],
        })
    ```
4. Import Tailwind into css
    ```js
        @import "tailwindcss"; // add this to the top of css

        @reference "./index.css"; // add this to reference other css files
    ```


**Import Custom Font**
-
1. Go to https://fonts.google.com/
2. Search for font 
3. Click on bag symbol to get embedded code, click on @import
4. Add @import to the top of css file and in @theme add font
    ```css
        @import url('...');

        @theme {
            {/* ... */}
            --font-primary: "Merriweather", serif;
        }
    ```


**Import Custom Icons**
-
1. Go to https://react-icons.github.io/react-icons/
2. Search for icons


**Form Validation w/ React Hook Form**
-
1. Go to https://react-hook-form.com/get-started


**Slidable Pages**
- 
1. Go to https://swiperjs.com/demos#navigation
2. Copy code from code sandbox


**React Redux**
-
- Purpose: Help manage global state (ex: shopping cart state)
- Quick state guide: https://redux-toolkit.js.org/tutorials/quick-start


**Sweet Alert 2**
-
- Custom alerts
- Link: https://sweetalert2.github.io/