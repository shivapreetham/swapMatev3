import React from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../utils/AuthUtil";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function SignInForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDarkMode, setIsDarkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    console.log("Attempting to log in with:", { username, password });

    try {
      const response = await login(username, password); // Pass username and password as separate arguments
      console.log("Sign in successful", response);
      if (response && response.token) {
        console.log("Token received:", response.token);
        
        localStorage.setItem('token', response.token);

        localStorage.setItem('userId', response._id);
        localStorage.setItem('username', response.username);
        console.log(response._id);

        
        navigate("/");
      } else {
        console.error("Login response does not contain expected data");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className={cn("mt-2 max-w-md w-full mx-auto rounded-none p-4 md:p-8 shadow-input bg-white dark:bg-black")}>
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome Back
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Sign in to your account
      </p>
      <button onClick={() => setIsDarkMode(!isDarkMode)}>Toggle Dark Mode</button>
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input id="username" name="username" placeholder="Your username" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign in &rarr;
          <BottomGradient />
        </button>

        <p className="text-center text-sm mt-4 text-neutral-600 dark:text-neutral-300">
          New to SwapBuddy?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Click here to sign up
          </a>
        </p>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default SignInForm;
