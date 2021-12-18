import Navbar from "../layout/Navbar";
import userContext from "../../context/userContext";
import BurgerMenu from "../layout/BurgerMenu";
import {URLS, MASTER_MAJORS, COURSE_CATALOGUE} from "../../App";
import {useEffect, useState, useContext} from "react";

const FWP_DETAIL_URL = 'https://www.hs-augsburg.de/Service/Hochschule-von-A-Z/Fachwissenschaftliches-Wahlpflichtfach.html';

/**
 * Represents the info page of this application.
 * @return {JSX.Element}
 * @constructor
 */
function Info() {
    const {user} = useContext(userContext);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (user && !userInfo) {
            return user.loadUserInfo().then((userInfo) => {
                setUserInfo(userInfo);
            }).catch((err) => {
                console.log(`Could not load user info! ${err}`);
            });
        }
    }, [userInfo, setUserInfo]);

    return (
        <>
            <Navbar/>
            <BurgerMenu name={URLS.INFO} username={userInfo ? `${userInfo.given_name} ${userInfo.family_name}` : ''}
                        major={userInfo ? userInfo.degreeCourse : ''}
                        preferred_username={userInfo ? userInfo.preferred_username : ''}
                        logout={user ? user.logout : null}
                        timestamp={userInfo ? userInfo.createTimestamp : '20210911'}
            />
            <div className="container main">
                <div className="row">
                    <h2 style={{marginBottom: '0.75em'}}>Informationen zu den Wahlpflichtfächern</h2>
                    <p>Hier finden Sie allgemeine Informationen zu den Wahlpflichtfächern.</p>
                    <p>Detaillerte Informationen zu den Wahlpflichtfächern finden Sie im <a
                        href={userInfo ?
                            MASTER_MAJORS.includes(userInfo.degreeCourse) ?
                                COURSE_CATALOGUE.MASTER : COURSE_CATALOGUE.BACHELOR : '/'}>Modulhandbuch</a>.
                    </p>
                    <hr/>
                    <p>FWP bedeutet Fachwissenschaftliches Wahlpflichtfach (auch WPF genannt).</p>
                    <p>Dies sind Fächer, die von Professorinnen und Professoren der Fakultät für Informatik als
                        Spezialgebiet angeboten werden. Die Fächer sind meistens im Umfang von 2, 4 oder 6 SWS und
                        finden manchmal auch als Blockseminar statt.
                    </p>
                    <p>
                        Die Anmeldung für die Wahlpflichtfächer erfolgt über ein Losverfahren und erfolgt im Allgemeinen
                        in der letzten Semesterwoche des vorhergehenden Semesters.
                    </p>
                    <p>
                        Die Semesterangaben im Studienplan sind Empfehlungen. Sie können selbst entscheiden, in welchem
                        Semester Sie ein Wahlpflichtfach belegen. Verbindlich ist nur die Gesamtzahl der
                        Wahlpflichtfächer, an denen Sie im Verlauf Ihres Studiums teilnehmen sollten.
                    </p>
                    <p>
                        Die verbindliche Anzahl der SWS können Sie den Aufstellungen zu den Leistungsnachweisen der
                        jeweiligen Studiengänge entnehmen.
                    </p>
                    <p>
                        Belegen Sie mehr Semesterwochenstunden als in der Studien- und Prüfungsordnung angegeben, so
                        werden nur Fächer im erforderlichen ECTS-Umfang ins Zeugnis aufgenommen und gewertet. Dabei
                        werden die Fächer mit den besseren Noten zuerst berücksichtigt. Wenn bestimmte Fächer ins
                        Zeugnis aufgenommen werden sollen, müssen Sie das mit dem Prüfungsamt abstimmen.
                    </p>
                    <p>
                        Belegen Sie mehr Fächer als erforderlich, erhalten Sie bei Studienabschluss eine vom
                        Bachelorzeugnis getrennte Bestätigung mit Note.
                    </p>
                    <p>
                        Für FWP-Fächer gilt übrigens nicht die Regel, dass Sie eine Wiederholungsprüfung innerhalb eines
                        Semesters antreten müssen. Grundsätzlich müssen Sie nur Wahlpflichtfächer im Umfang der
                        festgelegten
                        ECTS-Zahl bestehen, Sie können also bei einem Nichtbestehen auch ein anderes Fach wählen.
                    </p>
                    <p>
                        Weitere Informationen finden Sie unter <a href={FWP_DETAIL_URL}>Hochschule von A-Z
                        (Fachwissenschaftliches Wahlpflichtfach)</a>.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Info;
