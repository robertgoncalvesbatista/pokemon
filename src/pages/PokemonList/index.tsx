"use client";

import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

import { StateUpdater, useState } from "preact/hooks";

import { TPokemon } from "../../types/TPokemon";

import { TypeColor } from "../../enums/TypeColor";

import useGetPokemonList from "../../hooks/useGetPokemonList";
import { useRoutes } from "../../hooks/useRoutes";

import {
  ButtonDashboard,
  CardDashboard,
  FlexboxDashboard,
  ImageDashboard,
  NavbarDashboard,
  TooltipDashboard,
  ChipText,
  Chip,
  MainDashboard,
} from "./styles";

import { Page } from "../../App";

interface PokemonListProps {
  setCurrentPage: React.Dispatch<StateUpdater<Page>>;
}

function PokemonList({ setCurrentPage }: PokemonListProps) {
  const [page, setPage] = useState<number>(1);

  const { setPokemon } = useRoutes();

  const { pokemonList, prevUrl, nextUrl, handleChangePage } =
    useGetPokemonList();

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
                setPokemon(value);
                setCurrentPage("about");
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
        <ButtonDashboard
          onClick={() => {
            handleChangePage(page - 1);
            setPage((prev) => prev - 1);
          }}
          disabled={!prevUrl}
        >
          <HiArrowSmLeft size={20} />
        </ButtonDashboard>

        <ButtonDashboard
          onClick={() => {
            handleChangePage(page + 1);
            setPage((prev) => prev + 1);
          }}
          disabled={!nextUrl}
        >
          <HiArrowSmRight size={20} />
        </ButtonDashboard>
      </TooltipDashboard>
    </MainDashboard>
  );
}

export default PokemonList;
