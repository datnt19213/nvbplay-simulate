import Image from "next/image";
import React from "react";

export const SaleBanner = () => {
  return (
    <div className="rounded-lg overflow-hidden aspect-square">
      <Image
        src="https://s3-alpha-sig.figma.com/img/539d/5e92/5800385864aa73309672c5c60ad57407?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JBEkieIDQHBsIQdnm7CDc9WCFX6yi5OjhlRgGwZcnv20hnGAxY40qIFkP93UwwYjIVDCDPXaEzW10mgLIh0YrX3jlVCsggdSIg1GePHLh4d3D6m5PF61goFgYeTlUll5Q-xLYjHhsrGsVF4RG~zMxdjpbzCZadAZ3OAFACn3MNc1VVK-R8c2SJ5kK9B2QcG~PQAWBUliflKL4Qx9snef3mC2XwMfMcHvanM417eroM4jNfV2Ca3bdNsyJ74tFQUUoyOymvCgOGQq~ouvIFOAQ~5vps-rNrrf6faFUh0Zvq6WEHqUEVh6GWYF~f6WH1V-4zPsQBdHbbZ6mNoqQ1tEmQ__"
        alt=""
        width={500}
        height={300}
      />
    </div>
  );
};
