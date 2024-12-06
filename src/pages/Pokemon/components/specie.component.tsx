"use client";

import { HiArrowSmRight } from "react-icons/hi";

import { TEvolvesTo } from "@/types/TEvolutionChain";

import useGetPokemonSpecie from "../services/useGetPokemonSpecie";

interface SpecieProps {
  specie: { name: string; url: string };
}

function Specie({ specie }: SpecieProps) {
  const { evolutionChain } = useGetPokemonSpecie({ specie });

  if (!evolutionChain?.chain.evolves_to) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ul>
          <span>Não tem evolução</span>
        </ul>
      </div>
    );
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

export default Specie;