"use client"

import { useState } from "react"
import { Plus, Edit, Trash, Upload, FileSpreadsheet, AlertCircle, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
const sampleConvenienceFees = [
  {
    id: 1,
    name: "PIX",
    provider: "WIX",
    amount: 0.95,
    platform: "Digital",
  },
  {
    id: 2,
    name: "Cartão de Crédito",
    provider: "PayPal",
    amount: 2.5,
    platform: "Digital",
  },
  {
    id: 3,
    name: "Cartão de Débito",
    provider: "Stripe",
    amount: 1.75,
    platform: "Digital",
  },
  {
    id: 4,
    name: "Dinheiro",
    provider: "Loja Física",
    amount: 0,
    platform: "Físico",
  },
]

export function ConvenienceFeeRegistration() {
  const [convenienceFees, setConvenienceFees] = useState(sampleConvenienceFees)
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
          name: "Boleto",
          provider: "Banco",
          amount: 1.2,
          platform: "Digital",
        },
        {
          id: 6,
          name: "Transferência Bancária",
          provider: "Banco",
          amount: 0.5,
          platform: "Digital",
        },
      ])
      setShowImportDialog(true)
    }
  }

  const confirmImport = () => {
    // Adicionar as taxas importadas à lista existente
    setConvenienceFees([...convenienceFees, ...importPreview])
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
        <CardTitle>Cadastro de Taxa de Conveniência (TC)</CardTitle>
        <CardDescription>
          Registre taxas de provedores de pagamento para diferentes métodos de pagamento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-6 gap-2">
          <div className="relative">
            <Input
              type="file"
              id="excel-upload-fees"
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
                <Plus className="mr-2 h-4 w-4" /> Adicionar Taxa
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Adicionar Taxa de Conveniência</DialogTitle>
                <DialogDescription>Registre um novo método de pagamento e sua taxa associada.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Método de Pagamento</Label>
                  <Input id="name" placeholder="ex: PIX, Cartão de Crédito" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provider">Provedor</Label>
                  <Input id="provider" placeholder="ex: WIX, PayPal" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Valor da Taxa (R$)</Label>
                  <Input id="amount" type="number" step="0.01" placeholder="0,00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform">Plataforma</Label>
                  <Select>
                    <SelectTrigger id="platform">
                      <SelectValue placeholder="Selecione a plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital">Digital</SelectItem>
                      <SelectItem value="fisico">Físico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Salvar Taxa</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Método de Pagamento</TableHead>
                <TableHead>Provedor</TableHead>
                <TableHead>Valor da Taxa</TableHead>
                <TableHead>Plataforma</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {convenienceFees.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell className="font-medium">{fee.name}</TableCell>
                  <TableCell>{fee.provider}</TableCell>
                  <TableCell>R${fee.amount.toFixed(2)}</TableCell>
                  <TableCell>{fee.platform}</TableCell>
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
                Importação de Taxas
              </DialogTitle>
              <DialogDescription>Revise os dados da planilha antes de confirmar a importação.</DialogDescription>
            </DialogHeader>

            {importStatus === "success" ? (
              <Alert className="bg-green-50 border-green-200">
                <Check className="h-4 w-4 text-green-600" />
                <AlertTitle>Importação concluída</AlertTitle>
                <AlertDescription>{importPreview.length} taxas foram importadas com sucesso.</AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="py-4">
                  <div className="rounded-md border max-h-[400px] overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Método de Pagamento</TableHead>
                          <TableHead>Provedor</TableHead>
                          <TableHead>Valor da Taxa</TableHead>
                          <TableHead>Plataforma</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {importPreview.map((fee) => (
                          <TableRow key={fee.id}>
                            <TableCell className="font-medium">{fee.name}</TableCell>
                            <TableCell>{fee.provider}</TableCell>
                            <TableCell>R${fee.amount.toFixed(2)}</TableCell>
                            <TableCell>{fee.platform}</TableCell>
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
                    Serão importadas {importPreview.length} taxas. Esta ação não pode ser desfeita.
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
