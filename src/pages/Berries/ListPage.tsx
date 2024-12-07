"use client";

import { useState } from "react";

import { HiArrowSmLeft, HiArrowSmRight, HiHome } from "react-icons/hi";

import IconButton from "@/components/IconButton";

import useGetBerryList from "./services/useGetBerryList";

import {
  ButtonGroupStyled,
  CardStyled,
  FlexboxStyled,
  ScreenStyled,
} from "./components/@index";

interface BerriesProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

function BerryList({ setCurrentPage }: BerriesProps) {
  const [page, setPage] = useState<number>(1);

  const { berryList, prevUrl, nextUrl, handleChangePage } = useGetBerryList();

  return (
    <ScreenStyled>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginBottom: "1rem",
        }}
      >
        <IconButton
          icon={HiHome}
          onClick={() => setCurrentPage("main")}
          style={{
            borderRadius: 0,
            color: "#000",
            backgroundColor: "#fff",
          }}
        />

        <h1 style={{ textAlign: "center" }}>Berries</h1>

        <div style={{ content: "", width: "40px", height: "40px" }}></div>
      </div>

      <FlexboxStyled>
        {berryList.map((berry) => {
          return (
            <CardStyled>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${berry.item.name}.png`}
                  alt={berry.name}
                  style={{
                    objectFit: "cover",
                    width: "35px",
                    height: "35px",
                  }}
                />

                <h4 style={{ textTransform: "capitalize" }}>{berry.name}</h4>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <div>
                  <p style={{ fontSize: "10pt" }}>
                    Growth time: {berry.growth_time}
                  </p>
                  <p style={{ fontSize: "10pt" }}>
                    Max harvest: {berry.max_harvest}
                  </p>
                  <p style={{ fontSize: "10pt" }}>
                    Natural gift power: {berry.natural_gift_power}
                  </p>
                </div>

                <div>
                  <p style={{ fontSize: "10pt" }}>Size: {berry.size}</p>
                  <p style={{ fontSize: "10pt" }}>
                    Smoothness: {berry.smoothness}
                  </p>
                  <p style={{ fontSize: "10pt" }}>
                    Soil dryness: {berry.soil_dryness}
                  </p>
                </div>
              </div>
            </CardStyled>
          );
        })}
      </FlexboxStyled>

      <ButtonGroupStyled>
        <IconButton
          icon={HiArrowSmLeft}
          disabled={!prevUrl}
          onClick={() => {
            handleChangePage(page - 1);
            setPage((prev) => prev - 1);
          }}
        />

        <IconButton
          icon={HiArrowSmRight}
          disabled={!nextUrl}
          onClick={() => {
            handleChangePage(page + 1);
            setPage((prev) => prev + 1);
          }}
        />
      </ButtonGroupStyled>
    </ScreenStyled>
  );
}

export default BerryList;
