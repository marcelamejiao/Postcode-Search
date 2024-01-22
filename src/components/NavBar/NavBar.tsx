import { useNavigate } from "react-router-dom";
import HoverableNavLink from "../HoverableNavLink/HoverableNavLink";

type Props = {
    loggedIn: boolean,
    setLoggedIn(loggedIn: boolean): void,
}

export default function NavBar({ loggedIn, setLoggedIn }: Props) {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        setLoggedIn(false); 
        navigate("/");
    }

    return (
        <nav className="bg-white w-full pr-4 font-semibold">
            <ul className="flex flex-row justify-end">
                {!loggedIn && (
                <li className="p-4">
                    <HoverableNavLink
                        pathName="/"
                        linkText="Login">
                    </HoverableNavLink>
                </li>
                )}
                {loggedIn && (
                    <>
                        <li className="p-4">
                            <HoverableNavLink
                                pathName="/suburbs-list"
                                linkText="Suburb's List">
                            </HoverableNavLink>
                        </li>
                        <li className="p-4">
                            <HoverableNavLink
                                pathName="/add-suburb"
                                linkText="Create Suburb">
                            </HoverableNavLink>
                        </li>
                        <li className="p-4" onClick={handleLogout}>
                            <HoverableNavLink
                                    pathName="/"
                                    linkText="Logout">
                            </HoverableNavLink>
                        </li>
                    </>
                )}

            </ul>
        </nav>
    );
}

