import { createRoot } from 'react-dom/client'
import { Components } from './components/components'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

const root = createRoot(document.getElementById('root'));
root.render(<Components/>);