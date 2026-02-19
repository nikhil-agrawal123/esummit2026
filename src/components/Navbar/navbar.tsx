import { forwardRef } from "react";
import branch from "../../assets/branch.webp";
import gLantern from "../../assets/lantern.webp";
import flower from "../../assets/flower.webp";
import "./navbar.css";

const navItems = [
  { label: "ABOUT", href: "/about" },
  { label: "ZONALS", href: "/zonals" },
  { label: "EVENTS", href: "/events" },
  { label: "SPEAKERS", href: "/speakers" },
  { label: "SPONSORS", href: "/sponsors" },
];


const Navbar = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="navbar">
      <img fetchPriority="high" className="branch" src={branch} alt="branch" />
      <div className="lanterns">
        {navItems.map((item, index) => (
          <a key={item.href} href={item.href} className={`lantern-wrapper l${index + 1}`}>
            <div className={`lantern-chain c${index+1}`}></div>
            <img className="lantern" alt={item.label} src={gLantern} />
            <span className={`lantern-label w-10 nowrap ${item.label.toLowerCase()}`}>{item.label}</span>
            <img src={flower} alt="Flower" className="flower" />
          </a>
        ))}
      </div>
    </div>
  );
});

export default Navbar;
