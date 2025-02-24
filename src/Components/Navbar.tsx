import { useState, useEffect } from "react";
import "../Stylesheets/Navbar.css";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import { Button, Tooltip } from "@mui/material";

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
          <Tooltip title="Home" arrow>
            <IconButton onClick={() => (window.location.href = "/")}>
              <HomeIcon color="secondary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh" arrow>
            <IconButton onClick={() => window.location.reload()}>
              <RefreshIcon color="secondary" />
            </IconButton>
          </Tooltip>
        </div>

        <div className="logo">
          <h1>
            <a href="/">Handshakes Times</a>
          </h1>
        </div>
        <div className="menu">
          <Tooltip title="Create Article" arrow>
            <Button
              onClick={() => (window.location.href = "/create")}
              sx={{ borderRadius: "20px" }}
            >
              <AddIcon />
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
