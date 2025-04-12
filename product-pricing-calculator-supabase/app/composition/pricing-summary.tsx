"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export function PricingSummary() {
  const [paymentMethod, setPaymentMethod] = useState("pix")

  // Dados de cálculo de exemplo
  const costValue = 36.5 // (6 x Rosa) + (1 x Fita) + (2 x Papel de Embrulho) + (1 x Adesivo)
  const laborCost = 10.0
  const convenienceFees = {
    pix: 0.95,
    credit: 2.5,
    debit: 1.75,
    cash: 0,
  }
  const profitMargin = 3.2 // 320%

  const calculateFinalPrice = (method) => {
    const tc = convenienceFees[method]
    return (costValue + laborCost) * (1 + profitMargin) + tc
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-medium mb-2">Detalhamento de Custos</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Valor de Custo (VC):</span>
            <span>R${costValue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Custo de Mão de Obra (MO):</span>
            <span>R${laborCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Custo Base:</span>
            <span className="font-medium">R${(costValue + laborCost).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Margem de Lucro (ML):</span>
            <span>{(profitMargin * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-base font-medium mb-2">Método de Pagamento</h3>
        <RadioGroup defaultValue="pix" onValueChange={setPaymentMethod} className="space-y-2">
          <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pix" id="pix" />
              <Label htmlFor="pix" className="font-normal">
                PIX
              </Label>
            </div>
            <div className="text-sm text-muted-foreground">Taxa: R${convenienceFees.pix.toFixed(2)}</div>
          </div>
          <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="credit" id="credit" />
              <Label htmlFor="credit" className="font-normal">
                Cartão de Crédito
              </Label>
            </div>
            <div className="text-sm text-muted-foreground">Taxa: R${convenienceFees.credit.toFixed(2)}</div>
          </div>
          <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="debit" id="debit" />
              <Label htmlFor="debit" className="font-normal">
                Cartão de Débito
              </Label>
            </div>
            <div className="text-sm text-muted-foreground">Taxa: R${convenienceFees.debit.toFixed(2)}</div>
          </div>
          <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash" className="font-normal">
                Dinheiro
              </Label>
            </div>
            <div className="text-sm text-muted-foreground">Taxa: R${convenienceFees.cash.toFixed(2)}</div>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div>
        <h3 className="text-base font-medium mb-4">Preço Final</h3>
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Buquê de Rosas</p>
                <p className="text-2xl font-bold">R${calculateFinalPrice(paymentMethod).toFixed(2)}</p>
              </div>
              <div className="flex items-center text-sm text-primary">
                <Check className="mr-1 h-4 w-4" />
                {paymentMethod === "pix" && "PIX"}
                {paymentMethod === "credit" && "Cartão de Crédito"}
                {paymentMethod === "debit" && "Cartão de Débito"}
                {paymentMethod === "cash" && "Dinheiro"}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Todos os Métodos de Pagamento</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(convenienceFees).map(([method, fee]) => (
              <div key={method} className="rounded-md border p-2">
                <p className="text-xs text-muted-foreground capitalize">
                  {method === "pix" && "PIX"}
                  {method === "credit" && "Cartão de Crédito"}
                  {method === "debit" && "Cartão de Débito"}
                  {method === "cash" && "Dinheiro"}
                </p>
                <p className="font-medium">R${calculateFinalPrice(method).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button className="w-full">Salvar Produto</Button>
    </div>
  )
}
