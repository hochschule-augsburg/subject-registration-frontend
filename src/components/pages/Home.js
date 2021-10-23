import Navbar from "../layout/Navbar";
import BurgerMenu from "../layout/BurgerMenu";
import {URLS} from "../../App";
import {callAPI} from "../../util/api";
import {useContext, useEffect, useState} from "react";
import userContext from "../../context/userContext";
import SubjectSelectionContext from "../../context/subjectSelectionContext";
import {DUMMY_REG_ID} from "../../App";

/**
 * Main page of the application.
 * @return {JSX.Element}
 * @constructor
 */
function Home() {
    const {user, setUser} = useContext(userContext);
    const [userInfo, setUserInfo] = useState(null);
    const {subjectSelection, setSubjectSelection} = useContext(SubjectSelectionContext);

    // initially fetch the registration and subject selection of the logged in user
    useEffect(() => {
        if (user) {
            return user.loadUserInfo().then((userInfo) => {
                setUserInfo(userInfo);
                if (!subjectSelection) {
                    return callAPI('get', 'registration', {})
                        .then((response) => {
                            // todo get registration of the logged in user
                            const registration = response.data.find((reg) => reg.id === DUMMY_REG_ID);
                            if (!registration) {
                                return;
                            }
                            //setRegistration(registration);
                            callAPI('get', 'subject', {})
                                .then((response) => {
                                    const userSubjects = [];
                                    response.data.forEach((subject) => {
                                        registration.subjectSelection.forEach((subjectSelection) => {
                                            if (subject.id === subjectSelection.subject) {
                                                let foundSubject = subject;
                                                foundSubject.priority = subjectSelection.points;
                                                foundSubject.selectionId = subjectSelection.id;
                                                userSubjects.push(foundSubject);
                                            }
                                        });
                                    });
                                    console.log('found subjects');
                                    console.log(userSubjects);
                                    setSubjectSelection(userSubjects);
                                })
                                .catch((err) => console.log(`could not fetch subjects! ${err}`));
                        });
                }
            }).catch((err) => console.log(`error! ${err}`));
        }
    }, [user, setUser, subjectSelection, setSubjectSelection]);

    return (
        <>
            <Navbar />
            <BurgerMenu name={URLS.HOME} username={userInfo ? `${userInfo.given_name} ${userInfo.family_name}` : ''}
                        major='IN3'
                        userid='12345678'
                        logout={user ? user.logout : null}
            />
            <div className="container main">
                <div className="row">
                    <h2>Startseite</h2>
                    <p>Herzlich Willkommen bei der WPF-Anmeldeseite!<br/>Auf der linken Seite finden Sie ale nötigen
                        Informationen zur Anmeldung.</p>
                </div>
                <div className="row">
                    <h2>Anmeldefrist</h2>
                    <p>Die Anmeldefrist für die Wahlpflichtfächer beginnt am 29.4.2021 und endet am 30.05.2021.</p>
                </div>
                <div className="row">
                    <h2>Kontakt</h2>
                    <p>Bei Fragen/Problemen wenden Sie sich bitte an Frau Bäurle.</p>
                </div>
                <div className="row">
                    <h2>Impressum</h2>
                    <a href='/' style={{marginBottom: '0.5rem'}}>Link</a>
                </div>
            </div>
        </>
    );
}

export default Home;
