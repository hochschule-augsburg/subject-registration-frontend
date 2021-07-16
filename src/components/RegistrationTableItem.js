/**
 * Represents a single item in the table of the MyRegistrations page.
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
function RegistrationTableItem(props) {
    const handleClick = (e) => {
        // todo
        console.log(`[RegistrationTableItem][handleClick] click on subject ${props.subject}!`);
        e.preventDefault();
    };

    const deleteSubject = (e) => {
        console.log(`delete subject ${props.subject}!`);
        e.preventDefault();
    };

    return (
        <>
            <tr>
                <td><a href="/" onClick={(e) => handleClick(e)}>{props.subject}</a></td>
                <td>{props.professor}</td>
                <td>{props.cp}</td>
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
