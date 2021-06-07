/**
 * Represents a single card component in the subject overview page.
 * @param {Object} props Subject properties.
 * @param {string} props.name Name of the subject.
 * @param {string} props.professor Name of the professor.
 * @param {string} props.cp Credit points of the subject.
 * @param {string} props.text Description text of the subject.
 * @param {boolean} props.enroll True => show user that they can register for this subject; False => show user that they
 * can unregister from this subject.
 * @return {JSX.Element}
 * @constructor
 */
function SubjectCardView(props) {
    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <h6 className="card-subtitle">{props.professor} | {props.cp} CP</h6>
                    <p className="card-text">{props.text}</p>
                    <p className="card-text" style={{marginBottom: '0', color: '#4D4D4D', fontWeight: 600}}>Aktion</p>
                    <a className="card-link">{props.enroll ? 'Anmelden' : 'Abmelden'}</a>
                </div>
            </div>
        </div>
    );
}

export default SubjectCardView;
