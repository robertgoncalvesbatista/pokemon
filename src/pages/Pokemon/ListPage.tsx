"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { HiArrowSmLeft, HiArrowSmRight, HiHome } from "react-icons/hi";

import Chip from "@/components/Chip";
import IconButton from "@/components/IconButton";

import { TypeColor } from "@/shared/enums/TypeColor";

import {
  FlexboxStyled,
  ImageStyled,
  TitleStyled,
  ButtonStyled,
  ScreenStyled,
  CardStyled,
} from "./components/@index";

import useGetPokemonList from "./services/useGetPokemons";

import { Pokemon } from "./domain/Pokemon";

function ListPage() {
  const navigate = useNavigate();
  const { pokemons, prevUrl, nextUrl, handleChangePage } = useGetPokemonList();

  const [page, setPage] = useState<number>(1);

  return (
    <ScreenStyled.List>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginBottom: "1rem",
        }}
      >
        <IconButton
          icon={HiHome}
          onClick={() => navigate("/")}
          style={{
            borderRadius: 0,
            color: "#000",
            backgroundColor: "#fff",
          }}
        />

        <TitleStyled>Pokémon</TitleStyled>

        <div style={{ content: "", width: "40px", height: "40px" }}></div>
      </div>

      <FlexboxStyled>
        {pokemons.map((pokemon: Pokemon) => {
          // @ts-ignore
          const color = TypeColor[pokemon.types[0].type.name];

          return (
            <CardStyled.List
              key={pokemon.id}
              css={{ $$bgColor: color }}
              onClick={() => {
                navigate("/pokemon/" + pokemon.id);
              }}
            >
              <div style={{ textTransform: "capitalize", color: "white" }}>
                <h4 style={{ marginBottom: "1rem" }}>{pokemon.name}</h4>

                {pokemon.types.map(({ type }) => {
                  return (
                    <Chip color="#fff" key={type.name}>
                      {type.name}
                    </Chip>
                  );
                })}
              </div>

              <div>
                <i className="logo"></i>

                <ImageStyled
                  loading="eager"
                  title={pokemon.name}
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  width="96"
                  height="96"
                />
              </div>
            </CardStyled.List>
          );
        })}
      </FlexboxStyled>

      <ButtonStyled.Group>
        <IconButton
          icon={HiArrowSmLeft}
          disabled={!prevUrl}
          onClick={() => {
            handleChangePage(page - 1);
            setPage((prev) => prev - 1);
          }}
        />

        <IconButton
          icon={HiArrowSmRight}
          disabled={!nextUrl}
          onClick={() => {
            handleChangePage(page + 1);
            setPage((prev) => prev + 1);
          }}
        />
      </ButtonStyled.Group>
    </ScreenStyled.List>
  );
}

export default ListPage;
