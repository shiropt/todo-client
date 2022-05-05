/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import { Container, Title, Anchor } from "@mantine/core";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useUser } from "../../atoms/states";
import { UserModel } from "../../models/user";
import { AuthForm } from "../../components/AuthForm";

const EmailSignin: NextPage = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useUser();

  const signin = useCallback(
    (values: Pick<UserModel, "email" | "password">) => {
      const result = { name: "shiro" };
      setUserInfo({
        id: 1,
        name: result.name,
        isSignIn: true,
      });
      router.push("/");
    },
    []
  );

  return (
    <Container size="sm" py="100px">
      <Title order={3} className="text-center">
        ログイン
      </Title>
      <AuthForm submit={signin} kind="signin" />
      <Anchor
        onClick={() => router.push("/signin/password/reset")}
        className=" p-6 float-right"
      >
        パスワードを忘れた方はこちら &gt;
      </Anchor>
    </Container>
  );
};

export default EmailSignin;
