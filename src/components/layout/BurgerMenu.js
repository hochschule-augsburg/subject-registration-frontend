import {useEffect} from "react";
import {useHistory, Link} from "react-router-dom";
import {URLS} from "../../App";
import calculateSemester from "../../util/util";

const items = document.getElementsByClassName('nav-link');
const itemsCollapsed = document.getElementsByClassName('icon-burger-menu collapsed');
const ICON_PROPS = {
    WIDTH: '48px',
    HEIGHT: '48px',
    COLOR: '#F00045'
};

const NAV_ITEM_MAP = {
    HOME: 'Home',
    REGISTRATIONS: 'Meine Anmeldungen',
    SUBJECTS: 'Übersicht Wahlpflichtfächer',
    INFO: 'Informationen Wahlpflichtfächer',
    LOGOUT: 'Abmelden'
};

/**
 * Represents the burger menu of the application.
 * @param {Object} args Arguments passed to the burger instance.
 * @param {string} args.name Name of the page. (e.g. 'home')
 * @param {string} args.username Name of the logged in user.
 * @param {string} args.major Major of the user. (e.g. IN5)
 * @param {string} args.userid The student ID.
 * @param {Function} args.logout Function which logs out the user from the application.
 * @param {string} args.timestamp Creation timestamp of the user's RZ account.
 * @return {JSX.Element}
 * @constructor
 */
