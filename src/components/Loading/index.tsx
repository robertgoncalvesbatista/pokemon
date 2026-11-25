import { MdCatchingPokemon } from "react-icons/md";

interface LoadingProps {
  label: string;
  compact?: boolean;
}

function Loading({ label, compact = false }: LoadingProps) {
  return (
    <div
      className={`page-state page-loading${compact ? " page-loading-compact" : ""}`}
      role="status"
      aria-live="polite"
    >
      <span className="loading-icon" aria-hidden="true">
        <MdCatchingPokemon size={32} />
      </span>
      <span>{label}</span>
    </div>
  );
}

export default Loading;
