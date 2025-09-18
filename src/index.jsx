import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './components/App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '../stylesheets/main.css'

/* determines if desktop or mobile by checking for mouse */
/* credit: https://xobyte.org/scripts/isMobile.js */
const checkMobile = () => 
{
  if(window.matchMedia("(any-hover:none)").matches) {
    return 'mobile';
  } else if (window.screen.width < window.screen.height) {
    return 'mobile';
  } else {
    return 'desktop';
  }
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App userframe={checkMobile()}/>
  </StrictMode>,
)
