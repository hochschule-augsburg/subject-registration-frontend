import Navbar from "../layout/Navbar";
import BurgerMenu from "../layout/BurgerMenu";
import {URLS} from "../../App";
import {useParams, useHistory} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {callAPI} from "../../util/api";
import userContext from "../../context/userContext";

const PREVIOUS_PATH_MAP = {
    '/registrations': 'Meine Anmeldungen',
    '/subjects': 'Übersicht'
};

/**
 * Displays all details of a subject. See RegistrationTableItem.js for a list of all props.
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
function SubjectDetail(props) {
    const {user, setUser} = useContext(userContext);
    const [userInfo, setUserInfo] = useState(null);
    const [subject, setSubject] = useState();
    const [previousPath, setPreviousPath] = useState();
    const {name} = useParams();
    let history = useHistory();

    const subjectName = name.replace('_', ' ');

    useEffect(() => {
        if (user) {
            return user.loadUserInfo().then((userInfo) => {
               setUserInfo(userInfo);
                console.log('[SubjectDetail] selected subject: ' + subjectName);
                console.log('[SubjectDetail] props:');
                console.log(props.location.state);
                if (props.location.state) {
                    setSubject(props.location.state.subject);
                    console.log(`[SubjectDetail] previous URL: ${props.location.state.prevPath}`);
                    setPreviousPath(props.location.state.prevPath);
                } else {
                    // fetch subject info from backend
                    return callAPI('get', 'subject', user.token)
                        .then((response) => {
                            const subject = response.data.find((s) => s.name === subjectName);
                            setSubject(subject);
                        }).catch((err) => console.log(`[SubjectDetail] Could not fetch subjects! ${err}`));
                }
            });
        }
    }, [props.location.state, subjectName, user, setUser]);

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
            <BurgerMenu name={URLS.SUBJECTS} username={userInfo ? `${userInfo.given_name} ${userInfo.family_name}` : ''}
                        major={userInfo ? userInfo.degreeCourse : ''}
                        userid='12345678'
                        logout={user ? user.logout : null}
                        timestamp={userInfo ? userInfo.createTimestamp : '20210911'}
            />
            <div className="container main">
                <div className="row" style={{marginBottom: '0.75em'}}>
                    <p style={{color: "#F00045"}}><a href="." onClick={(e) => goBack(e)}>
                        {previousPath ? PREVIOUS_PATH_MAP[previousPath] : PREVIOUS_PATH_MAP["/subjects"]}</a> / <a
                        href="/">{subjectName}</a></p>
                    <h2 style={{marginBottom: "0.5em"}}>{subjectName}</h2>
                    {/* todo correct link */}
                    <p>Detailliertere Informationen finden Sie im <a href='/'>Modulhandbuch.</a></p>
                </div>
                <div className="row">
                    <table className="table">
                        <tbody className="subject-detail">
                        <tr>
                            <th scope="row">Dozent</th>
                            <td>{subject ? subject.professor : ''}</td>
                        </tr>
                        <tr>
                            <th scope="row">Credit Points</th>
                            <td>{subject ? subject.creditPoints : ''}</td>
                        </tr>
                        <tr>
                            <th scope="row">Beschreibung</th>
                            <td>{subject ? subject.description : ''}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    );
}

export default SubjectDetail;