function BurgerMenu(args) {
    let history = useHistory();

    useEffect(() => {
        const menuBtn = document.querySelector('.icon-burger-menu');
        const menu = document.querySelector('.burger-menu');
        const pageContent = document.querySelector('.container.main');

        for (let i = 0; i < items.length; i++) {
            if (items[i].innerHTML === NAV_ITEM_MAP[args.name.toUpperCase()]) {
                items[i].classList.add('bg-primary');
                items[i].classList.add('active');
            }
        }
        menuBtn.addEventListener('click', () => {
            !menu.className.includes('collapsed') ? closeMenu(menu, pageContent) : expandMenu(menu, pageContent);
        });
    }, [args]);

    /**
     * Expand the burger menu.
     * @param {HTMLElement} menu Instance of the burger menu.
     * @param {HTMLDivElement} pageContent The main container of the current page. Must include the css class 'main'.
     * See App.css.
     */
    const expandMenu = (menu, pageContent) => {
        console.log('expand menu!');
        menu.childNodes.forEach(item => {
            if (item.style && !item.classList.contains('icon-burger-menu')) {
                item.style.position = '';
                item.style.visibility = 'visible';
            }
        });
        for (let i = 0; i < itemsCollapsed.length; i++) {
            itemsCollapsed[i].style.visibility = 'hidden';
        }
        pageContent.classList.remove('expanded');
        menu.classList.remove('collapsed');
    };

    /**
     * Close the burger menu.
     * @param {HTMLElement} menu Instance of the burger menu.
     * @param {HTMLDivElement} pageContent The main container of the current page. Must include the css class 'main'.
     * See App.css.
     */
    const closeMenu = (menu, pageContent) => {
        console.log('close menu!');
        menu.childNodes.forEach(item => {
            if (item.style && !item.classList.contains('icon-burger-menu')) {
                item.style.position = 'absolute';
                item.style.visibility = 'hidden';
            }
        });
        for (let i = 0; i < itemsCollapsed.length; i++) {
            itemsCollapsed[i].style.visibility = 'visible';
            itemsCollapsed[i].style.position = '';
        }
        pageContent.classList.add('expanded');
        menu.classList.add('collapsed');
    };

    /**
     * Handle the clicks on a collapsed burger menu item.
     * @param {string} name Name of the burger menu item. (e.g. 'home')
     */
    const handleClick = (name) => {
        console.log(`Handle click on icon ${name}!`);
        switch (name) {
            case URLS.HOME:
                history.push('/');
                break;
            case URLS.REGISTRATIONS:
                history.push(`/${URLS.REGISTRATIONS}`);
                break;
            case URLS.SUBJECTS:
                history.push(`/${URLS.SUBJECTS}`);
                break;
            case URLS.INFO:
                break;
            case URLS.LOGOUT:
                args.logout();
                break;
            default:
                break;
        }
    };

    return (
        <>
            <nav className="nav-pills flex-column burger-menu">
                { /* burger menu icon */}
                <svg className="icon-burger-menu" xmlns="http://www.w3.org/2000/svg" height={ICON_PROPS.HEIGHT}
                     viewBox="0 0 24 24"
                     width={ICON_PROPS.WIDTH} fill={ICON_PROPS.COLOR}>
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
                { /* account details */}
                <div className="container account-details">
                    <svg xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 0 24 24" width="100px"
                         fill={ICON_PROPS.COLOR}>
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"/>
                    </svg>
                    <p>{args.username ? args.username : 'Max Mustermann'}</p>
                    <p>Studiengang: {args.major ? args.major + calculateSemester(args.timestamp) : 'IN5'}</p>
                    <p>Matrikelnummer: {args.userid ? args.userid : ' '}</p>
                </div>
                <Link className="nav-link link-primary" to="/">{NAV_ITEM_MAP.HOME}</Link>
                <Link className="nav-link link-primary" to={`/${URLS.REGISTRATIONS}`}>{NAV_ITEM_MAP.REGISTRATIONS}</Link>
                <Link className="nav-link link-primary" to={`/${URLS.SUBJECTS}`}>{NAV_ITEM_MAP.SUBJECTS}</Link>
                <a className="nav-link link-primary" href="/">{NAV_ITEM_MAP.INFO}</a>
                <Link className="nav-link link-primary" to={`/`} onClick={() => args.logout()}>{NAV_ITEM_MAP.LOGOUT}</Link>
                { /* home icon */}
                <svg className="icon-burger-menu collapsed" xmlns="http://www.w3.org/2000/svg" height={ICON_PROPS.HEIGHT}
                     viewBox="0 0 24 24" width={ICON_PROPS.WIDTH}
                     fill={ICON_PROPS.COLOR} onClick={() => handleClick(URLS.HOME)}>
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
                </svg>
                { /* my registrations icon */}
                <svg className="icon-burger-menu collapsed" xmlns="http://www.w3.org/2000/svg"
                     enableBackground="new 0 0 24 24" height={ICON_PROPS.HEIGHT}
                     viewBox="0 0 24 24" width={ICON_PROPS.WIDTH} fill={ICON_PROPS.COLOR}
                     onClick={() => handleClick(URLS.REGISTRATIONS)}>
                    <g>
                        <rect fill="none" height="24" width="48px"/>
                        <g>
                            <path
                                d="M19,5v14H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3L19,3z"/>
                        </g>
                        <path d="M14,17H7v-2h7V17z M17,13H7v-2h10V13z M17,9H7V7h10V9z"/>
                    </g>
                </svg>
                { /* list icon */}
                <svg className="icon-burger-menu collapsed" xmlns="http://www.w3.org/2000/svg" height={ICON_PROPS.HEIGHT}
                     viewBox="0 0 24 24"
                     width={ICON_PROPS.WIDTH} fill={ICON_PROPS.COLOR} onClick={() => handleClick(URLS.SUBJECTS)}>
                    <g fill="none">
                        <path d="M0 0h24v24H0V0z"/>
                        <path d="M0 0h24v24H0V0z" opacity=".87"/>
                    </g>
                    <path
                        d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7zm-4 6h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                </svg>
                { /* info icon */}
                <svg className="icon-burger-menu collapsed" xmlns="http://www.w3.org/2000/svg" height={ICON_PROPS.HEIGHT}
                     viewBox="0 0 24 24"
                     width={ICON_PROPS.WIDTH} fill={ICON_PROPS.COLOR} onClick={() => handleClick(URLS.INFO)}>
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path
                        d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
                { /* logout icon */}
                <svg className="icon-burger-menu collapsed" xmlns="http://www.w3.org/2000/svg"
                     enableBackground="new 0 0 24 24"
                     height={ICON_PROPS.HEIGHT} viewBox="0 0 24 24"
                     width={ICON_PROPS.WIDTH} fill={ICON_PROPS.COLOR} onClick={() => handleClick(URLS.LOGOUT)}>
                    <g>
                        <path d="M0,0h24v24H0V0z" fill="none"/>
                    </g>
                    <g>
                        <path
                            d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/>
                    </g>
                </svg>
            </nav>
        </>
    );
}

export default BurgerMenu;
