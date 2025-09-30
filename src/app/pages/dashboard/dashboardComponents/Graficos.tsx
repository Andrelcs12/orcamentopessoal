"use client";

import { useContext } from "react";
import { TransacaoContext } from "@/app/Context/TransacaoContext";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function GraficoPizza() {
  const context = useContext(TransacaoContext);

  if (!context) {
    throw new Error("GraficoPizza precisa estar dentro do TransacaoContextProvider");
  }

  const { totalReceitas, totalDespesas } = context;

  const data = [
    { name: "Receitas", valor: totalReceitas },
    { name: "Despesas", valor: totalDespesas },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="valor"
            nameKey="name"
            cx="50%"
            cy="50%"
            className="cursor-pointer"
            outerRadius={80}
            label
          >aa
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `R$ ${value}`} />
          <Legend verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>


    </div>
  );
}
