
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Edit, Users, UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLocalStorage } from "@/hooks/useLocalStorage"

interface Invitado {
  id: string
  nombre: string
  apellidos: string
  email?: string
  telefono?: string
  confirmado: 'pendiente' | 'confirmado' | 'rechazado'
  acompanantes: number
}

const Invitados = () => {
  const { toast } = useToast()
  const [invitados, setInvitados] = useLocalStorage<Invitado[]>('wedding-invitados', [
    {
      id: "1",
      nombre: "María",
      apellidos: "García López",
      email: "maria@email.com",
      confirmado: "confirmado",
      acompanantes: 1
    },
    {
      id: "2",
      nombre: "Juan",
      apellidos: "Martínez Ruiz",
      email: "juan@email.com",
      confirmado: "pendiente",
      acompanantes: 0
    }
  ])

  const [nuevoInvitado, setNuevoInvitado] = useState<Omit<Invitado, 'id'>>({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    confirmado: "pendiente",
    acompanantes: 0
  })

  const [editandoInvitado, setEditandoInvitado] = useState<Invitado | null>(null)
  const [dialogAbierto, setDialogAbierto] = useState(false)

  const agregarInvitado = () => {
    if (nuevoInvitado.nombre && nuevoInvitado.apellidos) {
      const invitado: Invitado = {
        ...nuevoInvitado,
        id: Date.now().toString()
      }
      setInvitados([...invitados, invitado])
      setNuevoInvitado({
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        confirmado: "pendiente",
        acompanantes: 0
      })
      setDialogAbierto(false)
      toast({
        title: "Invitado agregado",
        description: `${invitado.nombre} ${invitado.apellidos} ha sido agregado a la lista.`,
      })
    }
  }

  const editarInvitado = (invitado: Invitado) => {
    setEditandoInvitado(invitado)
    setNuevoInvitado(invitado)
    setDialogAbierto(true)
  }

  const guardarEdicion = () => {
    if (editandoInvitado && nuevoInvitado.nombre && nuevoInvitado.apellidos) {
      setInvitados(invitados.map(inv => 
        inv.id === editandoInvitado.id 
          ? { ...nuevoInvitado, id: editandoInvitado.id }
          : inv
      ))
      setEditandoInvitado(null)
      setNuevoInvitado({
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        confirmado: "pendiente",
        acompanantes: 0
      })
      setDialogAbierto(false)
      toast({
        title: "Invitado actualizado",
        description: "Los datos del invitado han sido actualizados correctamente.",
      })
    }
  }

  const eliminarInvitado = (id: string) => {
    setInvitados(invitados.filter(inv => inv.id !== id))
    toast({
      title: "Invitado eliminado",
      description: "El invitado ha sido eliminado de la lista.",
      variant: "destructive"
    })
  }

  const cerrarDialog = () => {
    setDialogAbierto(false)
    setEditandoInvitado(null)
    setNuevoInvitado({
      nombre: "",
      apellidos: "",
      email: "",
      telefono: "",
      confirmado: "pendiente",
      acompanantes: 0
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmado':
        return <Badge className="bg-green-100 text-green-700">Confirmado</Badge>
      case 'rechazado':
        return <Badge className="bg-red-100 text-red-700">Rechazado</Badge>
      default:
        return <Badge className="bg-yellow-100 text-yellow-700">Pendiente</Badge>
    }
  }

  const totalInvitados = invitados.length
  const totalAcompanantes = invitados.reduce((sum, inv) => sum + inv.acompanantes, 0)
  const confirmados = invitados.filter(inv => inv.confirmado === 'confirmado').length

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invitados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInvitados}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
            <UserPlus className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{confirmados}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Asistentes</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalInvitados + totalAcompanantes}</div>
          </CardContent>
        </Card>
      </div>

      {/* Botón para agregar invitado */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary">Lista de Invitados</h1>
          <p className="text-muted-foreground">Gestiona a todos los invitados de tu boda</p>
        </div>
        
        <Dialog open={dialogAbierto} onOpenChange={setDialogAbierto}>
          <DialogTrigger asChild>
            <Button className="gradient-rose text-white" onClick={() => setDialogAbierto(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Agregar Invitado
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editandoInvitado ? 'Editar Invitado' : 'Agregar Nuevo Invitado'}
              </DialogTitle>
              <DialogDescription>
                {editandoInvitado 
                  ? 'Modifica los datos del invitado.' 
                  : 'Completa la información del nuevo invitado.'
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  value={nuevoInvitado.nombre}
                  onChange={(e) => setNuevoInvitado({...nuevoInvitado, nombre: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="apellidos" className="text-right">
                  Apellidos
                </Label>
                <Input
                  id="apellidos"
                  value={nuevoInvitado.apellidos}
                  onChange={(e) => setNuevoInvitado({...nuevoInvitado, apellidos: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={nuevoInvitado.email}
                  onChange={(e) => setNuevoInvitado({...nuevoInvitado, email: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="acompanantes" className="text-right">
                  Acompañantes
                </Label>
                <Input
                  id="acompanantes"
                  type="number"
                  min="0"
                  value={nuevoInvitado.acompanantes}
                  onChange={(e) => setNuevoInvitado({...nuevoInvitado, acompanantes: parseInt(e.target.value) || 0})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="confirmado" className="text-right">
                  Estado
                </Label>
                <Select 
                  value={nuevoInvitado.confirmado} 
                  onValueChange={(value: 'pendiente' | 'confirmado' | 'rechazado') => 
                    setNuevoInvitado({...nuevoInvitado, confirmado: value})
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="confirmado">Confirmado</SelectItem>
                    <SelectItem value="rechazado">Rechazado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={cerrarDialog}>
                Cancelar
              </Button>
              <Button onClick={editandoInvitado ? guardarEdicion : agregarInvitado}>
                {editandoInvitado ? 'Guardar Cambios' : 'Agregar Invitado'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de invitados */}
      <div className="grid gap-4">
        {invitados.map((invitado) => (
          <Card key={invitado.id} className="bg-white/70 backdrop-blur-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {invitado.nombre} {invitado.apellidos}
                      </h3>
                      {invitado.email && (
                        <p className="text-sm text-muted-foreground">{invitado.email}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(invitado.confirmado)}
                      {invitado.acompanantes > 0 && (
                        <Badge variant="outline">
                          +{invitado.acompanantes} acompañante{invitado.acompanantes > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => editarInvitado(invitado)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => eliminarInvitado(invitado.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {invitados.length === 0 && (
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay invitados aún</h3>
              <p className="text-muted-foreground mb-4">
                Comienza agregando a tus primeros invitados para tu boda especial.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Invitados
