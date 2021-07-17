import './resources/css/App.css';
import './resources/css/BurgerMenu.css';
import Home from './components/pages/Home';
import MyRegistrations from "./components/pages/MyRegistrations";
import SubjectOverview from "./components/pages/SubjectOverview";
import SubjectDetail from "./components/pages/SubjectDetail";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {useState} from "react";
import SubjectSelectionContext from "./context/subjectSelectionContext";

export const URLS = {
    HOME: 'home',
    REGISTRATIONS: 'registrations',
    SUBJECTS: 'subjects',
    INFO: 'info',
    LOGOUT: 'logout'
};

export const DUMMY_USER = "testuser";
export const DUMMY_REG_ID = "a6f1ae2a-6e60-4a57-a9d7-6dde969bc237"; // registration id of testuser

function App() {
    const [subjectSelection, setSubjectSelection] = useState(null);

    return (
        <SubjectSelectionContext.Provider value={{subjectSelection, setSubjectSelection}}>
            <Router>
                <Route path='/' component={Home} exact/>
                <Route path={`/${URLS.REGISTRATIONS}`} component={MyRegistrations}/>
                <Route path={`/${URLS.SUBJECTS}`} component={SubjectOverview} exact/>
                <Route path={`/${URLS.SUBJECTS}/:name`} component={SubjectDetail}/>
            </Router>
        </SubjectSelectionContext.Provider>
    );
}

export default App;
