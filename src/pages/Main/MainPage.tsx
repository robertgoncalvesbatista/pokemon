"use client";

import { useNavigate } from "react-router-dom";
import { MdCatchingPokemon, MdExplore, MdSpa } from "react-icons/md";

import Pikachu from "/img/pikachu.png";

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
      <MainStyled className="home-main">
        <WrapperStyled>
          <div style={{ margin: "0 auto" }}>
            <img
              src={Pikachu}
              alt="Pikachu"
              style={{ maxHeight: "220px", width: "100%", objectFit: "contain", animation: "soft-pulse 3.2s ease-in-out infinite" }}
            />
          </div>

          <div>
            <span className="home-kicker">Sua aventura começa aqui</span>
            <p style={{ fontSize: "12pt", color: "#69758a", marginBottom: "8px" }}>
              Bem-vindo(a) ao maravilhoso mundo de
            </p>

            <h1
              style={{
                fontSize: "clamp(44px, 9vw, 72px)",
                lineHeight: 1,
                color: "#17223b",
                letterSpacing: "-2px",
                marginBottom: "16px",
              }}
            >
              Pokémon
            </h1>

            <p style={{ fontSize: "12pt", lineHeight: 1.7, maxWidth: "580px", color: "#40444b" }}>
              Este site é o meu projeto de fã. Nele, compartilho meu entusiasmo
              e a criação de uma Pokédex completa. Explore e mergulhe o vasto
              universo de Pokémon que tanto me inspira.
            </p>
            <p className="home-supporting-copy">
              Consulte características, habilidades e evoluções; descubra também berries e gerações.
            </p>
          </div>
        </WrapperStyled>

        <ButtonStyled.Group className="home-explore">
          <ButtonStyled.Item onClick={() => navigate("/pokemon")}>
            <MdCatchingPokemon size={24} aria-hidden="true" />
            Explorar Pokémon
          </ButtonStyled.Item>

          <ButtonStyled.Item onClick={() => navigate("/berry")}>
            <MdSpa size={24} aria-hidden="true" />
            Descobrir berries
          </ButtonStyled.Item>

          <ButtonStyled.Item onClick={() => navigate("/game")}>
            <MdExplore size={24} aria-hidden="true" />
            Ver gerações
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
