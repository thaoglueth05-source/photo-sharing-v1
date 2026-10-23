import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";

function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="body1"><strong>Location:</strong> {user.location}</Typography>
      <Typography variant="body1"><strong>Occupation:</strong> {user.occupation}</Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        <strong>Description:</strong> {user.description}
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to={`/photos/${user._id}`}
        sx={{ mt: 3 }}
      >
        View Photos
      </Button>
    </Box>
  );
}

export default UserDetail;