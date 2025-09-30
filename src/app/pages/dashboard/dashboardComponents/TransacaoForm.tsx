"use client"
import React, { useContext, useEffect, useState } from 'react'
import { TransacaoContext, Transacao } from '../../../Context/TransacaoContext';
import { X  } from 'lucide-react';

interface TransacaoFormProps {
    formOn: boolean;
    setFormOn: React.Dispatch<React.SetStateAction<boolean>>;
    transacaoSelecionada: Transacao | null;
    setTransacaoSelecionada: React.Dispatch<React.SetStateAction<Transacao | null>>;
}

const TransacaoForm = ({ formOn, setFormOn, transacaoSelecionada, setTransacaoSelecionada }: TransacaoFormProps) => {
    const context = useContext(TransacaoContext);

    if (!context) {
        throw new Error("TransacaoForm precisa estar dentro do TransacaoContextProvider");
    }

    const { transacoes, setTransacoes } = context;

    const [nome, setNome] = useState("");
    const [valor, setValor] = useState("");
    const [tipo, setTipo] = useState<"receita" | "despesa">("receita");

    // Preenche o formulário ao abrir para edição
    useEffect(() => {
        if (transacaoSelecionada) {
            setNome(transacaoSelecionada.nome);
            setValor(transacaoSelecionada.valor.toString());
            setTipo(transacaoSelecionada.tipo);
        } else {
            setNome("");
            setValor("");
            setTipo("receita");
        }
    }, [transacaoSelecionada]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (transacaoSelecionada) {
            // Edita a transação existente
            setTransacoes((prev) =>
                prev.map((t) =>
                    t.id === transacaoSelecionada.id
                        ? { ...t, nome, valor: Number(valor), tipo } // mantém a data original
                        : t
                )
            );
        } else {
            // Cria nova transação
            const novaTransacao: Transacao = {
                id: crypto.randomUUID(),
                nome,
                valor: Number(valor),
                tipo,
                data: new Date().toISOString().split("T")[0],
            };
            setTransacoes((prev) => [...prev, novaTransacao]);
        }

        // Reset form
        setNome("");
        setValor("");
        setTipo("receita");
        setTransacaoSelecionada(null);
        setFormOn(false);
    };

    // Não renderiza o form se não estiver ativo
    if (!formOn) return null;

    return (
        <div className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4'>
            <div className='max-w-md w-full bg-white rounded-xl shadow-lg p-6 space-y-4'>
                <div className='flex justify-between'>
                    <h1 className='text-2xl font-bold text-gray-800 text-center'>
                        {transacaoSelecionada ? "Editar Transação" : "Criar Transação"}
                    </h1>
                    <div
                        onClick={() => setFormOn(false)}
                        className='p-2 hover:bg-gray-200 rounded-full cursor-pointer'
                    >
                        <X size={20} />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='flex flex-col'>
                        <label className='text-lg font-medium text-gray-700'>Nome</label>
                        <input
                            type="text"
                            placeholder='Nome da transação'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className='mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                            required
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label className='text-lg font-medium text-gray-700'>Valor</label>
                        <input
                            type="number"
                            placeholder='Valor'
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            className='mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                            required
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label className='text-lg font-medium text-gray-700'>Tipo</label>
                        <select
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value as "receita" | "despesa")}
                            className='mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                        >
                            <option value="receita">Receita</option>
                            <option value="despesa">Despesa</option>
                        </select>
                    </div>

                    <button
                        type='submit'
                        className='w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors duration-200'
                    >
                        {transacaoSelecionada ? "Salvar Alterações" : "Salvar Transação"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TransacaoForm;
