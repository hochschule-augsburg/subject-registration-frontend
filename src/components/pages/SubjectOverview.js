import {useContext, useEffect, useState} from "react";
import {callAPI} from "../../util/api";
import SubjectCardView from "../SubjectCardView";
import Navbar from "../layout/Navbar";
import BurgerMenu from "../layout/BurgerMenu";
import {URLS} from "../../App";
import SubjectSelectionContext from "../../context/subjectSelectionContext";

/**
 * Provides an overview of all available subjects.
 * @return {JSX.Element}
 * @constructor
 */
function SubjectOverview() {
    const [subjects, setSubjects] = useState(null);
    const {subjectSelection, setSubjectSelection} = useContext(SubjectSelectionContext);

    useEffect(() => {
        if (!subjects) {
            console.log('get subjects!');
            return callAPI('get', 'subject', {})
                .then((response) => {
                    setSubjects(response.data);
                })
                .catch((err) => console.log(`Error! ${err}`));
        }
    }, [subjects]);

    /**
     * Check if the user has selected the given subject for registration.
     * @param {Object} subject Subject to check.
     * @return {boolean} Returns true if the subject is selected; otherwise false.
     */
    const isRegistered = (subject) => {
        return subjectSelection.some((s) => subject.id === s.id);
    };

    return (
        <>
            <Navbar />
            <BurgerMenu name={URLS.SUBJECTS} />
            <div className="container main">
                <div className="row">
                    <h2 style={{marginBottom: '0.75em'}}>Übersicht Wahlpflichtfächer</h2>
                    <p>Hier finden Sie alle Wahlpflichtfächer, die in diesem Semester angeboten werden.<br/>
                        Wenn Sie sich für einen bestimmten Wahlpflichtfach anmelden möchten, klicken Sie auf
                        'Anmelden' in der Aktionsleiste.<br/>Detaillierte Informationen zu den Wahlpflichtfächern finden
                        Sie im <a href="/">Modulhandbuch</a>.</p>
                    <div className="row row-cols-4 mt-1 mb-4 g-3">
                        {
                            subjects && subjects.length > 0 ? subjects.map((subject) => (
                                <SubjectCardView key={subject.id.toString()} subject={subject.name}
                                                 id={subject.id}
                                                 professor={subject.professor}
                                                 creditPoints={subject.creditPoints}
                                                 description={subject.description}
                                                 specialization={subject.specialization}
                                                 enroll={!isRegistered(subject)}/>
                            )) : <p>Momentan sind keine Wahlpflichtfächer vorhanden.</p>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default SubjectOverview;
