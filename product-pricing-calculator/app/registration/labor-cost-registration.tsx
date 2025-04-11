"use client"

import { useState } from "react"
import { Plus, Edit, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Dados de exemplo
const sampleLaborCosts = [
  {
    id: 1,
    name: "Montagem Interna",
    type: "fixed",
    value: 10.0,
    description: "Custo padrão de mão de obra para montagem interna de produtos",
  },
  {
    id: 2,
    name: "Arranjo Terceirizado",
    type: "percentage",
    value: 15.0,
    description: "Taxa percentual para arranjos de flores terceirizados",
  },
  {
    id: 3,
    name: "Design Personalizado",
    type: "fixed",
    value: 25.0,
    description: "Custo premium de mão de obra para trabalho de design personalizado",
  },
]

export function LaborCostRegistration() {
  const [laborCosts, setLaborCosts] = useState(sampleLaborCosts)
  const [costType, setCostType] = useState("fixed")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastro de Mão de Obra (MO)</CardTitle>
        <CardDescription>Registre custos de mão de obra como valores fixos ou margens percentuais</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Adicionar Mão de Obra
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Adicionar Mão de Obra</DialogTitle>
                <DialogDescription>
                  Defina um novo custo de mão de obra como valor fixo ou percentual.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Nome do custo de mão de obra" />
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Custo</Label>
                  <RadioGroup defaultValue="fixed" onValueChange={setCostType} className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="fixed" />
                      <Label htmlFor="fixed">Valor Fixo (R$)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="percentage" id="percentage" />
                      <Label htmlFor="percentage">Percentual (%)</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">{costType === "fixed" ? "Valor (R$)" : "Percentual (%)"}</Label>
                  <Input id="value" type="number" step="0.01" placeholder="0,00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Input id="description" placeholder="Descrição do custo de mão de obra" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Salvar Mão de Obra</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead className="hidden md:table-cell">Descrição</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {laborCosts.map((cost) => (
                <TableRow key={cost.id}>
                  <TableCell className="font-medium">{cost.name}</TableCell>
                  <TableCell>{cost.type === "fixed" ? "Fixo" : "Percentual"}</TableCell>
                  <TableCell>{cost.type === "fixed" ? `R$${cost.value.toFixed(2)}` : `${cost.value}%`}</TableCell>
                  <TableCell className="hidden md:table-cell">{cost.description}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
