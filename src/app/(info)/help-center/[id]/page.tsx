import { HelpCenterDetail } from "@/features/help-center-detail";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const HelpCenterDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  return <HelpCenterDetail />;
};

export default HelpCenterDetailPage;
