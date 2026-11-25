import { styled } from "@stitches/react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

import Unown from "/img/unown.png";

const ScreenStyled = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  width: "100%",
  background: "linear-gradient(135deg, #17223b 0%, #26365a 100%)",
});

const WrapperStyled = styled("div", {
  maxWidth: "600px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  padding: "32px",
  color: "#fff",
  borderRadius: "24px",
  background: "rgba(255,255,255,.08)",
  border: "1px solid rgba(255,255,255,.16)",
  backdropFilter: "blur(12px)",

  "@media (min-width: 600px)": {
    flexDirection: "row",
  },
});

function NotFound() {
  const navigate = useNavigate();
  return (
    <ScreenStyled>
      <WrapperStyled>
        <img src={Unown} alt="Unown pokemon" style={{ height: "175.5px" }} />

        <div style={{ gap: "1rem", display: "flex", flexDirection: "column" }}>
          <h1 style={{ fontSize: "64px", lineHeight: 1, color: "#ffd85a" }}>404</h1>

          <p>
            We couldn't find the page you were looking for. It may have been
            moved, or it's just doesn't exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
            style={{ width: "fit-content", minHeight: "44px", display: "flex", alignItems: "center", gap: "8px", border: "none", borderRadius: "12px", padding: "10px 16px", background: "#ffd85a", color: "#17223b", cursor: "pointer", fontWeight: 800 }}
          >
            <MdArrowBack size={20} />
            Voltar ao início
          </button>
        </div>
      </WrapperStyled>
    </ScreenStyled>
  );
}

export default NotFound;
