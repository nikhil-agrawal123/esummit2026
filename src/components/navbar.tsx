import { forwardRef } from "react";
import branch from "../assets/branch2.png";
import gLantern from "../assets/lantern.png";
import "./navbar.css";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Speakers", href: "/speakers" },
  { label: "Sponsors", href: "/sponsors" },
];

const Navbar = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="navbar">
      <img className="branch" src={branch} alt="branch" />
      <div className="lanterns">
        {navItems.map((item, index) => (
          <a key={item.href} href={item.href} className={`lantern-wrapper l${index + 1}`}>
            <img
              className="lantern"
              alt={item.label}
              src={gLantern}
            />
            <span className={`lantern-label w-10 nowrap ${item.label.toLowerCase()}`}>{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
});

export default Navbar;
