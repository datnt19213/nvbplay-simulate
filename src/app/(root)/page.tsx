import { SliceZone } from "@prismicio/react";

import ContainerLayout from "@/layouts/page-layouts/container-layout";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return (
    <ContainerLayout>
      <SliceZone slices={page.data.slices} components={components} />
    </ContainerLayout>
  );
}

// export async function generateMetadata(): Promise<Metadata> {
//   const client = createClient();
//   const page = await client.getSingle("homepage");

//   return {
//     title: page.data.meta_title,
//     description: page.data.meta_description,
//   };
// }
