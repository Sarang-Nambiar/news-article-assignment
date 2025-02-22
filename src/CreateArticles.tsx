import { Button, Grid, TextField } from "@mui/material";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import "./Stylesheets/CreateArticles.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Create_ArticlesProps {
  setVisible: (visible: boolean) => void;
}

type FormFields = {
  article_title: string;
  article_date: Date;
  article_summary: string;
  article_publisher: string;
};

// Page to create a new article
export default function CreateArticles({ setVisible }: Create_ArticlesProps) {
  setVisible(true);
  const { register, handleSubmit, control } = useForm<FormFields>();
  const sx = {
    backgroundColor: "white",
    borderRadius: "10px",
    color: "black",
  };

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };
  return (
    <div className="container">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Create News Article</h1>
        </Grid>
        <Grid item xs={12}>
          <span>Fill out the form below to create a new news article</span>
        </Grid>
        <Grid item xs={4}>
          <TextField
            {...register("article_title")}
            fullWidth
            label="Article Title"
            sx={sx}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name="article_date"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  label="Article Date"
                  sx={{ ...sx, width: "100%" }}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            {...register("article_date")}
            fullWidth
            label="Article Publisher"
            type="text"
            sx={sx}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("article_summary")}
            fullWidth
            label="Article Summary"
            multiline
            rows={4}
            sx={sx}
          />
        </Grid>
        <Grid item xs={8}></Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            fontWeight: "bold",
          }}
        >
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
