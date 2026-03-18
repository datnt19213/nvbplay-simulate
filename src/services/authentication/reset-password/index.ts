import {PostData} from "@/apis";
import {ENUM} from "@/configs";
import {GetACookie} from "@/utilities/cookies";
import {DecryptBasic} from "@/utilities/hash-aes";
import {isTokenValid} from "@/utilities/token";
import {redirect} from "next/navigation";
import React from "react";

export const resetPassword = async ({
  email,
  new_password,
  resetToken,
}: {
  email: string;
  new_password: string;
  resetToken: string;
}) => {
  try {
    const response = await PostData(
      `/auth/customer/emailpass/update?token=${resetToken}`,
      {
        email,
        password: new_password,
      },
      {
        "ngrok-skip-browser-warning": "true",
      }
    );
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
export const requestResetPassword = async ({email}: {email: string}) => {
  try {
    const response = await PostData(
      `/auth/customer/emailpass/reset-password`,
      {
        identifier: email,
      },
      {
        "ngrok-skip-browser-warning": "true",
      }
    );
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const profileResetPassword = async ({
  email,
  new_password,
  old_password,
}: {
  email: string;
  new_password: string;
  old_password: string;
}) => {
  try {
    // const response = await PostData(
    //   `/auth/customer/reset-password`,
    //   {
    //     email,
    //     old_password,
    //     new_password,
    //   },
    //   {
    //     "ngrok-skip-browser-warning": "true",
    //   }
    // );
    // if (response) {
    //   return response;
    // }
  } catch (error) {
    console.log(error);
  }
};
