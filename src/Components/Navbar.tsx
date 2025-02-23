import { useState, useEffect } from "react";
import "../Stylesheets/Navbar.css";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import RefreshIcon from '@mui/icons-material/Refresh';

interface NavbarProps {
  visible: boolean;
}

export default function Navbar({ visible }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div
        className={"navbar" + (isScrolled ? " shadow" : "")}
        style={{ display: visible ? "flex" : "none" }}
      >
        <div className="actions">
          <IconButton onClick={() => (window.location.href = "/")}>
            <HomeIcon color="secondary" />
          </IconButton>
          <IconButton onClick={() => window.location.reload()}>
            <RefreshIcon color="secondary" />
          </IconButton>
        </div>

        <div className="logo">
          <h1>
            <a href="/">Handshakes Times</a>
          </h1>
        </div>
        <div className="menu">
          <a href="/create">Create</a>
        </div>
      </div>
    </>
  );
}
