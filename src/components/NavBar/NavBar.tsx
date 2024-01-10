import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <nav>
            <NavLink to="/">
                Create a Suburb
            </NavLink>
            <NavLink to="/suburbs-list">
                Suburb's List
            </NavLink>
        </nav>
    );
}

