import type { NextPage } from "next";
import {
  Container,
  Title,
  Button,
  Input,
  InputWrapper,
  PasswordInput,
  Anchor,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/states";

const SmsAuth: NextPage = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const signin = useCallback(() => {
    setUserInfo({ id: 1, name: "shiro", isSignIn: true });
    router.push("/");
  }, []);

  return (
    <Container size="sm" py="100px" className="">
      <Title order={3} className="text-center">
        電話番号の認証
      </Title>
      <InputWrapper id="input-demo" required label="認証番号">
        <Input size="lg" />
      </InputWrapper>

      <Button
        fullWidth
        size="lg"
        color="red"
        className="mt-12"
        onClick={signin}
      >
        認証して完了する
      </Button>
    </Container>
  );
};

export default SmsAuth;
