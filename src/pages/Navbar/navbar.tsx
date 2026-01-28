import { forwardRef } from "react";
import branch from "../../assets/branch2.png";
import lanterne from "../../assets/lanternE.png";
import lanterna from "../../assets/lanternA.png";
import lanterns1 from "../../assets/lanternS1.png";
import lanterns2 from "../../assets/lanternS2.png";
import "./navbar.css";

const Navbar = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div ref={ref} className="navbar">
            <img className="branch" src={branch} alt="Navbar branch" />

            <div className="lanterns">
                <a href="/about">
                    <img className="lantern l1" src={lanterne} alt="Navbar lantern" />
                </a>

                <a href="/events">
                    <img className="lantern l2" src={lanterna} alt="Navbar lantern" />
                </a>

                <a href="/speakers">
                    <img className="lantern l3" src={lanterns1} alt="Navbar lantern" />
                </a>

                <a href="/sponsors">
                    <img className="lantern l4" src={lanterns2} alt="Navbar lantern" />
                </a>
            </div>
        </div>
    );
});

export default Navbar;
