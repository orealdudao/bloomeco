import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductComposition } from "./product-composition"
import { PricingSummary } from "./pricing-summary"

export default function CompositionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Composição de Produtos</h1>
        <p className="text-muted-foreground">
          Monte produtos finais e calcule preços com diferentes métodos de pagamento
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Composição de Produto Final</CardTitle>
              <CardDescription>Selecione componentes para montar seu produto final</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductComposition />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumo de Preços</CardTitle>
              <CardDescription>Cálculo de preço final baseado nos componentes selecionados</CardDescription>
            </CardHeader>
            <CardContent>
              <PricingSummary />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
