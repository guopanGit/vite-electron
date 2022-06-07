
export default function cache({key, modules,modulesKeys}) {
  return (store) => {
    const sessionOldState = JSON.parse(sessionStorage.getItem(key) || '{}')
    let oldState = {}
    Object.assign(oldState, sessionOldState)
    if (Object.keys(oldState).length > 0) {
      for (const oldKey in oldState) {
        modules[oldKey] = oldState[oldKey]
      }
      store.replaceState(modules)
    }
    store.subscribe((mutation, state) => {
      // 判断是否需要缓存数据至sessionStorage
      if (modulesKeys.local.length > 0) {
        const localData = setData(store.state, modulesKeys.local)
        sessionStorage.setItem(key, JSON.stringify(localData))
      } else {
        sessionStorage.removeItem(key)
      }
    })
  }
}

function setData(state, module) {
  let data = {}
  for (const i of module) {
    data[i] = state[i]
  }
  return data
}