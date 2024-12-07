import { Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";

export const Welcome: FC = () => {
  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: "auto",
        mt: 4,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src="/images/eg.png" alt="Logo" style={{ height: "100px" }} />
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Welcome to the application.
        </Typography>
      </CardContent>
    </Card>
  );
};
