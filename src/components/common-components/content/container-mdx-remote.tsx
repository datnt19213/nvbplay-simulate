import Bounded from "@/components/base-components/containers/bounded";
import { MDXRemote } from "next-mdx-remote/rsc";

const ContainerMarkDownRemote = ({ source }: { source: string }) => {
  return (
    <Bounded className="prose xl:prose-lg container">
      <MDXRemote source={source} />
    </Bounded>
  );
};

export default ContainerMarkDownRemote;
