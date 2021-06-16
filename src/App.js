import './resources/css/App.css';
import Home from './components/pages/Home';
import SubjectOverview from "./components/pages/SubjectOverview";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
      <Router>
        <Route path='/' component={ Home } exact />
          <Route path='/subjects' component={ SubjectOverview } />
      </Router>
  );
}

export default App;
