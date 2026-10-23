import React from "react";
import { Typography, Card, CardContent, CardMedia, Box, Divider } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";

function UserPhotos() {
  const { userId } = useParams();
  const photos = models.photoOfUserModel(userId);
  const user = models.userModel(userId);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleString(); // hoặc toLocaleDateString() tùy ý
  };

  if (!photos || photos.length === 0) {
    return <Typography>No photos for this user.</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Photos of {user?.first_name} {user?.last_name}
      </Typography>

      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 4, maxWidth: 600 }}>
          <CardMedia
            component="img"
            image={require(`../../images/${photo.file_name}`)}
            alt="photo"
            sx={{ maxHeight: 400, objectFit: "contain" }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Posted: {formatDate(photo.date_time)}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Comments</Typography>
            {photo.comments && photo.comments.length > 0 ? (
              photo.comments.map((comment) => (
                <Box key={comment._id} sx={{ mt: 1, pl: 2 }}>
                  <Typography variant="body2">
                    <Link to={`/users/${comment.user._id}`}>
                      {comment.user.first_name} {comment.user.last_name}
                    </Link>
                    {" — "}
                    {formatDate(comment.date_time)}
                  </Typography>
                  <Typography variant="body1">{comment.comment}</Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No comments yet.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;