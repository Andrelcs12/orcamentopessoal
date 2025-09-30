"use client"
// app/Context/TransacaoContext.tsx
import { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";


export interface Transacao {
    id: string,
    tipo: "receita" | "despesa";
    nome: string,
    valor: number,
    data: string,
}


interface TransacaoContextType {
    saldo: number;
    transacoes: Transacao[];
    setTransacoes: React.Dispatch<React.SetStateAction<Transacao[]>>;
    totalReceitas: number;
    totalDespesas: number;
}

export const TransacaoContext = createContext<TransacaoContextType | undefined>(undefined);


interface ProviderProps {
    children: ReactNode;
}

export default function TransacaoContextProvider({children}: ProviderProps) {

    const [transacoes, setTransacoes] = useState<Transacao[]>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem("transacoes");
            return stored ? JSON.parse(stored) : [];
        }
        return [];
    });

    const totalReceitas = transacoes.reduce((resultado, item) => item.tipo === "receita" ? resultado + item.valor : resultado, 0 )
    const totalDespesas = transacoes.reduce((resultado, item) => item.tipo === "despesa" ? resultado + item.valor : resultado, 0 )

    const saldo = totalReceitas - totalDespesas;

    useEffect(() => {
        if(typeof window !== "undefined") {
            localStorage.setItem("transacoes", JSON.stringify(transacoes))
        }
    }, [transacoes])

    return (
        <TransacaoContext.Provider  value={{saldo, transacoes, setTransacoes, totalReceitas, totalDespesas}}>
            {children}
        </TransacaoContext.Provider>
    )
}