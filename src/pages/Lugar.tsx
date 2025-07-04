
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, Phone, Mail, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface LugarEvento {
  id: string
  nombre: string
  direccion: string
  contacto: string
  telefono: string
  email: string
  capacidad: number
  precio: string
  notas: string
  confirmado: boolean
}

const Lugar = () => {
  const { toast } = useToast()
  const [lugares, setLugares] = useState<LugarEvento[]>([
    {
      id: "1",
      nombre: "Hacienda Los Rosales",
      direccion: "Calle Principal 123, Ciudad",
      contacto: "María González",
      telefono: "+34 123 456 789",
      email: "eventos@losrosales.com",
      capacidad: 150,
      precio: "€3,500",
      notas: "Incluye decoración básica y jardines exteriores",
      confirmado: true
    }
  ])

  const [nuevoLugar, setNuevoLugar] = useState<Omit<LugarEvento, 'id'>>({
    nombre: "",
    direccion: "",
    contacto: "",
    telefono: "",
    email: "",
    capacidad: 0,
    precio: "",
    notas: "",
    confirmado: false
  })

  const [editando, setEditando] = useState<string | null>(null)

  const agregarLugar = () => {
    if (nuevoLugar.nombre && nuevoLugar.direccion) {
      const lugar: LugarEvento = {
        ...nuevoLugar,
        id: Date.now().toString()
      }
      setLugares([...lugares, lugar])
      setNuevoLugar({
        nombre: "",
        direccion: "",
        contacto: "",
        telefono: "",
        email: "",
        capacidad: 0,
        precio: "",
        notas: "",
        confirmado: false
      })
      toast({
        title: "Lugar agregado",
        description: `${lugar.nombre} ha sido agregado a tu lista de lugares.`,
      })
    }
  }

  const confirmarLugar = (id: string) => {
    setLugares(lugares.map(lugar => 
      lugar.id === id 
        ? { ...lugar, confirmado: !lugar.confirmado }
        : lugar
    ))
    toast({
      title: "Estado actualizado",
      description: "El estado del lugar ha sido actualizado.",
    })
  }

  const eliminarLugar = (id: string) => {
    setLugares(lugares.filter(lugar => lugar.id !== id))
    toast({
      title: "Lugar eliminado",
      description: "El lugar ha sido eliminado de tu lista.",
      variant: "destructive"
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-primary">Lugares</h1>
        <p className="text-muted-foreground">Gestiona los lugares para tu ceremonia y celebración</p>
      </div>

      {/* Formulario para agregar lugar */}
      <Card className="bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Agregar Nuevo Lugar</CardTitle>
          <CardDescription>
            Registra un lugar potencial para tu boda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del lugar</Label>
              <Input
                id="nombre"
                value={nuevoLugar.nombre}
                onChange={(e) => setNuevoLugar({...nuevoLugar, nombre: e.target.value})}
                placeholder="Ej: Hacienda Los Rosales"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contacto">Persona de contacto</Label>
              <Input
                id="contacto"
                value={nuevoLugar.contacto}
                onChange={(e) => setNuevoLugar({...nuevoLugar, contacto: e.target.value})}
                placeholder="Ej: María González"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                value={nuevoLugar.direccion}
                onChange={(e) => setNuevoLugar({...nuevoLugar, direccion: e.target.value})}
                placeholder="Calle Principal 123, Ciudad"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                value={nuevoLugar.telefono}
                onChange={(e) => setNuevoLugar({...nuevoLugar, telefono: e.target.value})}
                placeholder="+34 123 456 789"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={nuevoLugar.email}
                onChange={(e) => setNuevoLugar({...nuevoLugar, email: e.target.value})}
                placeholder="eventos@lugar.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacidad">Capacidad</Label>
              <Input
                id="capacidad"
                type="number"
                value={nuevoLugar.capacidad}
                onChange={(e) => setNuevoLugar({...nuevoLugar, capacidad: parseInt(e.target.value) || 0})}
                placeholder="150"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="precio">Precio</Label>
              <Input
                id="precio"
                value={nuevoLugar.precio}
                onChange={(e) => setNuevoLugar({...nuevoLugar, precio: e.target.value})}
                placeholder="€3,500"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notas">Notas adicionales</Label>
              <Textarea
                id="notas"
                value={nuevoLugar.notas}
                onChange={(e) => setNuevoLugar({...nuevoLugar, notas: e.target.value})}
                placeholder="Incluye decoración básica, jardines exteriores..."
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={agregarLugar} className="gradient-rose text-white">
              <MapPin className="mr-2 h-4 w-4" />
              Agregar Lugar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de lugares */}
      <div className="grid gap-4">
        {lugares.map((lugar) => (
          <Card key={lugar.id} className="bg-white/70 backdrop-blur-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-display text-xl font-semibold text-primary">
                      {lugar.nombre}
                    </h3>
                    {lugar.confirmado && (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Confirmado
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-muted-foreground mb-1">
                    <MapPin className="h-4 w-4 mr-2" />
                    {lugar.direccion}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={lugar.confirmado ? "default" : "outline"}
                    size="sm"
                    onClick={() => confirmarLugar(lugar.id)}
                    className={lugar.confirmado ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {lugar.confirmado ? "Confirmado" : "Confirmar"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => eliminarLugar(lugar.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {lugar.contacto && (
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium mr-2">Contacto:</span>
                      {lugar.contacto}
                    </div>
                  )}
                  {lugar.telefono && (
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium mr-2">Teléfono:</span>
                      <a href={`tel:${lugar.telefono}`} className="text-primary hover:underline">
                        {lugar.telefono}
                      </a>
                    </div>
                  )}
                  {lugar.email && (
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium mr-2">Email:</span>
                      <a href={`mailto:${lugar.email}`} className="text-primary hover:underline">
                        {lugar.email}
                      </a>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  {lugar.capacidad > 0 && (
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium mr-2">Capacidad:</span>
                      {lugar.capacidad} personas
                    </div>
                  )}
                  {lugar.precio && (
                    <div className="flex items-center text-sm">
                      <span className="font-medium mr-2">Precio:</span>
                      <Badge className="bg-accent text-accent-foreground">
                        {lugar.precio}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {lugar.notas && (
                <div className="mt-4 p-3 bg-accent/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Notas:</span> {lugar.notas}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {lugares.length === 0 && (
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay lugares registrados</h3>
              <p className="text-muted-foreground mb-4">
                Comienza agregando lugares potenciales para tu boda.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Lugar
