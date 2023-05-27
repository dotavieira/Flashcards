import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/user";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const Login = () => {
  const { user, signIn, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  if (loading) {
    return <p>carregando ...</p>;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    signIn(data.get("email"), data.get("password"));
  };

  return (
    <>
      {/* <h1 onClick={() => signIn("antonio@podgorski.com.br", "123123")}>Login Papai</h1>
            <h1 onClick={() => signIn("liz@podgorski.com.br", "123123")}>Login Liz</h1>
            <Link to="/dashboard">Ir para o Dashboard</Link> */}
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: "90vh",
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="Email"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  required
                  fullWidth
                  id="outlined-required"
                  label="Senha"
                  name="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Fazer login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/cadastro">Não tem uma conta? Cadastre-se</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
