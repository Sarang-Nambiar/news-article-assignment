import { Button, Grid, TextField } from "@mui/material";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import "./CreateArticles.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { CardData } from "../../Components/Card";

interface Create_ArticlesProps {
  setVisible: (visible: boolean) => void;
}

interface UpdateParams {
  oldData: CardData;
  update: boolean;
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
  const { state } = useLocation();
  let { oldData, update } = !!state
    ? (state as UpdateParams)
    : { oldData: null, update: false };

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
    color: "black !important",
  };

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (!!update) {
      axios
        .put(`${VITE_BACKEND_HOST}/api/articles/${oldData?.id}`, {
          data: {
            title: data.article_title,
            date: data.article_date?.format("YYYY-MM-DD"),
            summary: data.article_summary,
            publisher: data.article_publisher,
          },
        })
        .then((response) => {
          console.log(response);
          toast.success("Article updated successfully.");
        })
        .catch((err) => {
          toast.error("Failed to update article: " + err.response.data.message);
        });
    } else {
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
          console.log(response);
          toast.success("Article created successfully.");
        })
        .catch((err) => {
          toast.error("Failed to create article: " + err.response.data.message);
        });
    }
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
        <Grid item xs={6} md={12}>
          <h1 className="form-title">Create/Update News Article</h1>
        </Grid>
        <Grid item xs={12}>
          <span className="form-description">
            Fill out the form below to create/update a news article
          </span>
        </Grid>
        <Grid item xs={12} md={4}>
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
            defaultValue={!!update ? oldData?.Title : null}
            error={!!errors.article_title}
            helperText={errors.article_title?.message}
            sx={sx}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Controller
            name="article_date"
            control={control}
            rules={{
              required: "Article Date is required",
              validate: (value: Dayjs) =>
                value.isAfter(dayjs())
                  ? "Article Date should be in the future"
                  : true,
            }}
            defaultValue={!!update ? dayjs(oldData?.Date) : undefined}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  label="Article Date"
                  maxDate={dayjs()}
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
        <Grid item xs={12} md={4}>
          <TextField
            {...register("article_publisher", {
              required: "Article Publisher is required",
              minLength: {
                value: 5,
                message: "Minimum length should be 5 characters.",
              },
              maxLength: {
                value: 40,
                message: "Maximum length should be 40 characters.",
              },
            })}
            fullWidth
            label="Article Publisher"
            color="secondary"
            defaultValue={!!update ? oldData?.Publisher : null}
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
            defaultValue={!!update ? oldData?.Summary : null}
            error={!!errors.article_summary}
            helperText={errors.article_summary?.message}
            multiline
            rows={5}
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
            sx={{ color: "black" }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
