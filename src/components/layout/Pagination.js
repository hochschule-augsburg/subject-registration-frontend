import {useState, useContext} from "react";
import SubjectCardView from "../SubjectCardView";
import SubjectSelectionContext from "../../context/subjectSelectionContext";

const PREVIOUS = 'Previous';
const NEXT = 'Next';

/**
 * Manages how many subjects should be shown at a time and paginates the data if necessary.
 * @param {Object[]} data Array of data that should be shown in the paginated form.
 * @param {Object[]} subjectSelection Array which holds all subjects currently marked to enroll by the user.
 * @param {number} pageLimit Number of pages shown in the pagination.
 * @param {number} dataLimit Max. number of data that should be shown.
 * @constructor
 */
function Pagination({data, pageLimit, dataLimit}) {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);
    const {subjectSelection, setSubjectSelection} = useContext(SubjectSelectionContext);

    /**
     * Go to the next page.
     */
    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    /**
     * Go to the previous page.
     */
    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    /**
     * Change the current page.
     * @param {MouseEvent} event Mouse event instance.
     */
    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    /**
     * Returns all subjects that should be shown on the current page.
     * @return {Object[]}
     */
    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    /**
     * Returns all next/previous page numbers that should be shown on the current page.
     * @return {number[]}
     */
    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        let pages = new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
        for (let i = 0; i < pages.length; i++) {
            if (pages[i] > Math.ceil(data.length / dataLimit)) {
                const idx = pages.findIndex((e) => pages[i] === e);
                pages = pages.slice(0, idx);
                break;
            }
        }
        return pages;
    };

    /**
     * Check if the user has selected the given subject for registration.
     * @param {Object} subject Subject to check.
     * @return {boolean} Returns true if the subject is selected; otherwise false.
     */
    const isRegistered = (subject) => {
        return subjectSelection && subjectSelection.length > 0 ? subjectSelection.some((s) => subject.id === s.id) : false;
    };

    return (
        <>
            <div>
                {/* show all subjects for the current page */}
                <div className="row row-cols-4 mt-1 mb-4 g-3">
                    {getPaginatedData().map((subject, idx) => (
                        <SubjectCardView key={idx}
                                         subject={subject.name}
                                         id={subject.id}
                                         professor={subject.professor}
                                         creditPoints={subject.creditPoints}
                                         description={subject.description}
                                         specialization={subject.specialization}
                                         capacity={subject.capacity}
                                         status={subject.status}
                                         enroll={!isRegistered(subject)}
                        />
                    ))}
                </div>
                {/* show previous page button */}
                <div className="pagination">
                    <button onClick={goToPreviousPage}
                            className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}>
                        {PREVIOUS}
                    </button>
                    {/* show pagination numbers */}
                    {getPaginationGroup().map((item, index) => (
                        <button
                            key={index}
                            onClick={changePage}
                            className={`page-link ${currentPage === item ? 'active' : ''}`}>
                            <span>{item}</span>
                        </button>
                    ))}
                    {/* show next page button */}
                    <button
                        onClick={goToNextPage}
                        className={`page-link ${currentPage === pages ? 'disabled' : ''}`}>
                        {NEXT}
                    </button>
                </div>
            </div>
        </>
    );
}

export default Pagination;
