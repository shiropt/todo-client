import type { NextPage } from "next";
import {
  Container,
  Title,
  Button,
  Input,
  InputWrapper,
  PasswordInput,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/states";

const EmailSignin: NextPage = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const signin = useCallback(() => {
    setUserInfo({ id: 1, name: "shiro", isSignIn: true });
    router.push("/");
  }, []);

  return (
    <Container size="sm" py="100px" className="">
      <Title order={3} className="text-center">
        ログイン
      </Title>
      <InputWrapper id="input-demo" required label="メールアドレス">
        <Input size="lg" />
      </InputWrapper>
      <InputWrapper
        className="my-4"
        id="input-demo"
        required
        label="パスワード"
      >
        <PasswordInput size="lg" />
      </InputWrapper>

      <Button
        fullWidth
        size="lg"
        color="red"
        className="mt-12"
        onClick={signin}
      >
        ログイン
      </Button>
    </Container>
  );
};

export default EmailSignin;
