import {useEffect, useState} from "react";
import SubjectCardView from "../SubjectCardView";
import {callAPI} from "../../util/api";

/**
 * Main page of the application.
 * @return {JSX.Element}
 * @constructor
 */
function Home() {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        return callAPI('get', 'subject', {})
            .then((response) => {
                setSubjects(response.data);
                console.log(subjects);
            })
            .catch((err) => console.log(`Error! ${err}`));
    }, []);

    const handleClick = (e) => {
        const input = document.getElementById('studentName').value;
        const text = document.getElementById('regText');

        return callAPI('post', 'registration', {
            student: input,
            subjectSelection: [
                {
                    "subject": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "points": 1
                }
            ]
        }).then((response) => {
            console.log('successful call');
            text.innerText = `Registration for student ${input} was created successfully! Code: ${response.status}`;
        }).catch((err) => {
            console.log(`error! ${err}`);
            text.innerText = err;
        });
    }

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
                    <a href='/' style={{marginBottom: '0.5rem'}}>Link</a>
                </div>
                <div className="row">
                    <h2>Übersicht Wahlpflichtfächer</h2>
                    <div className="row row-cols-4 mt-1 mb-4 g-3">
                        {subjects.map((subject) => (
                            <SubjectCardView name={subject.name} professor={subject.professor} cp={subject.creditPoints}
                                             text={subject.description}
                                             enroll={true}/>
                        ))}
                    </div>
                </div>
                <div className="row" id="regCreation">
                    <h2>Create registration</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="studentName" style={{ marginLeft: '1em' }}>Enter student name</label>
                            <input type="text" className="form-control" id="studentName" placeholder="Name"
                            style={{ width: '50%', marginBottom: '1em', marginLeft: '1rem' }}/>
                        </div>
                        <button className="btn btn-md btn-primary btn-block"
                                style={{textAlign: 'center', marginLeft: '1em', width: '10%'}} type="button"
                                onClick={(e) => handleClick(e)}>Submit
                        </button>
                        <p id="regText" style={{marginLeft: '1em', marginTop: '1rem'}}/>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Home;
