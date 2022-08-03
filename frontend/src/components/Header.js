import logo from '../images/logo.svg';
import { useLocation, useHistory, Link } from "react-router-dom";

function Header(props) {

const location = useLocation();
const history = useHistory();

function onSignOut() {
    localStorage.clear();
    history.push('/signin');
}

return (
        <header className="header">
            <img className="logo" alt="logo" src={logo} />
            <div className="header__link-container">
                <p className="header__email">{props.email}</p>
                { location.pathname === "/" ?
                    <button onClick={onSignOut} className="header__button">Log out</button> :
                    <Link className="header__link" to={(location) => {
                        if (location.pathname === "/signin"){
                            return "/signup"
                        } else if (location.pathname ==="/signup") {
                            return "/signin"
                        }
                    }}>
                        {(location.pathname === "/signin") ? "Sign up" : "Log in"}
                    </Link>

                }
            </div>
        </header>
    )

}

export default Header;