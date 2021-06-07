/**
 * Main page of the application.
 * @return {JSX.Element}
 * @constructor
 */
function Home() {
    return (
        <>
        <div className="container">
            <div className="row">
                <h2>Startseite</h2>
                <p>Herzlich Willkommen bei der WPF-Anmeldeseite!<br/>Auf der linken Seite finden Sie ale nötigen
                    Informationen zur Anmeldung.</p>
            </div>
            <div className="row">
                <h2>Anmeldefrist</h2>
                <p>Die Anmeldefrist für die Wahlpflichtfächer beginnt am 29.4.2021 und endet am 30.05.2021.</p>
            </div>
            <div className="row">
                <h2>Kontakt</h2>
                <p>Bei Fragen/Problemen wenden Sie sich bitte an Frau Bäurle.</p>
            </div>
            <div className="row">
                <h2>Impressum</h2>
                <a href='/' style={{ marginBottom: '0.5rem' }}>Link</a>
            </div>
            <div className="row">
                <h2>Übersicht Wahlpflichtfächer</h2>
                <p>todo</p>
            </div>
            <div className="row">
                <h2>Create registration</h2>
                <button className="btn btn-primary" style={{ textAlign: 'center', marginLeft: '1em', width: '10%' }}>Submit</button>
            </div>
        </div>
        </>
    );
}

export default Home;
