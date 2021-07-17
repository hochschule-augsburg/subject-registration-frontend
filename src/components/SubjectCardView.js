import {URLS} from "../App";
import {useHistory} from "react-router-dom";

/**
 * Represents a single card component in the subject overview page.
 * @param {Object} props Subject properties.
 * @param {string} props.subject Name of the subject.
 * @param {string} props.professor Name of the professor.
 * @param {string} props.creditPoints Credit points of the subject.
 * @param {string} props.description Short description text of the subject.
 * @param {boolean} props.enroll True => show user that they can register for this subject; False => show user that they
 * can unregister from this subject.
 * @return {JSX.Element}
 * @constructor
 */
function SubjectCardView(props) {
    let history = useHistory();

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

    const handleEnrollClick = (e) => {
        // todo
        console.log(`[SubjectCardView][handleEnrollClick] clicked on the enroll button of the subject ${props.subject}!`);
        e.preventDefault();
    };

    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title" onClick={(e) => handleSubjectClick(e)}>{props.subject}</h5>
                    <h6 className="card-subtitle">{props.professor} | {props.creditPoints} CP</h6>
                    <p className="card-text">{props.description}</p>
                    <p className="card-text" style={{marginBottom: '0', color: '#4D4D4D', fontWeight: 600}}>Aktion</p>
                    <a href="/" className="card-link"
                       onClick={(e) => handleEnrollClick(e)}>{props.enroll ? 'Anmelden' : 'Abmelden'}</a>
                </div>
            </div>
        </div>
    );
}

export default SubjectCardView;
