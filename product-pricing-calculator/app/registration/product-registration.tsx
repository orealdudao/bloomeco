"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash, Upload, FileSpreadsheet, AlertCircle, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Dados de exemplo
const sampleProducts = [
  {
    id: 1,
    name: "Rosa",
    stock: 100,
    unitValue: 4.0,
    unitOfMeasure: "unidade",
    color: "branca",
    description: "Rosa branca com 5 pétalas",
    category: "Flor",
    classification: "Matéria-Prima",
  },
  {
    id: 2,
    name: "Fita",
    stock: 50,
    unitValue: 2.5,
    unitOfMeasure: "metro",
    color: "vermelha",
    description: "Fita de cetim vermelha",
    category: "Decoração",
    classification: "Matéria-Prima",
  },
  {
    id: 3,
    name: "Papel de Embrulho",
    stock: 75,
    unitValue: 3.0,
    unitOfMeasure: "folha",
    color: "dourado",
    description: "Papel de embrulho decorativo dourado",
    category: "Embalagem",
    classification: "Matéria-Prima",
  },
]

export function ProductRegistration() {
  const [products, setProducts] = useState(sampleProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [importPreview, setImportPreview] = useState([])
  const [importStatus, setImportStatus] = useState(null)

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.classification.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Simulando a leitura de um arquivo Excel
      // Em uma implementação real, você usaria uma biblioteca como xlsx ou papaparse
      setImportPreview([
        {
          id: 4,
          name: "Lírio",
          stock: 45,
          unitValue: 6.5,
          unitOfMeasure: "unidade",
          color: "branco",
          category: "Flor",
          classification: "Matéria-Prima",
        },
        {
          id: 5,
          name: "Vaso de Cerâmica",
          stock: 30,
          unitValue: 12.0,
          unitOfMeasure: "unidade",
          color: "azul",
          category: "Recipiente",
          classification: "Matéria-Prima",
        },
        {
          id: 6,
          name: "Musgo Decorativo",
          stock: 200,
          unitValue: 1.5,
          unitOfMeasure: "grama",
          color: "verde",
          category: "Decoração",
          classification: "Matéria-Prima",
        },
      ])
      setShowImportDialog(true)
    }
  }

  const confirmImport = () => {
    // Adicionar os produtos importados à lista existente
    setProducts([...products, ...importPreview])
    setImportStatus("success")

    // Resetar após 3 segundos
    setTimeout(() => {
      setShowImportDialog(false)
      setImportStatus(null)
      setImportPreview([])
    }, 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastro de Valor de Custo (VC)</CardTitle>
        <CardDescription>Registre matérias-primas e produtos finais com seus custos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Input
                type="file"
                id="excel-upload"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
              />
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" /> Importar Planilha
              </Button>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Adicionar Produto
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Produto</DialogTitle>
                  <DialogDescription>
                    Preencha os detalhes para adicionar um novo produto ao seu inventário.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" placeholder="Nome do produto" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock">Quantidade em Estoque</Label>
                      <Input id="stock" type="number" placeholder="0" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="unitValue">Valor Unitário (R$)</Label>
                      <Input id="unitValue" type="number" step="0.01" placeholder="0,00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unitOfMeasure">Unidade de Medida</Label>
                      <Select>
                        <SelectTrigger id="unitOfMeasure">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unidade">Unidade</SelectItem>
                          <SelectItem value="metro">Metro</SelectItem>
                          <SelectItem value="kg">Quilograma</SelectItem>
                          <SelectItem value="folha">Folha</SelectItem>
                          <SelectItem value="grama">Grama</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="color">Cor</Label>
                      <Input id="color" placeholder="Cor" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flor">Flor</SelectItem>
                          <SelectItem value="decoracao">Decoração</SelectItem>
                          <SelectItem value="embalagem">Embalagem</SelectItem>
                          <SelectItem value="recipiente">Recipiente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="classification">Classificação</Label>
                      <Select>
                        <SelectTrigger id="classification">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="materia-prima">Matéria-Prima</SelectItem>
                          <SelectItem value="produto-final">Produto Final</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea id="description" placeholder="Descrição do produto" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Salvar Produto</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Estoque</TableHead>
                <TableHead>Valor Unitário</TableHead>
                <TableHead className="hidden md:table-cell">Categoria</TableHead>
                <TableHead className="hidden md:table-cell">Classificação</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Nenhum produto encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>R${product.unitValue.toFixed(2)}</TableCell>
                    <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                    <TableCell className="hidden md:table-cell">{product.classification}</TableCell>
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
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Diálogo de importação em massa */}
        <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <FileSpreadsheet className="mr-2 h-5 w-5" />
                Importação de Planilha
              </DialogTitle>
              <DialogDescription>Revise os dados da planilha antes de confirmar a importação.</DialogDescription>
            </DialogHeader>

            {importStatus === "success" ? (
              <Alert className="bg-green-50 border-green-200">
                <Check className="h-4 w-4 text-green-600" />
                <AlertTitle>Importação concluída</AlertTitle>
                <AlertDescription>{importPreview.length} produtos foram importados com sucesso.</AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="py-4">
                  <div className="rounded-md border max-h-[400px] overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Estoque</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Categoria</TableHead>
                          <TableHead>Classificação</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {importPreview.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>R${product.unitValue.toFixed(2)}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.classification}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <Alert className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Atenção</AlertTitle>
                  <AlertDescription>
                    Serão importados {importPreview.length} produtos. Esta ação não pode ser desfeita.
                  </AlertDescription>
                </Alert>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowImportDialog(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={confirmImport}>Confirmar Importação</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
