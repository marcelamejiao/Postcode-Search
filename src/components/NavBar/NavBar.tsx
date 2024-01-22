import HoverableNavLink from "../HoverableNavLink/HoverableNavLink";

export default function NavBar() {

    return (
        <nav className="bg-white w-full pr-4 font-semibold">
            <ul className="flex flex-row justify-end">
                <li className="p-4">
                    <HoverableNavLink
                        pathName="/"
                        linkText="Login">
                    </HoverableNavLink>
                </li>
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
            </ul>
        </nav>
    );
}

