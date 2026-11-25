"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdChevronLeft, MdChevronRight, MdGridView } from "react-icons/md";

import IconButton from "@/components/IconButton";
import Loading from "@/components/Loading";
import useGetBerries from "./services/useGetBerries";

function ListPage() {
  const navigate = useNavigate();
  const { berries, prevUrl, nextUrl, count, isLoading, error, handleChangePage } = useGetBerries();
  const [page, setPage] = useState<number>(1);

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
          <h1>Frutas e berries</h1>
          <p>Descubra sabores, propriedades e cultivo de cada berry.</p>
        </div>
        <span aria-hidden="true" />
      </header>

      <div className="collection-summary">
        <strong>{count} berries</strong>
        <span>Dados de cultivo e efeitos especiais</span>
      </div>

      <section className="catalog-grid" aria-label="Lista de berries">
        {isLoading && <Loading label="Carregando berries..." />}
        {!isLoading && error && <div className="page-state" role="alert">{error}</div>}
        {!isLoading && berries.map((berry) => (
          <article className="catalog-card berry-card" key={berry.name}>
            <header className="berry-card-heading">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${berry.item.name}.png`}
                alt=""
                width="56"
                height="56"
                loading="lazy"
              />
              <div>
                <h2>{berry.name.replace(/-/g, " ")}</h2>
                <span className="detail-tag">{berry.firmness.name} berry</span>
              </div>
            </header>

            <div className="berry-flavors">
              <strong>Sabores</strong>
              <div className="detail-tags">
                {berry.flavors.filter(({ potency }) => potency > 0).map(({ flavor, potency }) => (
                  <span className="detail-tag" key={flavor.name}>
                    {flavor.name} · {potency}
                  </span>
                ))}
                {!berry.flavors.some(({ potency }) => potency > 0) && (
                  <span className="muted-copy">Sem sabor predominante</span>
                )}
              </div>
            </div>

            <dl className="berry-facts">
              <div><dt>Tempo de crescimento</dt><dd>{berry.growth_time} h</dd></div>
              <div><dt>Colheita máxima</dt><dd>{berry.max_harvest}</dd></div>
              <div><dt>Tamanho</dt><dd>{berry.size} mm</dd></div>
              <div><dt>Suavidade</dt><dd>{berry.smoothness}</dd></div>
              <div><dt>Secura do solo</dt><dd>{berry.soil_dryness}</dd></div>
              <div><dt>Presente natural</dt><dd>{berry.natural_gift_power} · {berry.natural_gift_type.name}</dd></div>
            </dl>
          </article>
        ))}
      </section>

      <nav className="page-pagination" aria-label="Paginação das berries">
        <IconButton
          icon={MdChevronLeft}
          disabled={!prevUrl}
          onClick={() => {
            handleChangePage(page - 1);
            setPage((current) => current - 1);
          }}
          aria-label="Página anterior"
        />
        <span className="pagination-page">Página {page}</span>
        <IconButton
          icon={MdChevronRight}
          disabled={!nextUrl}
          onClick={() => {
            handleChangePage(page + 1);
            setPage((current) => current + 1);
          }}
          aria-label="Próxima página"
        />
      </nav>
    </main>
  );
}

export default ListPage;
