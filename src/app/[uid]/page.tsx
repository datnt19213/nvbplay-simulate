// import ContainerHtml from "@/components/common-components/content/container-html";
// import Welcome from '@/components/common-components/content/welcome.mdx'
import ContainerHtml from "@/components/common-components/content/container-html";
import ContainerMarkDownRemote from "@/components/common-components/content/container-mdx-remote";
export const dynamic = "force-dynamic";
type Params = { uid: string };

const Page = async ({ params }: { params: Promise<Params> }) => {
  const { uid } = await params;
    const data = await fetch(
      `https://ghost-staging-cbc1.up.railway.app/ghost/api/content/pages/67847959848ca70001cc436b/?key=62ee860baa4dac607c0c799ce4`
    );
    const context = await data.json();
    const content = context.pages[0].html;
    return <ContainerHtml content={content || ""} />;

  // _______________________________________________
//   const markdown = await fetch(
//     `https://raw.githubusercontent.com/apiaryio/api-blueprint/refs/heads/master/examples/01.%20Simplest%20API.md`
//   );
//   const context = await markdown.text();
//   return <ContainerMarkDownRemote source={context} />;
};

export default Page;
