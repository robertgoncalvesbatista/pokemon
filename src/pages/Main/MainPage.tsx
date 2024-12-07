"use client";

import React from "react";

import Pikachu from "@/assets/img/pikachu.png";
import Pokeball from "@/assets/img/pokeball-icon.png";

import {
  ScreenStyled,
  BotaoStyled,
  ButtonGroupStyled,
  MainStyled,
  FooterStyled,
  WrapperStyled,
  FooterBody,
} from "./components/@index";

interface MainProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

function Main({ setCurrentPage }: MainProps) {
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

        <ButtonGroupStyled>
          <BotaoStyled onClick={() => setCurrentPage("pokemon.list")}>
            <img src={Pokeball} alt="" width="32px" />
            Pokemon
          </BotaoStyled>

          <BotaoStyled onClick={() => setCurrentPage("berry.list")}>
            <img src={Pokeball} alt="" width="32px" />
            Berries
          </BotaoStyled>

          <BotaoStyled onClick={() => setCurrentPage("game.list")}>
            <img src={Pokeball} alt="" width="32px" />
            Games
          </BotaoStyled>
        </ButtonGroupStyled>
      </MainStyled>

      <FooterStyled>
        <FooterBody>
          <span>
            Pokémon e seus personagens são marcas comerciais da Nintendo Co.,
            Ltd
          </span>
        </FooterBody>
      </FooterStyled>
    </ScreenStyled>
  );
}

export default Main;