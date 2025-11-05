'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { criarCategoria } from '../actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function AddCategorias() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const result = await criarCategoria(formData)
    setLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Categoria criada com sucesso!')
      setOpen(false)
      router.refresh()
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Adicionar Categoria</Button>
      </DrawerTrigger>
      <DrawerContent>
        <form action={handleSubmit}>
          <DrawerHeader>
            <DrawerTitle>Adicionar Nova Categoria</DrawerTitle>
            <DrawerDescription>
              Preencha o nome da categoria que deseja adicionar.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da Categoria</Label>
              <Input
                id="nome"
                name="nome"
                placeholder="Ex: Pizza, Bebidas, Sobremesas..."
                required
                disabled={loading}
              />
            </div>
          </div>
          <DrawerFooter>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
            <DrawerClose asChild>
              <Button type="button" variant="outline" disabled={loading}>
                Cancelar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}

