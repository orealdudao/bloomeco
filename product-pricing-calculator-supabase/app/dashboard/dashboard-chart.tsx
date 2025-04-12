"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    cost: 4000,
    final: 12400,
  },
  {
    name: "Fev",
    cost: 3000,
    final: 9800,
  },
  {
    name: "Mar",
    cost: 2000,
    final: 6800,
  },
  {
    name: "Abr",
    cost: 2780,
    final: 8900,
  },
  {
    name: "Mai",
    cost: 1890,
    final: 6300,
  },
  {
    name: "Jun",
    cost: 2390,
    final: 7800,
  },
  {
    name: "Jul",
    cost: 3490,
    final: 10900,
  },
  {
    name: "Ago",
    cost: 4000,
    final: 12400,
  },
  {
    name: "Set",
    cost: 3000,
    final: 9800,
  },
  {
    name: "Out",
    cost: 2000,
    final: 6800,
  },
  {
    name: "Nov",
    cost: 2780,
    final: 8900,
  },
  {
    name: "Dez",
    cost: 3890,
    final: 12100,
  },
]

export function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$${value}`}
        />
        <Tooltip />
        <Line type="monotone" dataKey="cost" stroke="#8884d8" activeDot={{ r: 8 }} name="Valor de Custo" />
        <Line type="monotone" dataKey="final" stroke="#82ca9d" name="Valor Final" />
      </LineChart>
    </ResponsiveContainer>
  )
}
