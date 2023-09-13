// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const [name, setName] = React.useState(
    window.localStorage.getItem('name') ?? initialName,
  )

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  })

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="George" />
}

export default App

/* Extra credit 

01 
const [name, setName] = React.useState(() =>
    window.localStorage.getItem('name') ?? initialName,
  )

02 

React.useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

03

function useLocalStorageState(key, defaultValue, {
  serialize = JSON.stringify,
  deserialize = JSON.parse
} = {}) {
  const [state, setState] = React.useState(
    () => {
      const valueInLocalStorage = window.localStorage.getItem(key)
      if (valueInLocalStorage) {
        return serialize(valueInLocalStorage)
      }
      return typeof defaultValue === 'function' ? defaultValue() : defaultValue
    }
  )

  // ? We use "useRef" to keep track of the previous Key, we use it because we don't want to re-render every time the key changes
  const prevKeyRef = React.useRef(key)


  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [state])


  return [state, setState];
}

*/
