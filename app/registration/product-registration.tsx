"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import {
  Button,
  Input,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui"

type Categoria = {
  id: number
  nome: string
}

type Produto = {
  id: number
  nome: string
  custo: number
  categoria_id: number
}

export default function ProductRegistration() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [form, setForm] = useState({ nome: "", custo: "", categoria_id: "" })

  async function fetchProdutos() {
    const { data } = await supabase.from("produtos").select("*")
    setProdutos(data || [])
  }

  async function fetchCategorias() {
    const { data } = await supabase.from("categorias").select("*")
    setCategorias(data || [])
  }

  useEffect(() => {
    fetchProdutos()
    fetchCategorias()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.from("produtos").insert({
      nome: form.nome,
      custo: parseFloat(form.custo),
      categoria_id: parseInt(form.categoria_id),
    })
    if (!error) {
      setForm({ nome: "", custo: "", categoria_id: "" })
      fetchProdutos()
    } else {
      console.error(error)
    }
  }

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Cadastro de Produtos</CardTitle>
        <CardDescription>Insira os produtos que compõem o valor de custo</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label>Nome</Label>
            <Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
          </div>
          <div>
            <Label>Valor Unitário (R$)</Label>
            <Input
              type="number"
              value={form.custo}
              onChange={(e) => setForm({ ...form, custo: e.target.value })}
            />
          </div>
          <div>
            <Label>Categoria</Label>
            <Select value={form.categoria_id} onValueChange={(value) => setForm({ ...form, categoria_id: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button type="submit">Salvar Produto</Button>
          </div>
        </form>

        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Custo (R$)</TableHead>
              <TableHead>Categoria ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produtos.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.nome}</TableCell>
                <TableCell>{p.custo}</TableCell>
                <TableCell>{p.categoria_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
