"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TiArrowBackOutline } from "react-icons/ti";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";

import ProgressBar from "@/components/ProgressBar";
import Detail from "@/components/Detail";
import AudioButton from "@/components/AudioButton";
import Chip from "@/components/Chip";
import IconButton from "@/components/IconButton";

import { TypeColor } from "@/shared/enums/TypeColor";

import {
  ButtonStyled,
  AboutStyled,
  CardStyled,
  ContentStyled,
  ScreenStyled,
  StatusStyled,
} from "./components/@index";

import PokemonSpecie from "./components/specie.component";

import useGetPokemon from "./services/useGetPokemon";

function DetailsPage() {
  const navigate = useNavigate();
  const { pokemon } = useGetPokemon();

  const [isShiny, setIsShiny] = useState<boolean>(false);

  if (!pokemon) {
    return <div></div>;
  }

  // @ts-ignore
  const color = TypeColor[pokemon.types[0].type.name];

  return (
    <ScreenStyled.Details>
      <CardStyled.Details css={{ $$bgColor: color }}>
        <IconButton
          icon={TiArrowBackOutline}
          onClick={() => navigate("/pokemon")}
          style={{
            borderRadius: 0,
            color: "#fff",
            background: "none",
            position: "absolute",
          }}
        />

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

            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {pokemon.types.map((item) => {
                  return (
                    <Chip
                      key={item.type.name}
                      color="#fff"
                      style={{ margin: 0 }}
                    >
                      {item.type.name}
                    </Chip>
                  );
                })}
              </div>

              <div>
                <ButtonStyled.Shiny
                  onClick={() => setIsShiny((prev) => !prev)}
                  title={`${pokemon.name} shiny`}
                  style={{ marginBottom: "0.5rem" }}
                >
                  {!!isShiny && <FaToggleOn size={20} />}
                  {!isShiny && <FaToggleOff size={20} />}
                  Shiny
                </ButtonStyled.Shiny>

                <AudioButton link={pokemon.cries.latest} label={"Latest"} />
                <AudioButton link={pokemon.cries.legacy} label={"Legacy"} />
              </div>
            </div>
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

      <PokemonSpecie specie={pokemon.species} />
    </ScreenStyled.Details>
  );
}

export default DetailsPage;
