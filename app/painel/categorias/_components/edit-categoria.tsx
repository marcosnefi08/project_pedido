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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Edit } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'
import { editarCategoria } from '../actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface EditCategoriaProps {
  categoria: {
    id: string
    nome: string
  }
}

export default function EditCategoria({ categoria }: EditCategoriaProps) {
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

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await editarCategoria(categoria.id, formData)

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Categoria atualizada com sucesso!')
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
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Categoria</DialogTitle>
          <DialogDescription>
            Altere o nome da categoria.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da Categoria</Label>
              <Input
                id="nome"
                name="nome"
                defaultValue={categoria.nome}
                placeholder="Ex: Pizzas, Bebidas, Sobremesas..."
                required
                disabled={isPending}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}