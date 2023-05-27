import { useContext, useState } from "react";
import "./style.css";
import { UserContext } from "../../context/user";
import Modal from "react-modal";
import { Box, Button, Grid, TextField } from "@mui/material";
import { UserProvider } from "../../context/user";

Modal.setAppElement("#root");

interface contextInterface {
  updateXp: any;
  decreaseXp: any; 
}

export default function Card({ content }) {
  const { updateXp, decreaseXp } = useContext(UserContext);

  const [isOpened, setIsOpened] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function fecharModal() {
    setModalIsOpen(false);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      traducao: data.get("traducao"),
    });
    let dataInfo = data.get("traducao")?.toString().toLowerCase();
    let cardBackInfo = content.back.toLowerCase();
    let cardFrontInfo = content.front.toLowerCase();
    if (!isOpened && dataInfo == cardBackInfo) {
      updateXp();
      setIsOpened(!isOpened);
    } else if (isOpened && dataInfo == cardFrontInfo) {
      updateXp();
      setIsOpened(!isOpened);
    } else {
      decreaseXp();
    }
    setModalIsOpen(false);
  };

  return (
    <UserProvider>
      <div
        className={isOpened ? "card card-opened" : "card"}
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        <div className="content">
          <div className="front">{content.front}</div>
          <div className="back">{content.back}</div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={fecharModal}
          contentLabel="Modal de exemplo"
        >
          <div className="modalDisplay">
            <h1>Aperte Esc para fechar o modal</h1>
            <h1>
              Escreva a tradução da palavra{" "}
              {isOpened ? content?.back : content?.front}:
            </h1>
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
                    id="traducao"
                    label="Tradução"
                    name="traducao"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Validar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </div>
        </Modal>
      </div>
    </UserProvider>
  );
}
