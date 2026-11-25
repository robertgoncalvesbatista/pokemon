"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoSparkles } from "react-icons/io5";

import ProgressBar from "@/components/ProgressBar";
import AudioButton from "@/components/AudioButton";
import IconButton from "@/components/IconButton";
import Loading from "@/components/Loading";
import { TypeColor } from "@/shared/enums/TypeColor";

import PokemonSpecie from "./components/specie.component";
import useGetPokemon from "./services/useGetPokemon";

function DetailsPage() {
  const navigate = useNavigate();
  const { pokemon, isLoading, error } = useGetPokemon();
  const [isShiny, setIsShiny] = useState<boolean>(false);

  if (isLoading) {
    return <main className="app-page"><Loading label="Carregando Pokémon..." /></main>;
  }

  if (error || !pokemon) {
    return (
      <main className="app-page">
        <div className="page-state">
          <h1>Pokémon indisponível</h1>
          <p>{error || "Não encontramos esse Pokémon."}</p>
          <button className="back-link" type="button" onClick={() => navigate("/pokemon")}>
            Voltar para a Pokédex
          </button>
        </div>
      </main>
    );
  }

  const primaryType = pokemon.types[0]?.type.name;
  const color = TypeColor[primaryType as keyof typeof TypeColor] ?? "#52627f";
  const spriteImages = [
    { label: "Arte oficial", src: pokemon.sprites.other["official-artwork"].front_default },
    { label: "Arte oficial shiny", src: pokemon.sprites.other["official-artwork"].front_shiny },
    { label: "Pokémon HOME", src: pokemon.sprites.other.home.front_default },
    { label: "Pokémon HOME shiny", src: pokemon.sprites.other.home.front_shiny },
    { label: "Dream World", src: pokemon.sprites.other.dream_world.front_default },
    { label: "Sprite frontal", src: pokemon.sprites.front_default },
    { label: "Sprite traseiro", src: pokemon.sprites.back_default },
    { label: "Sprite frontal shiny", src: pokemon.sprites.front_shiny },
    { label: "Sprite traseiro shiny", src: pokemon.sprites.back_shiny },
  ].filter((sprite) => typeof sprite.src === "string" && sprite.src.length > 0);
  const uniqueSprites = [...new Map(spriteImages.map((sprite) => [sprite.src, sprite])).values()];

  return (
    <main className="pokemon-details">
      <section className="pokemon-detail-hero" style={{ backgroundColor: color }}>
        <div className="pokemon-detail-inner">
          <IconButton
            icon={IoArrowBack}
            onClick={() => navigate("/pokemon")}
            aria-label="Voltar para a Pokédex"
            style={{
              borderRadius: "12px",
              color: "#17223b",
              background: "#fff",
              position: "absolute",
              zIndex: 2,
            }}
          />

          <div className="pokemon-hero-content">
            <div className="pokemon-artwork-wrap">
              <img
                title={pokemon.name}
                src={pokemon.sprites.other["official-artwork"][isShiny ? "front_shiny" : "front_default"] || pokemon.sprites.front_default}
                alt={`${pokemon.name}${isShiny ? " shiny" : ""}`}
                className="pokemon-detail-artwork"
              />
            </div>
            <div className="pokemon-hero-copy">
              <span className="pokemon-number">Nº {String(pokemon.id).padStart(3, "0")}</span>
              <h1>{pokemon.name}</h1>
              <div className="detail-tags">
                {pokemon.types.map(({ type }) => (
                  <span className="detail-tag" key={type.name}>{type.name}</span>
                ))}
              </div>
              <div className="pokemon-hero-actions">
                <button
                  className="shiny-toggle"
                  type="button"
                  onClick={() => setIsShiny((previous) => !previous)}
                  aria-pressed={isShiny}
                >
                  <IoSparkles size={18} />
                  {isShiny ? "Ver forma normal" : "Ver forma shiny"}
                </button>
                {pokemon.cries?.latest && <AudioButton link={pokemon.cries.latest} label="Ouvir o som" />}
                {pokemon.cries?.legacy && <AudioButton link={pokemon.cries.legacy} label="Som clássico" />}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-section" aria-label="Características físicas">
        <div className="detail-grid">
          <div className="detail-metric">
            <strong>{(Number(pokemon.height) / 10).toFixed(1)} m</strong>
            <span>Altura</span>
          </div>
          <div className="detail-metric">
            <strong>{(Number(pokemon.weight) / 10).toFixed(1)} kg</strong>
            <span>Peso</span>
          </div>
          <div className="detail-metric">
            <strong>{pokemon.base_experience || "—"}</strong>
            <span>Experiência base</span>
          </div>
          <div className="detail-metric">
            <strong>{pokemon.moves.length}</strong>
            <span>Movimentos registrados</span>
          </div>
        </div>
      </section>

      <section className="detail-section detail-panel">
        <h2>Habilidades</h2>
        <div className="detail-tags">
          {pokemon.abilities.map(({ ability, is_hidden }) => (
            <span className="detail-tag ability-tag" key={ability.name}>
              {ability.name.replace(/-/g, " ")}
              {is_hidden ? " · oculta" : ""}
            </span>
          ))}
        </div>
      </section>

      <section className="detail-section detail-panel">
        <h2>Estatísticas base</h2>
        <div className="stats-list">
          {pokemon.stats.map((item) => (
            <ProgressBar
              key={item.stat.name}
              name={item.stat.name}
              value={Number(item.base_stat)}
              max={255}
            />
          ))}
        </div>
      </section>

      <PokemonSpecie specie={pokemon.species} />

      {uniqueSprites.length > 0 && (
        <section className="detail-section detail-panel sprite-gallery-panel" aria-label="Sprites alternativos">
          <h2>Outros sprites</h2>
          <div className="sprite-gallery">
            {uniqueSprites.map(({ label, src }) => (
              <figure className="sprite-card" key={src}>
                <img src={src} alt={`${pokemon.name} - ${label}`} loading="lazy" decoding="async" />
                <figcaption>{label}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default DetailsPage;
