import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {join, resolve} from 'path'

const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir)
}

const alias = {
  '@': pathResolve("src/render")
}


export default defineConfig({
  root: join(__dirname, './src/render'),
  base: './',
  outDir: join(__dirname, './dist'),
  resolve: {
    alias
  },
  plugins: [vue()]
})
