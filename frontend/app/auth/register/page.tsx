"use client";
import api from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/users/register", {
        name,
        email,
        password,
        emergencyContactName,
        emergencyContactPhone,
      });
      router.push("/auth/login");
    } catch (error: any) {
      console.error("Error registering:", error);
      setError(error.response?.data?.message || "Erro ao registrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="form-container fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">📝 Easy Reminder</h1>
          <p className="text-gray-600 text-lg">Crie sua conta para começar</p>
        </div>

        <div className="card max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="label" htmlFor="name">
                Nome Completo
              </label>
              <input
                id="name"
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                required
              />
            </div>

            <div>
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
            </div>

            <div>
              <label className="label" htmlFor="password">
                Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
                minLength={6}
              />
            </div>

            <div className="border-t pt-5 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                🚨 Contato de Emergência
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="label" htmlFor="emergencyContactName">
                    Nome do Contato
                  </label>
                  <input
                    id="emergencyContactName"
                    type="text"
                    placeholder="Nome do seu contato de emergência"
                    value={emergencyContactName}
                    onChange={(e) => setEmergencyContactName(e.target.value)}
                    className="input"
                  />
                </div>

                <div>
                  <label className="label" htmlFor="emergencyContactPhone">
                    Telefone do Contato
                  </label>
                  <input
                    id="emergencyContactPhone"
                    type="tel"
                    placeholder="+351 912 345 678"
                    value={emergencyContactPhone}
                    onChange={(e) => setEmergencyContactPhone(e.target.value)}
                    className="input"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Este número receberá alertas quando você usar o botão SOS
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-lg mt-6"
            >
              {loading ? "Criando conta..." : "Criar Conta"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{" "}
              <Link href="/auth/login" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
