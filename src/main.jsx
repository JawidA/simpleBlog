import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { UserProvider } from './component/useContext.jsx'
import { BrowserRouter} from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter >
      <UserProvider >
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
