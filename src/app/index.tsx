import { Dispatch, useCallback, useEffect, useState } from "react";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

import { StateUpdater } from "preact/hooks";

import { TPokemon } from "../types/TPokemon";
import { TRow } from "../types/TRow";

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
  ChipText,
  Chip,
} from "./styles";

import LoadingPikachu from "./LoadingPikachu";
import PokemonSpecie from "./PokemonSpecie";

interface useFetchPokemonProps {
  setLoading: Dispatch<StateUpdater<boolean>>;
}

function useFetchPokemon({ setLoading }: useFetchPokemonProps) {
  const [url, setUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon");
  const [pokemonList, setPokemonList] = useState<Array<TPokemon>>([]);
  const [prevUrl, setPrevUrl] = useState<string>("");
  const [nextUrl, setNextUrl] = useState<string>("");

  const handleFetchListPokemon = useCallback(async () => {
    setLoading(true);

    try {
      const response = await request({ url: url });

      setPrevUrl(response.data.previous);
      setNextUrl(response.data.next);

      const pokemonList: TPokemon[] = [];

      response.data.results.forEach(async (pokemon: TRow) => {
        const response = await request({ url: pokemon.url });

        pokemonList.push(response.data);
      });

      setPokemonList(pokemonList);
    } catch (error) {
      console.error(error);
    }

    setInterval(() => setLoading(false), 1000);
  }, [url]);

  useEffect(() => {
    handleFetchListPokemon();
  }, [handleFetchListPokemon]);

  return { pokemonList, prevUrl, nextUrl, setUrl };
}

function App() {
  const [pokemon, setPokemon] = useState<TPokemon>();
  const [loading, setLoading] = useState<boolean>(false);

  const { pokemonList, prevUrl, nextUrl, setUrl } = useFetchPokemon({
    setLoading,
  });

  if (!!loading) {
    return <LoadingPikachu />;
  }

  if (!!pokemon) {
    return <PokemonSpecie pokemon={pokemon} setPokemon={setPokemon} />;
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
              onClick={() => setPokemon(value)}
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
