import {URLS} from "../App";
import {useHistory} from "react-router-dom";
import {useContext} from "react";
import SubjectSelectionContext from "../context/subjectSelectionContext";

const ACTION = 'Aktion';
const NO_DESCRIPTION = 'Keine Beschreibung vorhanden.';
const ENROLL_STATUS = {
    REGISTER: 'Anmelden',
    UNREGISTER: 'Abmelden'
};

/**
 * Represents a single card component in the subject overview page.
 * @param {Object} props Subject properties.
 * @param {number} props.id ID of the subject.
 * @param {string} props.subject Name of the subject.
 * @param {string} props.professor Name of the professor.
 * @param {string} props.creditPoints Credit points of the subject.
 * @param {string} props.description Short description text of the subject.
 * @param {string} props.specialization Specialization which is associated with this subject.
 * @param {boolean} props.enroll True => show user that they can register for this subject; False => show user that they
 * can unregister from this subject.
 * @return {JSX.Element}
 * @constructor
 */
function SubjectCardView(props) {
    let history = useHistory();
    const {subjectSelection, setSubjectSelection} = useContext(SubjectSelectionContext);

    /**
     * Handle clicks on a subject title.
     * @param {MouseEvent} e Instance of the mouse event.
     */
    const handleSubjectClick = (e) => {
        const link = props.subject.replace(' ', '_');
        console.log(`[SubjectCardView][handleSubjectClick] clicked on the subject ${link}!`);
        history.push({
            pathname: `${URLS.SUBJECTS}/${link}`,
            state: {
                subject: props,
                prevPath: history.location.pathname
            }
        });
        e.preventDefault();
    };

    /**
     * Handle clicks on the register/unregister button of a subject card. Opens the subject detail page.
     * @param {MouseEvent} e Instance of the mouse event.
     */
    const handleEnrollClick = (e) => {
        console.log(`[SubjectCardView][handleEnrollClick] clicked on the enroll button of the subject ${props.subject}!`);
        let subjects = Array.from(subjectSelection);
        if (props.enroll) {
            subjects.push({
                id: props.id,
                name: props.subject,
                creditPoints: props.creditPoints,
                professor: props.professor,
                priority: 0,
                description: props.description,
                specialization: props.specialization
            });
        } else {
            subjects = subjects.filter((subject) => subject.id !== props.id);
        }
        setSubjectSelection(subjects);
        e.preventDefault();
    };

    return (
        <div className="col">
            <div className="card">
                <div className="card-body subject-card">
                    <h5 className="card-title" onClick={(e) => handleSubjectClick(e)}>{props.subject}</h5>
                    <h6 className="card-subtitle">{props.professor} | {props.creditPoints} CP</h6>
                    <p className="card-text subject-card-description">{props.description ? props.description : NO_DESCRIPTION}</p>
                    <p className="card-text" style={{marginBottom: '0', color: '#4D4D4D', fontWeight: 600}}>{ACTION}</p>
                    <a href="/" className="card-link"
                       onClick={(e) => handleEnrollClick(e)}>
                        {props.enroll ? ENROLL_STATUS.REGISTER : ENROLL_STATUS.UNREGISTER}</a>
                </div>
            </div>
        </div>
    );
}

export default SubjectCardView;
