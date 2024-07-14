interface DetailProps {
  type: string;
  value: string;
  name: string;
}

export default function Detail({ type, value, name }: DetailProps) {
  return (
    <div style={{ textAlign: "center" }}>
      <span style={{ fontWeight: "500", fontSize: "14pt" }}>
        {value + type}
      </span>

      <br />

      <small>{name}</small>
    </div>
  );
}
