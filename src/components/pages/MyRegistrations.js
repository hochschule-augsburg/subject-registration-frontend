import Navbar from "../layout/Navbar";
import BurgerMenu from "../layout/BurgerMenu";
import {URLS} from "../../App";
import {useContext, useEffect, useState} from "react";
import {callAPI} from "../../util/api";
import {Link} from "react-router-dom";
import RegistrationTableItem from "../RegistrationTableItem";
import {DUMMY_REG_ID, DUMMY_USER} from "../../App";
import SubjectSelectionContext from "../../context/subjectSelectionContext";
import userContext from "../../context/userContext";

const REG_STATUS = {
    RECEIVED: 'Antrag eingegangen',
    REJECTED: 'Antrag abgelehnt'
};

const REG_BTN_MAP = {
    CREATE: 'Anmeldung abschließen',
    EDIT: 'Anmeldung überarbeiten'
};

/**
 * Displays the current registration of the user and all subjects associated with it.
 * @return {JSX.Element}
 * @constructor
 */
function MyRegistrations() {
    const {user, setUser} = useContext(userContext);
    const [userInfo, setUserInfo] = useState(null);
    const [registration, setRegistration] = useState(null);
    const {subjectSelection} = useContext(SubjectSelectionContext);

    useEffect(() => {
        if (user) {
            return user.loadUserInfo().then((userInfo) => {
                setUserInfo(userInfo);
                return callAPI('get', 'registration', {})
                    .then((response) => {
                        // todo get registration of the logged in user
                        const registration = response.data.find((reg) => reg.id === DUMMY_REG_ID);
                        if (!registration) {
                            return;
                        }
                        setRegistration(registration);
                    })
            }).catch((err) => console.log(`Could not get the registration of user ${DUMMY_REG_ID}! ${err}`));
        }
    }, [user, setUser]);

    /**
     * Check if all input from the user is valid (unsigned numbers only).
     * @param {HTMLCollection} input All user input values.
     * @return {boolean} Returns true if an invalid input was found; otherwise false.
     */
    const validateInput = (input) => {
        let hasInvalidInput = false;
        for (let i = 0; i < input.length; i++) {
            if (input[i].value.match(/^\d+$/)) {
                input[i].classList.remove('is-invalid');
            } else {
                hasInvalidInput = true;
                input[i].classList.add('is-invalid');
            }
        }
        return hasInvalidInput;
    };

    /**
     * Submit the user's subject registration.
     * @param {MouseEvent} e Mouse event instance.
     */
    const handleRegistration = (e) => {
        const input = document.getElementsByTagName('input');
        if (!validateInput(input)) {
            console.log(`[MyRegistrations][completeRegistration] with cp ${input[0].value}!`);
        } else {
            console.log(`MyRegistrations][completeRegistration] Invalid input detected!`);
            e.preventDefault();
            return;
        }
        if (registration) {
            // todo api not yet working
            // update existing registration of the user if it was already created
            return callAPI('put', 'registration', {
                id: DUMMY_REG_ID,
                subjectSelection: [
                    {
                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "subject": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "points": 1
                    }
                ]
            }).then((response) => {
                console.log('successful call');
            }).catch((err) => {
                console.log(`error! ${err}`);
            });
        } else {
            // create a new registration for the user
            // todo correct subject selection
            return callAPI('post', 'registration', {
                student: DUMMY_USER,
                subjectSelection: [
                    {
                        "subject": "24d408e3-2f1d-46b2-a2bb-a2f9f5a5bbce",
                        "points": 10
                    }
                ]
            }).then((response) => {
                console.log('successful call');
            }).catch((err) => {
                console.log(`error! ${err}`);
            });
        }
    };

    return (
        <>
            <Navbar/>
            <BurgerMenu name={URLS.REGISTRATIONS} username={userInfo ? `${userInfo.given_name} ${userInfo.family_name}` : ''}
                        major='IN3'
                        userid='12345678'
                        logout={user ? user.logout : null}
            />
            <div className="container main">
                <div className="row">
                    <h2>Meine Anmeldungen</h2>
                    <p>Hier können Sie alle Anmeldungen einsehen, die Sie bisher getätigt haben.</p>
                </div>
                <div className="row">
                    <h5>Informationen zum Anmeldeverfahren</h5>
                    <ul style={{listStyleType: "none"}}>
                        <li>Semester: SoSe 21</li>
                        <li>Anmeldefrist: 30.05.2021</li>
                        <li style={{display: "flex"}}>Gewünschte Anzahl Credits (dieses Semester):
                            <form className="form-inline" noValidate={true}>
                                <input type="text" style={{marginLeft: "0.75em", width: "5em"}} required/>
                                <div className="invalid-feedback" style={{marginLeft: "0.75em"}}>Eingabe ungültig</div>
                            </form>
                        </li>
                    </ul>
                </div>
                <div className="row">
                    {
                        subjectSelection && subjectSelection.length > 0 ?
                            <>
                                <div className="row">
                                    <h5>Informationen zur Anmeldung</h5>
                                    <p>Weisen Sie ihren gewünschten Wahlpflichtfächern Prio-Punkte zu.<br/>Je mehr
                                        Punkte, desto höher
                                        die Chance, den Platz in dem gewünschten Fach zu bekommen.<br/> Sie müssen in
                                        Summe <b>exakt</b> 1000 Punkte vergeben.</p>
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th scope="col">Wahlpflichtfach</th>
                                            <th scope="col">Dozent</th>
                                            <th scope="col">CP</th>
                                            <th scope="col">Priorität</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Aktion</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            subjectSelection.map((subject) => (
                                                <RegistrationTableItem key={subject.id.toString()}
                                                                       id={subject.id}
                                                                       subject={subject.name}
                                                                       professor={subject.professor}
                                                                       creditPoints={subject.creditPoints}
                                                                       priority={subject.priority}
                                                                       status={REG_STATUS.RECEIVED}
                                                                       description={subject.description}
                                                                       specialization={subject.specialization}/>

                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                {/* Create / edit registration button */}
                                <div className="row">
                                    <button className="btn btn-md btn-primary btn-block"
                                            style={{textAlign: 'center', width: "20%", height: "3em"}} type="button"
                                            onClick={(e) => handleRegistration(e)}>
                                        {registration ? REG_BTN_MAP.EDIT : REG_BTN_MAP.CREATE}
                                    </button>
                                </div>
                            </>
                            : <div className="row">
                                <p>Sie haben sich bisher noch für kein Wahlpflichtfach angemeldet.
                                    <br/>Auf der <Link to={`/${URLS.SUBJECTS}`}>Übersichtsseite</Link> können Sie alle
                                    Wahlpflichtfächer, die in diesem Semester angeboten werden, einsehen.</p>
                            </div>
                    }
                </div>
            </div>
        </>
    );
}

export default MyRegistrations;
