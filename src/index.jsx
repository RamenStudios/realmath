import { createRoot } from 'react-dom/client'
import { App } from './components/App'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './stylesheets/main.css'

const root = createRoot(document.getElementById('root'));
root.render(<App/>);