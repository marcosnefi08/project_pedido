'use client'

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "./ui/spinner";

export default function RegisterPage() {

  const [loading, setloading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name =  formData.get("name") as string;
    const email = formData.get("email") as string;
    const senha = formData.get("senha") as string;

    authClient.signUp.email({
	    name: name,
      email: email,
      password: senha
    },
    {
      onSuccess: () => {
        router.push("/login")
        router.refresh()
      },
      onRequest: () => setloading(true),
      onResponse:() => setloading(false),
      onError: (ctx) => setError(ctx.error.message)
    }
  
  )
  }

  return (
  <form onSubmit={handleLogin}>
    <div>
      <label htmlFor="name">Nome</label>
	    <Input id="name" name="name" type="text" placeholder="Seu nome" autoComplete="name" required />
    </div>
    <div>
      <label htmlFor="email">E-mail</label>
      <Input id="email" name="email" type="email" placeholder="seu@email.com" autoComplete="email" required />
    </div>
    <div>
      <label htmlFor="senha">Senha</label>
      <Input id="senha" name="senha" type="password" placeholder="Crie uma senha" autoComplete="new-password" required />
    </div>
    <Button disabled={loading} aria-busy={loading}>
      {loading ? <Spinner /> : "Criar conta"}
    </Button>
    {error && <p role="alert" aria-live="polite">{error}</p>}
  </form>
  )

}