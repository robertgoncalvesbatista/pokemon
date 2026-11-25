"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MdChevronLeft, MdChevronRight, MdGridView } from "react-icons/md";

import IconButton from "@/components/IconButton";
import Loading from "@/components/Loading";

import { TypeColor } from "@/shared/enums/TypeColor";

import useGetPokemonList from "./services/useGetPokemons";

import { Pokemon } from "./domain/Pokemon";

function ListPage() {
  const navigate = useNavigate();
  const {
    pokemons,
    prevUrl,
    nextUrl,
    count,
    isLoading,
    error,
    handleChangePage,
    setSearchTemp: setSearch,
  } = useGetPokemonList();

  const [page, setPage] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<string>("all");
  const filteredPokemons = selectedType === "all"
    ? pokemons
    : pokemons.filter((pokemon) => pokemon.types.some(({ type }) => type.name === selectedType));
  const availableTypes = Array.from(
    new Set(pokemons.flatMap((pokemon) => pokemon.types.map(({ type }) => type.name)))
  ).sort();

  return (
    <main className="app-page">
      <header className="page-header">
        <IconButton
          icon={MdGridView}
          onClick={() => navigate("/")}
          aria-label="Voltar para o início"
          style={{
            borderRadius: "12px",
            color: "#000",
            backgroundColor: "#fff",
            boxShadow: "0 8px 20px rgba(40, 44, 52, 0.08)",
          }}
        />
        <div className="page-heading">
          <h1>Pokédex</h1>
          <p>Explore espécies, tipos e características da PokéAPI.</p>
        </div>
        <span aria-hidden="true" />
      </header>

      <section className="page-toolbar" aria-label="Busca e filtros">
        <input
          className="page-search"
          placeholder="Buscar por nome ou número..."
          aria-label="Pesquisar Pokémon"
          type="search"
          onChange={(event) => {
            setSelectedType("all");
            setSearch(event.currentTarget.value);
          }}
        />
        <label>
          <span className="sr-only">Filtrar por tipo nesta página</span>
          <select
            className="page-select"
            value={selectedType}
            onChange={(event) => setSelectedType(event.currentTarget.value)}
            aria-label="Filtrar por tipo nesta página"
          >
            <option value="all">Todos os tipos</option>
            {availableTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>
        <p className="muted-copy" aria-live="polite">
          {count ? `${count.toLocaleString("pt-BR")} espécies` : ""}
        </p>
      </section>

      <section className="catalog-grid" aria-label="Lista de Pokémon">
        {isLoading && <Loading label="Carregando Pokémon..." />}
        {!isLoading && error && (
          <div className="page-state" role="status">
            <h2>Não encontramos esse Pokémon</h2>
            <p>{error}</p>
          </div>
        )}
        {!isLoading && !error && filteredPokemons.length === 0 && (
          <div className="page-state">
            <h2>Nenhum resultado neste tipo</h2>
            <p>Escolha outro tipo ou limpe o filtro para continuar explorando.</p>
          </div>
        )}
        {!isLoading && filteredPokemons.map((pokemon: Pokemon) => {
          const color = TypeColor[pokemon.types[0]?.type.name as keyof typeof TypeColor] ?? "#d9deea";

          return (
            <button
              className="catalog-card pokemon-card"
              key={pokemon.id}
              type="button"
              style={{ borderTop: `4px solid ${color}` }}
              onClick={() => {
                navigate("/pokemon/" + pokemon.id);
              }}
              aria-label={`Ver detalhes de ${pokemon.name}`}
            >
              <div className="pokemon-card-copy">
                <span className="pokemon-number">Nº {String(pokemon.id).padStart(3, "0")}</span>
                <h2>{pokemon.name}</h2>
                <div className="detail-tags">
                  {pokemon.types.map(({ type }) => (
                    <span className="detail-tag" key={type.name}>{type.name}</span>
                  ))}
                </div>
                <span className="pokemon-experience">
                  {pokemon.base_experience} EXP base
                </span>
              </div>
              <img
                loading="lazy"
                title={pokemon.name}
                alt=""
                src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
                width="112"
                height="112"
              />
            </button>
          );
        })}
      </section>

      <nav className="page-pagination" aria-label="Paginação da Pokédex">
        <IconButton
          icon={MdChevronLeft}
          disabled={!prevUrl}
          onClick={() => {
            setSelectedType("all");
            handleChangePage(page - 1);
            setPage((prev) => prev - 1);
          }}
          aria-label="Página anterior"
        />
        <IconButton
          icon={MdChevronRight}
          disabled={!nextUrl}
          onClick={() => {
            setSelectedType("all");
            handleChangePage(page + 1);
            setPage((prev) => prev + 1);
          }}
          aria-label="Próxima página"
        />
      </nav>
    </main>
  );
}

export default ListPage;
