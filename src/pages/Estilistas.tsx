
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Edit, User, Plus, CheckCircle, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLocalStorage } from "@/hooks/useLocalStorage"

interface Estilista {
  id: string
  tipo: 'maquillaje' | 'peinado' | 'manicure' | 'completo'
  nombre: string
  descripcion: string
  profesional?: string
  precio?: number
  confirmado: boolean
  duracion?: string
  ubicacion?: string
}

const Estilistas = () => {
  const { toast } = useToast()
  const [estilistas, setEstilistas] = useLocalStorage<Estilista[]>('wedding-estilistas', [
    {
      id: "1",
      tipo: "completo",
      nombre: "Paquete completo novia",
      descripcion: "Maquillaje, peinado y manicure para la novia",
      profesional: "María Belleza Studio",
      precio: 250000,
      confirmado: true,
      duracion: "3 horas",
      ubicacion: "A domicilio"
    },
    {
      id: "2",
      tipo: "maquillaje",
      nombre: "Maquillaje damas de honor",
      descripcion: "Maquillaje para 3 damas de honor",
      profesional: "Glamour Beauty",
      precio: 150000,
      confirmado: false,
      duracion: "2 horas",
      ubicacion: "Salón"
    }
  ])

  const [nuevoEstilista, setNuevoEstilista] = useState<Omit<Estilista, 'id'>>({
    tipo: "maquillaje",
    nombre: "",
    descripcion: "",
    profesional: "",
    precio: 0,
    confirmado: false,
    duracion: "",
    ubicacion: ""
  })

  const [editandoEstilista, setEditandoEstilista] = useState<Estilista | null>(null)
  const [dialogAbierto, setDialogAbierto] = useState(false)

  const agregarEstilista = () => {
    if (nuevoEstilista.nombre && nuevoEstilista.descripcion) {
      const estilista: Estilista = {
        ...nuevoEstilista,
        id: Date.now().toString()
      }
      setEstilistas([...estilistas, estilista])
      setNuevoEstilista({
        tipo: "maquillaje",
        nombre: "",
        descripcion: "",
        profesional: "",
        precio: 0,
        confirmado: false,
        duracion: "",
        ubicacion: ""
      })
      setDialogAbierto(false)
      toast({
        title: "Servicio de estilismo agregado",
        description: `${estilista.nombre} ha sido agregado a la lista.`,
      })
    }
  }

  const editarEstilista = (estilista: Estilista) => {
    setEditandoEstilista(estilista)
    setNuevoEstilista(estilista)
    setDialogAbierto(true)
  }

  const guardarEdicion = () => {
    if (editandoEstilista && nuevoEstilista.nombre && nuevoEstilista.descripcion) {
      setEstilistas(estilistas.map(e => 
        e.id === editandoEstilista.id 
          ? { ...nuevoEstilista, id: editandoEstilista.id }
          : e
      ))
      setEditandoEstilista(null)
      setNuevoEstilista({
        tipo: "maquillaje",
        nombre: "",
        descripcion: "",
        profesional: "",
        precio: 0,
        confirmado: false,
        duracion: "",
        ubicacion: ""
      })
      setDialogAbierto(false)
      toast({
        title: "Servicio actualizado",
        description: "Los datos del servicio de estilismo han sido actualizados correctamente.",
      })
    }
  }

  const eliminarEstilista = (id: string) => {
    setEstilistas(estilistas.filter(e => e.id !== id))
    toast({
      title: "Servicio eliminado",
      description: "El servicio de estilismo ha sido eliminado de la lista.",
      variant: "destructive"
    })
  }

  const cerrarDialog = () => {
    setDialogAbierto(false)
    setEditandoEstilista(null)
    setNuevoEstilista({
      tipo: "maquillaje",
      nombre: "",
      descripcion: "",
      profesional: "",
      precio: 0,
      confirmado: false,
      duracion: "",
      ubicacion: ""
    })
  }

  const getTipoBadge = (tipo: string) => {
    const colors = {
      maquillaje: "bg-pink-100 text-pink-700",
      peinado: "bg-purple-100 text-purple-700",
      manicure: "bg-blue-100 text-blue-700",
      completo: "bg-gold-100 text-gold-700"
    }
    const labels = {
      maquillaje: "Maquillaje",
      peinado: "Peinado",
      manicure: "Manicure",
      completo: "Completo"
    }
    return <Badge className={colors[tipo as keyof typeof colors] || "bg-gray-100 text-gray-700"}>{labels[tipo as keyof typeof labels]}</Badge>
  }

  const totalPresupuesto = estilistas.reduce((sum, e) => sum + (e.precio || 0), 0)
  const confirmados = estilistas.filter(e => e.confirmado).length

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Servicios de Estilismo</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estilistas.length}</div>
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
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${totalPresupuesto.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Botón para agregar estilista */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary">Estilistas y Belleza</h1>
          <p className="text-muted-foreground">Gestiona todos los servicios de belleza para tu boda</p>
        </div>
        
        <Dialog open={dialogAbierto} onOpenChange={setDialogAbierto}>
          <DialogTrigger asChild>
            <Button className="gradient-rose text-white" onClick={() => setDialogAbierto(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Servicio
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editandoEstilista ? 'Editar Servicio' : 'Agregar Nuevo Servicio'}
              </DialogTitle>
              <DialogDescription>
                {editandoEstilista 
                  ? 'Modifica los datos del servicio de estilismo.' 
                  : 'Completa la información del nuevo servicio de estilismo.'
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tipo" className="text-right">
                  Tipo
                </Label>
                <Select 
                  value={nuevoEstilista.tipo} 
                  onValueChange={(value: 'maquillaje' | 'peinado' | 'manicure' | 'completo') => 
                    setNuevoEstilista({...nuevoEstilista, tipo: value})
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maquillaje">Maquillaje</SelectItem>
                    <SelectItem value="peinado">Peinado</SelectItem>
                    <SelectItem value="manicure">Manicure</SelectItem>
                    <SelectItem value="completo">Paquete Completo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  value={nuevoEstilista.nombre}
                  onChange={(e) => setNuevoEstilista({...nuevoEstilista, nombre: e.target.value})}
                  className="col-span-3"
                  placeholder="Nombre del servicio"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="descripcion" className="text-right">
                  Descripción
                </Label>
                <Textarea
                  id="descripcion"
                  value={nuevoEstilista.descripcion}
                  onChange={(e) => setNuevoEstilista({...nuevoEstilista, descripcion: e.target.value})}
                  className="col-span-3"
                  placeholder="Describe el servicio"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="profesional" className="text-right">
                  Profesional
                </Label>
                <Input
                  id="profesional"
                  value={nuevoEstilista.profesional}
                  onChange={(e) => setNuevoEstilista({...nuevoEstilista, profesional: e.target.value})}
                  className="col-span-3"
                  placeholder="Nombre del estilista/salón"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="precio" className="text-right">
                  Precio
                </Label>
                <Input
                  id="precio"
                  type="number"
                  value={nuevoEstilista.precio}
                  onChange={(e) => setNuevoEstilista({...nuevoEstilista, precio: parseInt(e.target.value) || 0})}
                  className="col-span-3"
                  placeholder="0"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ubicacion" className="text-right">
                  Ubicación
                </Label>
                <Input
                  id="ubicacion"
                  value={nuevoEstilista.ubicacion}
                  onChange={(e) => setNuevoEstilista({...nuevoEstilista, ubicacion: e.target.value})}
                  className="col-span-3"
                  placeholder="Ej: A domicilio, Salón"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={cerrarDialog}>
                Cancelar
              </Button>
              <Button onClick={editandoEstilista ? guardarEdicion : agregarEstilista}>
                {editandoEstilista ? 'Guardar Cambios' : 'Agregar Servicio'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de estilistas */}
      <div className="grid gap-4">
        {estilistas.map((estilista) => (
          <Card key={estilista.id} className="bg-white/70 backdrop-blur-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{estilista.nombre}</h3>
                      <p className="text-sm text-muted-foreground">{estilista.descripcion}</p>
                      {estilista.profesional && (
                        <p className="text-sm text-muted-foreground">Profesional: {estilista.profesional}</p>
                      )}
                      <div className="flex gap-2 mt-1">
                        {estilista.duracion && (
                          <span className="text-xs text-muted-foreground">Duración: {estilista.duracion}</span>
                        )}
                        {estilista.ubicacion && (
                          <span className="text-xs text-muted-foreground">• Ubicación: {estilista.ubicacion}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTipoBadge(estilista.tipo)}
                      {estilista.confirmado ? (
                        <Badge className="bg-green-100 text-green-700">Confirmado</Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-700">Pendiente</Badge>
                      )}
                      {estilista.precio && (
                        <Badge variant="outline">
                          ${estilista.precio.toLocaleString()}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => editarEstilista(estilista)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => eliminarEstilista(estilista.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {estilistas.length === 0 && (
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay servicios de estilismo aún</h3>
              <p className="text-muted-foreground mb-4">
                Comienza agregando los servicios de belleza para tu boda.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Estilistas
