import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './components/App'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '../stylesheets/main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)