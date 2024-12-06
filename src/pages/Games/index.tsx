"use client";

import { HiHome } from "react-icons/hi";

import IconButton from "@/components/IconButton";
import Chip from "@/components/Chip";

import useGetGamesList from "@/hooks/useGetGamesList";

import { CardStyled, FlexboxStyled, ScreenStyled } from "./styles";

interface GamesProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

function Games({ setCurrentPage }: GamesProps) {
  const { gameList } = useGetGamesList();

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

        <h1 style={{ textAlign: "center" }}>Games</h1>

        <div style={{ content: "", width: "40px", height: "40px" }}></div>
      </div>

      <FlexboxStyled>
        {gameList.map((game) => {
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

                <div
                  style={{
                    display: "flex",
                    maxWidth: "248px",
                    overflowX: "auto",
                    padding: "0.25rem 0",
                    gap: "0.5rem",
                    height: "44px",
                  }}
                >
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
                </div>
              </div>

              <div>
                <h6 style={{ fontSize: "8pt" }}>Version groups:</h6>

                <div
                  style={{
                    display: "flex",
                    maxWidth: "248px",
                    overflowX: "auto",
                    padding: "0.25rem 0",
                    gap: "0.5rem",
                    height: "44px",
                  }}
                >
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
                </div>
              </div>
            </CardStyled>
          );
        })}
      </FlexboxStyled>
    </ScreenStyled>
  );
}

export default Games;
