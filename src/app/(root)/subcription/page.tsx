import dynamic from "next/dynamic";

const SubcriptionFeature = dynamic(() => import("@/features/subcriptions"));
const SubcriptionPage = () => {
  return <SubcriptionFeature />;
};

export default SubcriptionPage;
