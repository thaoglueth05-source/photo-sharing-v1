import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";

function TopBar() {
  const location = useLocation();
  const { userId } = useParams(); // chỉ có giá trị khi đang ở route có :userId

  let rightContent = "Photo Sharing App";

  if (location.pathname.startsWith("/users/") && userId) {
    const user = models.userModel(userId);
    if (user) {
      rightContent = `${user.first_name} ${user.last_name}`;
    }
  } else if (location.pathname.startsWith("/photos/") && userId) {
    const user = models.userModel(userId);
    if (user) {
      rightContent = `Photos of ${user.first_name} ${user.last_name}`;
    }
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          Trần Phương Thảo
        </Typography>
        <Typography variant="h6" color="inherit">
          {rightContent}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;