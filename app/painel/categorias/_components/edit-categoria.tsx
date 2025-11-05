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
import { editarCategoria } from '../actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Pencil } from 'lucide-react'

interface EditCategoriaProps {
  categoria: {
    id: string
    nome: string
  }
}

export default function EditCategoria({ categoria }: EditCategoriaProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const result = await editarCategoria(categoria.id, formData)
    setLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Categoria editada com sucesso!')
      setOpen(false)
      router.refresh()
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="size-4" />
          Editar
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <form action={handleSubmit}>
          <DrawerHeader>
            <DrawerTitle>Editar Categoria</DrawerTitle>
            <DrawerDescription>
              Atualize o nome da categoria.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da Categoria</Label>
              <Input
                id="nome"
                name="nome"
                defaultValue={categoria.nome}
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

