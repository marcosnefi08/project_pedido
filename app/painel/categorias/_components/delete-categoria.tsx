'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Trash2 } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'
import { excluirCategoria } from '../actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface DeleteCategoriaProps {
  categoria: {
    id: string
    nome: string
  }
}

export default function DeleteCategoria({ categoria }: DeleteCategoriaProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  async function handleDelete() {
    startTransition(async () => {
      const result = await excluirCategoria(categoria.id)

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Categoria excluída com sucesso!')
        setOpen(false)
        // Aguarda um pouco para a transição do modal fechar antes de atualizar
        setTimeout(() => {
          router.refresh()
        }, 300)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="transition-all duration-200 hover:scale-105">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Categoria</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir a categoria <strong>{categoria.nome}</strong>?
            Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? 'Excluindo...' : 'Excluir Categoria'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}