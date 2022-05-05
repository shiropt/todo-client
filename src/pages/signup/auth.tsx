/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import { Container, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useUser } from "../../atoms/states";
import { AuthForm } from "../../components/AuthForm";
import { UserModel } from "../../models/user";

const SmsAuth: NextPage = () => {
  const router = useRouter();
  const { setUserInfo } = useUser();
  const signin = useCallback((values: Pick<UserModel, "password">) => {
    setUserInfo({ id: 1, name: "shiro", isSignIn: true });
    router.push("/");
  }, []);

  return (
    <Container size="sm" py="100px">
      <Title order={3} className="text-center">
        電話番号の認証
      </Title>
      <AuthForm kind="auth" submit={signin} />
    </Container>
  );
};

export default SmsAuth;
