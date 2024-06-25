"use client";

import { useParams } from "next/navigation";

const Pokemon = () => {
  const params = useParams();
  const { id } = params;
  return (
    <main>
      <p>Pokemon {id}</p>
    </main>
  );
};

export default Pokemon;
