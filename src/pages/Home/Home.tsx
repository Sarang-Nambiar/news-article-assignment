import axios from "axios";
import Card from "../../Components/Card";
import "./Home.css";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { toast } from "react-toastify";
import { createTheme, Divider, ThemeProvider } from "@mui/material";
import { originalTheme } from "../../App";

// ORDER BY DATE - YYYY-MM-DD
// Responsiveness

interface HomeProps {
  setVisible: (visible: boolean) => void;
}

interface Article {
  id: number;
  Title: string;
  Date: string;
  Summary: string;
  Publisher: string;
}

export default function Home({ setVisible }: HomeProps) {
  const [rows, setRows] = useState<Article[]>([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(10);
  const BACKEND_HOST: string = import.meta.env.VITE_BACKEND_HOST;

  const newTheme = createTheme({
    palette: {
      ...originalTheme,
      text: {
        primary: "#fff"
      }
    }
  })

  const headerDivider = {
    "&::before, &::after": { borderColor: "white" },
    width: "100%",
    display: "flex",
    alignItems: "center"
  };

  useEffect(() => {
    setVisible(true);
    return () => setVisible(false);
  }, []);

  useEffect(() => {
    axios
      .get<number>(`${BACKEND_HOST}/api/articles/count`)
      .then((response) => {
        setCount(Math.ceil(response.data / 10));
      })
      .catch((err) => {
        toast.error("Failed to load the data. Try refreshing.");
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams({
      page: page.toString(),
    });

    axios
      .get<Article[]>(`${BACKEND_HOST}/api/articles/?${params}`)
      .then((response) => {
        setRows(response.data);
      })
      .catch((err) => {
        toast.error(
          "Something went wrong while loading the data. Try refreshing the page"
        );
      });
  }, [page]);

  return (
    <ThemeProvider theme={newTheme}>
      <div className="container home">
      <Divider textAlign="center" sx={headerDivider}><h1 className="home-title">Top News</h1></Divider>
        {rows.length > 0 ? (
          rows.map((article, idx) => <Card data={article} key={idx} />)
        ) : (
          <p className="no-articles-found">No articles found</p>
        )}
        <Pagination
          color="primary"
          count={count}
          page={page}
          onChange={(_, value) => setPage(value)}
          onClick={() => window.scrollTo(0, 0)}
        />
      </div>
    </ThemeProvider>
  );
}
