import { useLocation, NavLink  } from "react-router-dom";

type Props = {
    pathName: string;
    linkText: string
};

const HoverableNavLink = ({ pathName, linkText }: Props) => {
    const location = useLocation();

    return (
        <NavLink
            to={pathName}
            className={`hover:border-b-2 border-fucsia ${location.pathname === pathName ? "border-b-2" : ""}`}>
            {linkText}
        </NavLink>
    );
};

export default HoverableNavLink;