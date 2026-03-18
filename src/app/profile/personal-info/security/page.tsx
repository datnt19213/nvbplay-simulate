import ComingSoon from "@/components/base-components/cta/coming-soon";
import {
  AuthenticationTransaction,
  SecurityStatus,
  SignInSettings,
} from "@/features/security";
import React from "react";

const Security = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <SecurityStatus />
      <SignInSettings />
      <AuthenticationTransaction />
    </div>
  );
};

export default Security;
