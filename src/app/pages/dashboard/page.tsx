"use client"
import React, { useContext, useEffect, useState } from "react";
import TransacaoForm from "./dashboardComponents/TransacaoForm";
import { Transacao, TransacaoContext } from "../../Context/TransacaoContext";
import ListaTransacoes from "./dashboardComponents/ListaTransacoes";
import { PlusCircle } from "lucide-react";
import GraficoExemplo from "./dashboardComponents/Graficos";

const Dashboard = () => {
  const context = useContext(TransacaoContext);

  const [mounted, setMounted] = useState(false);
  const [formOn, setFormOn] = useState(false);
  const [transacaoSelecionada, setTransacaoSelecionada] = useState<Transacao | null>(null);


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!context) {
    throw new Error("Dashboard precisa estar dentro do TransacaoContextProvider");
  }

  if (!mounted) return null; // só depois dos hooks

  const { saldo, transacoes, totalDespesas, totalReceitas } = context;
  const numeroTotal = transacoes.length;


  return (
    <div className="px-6 w-full pt-4 bg-gray-200 h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-900">Dashboard</h1>
        <button onClick={() => setFormOn(true)} className="flex cursor-pointer items-center gap-2 bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 duration-200">
          <PlusCircle size={20} />
          Nova Transação
        </button>
      </div>

      <TransacaoForm formOn={formOn} setFormOn={setFormOn} transacaoSelecionada={transacaoSelecionada} setTransacaoSelecionada={setTransacaoSelecionada} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="shadow-md p-4 rounded-xl border-l-4 bg-gradient-to-r border-green-600 from-green-200 to-green-100/30">
          <h2 className="text-gray-600 font-bold text-xl">Saldo</h2>
          <p className="text-2xl font-bold text-green-700">R$ {saldo}</p>
        </div>

        <div className="shadow-md p-4 rounded-xl border-l-4 border-red-500 bg-gradient-to-r from-red-200 to-red-100/30">
          <h2 className="text-gray-600 font-bold text-xl">Despesas</h2>
          <p className="text-2xl font-bold text-red-600">R$ {totalDespesas}</p>
        </div>

        <div className="shadow-md p-4 rounded-xl border-l-4 border-blue-400 bg-gradient-to-r from-blue-200 to-blue-100/30">
          <h2 className="text-gray-600 font-bold text-xl">Receitas</h2>
          <p className="text-2xl font-bold text-blue-600">R$ {totalReceitas}</p>
        </div>

        <div className="shadow-md p-4 rounded-xl border-l-4 bg-gradient-to-r border-purple-600 from-purple-300 to-purple-100/30">
          <h2 className="text-gray-600 font-bold text-xl">Transações</h2>
          <p className="text-2xl font-bold text-purple-700 px-1">{numeroTotal}</p>
        </div>
      </div>

      <div className="flex justify-between gap-8">

      <div className="bg-white shadow-lg border-1 border-gray-200 rounded-xl p-6 w-full">
        <h2 className="text-xl font-bold mb-4 text-purple-900">Últimas Transações</h2>
        <ListaTransacoes formOn={formOn} setFormOn={setFormOn} transacaoSelecionada={transacaoSelecionada}  setTransacaoSelecionada={setTransacaoSelecionada}/>
      </div>

      <div className="bg-white shadow-lg border-1 border-gray-200 rounded-xl p-6 w-full">
        <h2 className="text-xl font-bold mb-4 text-purple-900">Gráficos</h2>
        <GraficoExemplo />
      </div>
      </div>
    
    </div>
  );
};

export default Dashboard;
