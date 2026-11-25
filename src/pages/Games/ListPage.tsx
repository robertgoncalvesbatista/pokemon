"use client";

import { useNavigate } from "react-router-dom";
import { MdGridView } from "react-icons/md";

import IconButton from "@/components/IconButton";
import Loading from "@/components/Loading";
import useGetGamesList from "./services/useGetGames";

function ListPage() {
  const navigate = useNavigate();
  const { games, isLoading, error } = useGetGamesList();

  return (
    <main className="app-page">
      <header className="page-header">
        <IconButton
          icon={MdGridView}
          onClick={() => navigate("/")}
          aria-label="Voltar para o início"
          style={{ borderRadius: "12px", color: "#17223b", backgroundColor: "#fff" }}
        />
        <div className="page-heading">
          <h1>Regiões e gerações</h1>
          <p>Conheça os mundos e os dados que definem cada geração Pokémon.</p>
        </div>
        <span aria-hidden="true" />
      </header>

      <section className="generation-grid" aria-label="Gerações Pokémon">
        {isLoading && <Loading label="Carregando gerações..." />}
        {!isLoading && error && <div className="page-state" role="alert">{error}</div>}
        {!isLoading && games.map((game) => (
          <article className="generation-card" key={game.id}>
            <header>
              <span className="generation-number">Geração {String(game.id).padStart(2, "0")}</span>
              <h2>{game.main_region.name}</h2>
              <p>{game.name.replace("generation-", "Geração ").toUpperCase()}</p>
            </header>
            <div className="generation-metrics">
              <div><strong>{game.pokemon_species.length}</strong><span>espécies</span></div>
              <div><strong>{game.moves.length}</strong><span>movimentos</span></div>
              <div><strong>{game.abilities.length}</strong><span>habilidades introduzidas</span></div>
            </div>
            <div className="generation-meta">
              <div>
                <h3>Tipos especiais</h3>
                <div className="detail-tags">
                  {game.types.length
                    ? game.types.map((type) => <span className="detail-tag" key={type.name}>{type.name}</span>)
                    : <span className="muted-copy">Nenhum tipo especial</span>}
                </div>
              </div>
              <div>
                <h3>Jogos relacionados</h3>
                <div className="detail-tags">
                  {game.version_groups.map((version) => (
                    <span className="detail-tag" key={version.name}>{version.name.replace(/-/g, " ")}</span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default ListPage;
