"use client";

import React, { useState } from "react";
import { HiArrowSmLeft, HiArrowSmRight, HiHome } from "react-icons/hi";

import Chip from "@/components/Chip";
import IconButton from "@/components/IconButton";

import { TPokemon } from "@/types/TPokemon";

import { TypeColor } from "@/enums/TypeColor";

import useGetPokemonList from "@/hooks/useGetPokemonList";
import { useRoutes } from "@/hooks/useRoutes";

import {
  FlexboxStyled,
  ImageStyled,
  TitleStyled,
  ButtonGroupStyled,
  ScreenStyled,
  CardStyled,
} from "./styles";

interface PokemonListProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

function PokemonList({ setCurrentPage }: PokemonListProps) {
  const [page, setPage] = useState<number>(1);

  const { setPokemon } = useRoutes();

  const { pokemonList, prevUrl, nextUrl, handleChangePage } =
    useGetPokemonList();

  return (
    <ScreenStyled>
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
          onClick={() => setCurrentPage("main")}
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
        {pokemonList.map((pokemon: TPokemon) => {
          // @ts-ignore
          const color = TypeColor[pokemon.types[0].type.name];

          return (
            <CardStyled
              key={pokemon.id}
              css={{ $$bgColor: color }}
              onClick={() => {
                setPokemon(pokemon);
                setCurrentPage("pokemon-details");
              }}
            >
              <div style={{ textTransform: "capitalize", color: "white" }}>
                <h4 style={{ marginBottom: "1rem" }}>{pokemon.name}</h4>

                {pokemon.types.map((item) => {
                  return (
                    <Chip color="#fff" key={item.type.name}>
                      {item.type.name}
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
            </CardStyled>
          );
        })}
      </FlexboxStyled>

      <ButtonGroupStyled>
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
      </ButtonGroupStyled>
    </ScreenStyled>
  );
}

export default PokemonList;
