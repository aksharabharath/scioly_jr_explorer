type AuthErrorLike = {
  message?: string;
  code?: string;
};

export function friendlyAuthError(error: AuthErrorLike | null | undefined): string {
  const message = (error?.message ?? "").toLowerCase();
  const code = (error?.code ?? "").toLowerCase();

  if (
    code === "invalid_credentials" ||
    message.includes("invalid login credentials")
  ) {
    return "That username or password doesn't match. Try again.";
  }

  if (
    code === "user_already_exists" ||
    message.includes("already registered") ||
    message.includes("user already registered")
  ) {
    return "That username is already taken. Try logging in.";
  }

  if (
    code === "weak_password" ||
    (message.includes("password") &&
      (message.includes("6") ||
        message.includes("least") ||
        message.includes("weak") ||
        message.includes("short")))
  ) {
    return "Please choose a longer password — at least 6 characters.";
  }

  if (message.includes("rate") || code.includes("over_request")) {
    return "Please wait a moment, then try again.";
  }

  return "Something went wrong. Please try again.";
}
