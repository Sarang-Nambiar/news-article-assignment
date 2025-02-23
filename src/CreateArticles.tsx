import { Button, Grid, TextField } from "@mui/material";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import "./Stylesheets/CreateArticles.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "react-toastify";

interface Create_ArticlesProps {
  setVisible: (visible: boolean) => void;
}

type FormFields = {
  article_title: string;
  article_date: Dayjs;
  article_summary: string;
  article_publisher: string;
};

// Page to create a new article
export default function CreateArticles({ setVisible }: Create_ArticlesProps) {
  setVisible(true);
  const VITE_BACKEND_HOST: string = import.meta.env.VITE_BACKEND_HOST as string;
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();
  const sx = {
    backgroundColor: "white",
    borderRadius: "10px",
    color: "black",
  };

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    axios
      .post(`${VITE_BACKEND_HOST}/api/articles`, {
        data: {
          title: data.article_title,
          date: data.article_date?.format("YYYY-MM-DD"),
          summary: data.article_summary,
          publisher: data.article_publisher,
        },
      })
      .then((response) => {
        toast.success("Article created successfully.");
      })
      .catch((err) => {
        toast.error("Failed to create article: " + err.response.data.message);
      });
    reset({
      article_title: "",
      article_date: undefined,
      article_summary: "",
      article_publisher: "",
    });
  };
  return (
    <div className="container create-articles">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Create News Article</h1>
        </Grid>
        <Grid item xs={12}>
          <span>Fill out the form below to create a new news article</span>
        </Grid>
        <Grid item xs={4}>
          <TextField
            {...register("article_title", {
              required: "Article Title is required",
              minLength: {
                value: 5,
                message: "Minimum length should be 5 characters.",
              },
            })}
            fullWidth
            label="Article Title"
            color="secondary"
            defaultValue={null}
            error={!!errors.article_title}
            helperText={errors.article_title?.message}
            sx={sx}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name="article_date"
            control={control}
            rules={{ required: "Article Date is required" }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  label="Article Date"
                  maxDate={dayjs()}
                  defaultValue={null}
                  sx={{ ...sx, width: "100%" }}
                  slotProps={{
                    textField: {
                      error: !!errors.article_date,
                      helperText: errors.article_date?.message,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            {...register("article_publisher", {
              required: "Article Publisher is required",
              minLength: {
                value: 5,
                message: "Minimum length should be 5 characters.",
              },
            })}
            fullWidth
            label="Article Publisher"
            color="secondary"
            defaultValue={null}
            error={!!errors.article_publisher}
            helperText={errors.article_publisher?.message}
            sx={sx}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("article_summary", {
              required: "Article Summary is required",
              minLength: {
                value: 10,
                message: "Minimum length should be 10 characters.",
              },
            })}
            fullWidth
            label="Article Summary"
            color="secondary"
            defaultValue={null}
            error={!!errors.article_summary}
            helperText={errors.article_summary?.message}
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
          <Button
            variant="contained"
            disabled={isSubmitting}
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
