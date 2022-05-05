/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import { Container, Title, Button, Modal, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useToggle } from "@mantine/hooks";
import { AuthForm } from "../../components/AuthForm";
import { UserModel } from "../../models/user";

const EmailSignup: NextPage = () => {
  const router = useRouter();
  const [phone, setPhone] = useState(0);
  const [isModalOpen, toggleModal] = useToggle(false, [true, false]);
  const sendAuthNumber = useCallback(() => {
    // Todo SMS認証API
    router.push("/signup/auth");
  }, [isModalOpen]);

  const confirm = useCallback(
    (values: Pick<UserModel, "email" | "password" | "name" | "phone">) => {
      if (!values.phone) return;
      setPhone(values.phone);
      toggleModal();
    },
    []
  );

  return (
    <Container size="sm" py="100px">
      <Title order={3} className="text-center">
        会員登録
      </Title>
      <AuthForm kind="signup" submit={confirm} />
      <Modal
        classNames={{ title: "font-bold", header: "pt-2 flex justify-center" }}
        title={phone}
        withCloseButton={false}
        closeOnClickOutside={false}
        opened={isModalOpen}
        centered={true}
        onClose={() => toggleModal()}
        size="md"
      >
        <Container className="flex justify-center">
          <Text className="mb-6">
            上記の番号にSMSで認証番号を送ります。電話番号を変更する場合はキャンセルを押してください
          </Text>
        </Container>
        <Container className="flex justify-center">
          <Button color="red" fullWidth onClick={sendAuthNumber}>
            OK
          </Button>
          <Button
            variant="white"
            color="red"
            fullWidth
            onClick={() => toggleModal()}
          >
            キャンセル
          </Button>
        </Container>
      </Modal>
    </Container>
  );
};

export default EmailSignup;
