"use client";

import { HiArrowSmRight } from "react-icons/hi";

import useGetPokemonSpecie from "../services/useGetPokemonSpecie";

import { Row } from "@/shared/interfaces/Row";

import ContentStyled from "./content.component";

interface SpecieProps {
  specie: Row;
}

function Specie({ specie }: SpecieProps) {
  const { evolutionChain } = useGetPokemonSpecie({ specie });

  return (
    <ContentStyled>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Evolution Chain
      </h2>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <ul>
          {!evolutionChain?.chain.evolves_to?.length && (
            <span>Não tem evolução</span>
          )}

          {!!evolutionChain?.chain.evolves_to &&
            evolutionChain?.chain.evolves_to.map((firstEvolution) => {
              return (
                <li
                  style={{
                    textTransform: "capitalize",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span>{evolutionChain?.chain.species.name}</span>
                  <HiArrowSmRight size={20} />
                  <span>{firstEvolution.species.name}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </ContentStyled>
  );
}

export default Specie;
