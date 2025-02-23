import React, { useEffect } from 'react'
import Divider from '@mui/material/Divider';
import "../Stylesheets/Card.css";
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast } from 'react-toastify';

interface CardData {
    id: number
    Title: string
    Summary: string
    Date: string
    Publisher: string
}

interface CardProps {
    data: CardData
}

export default function Card({ data }: CardProps) {
    const navigate = useNavigate();
    const VITE_BACKEND_HOST: string = import.meta.env.VITE_BACKEND_HOST as string;

    const handleDelete = () => {
        axios.delete(`${VITE_BACKEND_HOST}/api/articles/${data.id}`)
        .then(() => {
            toast.success("Article deleted successfully.");
            window.location.reload();
        })
        .catch((err) => {
            toast.error("Failed to delete article: " + err.response.data.message);
        });
    }
  return (
    <>
        <div className='card'>
            <div className='card-header'>
                <div className='card-title'>
                    <span>{data.Title.slice(0, 50)}...</span>
                    <div className='card-actions'>
                        <IconButton onClick={() => navigate(`/create`, { state: { oldData: data, update: true } })}>
                            <EditIcon color='primary' />
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon color='error' />
                        </IconButton>
                    </div>
                </div>
                <p>{data.Publisher} • Published on {data.Date}</p>
            </div>
            <Divider sx={{backgroundColor: "white"}}/>
            <div className='card-body'>
                <p>{data.Summary.slice(0, 310)}...</p>
            </div>
        </div>
    </>
  )
}

export type { CardData };
