import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

import { AxiosError, AxiosResponse } from "axios";

import { TPokemon, TPokemonList } from "../../types/TPokemon";
import { TRow } from "../../types/TRow";

import { TypeColor } from "../../enums/TypeColor";

import { request } from "../../services/api";

import {
  ButtonDashboard,
  CardDashboard,
  FlexboxDashboard,
  ImageDashboard,
  MainDashboard,
  NavbarDashboard,
  SpanDashboard,
  TooltipDashboard,
} from "./styles";

export default function Dashboard() {
  const navigate = useNavigate();

  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [pokemonData, setPokemonData] = useState<Array<TPokemon>>([]);
  const [prevUrl, setPrevUrl] = useState("");
  const [nextUrl, setNextUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetchPokemon = useCallback(
    (controller: AbortController, responseData: TPokemonList) => {
      setPokemonData([]);

      responseData.results.forEach(async (pokemon: TRow) => {
        await request({ url: pokemon.url, signal: controller.signal })
          .then((res: AxiosResponse<TPokemon>) =>
            setPokemonData((prevState) => [...prevState, res.data])
          )
          .catch((error: AxiosError) => {
            if (!controller.signal.aborted) {
              console.error(error);
            }
          });
      });
    },
    []
  );

  const handleFetchListPokemon = useCallback(
    async (controller: AbortController) => {
      setLoading(true);

      await request({ url: url, signal: controller.signal })
        .then((res: AxiosResponse) => {
          setPrevUrl(res.data.previous);
          setNextUrl(res.data.next);

          handleFetchPokemon(controller, res.data);
        })
        .catch((error: AxiosError) => {
          if (!controller.signal.aborted) {
            console.error(error);
          }
        });

      setInterval(() => {
        setLoading(false);
      }, 2000);
    },
    [handleFetchPokemon, url]
  );

  useEffect(() => {
    const controller = new AbortController();

    handleFetchListPokemon(controller);

    return () => {
      controller.abort();
    };
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
        {pokemonData.map((value: TPokemon) => {
          // @ts-ignore
          const color = TypeColor[value.types[0].type.name];

          return (
            <CardDashboard
              key={value.id}
              css={{ $$bgColor: color }}
              onClick={() => navigate("/pokemon/" + value.id)}
            >
              <div style={{ textTransform: "capitalize", color: "white" }}>
                <h4 style={{ marginBottom: "1rem" }}>{value.name}</h4>

                {value.types.map((item) => {
                  return (
                    <div
                      key={item.type.name}
                      style={{ marginBottom: "0.5rem" }}
                    >
                      <SpanDashboard>{item.type.name}</SpanDashboard>
                    </div>
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
