import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls, } from '@quasar/vite-plugin'
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 1234
  },


  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src')
    },
  },
  plugins: [vue({
    template: { 
      transformAssetUrls,
      compilerOptions: {
        isCustomElement: (tag) => ['md-linedivider'].includes(tag),
      }
    }
  }),
  quasar({
    sassVariables: 'src/quasar-variables.sass'
  }),
  
 
  ],
  optimizeDeps: {
    include: [
      "@fawmi/vue-google-maps",
      "fast-deep-equal",
    ],
  },
  

})
