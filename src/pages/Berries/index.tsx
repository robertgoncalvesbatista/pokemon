import { useState } from "react";

import useGetBerryList from "@/hooks/useGetBerryList";
import { Page } from "@/App";

interface BerriesProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<Page>>;
}

function Berries({ setCurrentPage }: BerriesProps) {
  const [page, setPage] = useState<number>(1);

  const { berryList, prevUrl, nextUrl, handleChangePage } = useGetBerryList();

  return (
    <div>
      <ul>
        {berryList.map((berry) => {
          return <li>{berry.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default Berries;
