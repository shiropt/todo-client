import type { NextPage } from "next";
import { Container, Title, Button, Divider, Text } from "@mantine/core";
import { BrandGoogle, Mail } from "tabler-icons-react";
import { useRouter } from "next/router";

const Signup: NextPage = () => {
  const router = useRouter();

  return (
    <Container size="sm" py="100px" className="">
      <Title order={3} className="text-center">
        会員登録
      </Title>
      <Button
        className=" my-8"
        size="lg"
        fullWidth
        leftIcon={<Mail />}
        color="red"
      >
        メールアドレスで登録する
      </Button>
      <Button
        fullWidth
        size="lg"
        leftIcon={<BrandGoogle />}
        variant="outline"
        color="gray"
      >
        Googleで登録する
      </Button>
      <Divider my="sm" className="my-10" />
      <Text className="text-center">アカウントをお持ちの方</Text>
      <Button
        fullWidth
        size="lg"
        variant="outline"
        color="red"
        className=" mt-4"
        onClick={() => router.push("/signin")}
      >
        ログイン
      </Button>
    </Container>
  );
};

export default Signup;
