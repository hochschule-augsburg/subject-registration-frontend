import Navbar from "../layout/Navbar";
import BurgerMenu from "../layout/BurgerMenu";
import {URLS} from "../../App";
import {useParams, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {callAPI} from "../../util/api";

const PREVIOUS_PATH_MAP = {
    '/registrations': 'Meine Anmeldungen',
    '/subjects': 'Übersicht'
};

/**
 * Displays all details of a subject.
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
function SubjectDetail(props) {
    const [subject, setSubject] = useState();
    const [previousPath, setPreviousPath] = useState();
    const {name} = useParams();
    let history = useHistory();

    const subjectName = name.replace('_', ' ');

    useEffect(() => {
        console.log('selected subject: ' + subjectName);
        console.log('props:');
        console.log(props.location.state);
        if (props.location.state) {
            // todo
            setSubject(props.location.state);
            console.log(`previous URL: ${props.location.state.prevPath}`);
            setPreviousPath(props.location.state.prevPath);
        } else {
            // fetch subject info from backend
            return callAPI('get', 'subject', {})
                .then((response) => {
                    const subject = response.data.find((s) => s.name === subjectName);
                    setSubject(subject);
                }).catch((err) => console.log(`Could not fetch subjects! ${err}`));
        }
    }, [props.location.state, subjectName]);

    /**
     * Navigate to the previous page.
     * @param {MouseEvent} e Instance of the mouse event.
     */
    const goBack = (e) => {
        history.goBack();
        e.preventDefault();
    };

    return (
        <>
            <Navbar/>
            <BurgerMenu name={URLS.SUBJECTS}/>
            <div className="container main">
                <div className="row" style={{marginBottom: '0.75em'}}>
                    <p style={{color: "#F00045"}}><a href="." onClick={(e) => goBack(e)}>
                        {previousPath ? PREVIOUS_PATH_MAP[previousPath] : PREVIOUS_PATH_MAP["/subjects"]}</a> / <a
                        href="/">{subjectName}</a></p>
                    <h2 style={{marginBottom: "0.5em"}}>{subjectName}</h2>
                    <p>Detailliertere Informationen finden Sie im <a href='/'>Modulhandbuch.</a></p>
                </div>
                <div className="row">
                    {/*todo subject is always undefined (?)*/}
                    <table className="table">
                        <tbody>
                        <tr>
                            <th scope="row">Dozent</th>
                            <td>b</td>
                        </tr>
                        <tr>
                            <th scope="row">Credit Points</th>
                            <td>{subject ? subject.cp : ''}</td>
                        </tr>
                        <tr>
                            <th scope="row">Beschreibung</th>
                            <td>{subject ? subject.cp : ''}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    );
}

export default SubjectDetail;
