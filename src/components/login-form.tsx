import {
  useState,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type FormEvent,
  type ReactElement,
} from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Field, FieldContent, FieldDescription, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

type LoginFormProps = ComponentPropsWithoutRef<"div">;

export function LoginForm({ className, ...props }: LoginFormProps): ReactElement {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-0 bg-transparent py-0 shadow-none">
        <CardHeader className="px-0 pb-6 text-left">
          <CardTitle className="text-2xl font-bold tracking-tight text-midnight-violet">
            Login to your account
          </CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FieldContent>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                    setIsSubmitted(false);
                  }}
                  required
                  autoComplete="email"
                />
              </FieldContent>
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <a href="/login" className="text-xs font-medium text-raspberry-plum hover:underline">
                  Forgot your password?
                </a>
              </div>
              <FieldContent>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                    setIsSubmitted(false);
                  }}
                  required
                  minLength={6}
                  autoComplete="current-password"
                />
              </FieldContent>
            </Field>

            <div className="flex flex-col gap-2.5 pt-2">
              <Button type="submit" className="w-full bg-royal-plum text-white hover:bg-midnight-violet">
                Login
              </Button>
              <Button variant="outline" type="button" className="w-full">
                Login with Google
              </Button>
            </div>

            {isSubmitted && (
              <FieldDescription className="text-center text-emerald-600">
                Login details submitted successfully.
              </FieldDescription>
            )}

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