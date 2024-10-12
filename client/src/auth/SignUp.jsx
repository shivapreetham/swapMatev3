import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../utils/AuthUtil";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formValues, setFormValues] = useState({
    username: '',
    collegeEmail: '',
    personalEmail: '',
    password: '',
    confirmPassword: '',
    webUsername: '',
    webPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValues.password !== formValues.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await signup(
        formValues.username,
        formValues.password,
        formValues.collegeEmail,
        formValues.personalEmail,
        formValues.webUsername,
        formValues.webPassword
      );
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response._id);
      localStorage.setItem('username', response.username);
      console.log("Sign up successful");
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className={cn("mt-20 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black")}>
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Create Account
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Sign up to get started
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        {/* Username Input */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input id="username" name="username" placeholder="Your username" type="text" value={formValues.username} onChange={handleChange} />
        </LabelInputContainer>
        
        {/* College Email Input */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="collegeEmail">College Email</Label>
          <Input id="collegeEmail" name="collegeEmail" placeholder="Your college email" type="email" value={formValues.collegeEmail} onChange={handleChange} />
        </LabelInputContainer>

        {/* Personal Email Input */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="personalEmail">Personal Email</Label>
          <Input id="personalEmail" name="personalEmail" placeholder="Your personal email" type="email" value={formValues.personalEmail} onChange={handleChange} />
        </LabelInputContainer>

        {/* Password Input */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" placeholder="••••••••" type="password" value={formValues.password} onChange={handleChange} />
        </LabelInputContainer>

        {/* Confirm Password Input */}
        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" name="confirmPassword" placeholder="••••••••" type="password" value={formValues.confirmPassword} onChange={handleChange} />
        </LabelInputContainer>

        {/* Web Username Input */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="webUsername">Web Username</Label>
          <Input id="webUsername" name="webUsername" placeholder="Your web username" type="text" value={formValues.webUsername} onChange={handleChange} />
        </LabelInputContainer>

        {/* Web Password Input */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="webPassword">Web Password</Label>
          <Input id="webPassword" name="webPassword" placeholder="••••••••" type="password" value={formValues.webPassword} onChange={handleChange} />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <p className="text-center text-sm mt-4 text-neutral-600 dark:text-neutral-300">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Click here to sign in
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

export default SignUpForm;
