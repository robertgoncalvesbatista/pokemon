"use client";

import { useNavigate } from "react-router-dom";

import Pikachu from "/img/pikachu.png";
import Pokeball from "/img/pokeball-icon.png";

import {
  ScreenStyled,
  ButtonStyled,
  MainStyled,
  FooterStyled,
  WrapperStyled,
} from "./components/@index";

function Main() {
  const navigate = useNavigate();

  return (
    <ScreenStyled>
      <MainStyled>
        <WrapperStyled>
          <div style={{ margin: "0 auto" }}>
            <img
              src={Pikachu}
              alt="Pikachu image"
              style={{ maxHeight: "148px" }}
            />
          </div>

          <div>
            <p style={{ fontSize: "10pt" }}>
              Bem-vindo(a) ao maravilhoso mundo de
            </p>

            <h1
              style={{
                fontSize: "42pt",
                color: "#fff",
                textShadow:
                  "2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000",
              }}
            >
              Pokémon
            </h1>

            <p style={{ fontSize: "10pt" }}>
              Este site é o meu projeto de fã. Nele, compartilho meu entusiasmo
              e a criação de uma Pokédex completa. Explore e mergulhe o vasto
              universo de Pokémon que tanto me inspira.
            </p>
          </div>
        </WrapperStyled>

        <ButtonStyled.Group>
          <ButtonStyled.Item onClick={() => navigate("/pokemon")}>
            <img src={Pokeball} alt="" width="32px" />
            Pokemon
          </ButtonStyled.Item>

          <ButtonStyled.Item onClick={() => navigate("/berry")}>
            <img src={Pokeball} alt="" width="32px" />
            Berries
          </ButtonStyled.Item>

          <ButtonStyled.Item onClick={() => navigate("/game")}>
            <img src={Pokeball} alt="" width="32px" />
            Games
          </ButtonStyled.Item>
        </ButtonStyled.Group>
      </MainStyled>

      <FooterStyled.Container>
        <FooterStyled.Body>
          <span>
            Pokémon e seus personagens são marcas comerciais da Nintendo Co.,
            Ltd
          </span>
        </FooterStyled.Body>
      </FooterStyled.Container>
    </ScreenStyled>
  );
}

export default Main;
