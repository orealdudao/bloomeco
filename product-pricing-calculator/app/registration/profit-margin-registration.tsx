"use client"

import { useState } from "react"
import { Plus, Edit, Trash, Upload, FileSpreadsheet, AlertCircle, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Dados de exemplo
const sampleProfitMargins = [
  {
    id: 1,
    category: "Buquê de Flores",
    margin: 320,
    description: "Margem de lucro padrão para buquês de flores",
  },
  {
    id: 2,
    category: "Cestas de Presente",
    margin: 280,
    description: "Margem de lucro padrão para cestas de presente",
  },
  {
    id: 3,
    category: "Arranjos de Casamento",
    margin: 350,
    description: "Margem de lucro premium para arranjos de casamento",
  },
  {
    id: 4,
    category: "Flores Individuais",
    margin: 200,
    description: "Margem de lucro básica para vendas de flores individuais",
  },
]

export function ProfitMarginRegistration() {
  const [profitMargins, setProfitMargins] = useState(sampleProfitMargins)
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [importPreview, setImportPreview] = useState([])
  const [importStatus, setImportStatus] = useState(null)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Simulando a leitura de um arquivo Excel
      setImportPreview([
        {
          id: 5,
          category: "Plantas Ornamentais",
          margin: 250,
          description: "Margem de lucro para plantas ornamentais",
        },
        {
          id: 6,
          category: "Arranjos Corporativos",
          margin: 300,
          description: "Margem de lucro para arranjos corporativos",
        },
      ])
      setShowImportDialog(true)
    }
  }

  const confirmImport = () => {
    // Adicionar as margens importadas à lista existente
    setProfitMargins([...profitMargins, ...importPreview])
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
        <CardTitle>Cadastro de Margem de Lucro (ML)</CardTitle>
        <CardDescription>Registre margens de lucro para diferentes categorias de produtos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-6 gap-2">
          <div className="relative">
            <Input
              type="file"
              id="excel-upload-margins"
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
                <Plus className="mr-2 h-4 w-4" /> Adicionar Margem
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Adicionar Margem de Lucro</DialogTitle>
                <DialogDescription>
                  Defina uma margem de lucro percentual para uma categoria de produto.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria de Produto</Label>
                  <Input id="category" placeholder="ex: Buquê de Flores" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="margin">Margem de Lucro (%)</Label>
                  <Input id="margin" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Input id="description" placeholder="Descrição da margem" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Salvar Margem</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categoria de Produto</TableHead>
                <TableHead>Margem de Lucro</TableHead>
                <TableHead className="hidden md:table-cell">Descrição</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profitMargins.map((margin) => (
                <TableRow key={margin.id}>
                  <TableCell className="font-medium">{margin.category}</TableCell>
                  <TableCell>{margin.margin}%</TableCell>
                  <TableCell className="hidden md:table-cell">{margin.description}</TableCell>
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

        {/* Diálogo de importação em massa */}
        <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <FileSpreadsheet className="mr-2 h-5 w-5" />
                Importação de Margens
              </DialogTitle>
              <DialogDescription>Revise os dados da planilha antes de confirmar a importação.</DialogDescription>
            </DialogHeader>

            {importStatus === "success" ? (
              <Alert className="bg-green-50 border-green-200">
                <Check className="h-4 w-4 text-green-600" />
                <AlertTitle>Importação concluída</AlertTitle>
                <AlertDescription>{importPreview.length} margens foram importadas com sucesso.</AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="py-4">
                  <div className="rounded-md border max-h-[400px] overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Categoria de Produto</TableHead>
                          <TableHead>Margem de Lucro</TableHead>
                          <TableHead>Descrição</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {importPreview.map((margin) => (
                          <TableRow key={margin.id}>
                            <TableCell className="font-medium">{margin.category}</TableCell>
                            <TableCell>{margin.margin}%</TableCell>
                            <TableCell>{margin.description}</TableCell>
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
                    Serão importadas {importPreview.length} margens. Esta ação não pode ser desfeita.
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
