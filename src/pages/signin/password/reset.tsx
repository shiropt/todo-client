/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import {
  Container,
  Title,
  Button,
  Input,
  InputWrapper,
  Modal,
  Text,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useToggle } from "@mantine/hooks";
import { AuthForm } from "../../../components/AuthForm";
import { UserModel } from "../../../models/user";

const PasswordReset: NextPage = () => {
  const router = useRouter();
  const [isModalOpen, toggleModal] = useToggle(false, [true, false]);
  const resetPassword = useCallback(
    (values: Pick<UserModel, "email">) => {
      // Todo: password reset API
      toggleModal();
    },
    [isModalOpen]
  );

  return (
    <Container size="sm" py="100px" className="">
      <Title order={3} className="text-center">
        パスワードを忘れた方
      </Title>
      <AuthForm kind="reset" submit={resetPassword} />
      <Modal
        classNames={{ title: "font-bold", header: "pt-2 flex justify-center" }}
        title="メールを確認してください"
        withCloseButton={false}
        closeOnClickOutside={false}
        opened={isModalOpen}
        centered={true}
        onClose={() => toggleModal()}
        size="md"
      >
        <Container className="flex justify-center">
          <Text className="mb-6">パスワード再設定のメールを送信しました</Text>
        </Container>
        <Container className="flex justify-center">
          <Button color="red" fullWidth onClick={() => router.push("/signin")}>
            OK
          </Button>
        </Container>
      </Modal>
    </Container>
  );
};

export default PasswordReset;
