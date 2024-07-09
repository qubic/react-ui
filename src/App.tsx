import qubicLogo from './assets/qubic.svg'
import './App.css'

function App() {

  return (
    <>
      <div className='flex justify-center items-center'>
        <a href="https://qubic.org" target="_blank" className='flex'>
          <img src={qubicLogo} className="logo" alt="Qubic logo" />
        </a>
      </div>
      <h1>Qubic - React UI</h1>
      <p>
        The Qubic React UI is a simple React package,<br/>
        which provides the UI components to build future proof Qubic DAPPs.
      </p>
    </>
  )
}

export default App
