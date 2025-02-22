import { useState, useEffect } from "react";
import "../Stylesheets/Navbar.css";

interface NavbarProps {
    visible: boolean;
}

export default function Navbar({ visible } : NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  return (
    <>
        <div className={"navbar" + (isScrolled ? " shadow" : "")} style={{ display: visible ? "flex" : "none" }}>
            <div className='logo'>
                <h1>
                    <a href="/">Logo</a>
                </h1>
            </div>
            <div className='menu'>
                <a href="/create">
                    Create an article
                </a>
            </div>
        </div>
    </>
  )
}
