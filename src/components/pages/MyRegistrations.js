import Navbar from "../layout/Navbar";
import BurgerMenu from "../layout/BurgerMenu";
import {URLS} from "../../App";
import {useEffect, useState} from "react";
import {callAPI} from "../../util/api";
import {Link} from "react-router-dom";

const REG_BTN_MAP = {
    CREATE: 'Anmeldung abschließen',
    EDIT: 'Anmeldung überarbeiten'
};

function MyRegistrations() {
    const [registration, setRegistration] = useState(null);

    useEffect(() => {
        return callAPI('get', 'registration', {})
            .then((response) => {
                // todo get registration of the logged in user
                setRegistration(response.data[0]);
            });
    }, []);

    const completeRegistration = (e) => {
        const cpInput = document.getElementById('cpInput');
        if (cpInput.value.match(/^\d+$/)) {
            console.log(`[MyRegistrations][completeRegistration] clicked on complete registration btn with ${cpInput.value} cp!`);
            cpInput.classList.remove('is-invalid');
        } else {
            console.log(`[MyRegistrations][completeRegistration] input ${cpInput.value} is invalid!`);
            cpInput.classList.add('is-invalid');
        }
        e.preventDefault();
    };

    return (
        <>
            <Navbar/>
            <BurgerMenu name={URLS.REGISTRATIONS}/>
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
                            <form id="cpForm" className="form-inline" noValidate={true}>
                                <input id="cpInput" type="text" style={{marginLeft: "0.75em", width: "5em"}} required/>
                                <div className="invalid-feedback" style={{marginLeft: "0.75em"}}>Invalid input</div>
                            </form>
                        </li>
                    </ul>
                </div>
                <div className="row">
                    {
                        registration ?
                            <>
                                <div className="row">
                                    <h5>Informationen zur Anmeldung</h5>
                                    <p>Weisen Sie ihren gewünschten Wahlpflichtfächern Prio-Punkte zu.<br/>Je mehr
                                        Punkte, desto höher
                                        die Chance, den Platz in dem gewünschten Fach zu bekommen.<br/> Sie müssen in
                                        Summe <b>exakt</b> 1000 Punkte vergeben.</p>
                                </div>
                                <div className="row">
                                    <button className="btn btn-md btn-primary btn-block"
                                            style={{textAlign: 'center', width: "20%", height: "3em"}} type="button"
                                            onClick={(e) => completeRegistration(e)}>
                                        {/* Todo change btn name depending on whether a reg was already created or not */}
                                        {REG_BTN_MAP.CREATE}
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
