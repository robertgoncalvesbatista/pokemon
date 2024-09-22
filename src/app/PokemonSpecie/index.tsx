import { Dispatch, useCallback, useEffect, useState } from "react";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

import { StateUpdater } from "preact/hooks";

import Detail from "../../components/Detail";
import ProgressBar from "../../components/ProgressBar";

import { TEvolutionChain, TEvolvesTo } from "../../types/TEvolutionChain";
import { TPokemon } from "../../types/TPokemon";

import { TypeColor } from "../../enums/TypeColor";

import { request } from "../../services/api";

import LoadingPikachu from "../LoadingPikachu";

import {
  AboutPokemon,
  CardPokemon,
  Chip,
  ChipText,
  ContentPokemon,
  MainPokemon,
  StatusPokemon,
} from "../styles";

interface useFetchSpecieProps {
  specie: { name: string; url: string };
  setLoading: Dispatch<StateUpdater<boolean>>;
}

function useFetchSpecie({ specie, setLoading }: useFetchSpecieProps) {
  const [evolutionChain, setEvolutionChain] = useState<TEvolutionChain>();

  const handleFetchSpecie = useCallback(async () => {
    setLoading(true);

    try {
      const responseSpecie = await request({ url: specie.url });

      const responseEvolution = await request({
        url: responseSpecie.data.evolution_chain.url,
      });

      setEvolutionChain(responseEvolution.data);
    } catch (error) {
      console.error(error);
    }

    setInterval(() => setLoading(false), 1000);
  }, [specie.url]);

  useEffect(() => {
    handleFetchSpecie();
  }, [handleFetchSpecie]);

  return { evolutionChain };
}

interface PokemonSpecieProps {
  pokemon: TPokemon;
  setPokemon: Dispatch<StateUpdater<TPokemon | undefined>>;
}

function PokemonSpecie({ pokemon, setPokemon }: PokemonSpecieProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const { evolutionChain } = useFetchSpecie({
    specie: pokemon.species,
    setLoading,
  });

  if (!!loading) {
    return <LoadingPikachu />;
  }

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
          onClick={() => setPokemon(undefined)}
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
                <Chip key={item.type.name}>
                  <ChipText>{item.type.name}</ChipText>
                </Chip>
              );
            })}
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

        {!evolutionChain?.chain.evolves_to && <span>Não tem evolução</span>}

        {!!evolutionChain?.chain.evolves_to && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ul>
              {evolutionChain?.chain.evolves_to.map(
                (firstEvolution: TEvolvesTo) => {
                  return (
                    <li
                      style={{
                        textTransform: "capitalize",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {evolutionChain?.chain.species.name}{" "}
                      <HiArrowSmRight size={20} />
                      {firstEvolution.species.name}
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        )}
      </ContentPokemon>
    </MainPokemon>
  );
}

export default PokemonSpecie;
