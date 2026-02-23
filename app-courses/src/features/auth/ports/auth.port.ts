export type AuthPort = {
  login(email: string, password: string): Promise<string | null>;
};
