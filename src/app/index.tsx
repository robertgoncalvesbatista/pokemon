import { useCallback, useEffect, useState } from "react";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

import { AxiosError, AxiosResponse } from "axios";

import ProgressBar from "../components/ProgressBar";
import Detail from "../components/Detail";

import { TPokemon, TPokemonList } from "../types/TPokemon";
import { TRow } from "../types/TRow";
import { TPokemonSpecie } from "../types/TPokemonSpecie";
import { TEvolutionChain, TEvolvesTo } from "../types/TEvolutionChain";

import { TypeColor } from "../enums/TypeColor";

import { request } from "../services/api";

import {
  ButtonDashboard,
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

export default function App() {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [pokemonList, setPokemonList] = useState<Array<TPokemon>>([]);
  const [pokemon, setPokemon] = useState<TPokemon>();
  const [prevUrl, setPrevUrl] = useState("");
  const [nextUrl, setNextUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetchPokemon = useCallback((responseData: TPokemonList) => {
    setPokemonList([]);

    responseData.results.forEach(async (pokemon: TRow) => {
      await request({ url: pokemon.url })
        .then((res: AxiosResponse<TPokemon>) => {
          setPokemonList((prevState) => [...prevState, res.data]);
        })
        .catch((error: AxiosError) => {
          console.error(error);
        });
    });
  }, []);

  const handleFetchListPokemon = useCallback(async () => {
    setLoading(true);

    await request({ url: url })
      .then((res: AxiosResponse) => {
        setPrevUrl(res.data.previous);
        setNextUrl(res.data.next);

        handleFetchPokemon(res.data);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });

    setInterval(() => {
      setLoading(false);
    }, 1000);
  }, [handleFetchPokemon, url]);

  useEffect(() => {
    handleFetchListPokemon();
  }, [handleFetchListPokemon]);

  if (loading) {
    return (
      <MainDashboard>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="/pikachu-running.gif"
              alt="Pikachu correndo enquanto a página carrega"
            />
            <h1
              style={{
                fontFamily: "Pixelify Sans, sans-serif",
                fontStyle: "normal",
              }}
            >
              Carregando...
            </h1>
          </div>
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
          padding: "8px",
          color: "#fff",
          textAlign: "justify",
          marginTop: "1rem",
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

interface PokemonSpecieProps {
  specie: { name: string; url: string };
}

function PokemonSpecie({ specie }: PokemonSpecieProps) {
  const [evolutionChain, setEvolutionChain] = useState<TEvolutionChain>();

  const handleFetchChain = useCallback(
    async (evolution_chain: Omit<TRow, "name">) => {
      await request({ url: evolution_chain.url })
        .then((res: AxiosResponse<TEvolutionChain>) => {
          setEvolutionChain(res.data);
        })
        .catch((error: AxiosError) => {
          console.error(error);
        });
    },
    []
  );

  const handleFetchSpecie = useCallback(async () => {
    await request({ url: specie.url })
      .then((res: AxiosResponse<TPokemonSpecie>) => {
        handleFetchChain(res.data.evolution_chain);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  }, [handleFetchChain, specie.url]);

  useEffect(() => {
    handleFetchSpecie();
  }, [handleFetchSpecie]);

  if (!evolutionChain?.chain.evolves_to) {
    return <span>Não tem evolução</span>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ul>
        {evolutionChain?.chain.evolves_to.map((firstEvolution: TEvolvesTo) => {
          return (
            <li
              style={{
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
              }}
            >
              {evolutionChain?.chain.species.name} <HiArrowSmRight size={20} />
              {firstEvolution.species.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
