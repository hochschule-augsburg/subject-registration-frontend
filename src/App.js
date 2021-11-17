import './resources/css/App.css';
import './resources/css/BurgerMenu.css';
import Home from './components/pages/Home';
import MyRegistrations from "./components/pages/MyRegistrations";
import StartRegistration from "./components/pages/StartRegistration";
import SubjectOverview from "./components/pages/SubjectOverview";
import SubjectDetail from "./components/pages/SubjectDetail";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {useEffect, useState} from "react";
import userContext from "./context/userContext";
import SubjectSelectionContext from "./context/subjectSelectionContext";
import Keycloak from "keycloak-js";

export const URLS = {
    HOME: 'home',
    REGISTRATIONS: 'registrations',
    START_REGISTRATION: 'startRegistration',
    SUBJECTS: 'subjects',
    INFO: 'info',
    LOGOUT: 'logout'
};

export const DUMMY_USER = "testuser";
export const DUMMY_REG_ID = "a6f1ae2a-6e60-4a57-a9d7-6dde969bc237"; // registration id of testuser

function App() {
    const [user, setUser] = useState(null);
    const [subjectSelection, setSubjectSelection] = useState(null);
    const [keycloak, setKeycloak] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (!keycloak) {
            const keycloak = Keycloak('/keycloak.json');
            return keycloak.init({onLoad: 'login-required'}).then((authenticated) => {
                console.log('keycloak: ' + JSON.stringify(keycloak));
                console.log('user id: ' + keycloak.subject);
                console.log('authenticated: ' + authenticated);
                setKeycloak(keycloak);
                setAuthenticated(keycloak.authenticated);
                setUser(keycloak);
            }).catch((err) => console.log(`error! ${err}`));
        }
    }, [keycloak, setKeycloak, authenticated, setAuthenticated]);

    return (
        <>
            {keycloak ?
                authenticated ?
                    <div>
                        <userContext.Provider value={{user, setUser}}>
                        <SubjectSelectionContext.Provider value={{subjectSelection, setSubjectSelection}}>
                            <Router>
                                <Route path='/' component={Home} exact/>
                                <Route path={`/${URLS.REGISTRATIONS}`} component={MyRegistrations}/>
                                <Route path={`/${URLS.START_REGISTRATION}`} component={StartRegistration}/>
                                <Route path={`/${URLS.SUBJECTS}`} component={SubjectOverview} exact/>
                                <Route path={`/${URLS.SUBJECTS}/:name`} component={SubjectDetail}/>
                            </Router>
                        </SubjectSelectionContext.Provider>
                        </userContext.Provider>
                    </div> :
                    <div>
                        <p>Error: Authentication failed!</p>
                    </div>
                : <div><p>Starting keycloak service...</p></div>
            }
        </>
    );
}

export default App;
