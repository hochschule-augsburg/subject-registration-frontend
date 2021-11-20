/**
 * Provides utility functions.
 * @module
 */

const _MS_PER_DAY = 1000 * 60 * 60 * 24;
const MONTH_IN_DAYS = 30.417;
const SEMESTER_IN_MONTHS = 6;

/**
 * Calculates the current semester of the student based on the creation timestamp of the RZ account.
 * Source: https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
 * @param {string} creationTimestamp Creation timestamp of the account.
 * @return {number}
 */
function calculateSemester(creationTimestamp) {
    // Discard the time and time-zone information.
    const s = new Date(`${creationTimestamp.substring(0, 4)}-${creationTimestamp.substring(4, 6)}-${creationTimestamp.substring(6, 8)}`);
    const utc1 = Date.UTC(s.getFullYear(), s.getMonth(), s.getDate());
    const currentDate = new Date();
    const utc2 = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    const diffInDays = Math.floor((utc2 - utc1) / _MS_PER_DAY);
    const diffInMonths = Math.floor(diffInDays / MONTH_IN_DAYS);
    return Math.floor(diffInMonths / SEMESTER_IN_MONTHS) + 1; // increment to get current semester
}

module.exports = calculateSemester;
