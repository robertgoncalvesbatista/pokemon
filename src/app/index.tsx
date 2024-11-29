"use client";

import { useState } from "react";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";

import ProgressBar from "../components/ProgressBar";
import Detail from "../components/Detail";

import { TPokemon } from "../types/TPokemon";

import { TypeColor } from "../enums/TypeColor";

import useGetPokemonList from "../hooks/useGetPokemonList";

import {
  ButtonDashboard,
  ButtonShiny,
  CardDashboard,
  FlexboxDashboard,
  ImageDashboard,
  MainDashboard,
  NavbarDashboard,
  TooltipDashboard,
  AboutPokemon,
  CardPokemon,
  ContentPokemon,
  MainPokemon,
  StatusPokemon,
  ChipText,
  Chip,
} from "./styles";

import PokemonSpecie from "./PokemonSpecie";

function App() {
  const { pokemonList, loading, prevUrl, nextUrl, setLoading, setUrl } =
    useGetPokemonList();

  const [pokemon, setPokemon] = useState<TPokemon>();
  const [isShiny, setIsShiny] = useState<boolean>(false);

  if (loading) {
    return (
      <MainDashboard>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <h1
            style={{
              fontFamily: "Pixelify Sans, sans-serif",
              fontStyle: "normal",
            }}
          >
            Carregando...
          </h1>
        </div>
      </MainDashboard>
    );
  }

  if (pokemon) {
    // @ts-ignore
    const color = TypeColor[pokemon.types[0].type.name];

    return (
      <MainPokemon>
        <CardPokemon css={{ $$bgColor: color }}>
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
            onClick={() => {
              setPokemon(undefined);
            }}
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
                return (
                  <Chip key={item.type.name}>
                    <ChipText>{item.type.name}</ChipText>
                  </Chip>
                );
              })}

              <ButtonShiny
                onClick={() => setIsShiny((prev) => !prev)}
                style={{ marginTop: "1rem" }}
                title={`${pokemon.name} shiny`}
              >
                {isShiny ? <FaToggleOn size={20} /> : <FaToggleOff size={20} />}
                Shiny
              </ButtonShiny>
            </div>
          </div>
        </CardPokemon>

        <ContentPokemon>
          <AboutPokemon>
            <Detail type={"hg"} value={pokemon.height} name={"Height"} />
            <Detail type={"dm"} value={pokemon.weight} name={"Weight"} />
            <Detail
              type={"xp"}
              value={pokemon.base_experience}
              name={"Base experience"}
            />
          </AboutPokemon>
        </ContentPokemon>

        <ContentPokemon>
          <StatusPokemon>
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
          </StatusPokemon>
        </ContentPokemon>

        <ContentPokemon>
          <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
            Evolution Chain
          </h2>

          <PokemonSpecie specie={pokemon.species} />
        </ContentPokemon>
      </MainPokemon>
    );
  }

  return (
    <MainDashboard>
      <div
        style={{
          borderRadius: "8px",
          backgroundColor: "#ef233c",
          padding: "16px",
          color: "#fff",
          textAlign: "justify",
          marginTop: "1rem",
          marginX: "32px",
        }}
      >
        <p>
          Este site é o meu projeto de fã. Nele, compartilho meu entusiasmo e a
          criação de uma Pokédex completa. Sinta-se bem-vindo para explorar e
          mergulhar no vasto universo de Pokémon que tanto me inspira. Pokémon e
          seus personagens são marcas comerciais da Nintendo.
        </p>
      </div>

      <NavbarDashboard>
        <h1>Pokédex</h1>
      </NavbarDashboard>

      <FlexboxDashboard>
        {pokemonList.map((value: TPokemon) => {
          // @ts-ignore
          const color = TypeColor[value.types[0].type.name];

          return (
            <CardDashboard
              key={value.id}
              css={{ $$bgColor: color }}
              onClick={() => {
                setLoading(true);

                setPokemon(value);

                setInterval(() => {
                  setLoading(false);
                }, 1000);
              }}
            >
              <div style={{ textTransform: "capitalize", color: "white" }}>
                <h4 style={{ marginBottom: "1rem" }}>{value.name}</h4>

                {value.types.map((item) => {
                  return (
                    <Chip key={item.type.name}>
                      <ChipText>{item.type.name}</ChipText>
                    </Chip>
                  );
                })}
              </div>

              <div>
                <i className="logo"></i>

                <ImageDashboard
                  loading="eager"
                  title={value.name}
                  src={value.sprites.other["official-artwork"].front_default}
                  width="96"
                  height="96"
                />
              </div>
            </CardDashboard>
          );
        })}
      </FlexboxDashboard>

      <TooltipDashboard>
        <ButtonDashboard onClick={() => setUrl(prevUrl)} disabled={!prevUrl}>
          <HiArrowSmLeft size={20} />
        </ButtonDashboard>

        <ButtonDashboard onClick={() => setUrl(nextUrl)} disabled={!nextUrl}>
          <HiArrowSmRight size={20} />
        </ButtonDashboard>
      </TooltipDashboard>
    </MainDashboard>
  );
}

export default App;
