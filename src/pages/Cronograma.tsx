
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Trash2, Edit, Calendar, Plus, Clock, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLocalStorage } from "@/hooks/useLocalStorage"

interface Evento {
  id: string
  titulo: string
  descripcion: string
  fecha: string
  hora: string
  duracion?: string
  ubicacion?: string
  responsable?: string
  completado: boolean
}

const Cronograma = () => {
  const { toast } = useToast()
  const [eventos, setEventos] = useLocalStorage<Evento[]>('wedding-cronograma', [
    {
      id: "1",
      titulo: "Llegada de invitados",
      descripcion: "Recepción de invitados y cocktail de bienvenida",
      fecha: "2024-06-15",
      hora: "16:00",
      duracion: "1 hora",
      ubicacion: "Jardín del venue",
      responsable: "Wedding Planner",
      completado: false
    },
    {
      id: "2",
      titulo: "Ceremonia de matrimonio",
      descripcion: "Ceremonia civil en el altar principal",
      fecha: "2024-06-15",
      hora: "17:00",
      duracion: "45 minutos",
      ubicacion: "Altar principal",
      responsable: "Oficiante",
      completado: false
    },
    {
      id: "3",
      titulo: "Sesión de fotos",
      descripcion: "Fotos familiares y de pareja",
      fecha: "2024-06-15",
      hora: "18:00",
      duracion: "1 hora",
      ubicacion: "Jardines",
      responsable: "Fotógrafo principal",
      completado: false
    }
  ])

  const [nuevoEvento, setNuevoEvento] = useState<Omit<Evento, 'id'>>({
    titulo: "",
    descripcion: "",
    fecha: "",
    hora: "",
    duracion: "",
    ubicacion: "",
    responsable: "",
    completado: false
  })

  const [editandoEvento, setEditandoEvento] = useState<Evento | null>(null)
  const [dialogAbierto, setDialogAbierto] = useState(false)

  const agregarEvento = () => {
    if (nuevoEvento.titulo && nuevoEvento.fecha && nuevoEvento.hora) {
      const evento: Evento = {
        ...nuevoEvento,
        id: Date.now().toString()
      }
      setEventos([...eventos, evento].sort((a, b) => {
        const fechaHoraA = new Date(`${a.fecha}T${a.hora}`)
        const fechaHoraB = new Date(`${b.fecha}T${b.hora}`)
        return fechaHoraA.getTime() - fechaHoraB.getTime()
      }))
      setNuevoEvento({
        titulo: "",
        descripcion: "",
        fecha: "",
        hora: "",
        duracion: "",
        ubicacion: "",
        responsable: "",
        completado: false
      })
      setDialogAbierto(false)
      toast({
        title: "Evento agregado",
        description: `${evento.titulo} ha sido agregado al cronograma.`,
      })
    }
  }

  const editarEvento = (evento: Evento) => {
    setEditandoEvento(evento)
    setNuevoEvento(evento)
    setDialogAbierto(true)
  }

  const guardarEdicion = () => {
    if (editandoEvento && nuevoEvento.titulo && nuevoEvento.fecha && nuevoEvento.hora) {
      setEventos(eventos.map(e => 
        e.id === editandoEvento.id 
          ? { ...nuevoEvento, id: editandoEvento.id }
          : e
      ).sort((a, b) => {
        const fechaHoraA = new Date(`${a.fecha}T${a.hora}`)
        const fechaHoraB = new Date(`${b.fecha}T${b.hora}`)
        return fechaHoraA.getTime() - fechaHoraB.getTime()
      }))
      setEditandoEvento(null)
      setNuevoEvento({
        titulo: "",
        descripcion: "",
        fecha: "",
        hora: "",
        duracion: "",
        ubicacion: "",
        responsable: "",
        completado: false
      })
      setDialogAbierto(false)
      toast({
        title: "Evento actualizado",
        description: "Los datos del evento han sido actualizados correctamente.",
      })
    }
  }

  const eliminarEvento = (id: string) => {
    setEventos(eventos.filter(e => e.id !== id))
    toast({
      title: "Evento eliminado",
      description: "El evento ha sido eliminado del cronograma.",
      variant: "destructive"
    })
  }

  const toggleCompletado = (id: string) => {
    setEventos(eventos.map(e => 
      e.id === id 
        ? { ...e, completado: !e.completado }
        : e
    ))
    const evento = eventos.find(e => e.id === id)
    if (evento) {
      toast({
        title: evento.completado ? "Evento marcado como pendiente" : "Evento completado",
        description: `${evento.titulo} ha sido ${evento.completado ? 'desmarcado' : 'marcado como completado'}.`,
      })
    }
  }

  const cerrarDialog = () => {
    setDialogAbierto(false)
    setEditandoEvento(null)
    setNuevoEvento({
      titulo: "",
      descripcion: "",
      fecha: "",
      hora: "",
      duracion: "",
      ubicacion: "",
      responsable: "",
      completado: false
    })
  }

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const totalEventos = eventos.length
  const completados = eventos.filter(e => e.completado).length

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Eventos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEventos}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completados}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progreso</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {totalEventos > 0 ? Math.round((completados / totalEventos) * 100) : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botón para agregar evento */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary">Cronograma del Día</h1>
          <p className="text-muted-foreground">Planifica cada momento de tu boda especial</p>
        </div>
        
        <Dialog open={dialogAbierto} onOpenChange={setDialogAbierto}>
          <DialogTrigger asChild>
            <Button className="gradient-rose text-white" onClick={() => setDialogAbierto(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editandoEvento ? 'Editar Evento' : 'Agregar Nuevo Evento'}
              </DialogTitle>
              <DialogDescription>
                {editandoEvento 
                  ? 'Modifica los datos del evento.' 
                  : 'Completa la información del nuevo evento.'
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="titulo" className="text-right">
                  Título
                </Label>
                <Input
                  id="titulo"
                  value={nuevoEvento.titulo}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, titulo: e.target.value})}
                  className="col-span-3"
                  placeholder="Nombre del evento"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="descripcion" className="text-right">
                  Descripción
                </Label>
                <Textarea
                  id="descripcion"
                  value={nuevoEvento.descripcion}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, descripcion: e.target.value})}
                  className="col-span-3"
                  placeholder="Describe el evento"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fecha" className="text-right">
                  Fecha
                </Label>
                <Input
                  id="fecha"
                  type="date"
                  value={nuevoEvento.fecha}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, fecha: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hora" className="text-right">
                  Hora
                </Label>
                <Input
                  id="hora"
                  type="time"
                  value={nuevoEvento.hora}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, hora: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duracion" className="text-right">
                  Duración
                </Label>
                <Input
                  id="duracion"
                  value={nuevoEvento.duracion}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, duracion: e.target.value})}
                  className="col-span-3"
                  placeholder="Ej: 2 horas"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ubicacion" className="text-right">
                  Ubicación
                </Label>
                <Input
                  id="ubicacion"
                  value={nuevoEvento.ubicacion}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, ubicacion: e.target.value})}
                  className="col-span-3"
                  placeholder="Lugar del evento"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="responsable" className="text-right">
                  Responsable
                </Label>
                <Input
                  id="responsable"
                  value={nuevoEvento.responsable}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, responsable: e.target.value})}
                  className="col-span-3"
                  placeholder="Persona a cargo"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={cerrarDialog}>
                Cancelar
              </Button>
              <Button onClick={editandoEvento ? guardarEdicion : agregarEvento}>
                {editandoEvento ? 'Guardar Cambios' : 'Agregar Evento'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cronograma de eventos */}
      <div className="space-y-4">
        {eventos.map((evento, index) => (
          <Card key={evento.id} className={`bg-white/70 backdrop-blur-sm hover:shadow-md transition-shadow ${evento.completado ? 'opacity-75' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center mt-1">
                    <div className={`w-4 h-4 rounded-full ${evento.completado ? 'bg-green-500' : 'bg-gray-300'}`} />
                    {index < eventos.length - 1 && (
                      <div className="w-0.5 h-16 bg-gray-200 mt-2" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-semibold text-lg ${evento.completado ? 'line-through text-muted-foreground' : ''}`}>
                        {evento.titulo}
                      </h3>
                      {evento.completado && (
                        <Badge className="bg-green-100 text-green-700">Completado</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{evento.descripcion}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatearFecha(evento.fecha)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {evento.hora}
                        {evento.duracion && ` (${evento.duracion})`}
                      </div>
                      {evento.ubicacion && (
                        <div>📍 {evento.ubicacion}</div>
                      )}
                      {evento.responsable && (
                        <div>👤 {evento.responsable}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleCompletado(evento.id)}
                  >
                    <CheckCircle className={`h-4 w-4 ${evento.completado ? 'text-green-500' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => editarEvento(evento)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => eliminarEvento(evento.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {eventos.length === 0 && (
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay eventos en el cronograma aún</h3>
              <p className="text-muted-foreground mb-4">
                Comienza agregando los eventos para planificar tu día perfecto.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Cronograma
