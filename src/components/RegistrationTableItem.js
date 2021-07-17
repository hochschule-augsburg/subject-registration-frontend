import {useHistory} from "react-router-dom";
import {URLS} from "../App";

/**
 * Represents a single item in the table of the MyRegistrations page.
 * @param props
 * @param {string} props.subject Name of the subject.
 * @param {string} props.professor Name of the professor responsible for this subject.
 * @param {number} props.creditPoints Credit points of the subject.
 * @param {number} props.priority Chosen subject priority of the user.
 * @param {string} props.status Current status of this subject's registration.
 * @param {string} props.description Short description of the subject.
 * @param {string} props.specialization Specialization which is associated with this subject.
 * @return {JSX.Element}
 * @constructor
 */
function RegistrationTableItem(props) {
    let history = useHistory();

    const handleSubjectClick = (e) => {
        const link = props.subject.replace(' ', '_');
        console.log(`[RegistrationTableItem][handleClick] click on subject ${link}!`);
        history.push({
            pathname: `${URLS.SUBJECTS}/${link}`,
            state: {
                subject: props,
                prevPath: history.location.pathname
            }
        });
        e.preventDefault();
    };

    const deleteSubject = (e) => {
        console.log(`delete subject ${props.subject}!`);
        e.preventDefault();
    };

    return (
        <>
            <tr>
                <td><a href="/" onClick={(e) => handleSubjectClick(e)}>{props.subject}</a></td>
                <td>{props.professor}</td>
                <td>{props.creditPoints}</td>
                <td style={{width: "5em"}}>
                    <form className="form-inline">
                        <input id="priority" type="text" style={{width: "5em"}} defaultValue={props.priority} />
                        <div className="invalid-feedback">Eingabe ungültig</div>
                    </form>
                </td>
                <td>{props.status}</td>
                <td>
                    <a href='/' onClick={(e) => deleteSubject(e)}>Entfernen</a>
                </td>
            </tr>
        </>
    )
}

export default RegistrationTableItem;
