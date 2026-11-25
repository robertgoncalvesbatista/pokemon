"use client";
import { Link } from "react-router-dom";

import useGetPokemonSpecie from "../services/useGetPokemonSpecie";

import { Row } from "@/shared/interfaces/Row";
import Loading from "@/components/Loading";
import { EvolvesTo } from "../domain/EvolutionChain";

import ContentStyled from "./content.component";

interface SpecieProps {
  specie: Row;
}

function Specie({ specie }: SpecieProps) {
  const { evolutionChain, speciesData, isLoading, error } = useGetPokemonSpecie({ specie });
  const entries = speciesData?.flavor_text_entries ?? [];
  const localizedDescription =
    entries.find((entry) => entry.language.name === "pt-br") ??
    entries.find((entry) => entry.language.name === "pt") ??
    entries.find((entry) => entry.language.name === "en");
  const description = localizedDescription?.flavor_text.replace(/[\n\f]/g, " ");

  const renderEvolution = (evolution: EvolvesTo) => (
    <li className="evolution-item" key={evolution.species.name}>
      <Link to={`/pokemon/${evolution.species.name}`} className="evolution-link">
        {evolution.species.name}
      </Link>
      {evolution.evolves_to?.length ? (
        <ul className="evolution-children">
          {evolution.evolves_to.map(renderEvolution)}
        </ul>
      ) : null}
    </li>
  );

  return (
    <ContentStyled className="detail-section">
      {error && <p className="species-error" role="status">{error}</p>}
      {speciesData && (
        <section className="detail-panel">
          <h2>Sobre a espécie</h2>
          {description && <p className="species-description">{description}</p>}
          <div className="detail-grid">
            {speciesData.habitat && (
              <div className="detail-metric">
                <strong style={{ textTransform: "capitalize" }}>{speciesData.habitat.name}</strong>
                <span>Habitat</span>
              </div>
            )}
            <div className="detail-metric">
              <strong>{speciesData.capture_rate}</strong>
              <span>Taxa de captura</span>
            </div>
            <div className="detail-metric">
              <strong>{speciesData.base_happiness}</strong>
              <span>Felicidade base</span>
            </div>
            <div className="detail-metric">
              <strong>{speciesData.generation.name.replace("generation-", "").toUpperCase()}</strong>
              <span>Geração</span>
            </div>
          </div>
          {!!speciesData.egg_groups.length && (
            <div className="species-meta">
              <strong>Grupos de ovos</strong>
              <div className="detail-tags">
                {speciesData.egg_groups.map((group) => (
                  <span className="detail-tag" key={group.name}>{group.name}</span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      <section className="detail-panel evolution-panel">
        <h2>Linha evolutiva</h2>
        {isLoading && <Loading label="Carregando evolução..." compact />}
        {!isLoading && !evolutionChain && (
          <p className="muted-copy">A linha evolutiva não está disponível.</p>
        )}
        {evolutionChain && (
          <ul className="evolution-tree">
            {renderEvolution(evolutionChain.chain)}
          </ul>
        )}
      </section>
    </ContentStyled>
  );
}

export default Specie;
