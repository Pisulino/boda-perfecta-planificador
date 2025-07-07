
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Edit, Utensils, Plus, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLocalStorage } from "@/hooks/useLocalStorage"

interface Menu {
  id: string
  tipo: 'entrada' | 'plato_principal' | 'postre' | 'bebida'
  nombre: string
  descripcion: string
  proveedor?: string
  precio?: number
  confirmado: boolean
  alergenos?: string
}

const Comida = () => {
  const { toast } = useToast()
  const [menus, setMenus] = useLocalStorage<Menu[]>('wedding-comida', [
    {
      id: "1",
      tipo: "entrada",
      nombre: "Ensalada de rúcula",
      descripcion: "Con queso de cabra y nueces",
      proveedor: "Catering Premium",
      precio: 25000,
      confirmado: true
    },
    {
      id: "2",
      tipo: "plato_principal", 
      nombre: "Salmón a la plancha",
      descripcion: "Con vegetales al vapor",
      proveedor: "Catering Premium",
      precio: 45000,
      confirmado: false
    }
  ])

  const [nuevoMenu, setNuevoMenu] = useState<Omit<Menu, 'id'>>({
    tipo: "entrada",
    nombre: "",
    descripcion: "",
    proveedor: "",
    precio: 0,
    confirmado: false,
    alergenos: ""
  })

  const [editandoMenu, setEditandoMenu] = useState<Menu | null>(null)
  const [dialogAbierto, setDialogAbierto] = useState(false)

  const agregarMenu = () => {
    if (nuevoMenu.nombre && nuevoMenu.descripcion) {
      const menu: Menu = {
        ...nuevoMenu,
        id: Date.now().toString()
      }
      setMenus([...menus, menu])
      setNuevoMenu({
        tipo: "entrada",
        nombre: "",
        descripcion: "",
        proveedor: "",
        precio: 0,
        confirmado: false,
        alergenos: ""
      })
      setDialogAbierto(false)
      toast({
        title: "Menú agregado",
        description: `${menu.nombre} ha sido agregado a la lista.`,
      })
    }
  }

  const editarMenu = (menu: Menu) => {
    setEditandoMenu(menu)
    setNuevoMenu(menu)
    setDialogAbierto(true)
  }

  const guardarEdicion = () => {
    if (editandoMenu && nuevoMenu.nombre && nuevoMenu.descripcion) {
      setMenus(menus.map(m => 
        m.id === editandoMenu.id 
          ? { ...nuevoMenu, id: editandoMenu.id }
          : m
      ))
      setEditandoMenu(null)
      setNuevoMenu({
        tipo: "entrada",
        nombre: "",
        descripcion: "",
        proveedor: "",
        precio: 0,
        confirmado: false,
        alergenos: ""
      })
      setDialogAbierto(false)
      toast({
        title: "Menú actualizado",
        description: "Los datos del menú han sido actualizados correctamente.",
      })
    }
  }

  const eliminarMenu = (id: string) => {
    setMenus(menus.filter(m => m.id !== id))
    toast({
      title: "Menú eliminado",
      description: "El elemento del menú ha sido eliminado de la lista.",
      variant: "destructive"
    })
  }

  const cerrarDialog = () => {
    setDialogAbierto(false)
    setEditandoMenu(null)
    setNuevoMenu({
      tipo: "entrada",
      nombre: "",
      descripcion: "",
      proveedor: "",
      precio: 0,
      confirmado: false,
      alergenos: ""
    })
  }

  const getTipoBadge = (tipo: string) => {
    const colors = {
      entrada: "bg-blue-100 text-blue-700",
      plato_principal: "bg-red-100 text-red-700",
      postre: "bg-pink-100 text-pink-700",
      bebida: "bg-green-100 text-green-700"
    }
    const labels = {
      entrada: "Entrada",
      plato_principal: "Plato Principal",
      postre: "Postre",
      bebida: "Bebida"
    }
    return <Badge className={colors[tipo as keyof typeof colors]}>{labels[tipo as keyof typeof labels]}</Badge>
  }

  const totalPresupuesto = menus.reduce((sum, m) => sum + (m.precio || 0), 0)
  const confirmados = menus.filter(m => m.confirmado).length

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Platos</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{menus.length}</div>
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
            <Utensils className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${totalPresupuesto.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Botón para agregar menú */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary">Menú y Catering</h1>
          <p className="text-muted-foreground">Gestiona todo el menú para tu boda</p>
        </div>
        
        <Dialog open={dialogAbierto} onOpenChange={setDialogAbierto}>
          <DialogTrigger asChild>
            <Button className="gradient-rose text-white" onClick={() => setDialogAbierto(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Plato
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editandoMenu ? 'Editar Plato' : 'Agregar Nuevo Plato'}
              </DialogTitle>
              <DialogDescription>
                {editandoMenu 
                  ? 'Modifica los datos del plato.' 
                  : 'Completa la información del nuevo plato.'
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tipo" className="text-right">
                  Tipo
                </Label>
                <Select 
                  value={nuevoMenu.tipo} 
                  onValueChange={(value: 'entrada' | 'plato_principal' | 'postre' | 'bebida') => 
                    setNuevoMenu({...nuevoMenu, tipo: value})
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entrada">Entrada</SelectItem>
                    <SelectItem value="plato_principal">Plato Principal</SelectItem>
                    <SelectItem value="postre">Postre</SelectItem>
                    <SelectItem value="bebida">Bebida</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  value={nuevoMenu.nombre}
                  onChange={(e) => setNuevoMenu({...nuevoMenu, nombre: e.target.value})}
                  className="col-span-3"
                  placeholder="Nombre del plato"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="descripcion" className="text-right">
                  Descripción
                </Label>
                <Textarea
                  id="descripcion"
                  value={nuevoMenu.descripcion}
                  onChange={(e) => setNuevoMenu({...nuevoMenu, descripcion: e.target.value})}
                  className="col-span-3"
                  placeholder="Describe el plato"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="proveedor" className="text-right">
                  Proveedor
                </Label>
                <Input
                  id="proveedor"
                  value={nuevoMenu.proveedor}
                  onChange={(e) => setNuevoMenu({...nuevoMenu, proveedor: e.target.value})}
                  className="col-span-3"
                  placeholder="Nombre del catering"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="precio" className="text-right">
                  Precio
                </Label>
                <Input
                  id="precio"
                  type="number"
                  value={nuevoMenu.precio}
                  onChange={(e) => setNuevoMenu({...nuevoMenu, precio: parseInt(e.target.value) || 0})}
                  className="col-span-3"
                  placeholder="0"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={cerrarDialog}>
                Cancelar
              </Button>
              <Button onClick={editandoMenu ? guardarEdicion : agregarMenu}>
                {editandoMenu ? 'Guardar Cambios' : 'Agregar Plato'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de menús */}
      <div className="grid gap-4">
        {menus.map((menu) => (
          <Card key={menu.id} className="bg-white/70 backdrop-blur-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{menu.nombre}</h3>
                      <p className="text-sm text-muted-foreground">{menu.descripcion}</p>
                      {menu.proveedor && (
                        <p className="text-sm text-muted-foreground">Proveedor: {menu.proveedor}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {getTipoBadge(menu.tipo)}
                      {menu.confirmado ? (
                        <Badge className="bg-green-100 text-green-700">Confirmado</Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-700">Pendiente</Badge>
                      )}
                      {menu.precio && (
                        <Badge variant="outline">
                          ${menu.precio.toLocaleString()}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => editarMenu(menu)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => eliminarMenu(menu.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {menus.length === 0 && (
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Utensils className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay platos en el menú aún</h3>
              <p className="text-muted-foreground mb-4">
                Comienza agregando los platos para el menú de tu boda.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Comida
