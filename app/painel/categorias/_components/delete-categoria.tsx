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
import { excluirCategoria } from '../actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

interface DeleteCategoriaProps {
  categoria: {
    id: string
    nome: string
  }
}

export default function DeleteCategoria({ categoria }: DeleteCategoriaProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    setLoading(true)
    const result = await excluirCategoria(categoria.id)
    setLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Categoria excluída com sucesso!')
      setOpen(false)
      router.refresh()
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="size-4" />
          Excluir
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Excluir Categoria</DrawerTitle>
          <DrawerDescription>
            Tem certeza que deseja excluir a categoria &quot;{categoria.nome}&quot;?
            Esta ação não pode ser desfeita.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Excluindo...' : 'Confirmar Exclusão'}
          </Button>
          <DrawerClose asChild>
            <Button type="button" variant="outline" disabled={loading}>
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

