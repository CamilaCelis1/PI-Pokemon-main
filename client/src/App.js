import { useHistory } from "react-router-dom"
import css from './app.module.css';
import Routes from './components/routes';
import './App.css';

function App() {
  const history = useHistory()
  return (
    <Routes />
  );
}

export default App;
