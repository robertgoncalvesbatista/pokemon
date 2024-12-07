"use client";

import { useNavigate } from "react-router-dom";

import { HiHome } from "react-icons/hi";

import IconButton from "@/components/IconButton";
import Chip from "@/components/Chip";

import useGetGamesList from "./services/useGetGames";

import {
  CardStyled,
  FlexboxStyled,
  MenuChipStyled,
  ScreenStyled,
} from "./components/@index";

function ListPage() {
  const navigate = useNavigate();
  const { games } = useGetGamesList();

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
          onClick={() => navigate("/")}
          style={{
            borderRadius: 0,
            color: "#000",
            backgroundColor: "#fff",
          }}
        />

        <h1 style={{ textAlign: "center" }}>Games</h1>

        <div style={{ content: "", width: "40px", height: "40px" }}></div>
      </div>

      <FlexboxStyled>
        {games.map((game) => {
          return (
            <CardStyled>
              <div style={{ marginBottom: "0.5rem" }}>
                <h2
                  style={{
                    textTransform: "uppercase",
                    lineHeight: 1,
                    color: "#fff",
                  }}
                >
                  {game.main_region.name}
                </h2>
                <h6
                  style={{
                    textTransform: "uppercase",
                    lineHeight: 1,
                    color: "#fff",
                  }}
                >
                  {game.name}
                </h6>
              </div>

              <div style={{ marginBottom: "0.5rem" }}>
                <h6 style={{ fontSize: "8pt" }}>Types:</h6>

                <MenuChipStyled>
                  {game.types.length === 0 && (
                    <Chip
                      variant="outlined"
                      color="#000"
                      style={{ marginBottom: 0 }}
                    >
                      No special types
                    </Chip>
                  )}

                  {game.types.map((item) => {
                    return (
                      <Chip
                        variant="outlined"
                        color="#000"
                        style={{ marginBottom: 0 }}
                      >
                        {item.name}
                      </Chip>
                    );
                  })}
                </MenuChipStyled>
              </div>

              <div>
                <h6 style={{ fontSize: "8pt" }}>Version groups:</h6>

                <MenuChipStyled>
                  {game.version_groups.length === 0 && (
                    <Chip
                      variant="outlined"
                      color="#000"
                      style={{ marginBottom: 0 }}
                    >
                      No special types
                    </Chip>
                  )}

                  {game.version_groups.map((item) => {
                    return (
                      <Chip
                        variant="outlined"
                        color="#000"
                        style={{ marginBottom: 0 }}
                      >
                        {item.name.split("-").join(" ")}
                      </Chip>
                    );
                  })}
                </MenuChipStyled>
              </div>
            </CardStyled>
          );
        })}
      </FlexboxStyled>
    </ScreenStyled>
  );
}

export default ListPage;
