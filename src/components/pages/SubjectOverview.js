import {useContext, useEffect, useState} from "react";
import {SubjectControllerApi} from "typescript-axios";
import Navbar from "../layout/Navbar";
import BurgerMenu from "../layout/BurgerMenu";
import Pagination from "../layout/Pagination";
import {URLS} from "../../App";
import SubjectSelectionContext from "../../context/subjectSelectionContext";
import userContext from "../../context/userContext";
import {getRequestHeaders} from "../../util/util";

// defines the max. number of subjects that should be shown on one page.
const SUBJECT_LIMIT = 16;
// defines the max. number of page numbers that should be shown on the pagination component.
const PAGE_LIMIT = 4;
const NO_SUBJECTS = 'Momentan sind keine Wahlpflichtfächer vorhanden.';
const MASTER_MAJORS = ['MIN', 'BIS', 'IMS'];
const COURSE_CATALOGUE = {
    BACHELOR: 'https://cloud.hs-augsburg.de/s/e6bYJTCP4JQ5RXj',
    MASTER: 'https://cloud.hs-augsburg.de/s/a7TnPfxtmXbxTcD'
};

/**
 * Provides an overview of all available subjects.
 * @return {JSX.Element}
 * @constructor
 */
function SubjectOverview() {
    const subjectApi = new SubjectControllerApi();
    const {user, setUser} = useContext(userContext);
    const [userInfo, setUserInfo] = useState(null);
    const [subjects, setSubjects] = useState(null);
    const {subjectSelection, setSubjectSelection} = useContext(SubjectSelectionContext);

    useEffect(() => {
        if (user) {
            return user.loadUserInfo().then((userInfo) => {
                setUserInfo(userInfo);
                if (!subjects) {
                    console.log('get subjects!');
                    return subjectApi.getAllSubjects(getRequestHeaders(user))
                        .then((response) => {
                            console.log(`got ${response.data.length} subjects`);
                            setSubjects(response.data);
                        })
                        .catch((err) => console.log(`Error! ${err}`));
                }
            });
        }
    }, [subjects, user, setUserInfo, subjectSelection, setSubjectSelection]);

    return (
        <>
            <Navbar/>
            <BurgerMenu name={URLS.SUBJECTS} username={userInfo ? `${userInfo.given_name} ${userInfo.family_name}` : ''}
                        major={userInfo ? userInfo.degreeCourse : ''}
                        preferred_username={userInfo ? userInfo.preferred_username : ''}
                        logout={user ? user.logout : null}
                        timestamp={userInfo ? userInfo.createTimestamp : '20210911'}
            />
            <div className="container main">
                <div className="row">
                    <h2 style={{marginBottom: '0.75em'}}>Übersicht Wahlpflichtfächer</h2>
                    <p>Hier finden Sie alle Wahlpflichtfächer, die in diesem Semester angeboten werden.<br/>
                        Wenn Sie sich für einen bestimmten Wahlpflichtfach anmelden möchten, klicken Sie auf
                        'Anmelden' in der Aktionsleiste.<br/>Detaillierte Informationen zu den Wahlpflichtfächern finden
                        Sie im <a
                            href={userInfo ?
                                MASTER_MAJORS.includes(userInfo.degreeCourse) ?
                                    COURSE_CATALOGUE.MASTER : COURSE_CATALOGUE.BACHELOR : '/'}>Modulhandbuch</a>.
                    </p>
                    {subjects && subjects.length > 0 ?
                        <Pagination data={subjects} subjectSelection={subjectSelection ? subjectSelection : []}
                                    dataLimit={SUBJECT_LIMIT} pageLimit={PAGE_LIMIT}/>
                        : <p>{NO_SUBJECTS}</p>}
                </div>
            </div>
            <br/>
        </>
    );
}

export default SubjectOverview;
