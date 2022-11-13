import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Grid,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  chakra,
} from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { BsGithub, BsTwitter, BsGoogle } from "react-icons/bs";

const providers = [
  {
    name: "github",
    Icon: BsGithub,
  },
  {
    name: "twitter",
    Icon: BsTwitter,
  },
  {
    name: "google",
    Icon: BsGoogle,
  },
];

function signin() {
  const { data: session, status } = useSession();
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const handleOAuthSignIn = (provider) => () => signIn(provider);

  if (status === "loading") return <Heading>Authenticating....</Heading>;

  if (session) {
    setTimeout(() => {
      push("/");
    }, 5000);

    return <Heading>You are already signed in.</Heading>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return false;

    signIn("email", { email, redirect: false });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
      <div className="bg-purple-300 items-center justify-items-center">
        <div className="flex flex-grow items-center justify-center"></div>
        <Box className="items-center justify-items-center">
          <VStack>
            {providers.map(({ name, Icon }) => (
              <Button
                key={name}
                leftIcon={<Icon />}
                onClick={handleOAuthSignIn(name)}
                textTransform="uppercase"
                w="100%"
                className="cursor-pointer"
              >
                Sign in with {name}
              </Button>
            ))}
          </VStack>
        </Box>
      </div>
    </div>
  );
}

export default signin;

{
  /* <chakra.form onSubmit={handleSubmit}>
<p className="text-sm font-bold mt-5">Email:</p>
<Input
  value={email}
  type="email"
  onChange={(e) => setEmail(e.target.value)}
/>
<p className="text-sm font-bold mt-5">Password:</p>
<Input

  type="password"

/>

<Button type="submit" w="100%" my={5} className="bg-black">
  Login
</Button>
</chakra.form> */
}
