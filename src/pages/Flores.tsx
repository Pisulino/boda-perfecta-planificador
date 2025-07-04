
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Edit, Palette, Plus, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Arreglo {
  id: string
  tipo: string
  descripcion: string
  proveedor?: string
  precio?: number
  confirmado: boolean
  notas?: string
}

const Flores = () => {
  const { toast } = useToast()
  const [arreglos, setArreglos] = useState<Arreglo[]>([
    {
      id: "1",
      tipo: "Bouquet de novia",
      descripcion: "Rosas blancas y peonías",
      proveedor: "Floristería Bella",
      precio: 150000,
      confirmado: true
    },
    {
      id: "2",
      tipo: "Centros de mesa",
      descripcion: "Arreglos con rosas y eucalipto",
      proveedor: "Flores del Campo",
      precio: 80000,
      confirmado: false
    }
  ])

  const [nuevoArreglo, setNuevoArreglo] = useState<Omit<Arreglo, 'id'>>({
    tipo: "",
    descripcion: "",
    proveedor: "",
    precio: 0,
    confirmado: false,
    notas: ""
  })

  const [editandoArreglo, setEditandoArreglo] = useState<Arreglo | null>(null)
  const [dialogAbierto, setDialogAbierto] = useState(false)

  const agregarArreglo = () => {
    if (nuevoArreglo.tipo && nuevoArreglo.descripcion) {
      const arreglo: Arreglo = {
        ...nuevoArreglo,
        id: Date.now().toString()
      }
      setArreglos([...arreglos, arreglo])
      setNuevoArreglo({
        tipo: "",
        descripcion: "",
        proveedor: "",
        precio: 0,
        confirmado: false,
        notas: ""
      })
      setDialogAbierto(false)
      toast({
        title: "Arreglo floral agregado",
        description: `${arreglo.tipo} ha sido agregado a la lista.`,
      })
    }
  }

  const editarArreglo = (arreglo: Arreglo) => {
    setEditandoArreglo(arreglo)
    setNuevoArreglo(arreglo)
    setDialogAbierto(true)
  }

  const guardarEdicion = () => {
    if (editandoArreglo && nuevoArreglo.tipo && nuevoArreglo.descripcion) {
      setArreglos(arreglos.map(arr => 
        arr.id === editandoArreglo.id 
          ? { ...nuevoArreglo, id: editandoArreglo.id }
          : arr
      ))
      setEditandoArreglo(null)
      setNuevoArreglo({
        tipo: "",
        descripcion: "",
        proveedor: "",
        precio: 0,
        confirmado: false,
        notas: ""
      })
      setDialogAbierto(false)
      toast({
        title: "Arreglo actualizado",
        description: "Los datos del arreglo han sido actualizados correctamente.",
      })
    }
  }

  const eliminarArreglo = (id: string) => {
    setArreglos(arreglos.filter(arr => arr.id !== id))
    toast({
      title: "Arreglo eliminado",
      description: "El arreglo floral ha sido eliminado de la lista.",
      variant: "destructive"
    })
  }

  const cerrarDialog = () => {
    setDialogAbierto(false)
    setEditandoArreglo(null)
    setNuevoArreglo({
      tipo: "",
      descripcion: "",
      proveedor: "",
      precio: 0,
      confirmado: false,
      notas: ""
    })
  }

  const totalPresupuesto = arreglos.reduce((sum, arr) => sum + (arr.precio || 0), 0)
  const confirmados = arreglos.filter(arr => arr.confirmado).length

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Arreglos</CardTitle>
            <Palette className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{arreglos.length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{confirmados}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presupuesto Total</CardTitle>
            <Palette className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${totalPresupuesto.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Botón para agregar arreglo */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary">Arreglos Florales</h1>
          <p className="text-muted-foreground">Gestiona todos los arreglos florales para tu boda</p>
        </div>
        
        <Dialog open={dialogAbierto} onOpenChange={setDialogAbierto}>
          <DialogTrigger asChild>
            <Button className="gradient-rose text-white" onClick={() => setDialogAbierto(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Arreglo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editandoArreglo ? 'Editar Arreglo' : 'Agregar Nuevo Arreglo'}
              </DialogTitle>
              <DialogDescription>
                {editandoArreglo 
                  ? 'Modifica los datos del arreglo floral.' 
                  : 'Completa la información del nuevo arreglo floral.'
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tipo" className="text-right">
                  Tipo
                </Label>
                <Input
                  id="tipo"
                  value={nuevoArreglo.tipo}
                  onChange={(e) => setNuevoArreglo({...nuevoArreglo, tipo: e.target.value})}
                  className="col-span-3"
                  placeholder="Ej: Bouquet, Centro de mesa"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="descripcion" className="text-right">
                  Descripción
                </Label>
                <Textarea
                  id="descripcion"
                  value={nuevoArreglo.descripcion}
                  onChange={(e) => setNuevoArreglo({...nuevoArreglo, descripcion: e.target.value})}
                  className="col-span-3"
                  placeholder="Describe el arreglo floral"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="proveedor" className="text-right">
                  Proveedor
                </Label>
                <Input
                  id="proveedor"
                  value={nuevoArreglo.proveedor}
                  onChange={(e) => setNuevoArreglo({...nuevoArreglo, proveedor: e.target.value})}
                  className="col-span-3"
                  placeholder="Nombre de la floristería"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="precio" className="text-right">
                  Precio
                </Label>
                <Input
                  id="precio"
                  type="number"
                  value={nuevoArreglo.precio}
                  onChange={(e) => setNuevoArreglo({...nuevoArreglo, precio: parseInt(e.target.value) || 0})}
                  className="col-span-3"
                  placeholder="0"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={cerrarDialog}>
                Cancelar
              </Button>
              <Button onClick={editandoArreglo ? guardarEdicion : agregarArreglo}>
                {editandoArreglo ? 'Guardar Cambios' : 'Agregar Arreglo'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de arreglos */}
      <div className="grid gap-4">
        {arreglos.map((arreglo) => (
          <Card key={arreglo.id} className="bg-white/70 backdrop-blur-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{arreglo.tipo}</h3>
                      <p className="text-sm text-muted-foreground">{arreglo.descripcion}</p>
                      {arreglo.proveedor && (
                        <p className="text-sm text-muted-foreground">Proveedor: {arreglo.proveedor}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {arreglo.confirmado ? (
                        <Badge className="bg-green-100 text-green-700">Confirmado</Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-700">Pendiente</Badge>
                      )}
                      {arreglo.precio && (
                        <Badge variant="outline">
                          ${arreglo.precio.toLocaleString()}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => editarArreglo(arreglo)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => eliminarArreglo(arreglo.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {arreglos.length === 0 && (
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Palette className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay arreglos florales aún</h3>
              <p className="text-muted-foreground mb-4">
                Comienza agregando los arreglos florales para tu boda especial.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Flores
