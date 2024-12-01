"use client";

import { StateUpdater } from "preact/hooks";

import { Page } from "../../App";

import Pikachu from "../../../public/pikachu.png";
import Pokeball from "../../../public/pokeball-icon.png";

import { MainStyled, BotaoStyled } from "./styles";

interface MainScreenProps {
  setCurrentPage: React.Dispatch<StateUpdater<Page>>;
}

function MainScreen({ setCurrentPage }: MainScreenProps) {
  return (
    <MainStyled style={{ backgroundColor: "#eab646" }}>
      <div
        style={{
          padding: "8rem 0 2rem",
          display: "grid",
          gridTemplateColumns: "1fr 2.5fr",
          alignItems: "center",
          gap: "1rem",
          margin: "0 auto",
          maxWidth: "1200px",
        }}
      >
        <div
          style={{
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <img
            src={Pikachu}
            alt="Pikachu photo"
            style={{ maxHeight: "148px" }}
          />
        </div>

        <div style={{ margin: "0 1rem" }}>
          <p style={{ fontSize: "10pt" }}>
            Bem-vindo(a) ao maravilhoso mundo de
          </p>
          <h1 style={{ fontSize: "42pt" }}>Pokémon</h1>
          <p>
            Este site é o meu projeto de fã. Nele, compartilho meu entusiasmo e
            a criação de uma Pokédex completa. Explore e mergulhe o vasto
            universo de Pokémon que tanto me inspira.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          borderRadius: "8px",
          padding: "0.75rem 1rem",
          margin: "2rem auto 0",
        }}
      >
        <BotaoStyled onClick={() => setCurrentPage("home")}>
          <img src={Pokeball} alt="" width="32px" />
          Pokemon
        </BotaoStyled>

        <BotaoStyled>
          <img src={Pokeball} alt="" width="32px" />
          Berries
        </BotaoStyled>

        <BotaoStyled>
          <img src={Pokeball} alt="" width="32px" />
          Locations
        </BotaoStyled>

        <BotaoStyled>
          <img src={Pokeball} alt="" width="32px" />
          Games
        </BotaoStyled>

        <BotaoStyled>
          <img src={Pokeball} alt="" width="32px" />
          Machines
        </BotaoStyled>

        <BotaoStyled>
          <img src={Pokeball} alt="" width="32px" />
          Moves
        </BotaoStyled>
      </div>

      <div
        style={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span>
          Pokémon e seus personagens são marcas comerciais da Nintendo Co., Ltd
        </span>
      </div>
    </MainStyled>
  );
}

export default MainScreen;
