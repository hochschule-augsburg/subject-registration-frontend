import './resources/css/App.css';
import './resources/css/BurgerMenu.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Route } from "react-router-dom";

export const URLS = {
    HOME: 'home',
    REGISTRATIONS: 'registrations',
    SUBJECTS: 'subjects',
    INFO: 'info',
    LOGOUT: 'logout'
};

function App() {
  return (
      <Router>
        <Route path='/' component={ Home } exact />
      </Router>
  );
}

export default App;
