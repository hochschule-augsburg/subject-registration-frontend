import './resources/css/App.css';
import './resources/css/BurgerMenu.css';
import Home from './components/pages/Home';
import MyRegistrations from "./components/pages/MyRegistrations";
import SubjectOverview from "./components/pages/SubjectOverview";
import SubjectDetail from "./components/pages/SubjectDetail";
import {BrowserRouter as Router, Route} from "react-router-dom";

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
            <Route path='/' component={Home} exact/>
            <Route path={`/${URLS.REGISTRATIONS}`} component={MyRegistrations}/>
            <Route path={`/${URLS.SUBJECTS}`} component={SubjectOverview} exact/>
            <Route path={`/${URLS.SUBJECTS}/:name`} component={SubjectDetail} />
        </Router>
    );
}

export default App;
