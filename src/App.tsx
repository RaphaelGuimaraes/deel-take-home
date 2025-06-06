import './App.css'

import reactLogo from './assets/react.svg'
import deelLogo from './assets/deel.jpeg'

import { AutoComplete } from './components/autocomplete'

// Alternatively, you can use a mock function for testing purposes
// import { fetchUsersMock } from './data/mockData'
import { fetchUsers } from './services/userService'

function App() {
  return (
    <>
      <div>
        <img src={deelLogo} className="logo" alt="Deel logo" />
        <span><img src={reactLogo} className="logo react" alt="React logo" /></span>
      </div>
      <div className="card">
        <AutoComplete fetchData={fetchUsers} />
      </div>
    </>
  )
}

export default App
