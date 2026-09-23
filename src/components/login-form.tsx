import {
  useState,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type FormEvent,
  type ReactElement,
} from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Field, FieldContent, FieldDescription, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

type LoginFormProps = ComponentPropsWithoutRef<"div">;

export function LoginForm({ className, ...props }: LoginFormProps): ReactElement {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrorMessage(null);

    const success = await login(name, email);
    if (success) {
      navigate("/my-profile");
    } else {
      setErrorMessage("User not found. Please verify your Name and Email.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-0 bg-transparent py-0 shadow-none">
        <CardHeader className="px-0 pb-6 text-left">
          <CardTitle className="text-2xl font-bold tracking-tight text-midnight-violet">
            Login to your account
          </CardTitle>
          <CardDescription>Enter your name and email below to login</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <FieldContent>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value);
                    setErrorMessage(null);
                  }}
                  required
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FieldContent>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                    setErrorMessage(null);
                  }}
                  required
                  autoComplete="email"
                />
              </FieldContent>
            </Field>

            {errorMessage && (
              <FieldDescription className="text-sm font-medium text-red-600">
                {errorMessage}
              </FieldDescription>
            )}

            <div className="flex flex-col gap-2.5 pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-royal-plum text-white hover:bg-midnight-violet"
              >
                {isLoading ? "Signing in..." : "Login"}
              </Button>
              <Button variant="outline" type="button" className="w-full">
                Login with Google
              </Button>
            </div>

            <p className="mt-2 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <a href="/login" className="font-semibold text-raspberry-plum underline hover:text-royal-plum">
                Sign up
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}