
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Edit, Image, Plus, CheckCircle, Camera } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Servicio {
  id: string
  tipo: 'fotografia' | 'video' | 'drone' | 'album'
  nombre: string
  descripcion: string
  fotografo?: string
  precio?: number
  confirmado: boolean
  duracion?: string
  entregables?: string
}

const Fotografia = () => {
  const { toast } = useToast()
  const [servicios, setServicios] = useState<Servicio[]>([
    {
      id: "1",
      tipo: "fotografia",
      nombre: "Sesión completa de boda",
      descripcion: "Cobertura completa desde preparativos hasta la fiesta",
      fotografo: "Ana García Photography",
      precio: 800000,
      confirmado: true,
      duracion: "8 horas",
      entregables: "300+ fotos editadas"
    },
    {
      id: "2",
      tipo: "video",
      nombre: "Video cinematográfico",
      descripcion: "Video de 3-5 minutos con highlights",
      fotografo: "Cinematografía Premium",
      precio: 500000,
      confirmado: false,
      duracion: "Todo el día",
      entregables: "Video editado + material crudo"
    }
  ])

  const [nuevoServicio, setNuevoServicio] = useState<Omit<Servicio, 'id'>>({
    tipo: "fotografia",
    nombre: "",
    descripcion: "",
    fotografo: "",
    precio: 0,
    confirmado: false,
    duracion: "",
    entregables: ""
  })

  const [editandoServicio, setEditandoServicio] = useState<Servicio | null>(null)
  const [dialogAbierto, setDialogAbierto] = useState(false)

  const agregarServicio = () => {
    if (nuevoServicio.nombre && nuevoServicio.descripcion) {
      const servicio: Servicio = {
        ...nuevoServicio,
        id: Date.now().toString()
      }
      setServicios([...servicios, servicio])
      setNuevoServicio({
        tipo: "fotografia",
        nombre: "",
        descripcion: "",
        fotografo: "",
        precio: 0,
        confirmado: false,
        duracion: "",
        entregables: ""
      })
      setDialogAbierto(false)
      toast({
        title: "Servicio agregado",
        description: `${servicio.nombre} ha sido agregado a la lista.`,
      })
    }
  }

  const editarServicio = (servicio: Servicio) => {
    setEditandoServicio(servicio)
    setNuevoServicio(servicio)
    setDialogAbierto(true)
  }

  const guardarEdicion = () => {
    if (editandoServicio && nuevoServicio.nombre && nuevoServicio.descripcion) {
      setServicios(servicios.map(s => 
        s.id === editandoServicio.id 
          ? { ...nuevoServicio, id: editandoServicio.id }
          : s
      ))
      setEditandoServicio(null)
      setNuevoServicio({
        tipo: "fotografia",
        nombre: "",
        descripcion: "",
        fotografo: "",
        precio: 0,
        confirmado: false,
        duracion: "",
        entregables: ""
      })
      setDialogAbierto(false)
      toast({
        title: "Servicio actualizado",
        description: "Los datos del servicio han sido actualizados correctamente.",
      })
    }
  }

  const eliminarServicio = (id: string) => {
    setServicios(servicios.filter(s => s.id !== id))
    toast({
      title: "Servicio eliminado",
      description: "El servicio ha sido eliminado de la lista.",
      variant: "destructive"
    })
  }

  const cerrarDialog = () => {
    setDialogAbierto(false)
    setEditandoServicio(null)
    setNuevoServicio({
      tipo: "fotografia",
      nombre: "",
      descripcion: "",
      fotografo: "",
      precio: 0,
      confirmado: false,
      duracion: "",
      entregables: ""
    })
  }

  const getTipoBadge = (tipo: string) => {
    const colors = {
      fotografia: "bg-blue-100 text-blue-700",
      video: "bg-purple-100 text-purple-700",
      drone: "bg-green-100 text-green-700",
      album: "bg-orange-100 text-orange-700"
    }
    const labels = {
      fotografia: "Fotografía",
      video: "Video",
      drone: "Drone",
      album: "Álbum"
    }
    return <Badge className={colors[tipo as keyof typeof colors]}>{labels[tipo as keyof typeof labels]}</Badge>
  }

  const totalPresupuesto = servicios.reduce((sum, s) => sum + (s.precio || 0), 0)
  const confirmados = servicios.filter(s => s.confirmado).length

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Servicios</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{servicios.length}</div>
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
            <Camera className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${totalPresupuesto.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Botón para agregar servicio */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary">Fotografía y Video</h1>
          <p className="text-muted-foreground">Gestiona todos los servicios audiovisuales para tu boda</p>
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
                {editandoServicio ? 'Editar Servicio' : 'Agregar Nuevo Servicio'}
              </DialogTitle>
              <DialogDescription>
                {editandoServicio 
                  ? 'Modifica los datos del servicio.' 
                  : 'Completa la información del nuevo servicio.'
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tipo" className="text-right">
                  Tipo
                </Label>
                <Select 
                  value={nuevoServicio.tipo} 
                  onValueChange={(value: 'fotografia' | 'video' | 'drone' | 'album') => 
                    setNuevoServicio({...nuevoServicio, tipo: value})
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fotografia">Fotografía</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="drone">Drone</SelectItem>
                    <SelectItem value="album">Álbum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  value={nuevoServicio.nombre}
                  onChange={(e) => setNuevoServicio({...nuevoServicio, nombre: e.target.value})}
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
                  value={nuevoServicio.descripcion}
                  onChange={(e) => setNuevoServicio({...nuevoServicio, descripcion: e.target.value})}
                  className="col-span-3"
                  placeholder="Describe el servicio"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fotografo" className="text-right">
                  Proveedor
                </Label>
                <Input
                  id="fotografo"
                  value={nuevoServicio.fotografo}
                  onChange={(e) => setNuevoServicio({...nuevoServicio, fotografo: e.target.value})}
                  className="col-span-3"
                  placeholder="Nombre del fotógrafo/empresa"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="precio" className="text-right">
                  Precio
                </Label>
                <Input
                  id="precio"
                  type="number"
                  value={nuevoServicio.precio}
                  onChange={(e) => setNuevoServicio({...nuevoServicio, precio: parseInt(e.target.value) || 0})}
                  className="col-span-3"
                  placeholder="0"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duracion" className="text-right">
                  Duración
                </Label>
                <Input
                  id="duracion"
                  value={nuevoServicio.duracion}
                  onChange={(e) => setNuevoServicio({...nuevoServicio, duracion: e.target.value})}
                  className="col-span-3"
                  placeholder="Ej: 6 horas"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={cerrarDialog}>
                Cancelar
              </Button>
              <Button onClick={editandoServicio ? guardarEdicion : agregarServicio}>
                {editandoServicio ? 'Guardar Cambios' : 'Agregar Servicio'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de servicios */}
      <div className="grid gap-4">
        {servicios.map((servicio) => (
          <Card key={servicio.id} className="bg-white/70 backdrop-blur-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{servicio.nombre}</h3>
                      <p className="text-sm text-muted-foreground">{servicio.descripcion}</p>
                      {servicio.fotografo && (
                        <p className="text-sm text-muted-foreground">Proveedor: {servicio.fotografo}</p>
                      )}
                      {servicio.duracion && (
                        <p className="text-sm text-muted-foreground">Duración: {servicio.duracion}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {getTipoBadge(servicio.tipo)}
                      {servicio.confirmado ? (
                        <Badge className="bg-green-100 text-green-700">Confirmado</Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-700">Pendiente</Badge>
                      )}
                      {servicio.precio && (
                        <Badge variant="outline">
                          ${servicio.precio.toLocaleString()}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => editarServicio(servicio)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => eliminarServicio(servicio.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {servicios.length === 0 && (
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay servicios audiovisuales aún</h3>
              <p className="text-muted-foreground mb-4">
                Comienza agregando los servicios de fotografía y video para tu boda.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Fotografia
