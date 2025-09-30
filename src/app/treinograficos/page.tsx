"use client"
import { platform } from 'os';
import React from 'react'
import { BarChart, Bar, Pie, PieChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const page = () => {

    const engajamentoPosts = [
        { tipo: "Imagem", curtidas: 120, comentarios: 30, compartilhamentos: 15 },
        { tipo: "Vídeo", curtidas: 200, comentarios: 50, compartilhamentos: 40 },
        { tipo: "Texto", curtidas: 80, comentarios: 20, compartilhamentos: 5 },
        { tipo: "Enquete", curtidas: 150, comentarios: 60, compartilhamentos: 25 },
        { tipo: "Carrossel", curtidas: 180, comentarios: 45, compartilhamentos: 30 },
    ];

    const engajamentoPlataformas = [
        { plataforma: "Instagram", engajamento: 520 },
        { plataforma: "Facebook", engajamento: 350 },
        { plataforma: "Twitter", engajamento: 210 },
        { plataforma: "LinkedIn", engajamento: 120 },
    ];

    const crescimentoSeguidores = [
        { semana: "Semana 1", seguidores: 1200 },
        { semana: "Semana 2", seguidores: 1350 },
        { semana: "Semana 3", seguidores: 1420 },
        { semana: "Semana 4", seguidores: 1550 },
        { semana: "Semana 5", seguidores: 1700 },
        { semana: "Semana 6", seguidores: 1850 },
    ];

  return (
    <div className=' w-full p-20 '>
      <h1 className='font-semibold text-2xl'>Gráficos teste</h1>


      <div>
          <ResponsiveContainer width="100%" height={400}>
        <BarChart 
        width={200}
        height={200}
        data={engajamentoPosts}>
              <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tipo" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="curtidas" stackId="a" fill="#8884d8" />
                <Bar dataKey="comentarios" stackId="a" fill="#82ca9d" />
                <Bar dataKey="compartilhamentos" stackId="a" fill="#8884d8" />

                </BarChart>
            </ResponsiveContainer>


            <ResponsiveContainer width="100%" height={400}>
  <PieChart>
    <Pie 
      data={engajamentoPlataformas}   // 1️⃣ Array de dados para o gráfico
      dataKey="engajamento"           // 2️⃣ Valor de cada fatia (número de interações)
      nameKey="plataforma"            // 3️⃣ Nome de cada fatia (exibido em tooltip e legenda)
      cx="50%"                        // 4️⃣ Posição horizontal do centro da pizza (50% do container)
      cy="50%"                        // 5️⃣ Posição vertical do centro (50% do container)
      innerRadius={60}                 // 6️⃣ Raio interno (cria efeito donut, opcional)
      outerRadius={120}                // 7️⃣ Raio externo da pizza
      fill="#8884d8"                   // 8️⃣ Cor base das fatias (cada fatia pode ter cor própria também)
      label                            // 9️⃣ Mostra o nome/valor em cada fatia
    />
    <Tooltip />                         // 🔟 Mostra valor ao passar o mouse sobre a fatia
    <Legend />                          // 1️⃣1️⃣ Mostra legenda com cada categoria
  </PieChart>
</ResponsiveContainer>

  <ResponsiveContainer width="100%" height={400}>
  <LineChart data={crescimentoSeguidores}>
    <XAxis dataKey="semana" />       {/* eixo X mostra as semanas */}
    <YAxis />                         {/* eixo Y mostra valores numéricos */}
    <Tooltip />                       {/* mostra valor ao passar o mouse */}
    <Line type="monotone" dataKey="seguidores" stroke="#8884d8" strokeWidth={2} dot={{ r: 5 }} />
  </LineChart>
</ResponsiveContainer>



      </div>
    
    </div>
  )
}

export default page
