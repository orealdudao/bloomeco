"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dados de exemplo
const productCategories = [
  {
    id: "flowers",
    name: "Flores",
    products: [
      { id: 1, name: "Rosa", price: 4.0 },
      { id: 2, name: "Lírio", price: 5.5 },
      { id: 3, name: "Tulipa", price: 3.5 },
      { id: 4, name: "Girassol", price: 6.0 },
    ],
  },
  {
    id: "decorations",
    name: "Decorações",
    products: [
      { id: 5, name: "Fita", price: 2.5 },
      { id: 6, name: "Laço", price: 3.0 },
      { id: 7, name: "Spray de Glitter", price: 4.5 },
    ],
  },
  {
    id: "packaging",
    name: "Embalagens",
    products: [
      { id: 8, name: "Papel de Embrulho", price: 3.0 },
      { id: 9, name: "Caixa de Presente", price: 7.0 },
      { id: 10, name: "Celofane", price: 2.0 },
    ],
  },
  {
    id: "accessories",
    name: "Acessórios",
    products: [
      { id: 11, name: "Cartão de Mensagem", price: 2.5 },
      { id: 12, name: "Adesivo", price: 1.0 },
      { id: 13, name: "Borboleta Artificial", price: 3.5 },
    ],
  },
]

export function ProductComposition() {
  const [selectedItems, setSelectedItems] = useState([
    { id: 1, name: "Rosa", price: 4.0, quantity: 6 },
    { id: 5, name: "Fita", price: 2.5, quantity: 1 },
    { id: 8, name: "Papel de Embrulho", price: 3.0, quantity: 2 },
    { id: 12, name: "Adesivo", price: 1.0, quantity: 1 },
  ])

  const handleAddItem = (item) => {
    const existingItem = selectedItems.find((i) => i.id === item.id)

    if (existingItem) {
      setSelectedItems(selectedItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)))
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }])
    }
  }

  const handleRemoveItem = (itemId) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== itemId))
  }

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return

    setSelectedItems(selectedItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="productName" className="text-base">
          Nome do Produto
        </Label>
        <Input id="productName" placeholder="Digite o nome do produto" className="mt-1" defaultValue="Buquê de Rosas" />
      </div>

      <div>
        <Label htmlFor="category" className="text-base">
          Categoria do Produto
        </Label>
        <Select defaultValue="bouquet">
          <SelectTrigger id="category" className="mt-1">
            <SelectValue placeholder="Selecione a categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bouquet">Buquê de Flores</SelectItem>
            <SelectItem value="basket">Cesta de Presente</SelectItem>
            <SelectItem value="wedding">Arranjo de Casamento</SelectItem>
            <SelectItem value="single">Flor Individual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Adicionar Componentes</h3>
        <Tabs defaultValue="flowers">
          <TabsList className="grid grid-cols-4 mb-4">
            {productCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {productCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">R${product.price.toFixed(2)}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleAddItem(product)}>
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Adicionar</span>
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Componentes Selecionados</h3>
        {selectedItems.length === 0 ? (
          <p className="text-muted-foreground">Nenhum componente selecionado ainda.</p>
        ) : (
          <div className="space-y-3">
            {selectedItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">R${item.price.toFixed(2)} cada</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                    <span className="sr-only">Diminuir</span>
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 1)}
                    className="w-16 text-center"
                    min="1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                    <span className="sr-only">Aumentar</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-destructive"
                  >
                    Remover
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="laborCost" className="text-base">
          Custo de Mão de Obra (MO)
        </Label>
        <Select defaultValue="fixed">
          <SelectTrigger id="laborCost" className="mt-1">
            <SelectValue placeholder="Selecione o custo de mão de obra" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fixed">Montagem Interna (R$10,00)</SelectItem>
            <SelectItem value="percentage">Arranjo Terceirizado (15%)</SelectItem>
            <SelectItem value="custom">Design Personalizado (R$25,00)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
