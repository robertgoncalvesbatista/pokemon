import { MainDashboard } from "../styles";

function LoadingPikachu() {
  return (
    <MainDashboard>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <h1
          style={{
            fontFamily: "Pixelify Sans, sans-serif",
            fontStyle: "normal",
          }}
        >
          Carregando...
        </h1>
      </div>
    </MainDashboard>
  );
}

export default LoadingPikachu;
