import { styled } from "@stitches/react";

import Unown from "/img/unown.png";

const ScreenStyled = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%",
});

const WrapperStyled = styled("div", {
  maxWidth: "600px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  padding: "0 2rem",

  "@media (min-width: 600px)": {
    flexDirection: "row",
  },
});

function NotFound() {
  return (
    <ScreenStyled>
      <WrapperStyled>
        <img src={Unown} alt="Unown pokemon" style={{ height: "175.5px" }} />

        <div style={{ gap: "1rem", display: "flex", flexDirection: "column" }}>
          <h1>404</h1>

          <p>
            We couldn't find the page you were looking for. It may have been
            moved, or it's just doesn't exist.
          </p>

          <a href="/">Go home</a>
        </div>
      </WrapperStyled>
    </ScreenStyled>
  );
}

export default NotFound;
