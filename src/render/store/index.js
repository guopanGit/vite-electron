import {createStore} from 'vuex'
import cache from "./cache";

const files = import.meta.globEager('./modules/*.js')

let modules = {}
Object.keys(files).forEach((c) => {
  const module = files[c].default
  const moduleName = c.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2')
  modules[moduleName] = module
})

const cacheVue = cache({
  key: 'vuex', modules, modulesKeys: {
    local: Object.keys(modules),
  }
})

export default createStore({
  modules: {
    ...modules
  },
  plugins: [cacheVue]
})