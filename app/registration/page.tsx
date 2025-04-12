import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductRegistration } from "./product-registration"
import { LaborCostRegistration } from "./labor-cost-registration"
import { ConvenienceFeeRegistration } from "./convenience-fee-registration"
import { ProfitMarginRegistration } from "./profit-margin-registration"

export default function RegistrationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Cadastro de Itens</h1>
        <p className="text-muted-foreground">Registre componentes e custos para seus cálculos de preços</p>
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">Valor de Custo (VC)</TabsTrigger>
          <TabsTrigger value="labor">Mão de Obra (MO)</TabsTrigger>
          <TabsTrigger value="fees">Taxa de Conveniência (TC)</TabsTrigger>
          <TabsTrigger value="margins">Margem de Lucro (ML)</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <ProductRegistration />
        </TabsContent>
        <TabsContent value="labor">
          <LaborCostRegistration />
        </TabsContent>
        <TabsContent value="fees">
          <ConvenienceFeeRegistration />
        </TabsContent>
        <TabsContent value="margins">
          <ProfitMarginRegistration />
        </TabsContent>
      </Tabs>
    </div>
  )
}
