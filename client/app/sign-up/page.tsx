import { signUp } from "../util/api/signUp";

const SignUp = () => {
  const handleSignUp = async () => {
    await signUp("testuserreact", "testuser1", "abc@example.com");
  };

  return <div onClick={handleSignUp}>Sign Up</div>;
};

export default SignUp;
