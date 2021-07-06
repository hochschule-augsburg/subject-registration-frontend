/**
 * Represents a single item in the table of the MyRegistrations page.
 * @param args
 * @return {JSX.Element}
 * @constructor
 */
function RegistrationTableItem(args) {
    const handleClick = (e) => {
        // todo
        console.log(`[RegistrationTableItem][handleClick] click on subject ${args.subject}!`);
        e.preventDefault();
    };

    return (
        <>
            <tr>
                <td><a href="/" onClick={(e) => handleClick(e)}>{args.subject}</a></td>
                <td>{args.professor}</td>
                <td>{args.cp}</td>
                <td style={{width: "5em"}}>
                    <form className="form-inline">
                        <input id="priority" type="text" style={{width: "5em"}} defaultValue={args.priority} />
                        <div className="invalid-feedback">Eingabe ungültig</div>
                    </form>
                </td>
                <td>{args.status}</td>
                <td>
                    {/*todo insert remove subject button*/}
                </td>
            </tr>
        </>
    )
}

export default RegistrationTableItem;
