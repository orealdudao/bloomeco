import Link from "next/link"
import { ArrowRight, BarChart3, Calculator, ClipboardList } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Calculadora de Preços de Produtos</h1>
        <p className="text-xl text-muted-foreground mt-4">
          Calcule os preços dos seus produtos com precisão e facilidade
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Dashboard</CardTitle>
            <CardDescription>Visualize métricas e análises financeiras</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Obtenha uma visão geral dos valores de custo, valores finais do produto, margens de lucro e muito mais.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard" className="w-full">
              <Button className="w-full">
                Ver Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <ClipboardList className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Cadastro de Itens</CardTitle>
            <CardDescription>Registre componentes e custos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Registre valores de custo, custos de mão de obra, taxas de conveniência e margens de lucro para seus
              produtos.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/registration" className="w-full">
              <Button className="w-full">
                Cadastrar Itens
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Composição de Produtos</CardTitle>
            <CardDescription>Monte e precifique produtos finais</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Monte produtos finais selecionando componentes e calcule preços finais com diferentes métodos de
              pagamento.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/composition" className="w-full">
              <Button className="w-full">
                Compor Produtos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
