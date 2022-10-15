import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'


export default defineConfig({
    assetsInclude: ['**/*.glb'],
    plugins: [react()],
    build: {
        rollupOptions: {
        plugins: [
        dynamicImportVars()
        ],
       
        },
        },
        
})

