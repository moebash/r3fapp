import path from 'path'
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import react from '@vitejs/plugin-react'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'


export default defineConfig({
    assetsInclude: ['**/*.glb'],
    plugins: [reactRefresh(),react()],
    build: {
        rollupOptions: {
        plugins: [
        dynamicImportVars()
        ],
       
        },
        },
        
})

