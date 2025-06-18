interface SignInWithOAuthParams {
  provider: "github" | "google";
  providerAccountId: string;
  user: {
    name: string;
    email: string;
    profileImage: string;
  };
}
