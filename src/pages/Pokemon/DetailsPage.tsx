"use client";

import React, { useState } from "react";

import { HiArrowSmLeft } from "react-icons/hi";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";

import ProgressBar from "@/components/ProgressBar";
import Detail from "@/components/Detail";
import AudioButton from "@/components/AudioButton";
import Chip from "@/components/Chip";

import { TypeColor } from "@/enums/TypeColor";

import { useRoutes } from "@/hooks/useRoutes";

import {
  ButtonStyled,
  AboutStyled,
  CardStyled,
  ContentStyled,
  ScreenStyled,
  StatusStyled,
} from "./components/@index";

import PokemonSpecie from "./components/specie.component";

interface PokemonDetailsProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

function PokemonDetails({ setCurrentPage }: PokemonDetailsProps) {
  const { pokemon } = useRoutes();

  const [isShiny, setIsShiny] = useState<boolean>(false);

  // @ts-ignore
  const color = TypeColor[pokemon.types[0].type.name];

  if (!pokemon) {
    return null;
  }

  return (
    <ScreenStyled.Details>
      <CardStyled.Details css={{ $$bgColor: color }}>
        <button
          style={{
            color: "#fff",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          type="button"
          onClick={() => setCurrentPage("pokemon.list")}
        >
          <HiArrowSmLeft size={20} />
          Pokédex
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          <img
            title={pokemon.name}
            src={
              pokemon.sprites.other["official-artwork"][
                isShiny ? "front_shiny" : "front_default"
              ]
            }
            alt={pokemon.name}
            style={{ maxWidth: "200px" }}
          />

          <div style={{ textTransform: "capitalize", color: "#fff" }}>
            <div style={{ marginBottom: "1rem" }}>
              <small style={{ fontWeight: "500" }}>
                # {String(pokemon.id).padStart(4, "0")}
              </small>

              <h2>{pokemon.name}</h2>
            </div>

            {pokemon.types.map((item) => {
              return <Chip key={item.type.name}>{item.type.name}</Chip>;
            })}

            <ButtonStyled.Shiny
              onClick={() => setIsShiny((prev) => !prev)}
              style={{ marginBottom: "1rem", marginTop: "1rem" }}
              title={`${pokemon.name} shiny`}
            >
              {isShiny ? <FaToggleOn size={20} /> : <FaToggleOff size={20} />}
              Shiny
            </ButtonStyled.Shiny>

            <AudioButton link={pokemon.cries.latest} label={"Latest"} />
            <AudioButton link={pokemon.cries.legacy} label={"Legacy"} />
          </div>
        </div>
      </CardStyled.Details>

      <ContentStyled>
        <AboutStyled>
          <Detail type={"hg"} value={pokemon.height} name={"Height"} />
          <Detail type={"dm"} value={pokemon.weight} name={"Weight"} />
          <Detail
            type={"xp"}
            value={pokemon.base_experience}
            name={"Base experience"}
          />
        </AboutStyled>
      </ContentStyled>

      <ContentStyled>
        <StatusStyled>
          <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
            Base status
          </h2>

          {pokemon.stats.map((item) => {
            return (
              <ProgressBar
                key={item.stat.name}
                name={item.stat.name}
                value={+item.base_stat}
                max={300}
              />
            );
          })}
        </StatusStyled>
      </ContentStyled>

      <ContentStyled>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Evolution Chain
        </h2>

        <PokemonSpecie specie={pokemon.species} />
      </ContentStyled>
    </ScreenStyled.Details>
  );
}

export default PokemonDetails;
