"use client";
import React, { useContext, useEffect, useState } from "react";
import { Transacao, TransacaoContext } from "../../../Context/TransacaoContext";
import { ArrowDownCircle, ArrowUpCircle, BanknoteArrowDown, BanknoteArrowUp, Edit, Trash, Wallet } from "lucide-react";


interface TransacaoFormProps {
    formOn: boolean;
    setFormOn: React.Dispatch<React.SetStateAction<boolean>>;
    transacaoSelecionada: Transacao | null;
    setTransacaoSelecionada: React.Dispatch<React.SetStateAction<Transacao | null>>;
}


const ListaTransacoes = ({formOn, setFormOn,transacaoSelecionada, setTransacaoSelecionada}: TransacaoFormProps) => {
  const context = useContext(TransacaoContext);

  if (!context) {
    throw new Error(
      "ListaTransacoes precisa estar dentro do TransacaoContextProvider"
    );
  }

  const { transacoes, setTransacoes } = context;

  const [filtro, setFiltro] = useState<"todas" | "receita" | "despesa">(
    "todas"
  );

  const transacoesFiltradas = transacoes.filter((item) => {
    if (filtro === "todas") return true;
    return item.tipo === filtro;
  });


  const handleEdit = (item: Transacao) => {

    setTransacaoSelecionada(item);
    setFormOn(true);
    
    
  }

  const handleDelete = (id: string) => {
    setTransacoes(transacoes.filter((item) => item.id !== id))

    
  }


  

  return (
    <div className="bg-white h-80 overflow-y-auto">
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFiltro("todas")}
          className={`px-4 py-2 cursor-pointer rounded-lg font-semibold duration-200 ${
            filtro === "todas"
              ? "bg-purple-700 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFiltro("receita")}
          className={`px-4 py-2 cursor-pointer rounded-lg font-semibold duration-200 ${
            filtro === "receita"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Receitas
        </button>
        <button
          onClick={() => setFiltro("despesa")}
          className={`px-4 py-2 cursor-pointer rounded-lg font-semibold duration-200 ${
            filtro === "despesa"
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Despesas
        </button>
      </div>

      {/* Lista */}
      <div className="flex flex-col gap-3">
        {transacoesFiltradas.length > 0 ? (
          transacoesFiltradas.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-100 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                {item.tipo === "receita" ? (
                  <BanknoteArrowUp className="text-green-600" size={28} />
                ) : (
                  <BanknoteArrowDown className="text-red-600" size={28} />
                )}
                <div>
                  <h1 className="font-semibold text-lg">{item.nome}</h1>
                  <p className="text-sm text-gray-500">{item.data}</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                 <p
                className={`text-lg font-bold ${
                  item.tipo === "receita"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {item.tipo === "receita" ? "+" : "-"} R$ {item.valor}
              </p>

              <div className="flex gap-4 items-center">
                <Edit onClick={() => handleEdit(item)} className="cursor-pointer hover:scale-105 hover:text-amber-800 duration-200 text-yellow-600" />
                <Trash onClick={() => handleDelete(item.id)} className="cursor-pointer hover:scale-105 hover:text-red-500 duration-200 text-red-600" />
              </div>
              </div>
             
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-6">
            <Wallet className="mx-auto mb-2 text-gray-400" size={32} />
            Nenhuma transação encontrada
          </div>
        )}
      </div>

    </div>
  );
};

export default ListaTransacoes;
