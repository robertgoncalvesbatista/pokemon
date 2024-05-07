import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

import { AxiosError, AxiosResponse } from "axios";

import ProgressBar from "../../components/ProgressBar";

import { TPokemon } from "../../types/TPokemon";
import { TPokemonSpecie } from "../../types/TPokemonSpecie";
import { TEvolutionChain, TEvolvesTo } from "../../types/TEvolutionChain";
import { TRow } from "../../types/TRow";

import { TypeColor } from "../../enums/TypeColor";

import { request } from "../../services/api";

import {
  AboutPokemon,
  CardPokemon,
  ContentPokemon,
  MainPokemon,
  StatusPokemon,
} from "./styles";

export default function Pokemon() {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState<TPokemon>();

  const handleFetch = useCallback(
    async (controller: AbortController) => {
      await request({
        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
        signal: controller.signal,
      })
        .then((res: AxiosResponse<TPokemon>) => {
          setPokemon(res.data);
        })
        .catch((error: AxiosError) => {
          if (!controller.signal.aborted) {
            console.error(error);
          }
        });
    },
    [id]
  );

  useEffect(() => {
    const controller = new AbortController();

    handleFetch(controller);

    return () => {
      controller.abort();
    };
  }, [handleFetch]);

  if (!pokemon) {
    return <p>Pokemon não encontrado</p>;
  }

  // @ts-ignore
  const color = TypeColor[pokemon.types[0].type.name];

  return (
    <MainPokemon>
      <CardPokemon css={{ $$bgColor: color }}>
        <a
          href="/"
          style={{ color: "#fff", fontWeight: "500", display: "flex" }}
        >
          <HiArrowSmLeft size={20} />
          Pokédex
        </a>

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
            src={pokemon.sprites.other["official-artwork"].front_default}
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
                <span
                  key={item.type.name}
                  style={{
                    backgroundColor: "#ffffff40",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "25px",
                    marginRight: "0.5rem",
                  }}
                >
                  {item.type.name}
                </span>
              );
            })}
          </div>
        </div>
      </CardPokemon>

      <ContentPokemon>
        <AboutPokemon>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontWeight: "500", fontSize: "14pt" }}>
              {pokemon.height} hg
            </span>
            <br />
            <small>Height</small>
          </div>

          <div style={{ textAlign: "center" }}>
            <span style={{ fontWeight: "500", fontSize: "14pt" }}>
              {pokemon.weight} dm
            </span>
            <br />
            <small>Weight</small>
          </div>

          <div style={{ textAlign: "center" }}>
            <span style={{ fontWeight: "500", fontSize: "14pt" }}>
              {pokemon.base_experience} xp
            </span>
            <br />
            <small>Base experience</small>
          </div>
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

function PokemonSpecie({ specie }: { specie: { name: string; url: string } }) {
  const [evolutionChain, setEvolutionChain] = useState<TEvolutionChain>();

  const handleFetchChain = useCallback(
    async (
      controller: AbortController,
      evolution_chain: Omit<TRow, "name">
    ) => {
      await request({ url: evolution_chain.url, signal: controller.signal })
        .then((res: AxiosResponse<TEvolutionChain>) => {
          setEvolutionChain(res.data);
        })
        .catch((error: AxiosError) => {
          if (!controller.signal.aborted) {
            console.error(error);
          }
        });
    },
    []
  );

  const handleFetchSpecie = useCallback(
    async (controller: AbortController) => {
      await request({ url: specie.url, signal: controller.signal })
        .then((res: AxiosResponse<TPokemonSpecie>) => {
          handleFetchChain(controller, res.data.evolution_chain);
        })
        .catch((error: AxiosError) => {
          if (!controller.signal.aborted) {
            console.error(error);
          }
        });
    },
    [handleFetchChain, specie.url]
  );

  useEffect(() => {
    const controller = new AbortController();

    handleFetchSpecie(controller);

    return () => {
      controller.abort();
    };
  }, [handleFetchSpecie]);

  if (!evolutionChain?.chain.evolves_to) {
    return <span>Não tem evolução</span>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ul>
        {evolutionChain?.chain.evolves_to.map((firstEvolution: TEvolvesTo) => {
          return (
            <li style={{ textTransform: "capitalize", display: "flex" }}>
              {evolutionChain?.chain.species.name} <HiArrowSmRight size={20} />
              {firstEvolution.species.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
