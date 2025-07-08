
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  MapPin, 
  Palette, 
  Utensils, 
  Image, 
  Music, 
  User, 
  Calendar,
  CheckCircle
} from "lucide-react"
import { useLocalStorage } from "@/hooks/useLocalStorage"

const Dashboard = () => {
  // Leer datos reales de localStorage
  const [invitados] = useLocalStorage('wedding-invitados', [])
  const [lugares] = useLocalStorage('wedding-lugares', [])
  const [flores] = useLocalStorage('wedding-flores', [])
  const [comida] = useLocalStorage('wedding-comida', [])
  const [fotografia] = useLocalStorage('wedding-fotografia', [])
  const [musica] = useLocalStorage('wedding-musica', [])
  const [estilistas] = useLocalStorage('wedding-estilistas', [])
  const [cronograma] = useLocalStorage('wedding-cronograma', [])

  // Calcular estadísticas dinámicamente
  const getStatus = (completed: number, total: number) => {
    if (total === 0) return { status: "Sin datos", color: "bg-gray-100 text-gray-700" }
    if (completed === total) return { status: "Completado", color: "bg-green-100 text-green-700" }
    if (completed > 0) return { status: "En progreso", color: "bg-yellow-100 text-yellow-700" }
    return { status: "Pendiente", color: "bg-gray-100 text-gray-700" }
  }

  const invitadosConfirmados = invitados.filter(i => i.confirmado).length
  const lugaresConfirmados = lugares.filter(l => l.confirmado).length
  const floresConfirmadas = flores.filter(f => f.confirmado).length
  const comidaConfirmada = comida.filter(c => c.confirmado).length
  const fotografiaConfirmada = fotografia.filter(f => f.confirmado).length
  const musicaConfirmada = musica.filter(m => m.confirmado).length

  const sections = [
    { 
      title: "Invitados", 
      icon: Users, 
      completed: invitadosConfirmados, 
      total: invitados.length, 
      ...getStatus(invitadosConfirmados, invitados.length)
    },
    { 
      title: "Lugar", 
      icon: MapPin, 
      completed: lugaresConfirmados, 
      total: lugares.length, 
      ...getStatus(lugaresConfirmados, lugares.length)
    },
    { 
      title: "Flores", 
      icon: Palette, 
      completed: floresConfirmadas, 
      total: flores.length, 
      ...getStatus(floresConfirmadas, flores.length)
    },
    { 
      title: "Comida", 
      icon: Utensils, 
      completed: comidaConfirmada, 
      total: comida.length, 
      ...getStatus(comidaConfirmada, comida.length)
    },
    { 
      title: "Fotografía", 
      icon: Image, 
      completed: fotografiaConfirmada, 
      total: fotografia.length, 
      ...getStatus(fotografiaConfirmada, fotografia.length)
    },
    { 
      title: "Música", 
      icon: Music, 
      completed: musicaConfirmada, 
      total: musica.length, 
      ...getStatus(musicaConfirmada, musica.length)
    },
  ]

  const totalProgress = sections.reduce((acc, section) => 
    acc + (section.completed / section.total * 100), 0
  ) / sections.length

  return (
    <div className="space-y-8">
      {/* Header con progreso general */}
      <div className="text-center space-y-4">
        <h1 className="font-display text-4xl font-bold text-primary">
          ¡Bienvenidos a su boda de ensueño!
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Organiza cada detalle de tu día especial de manera sencilla e intuitiva
        </p>
        
        <Card className="max-w-md mx-auto gradient-rose text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Progreso General</CardTitle>
            <CardDescription className="text-white/80">
              {Math.round(totalProgress)}% completado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={totalProgress} className="bg-white/20" />
          </CardContent>
        </Card>
      </div>

      {/* Grid de secciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => {
          const Icon = section.icon
          const progress = (section.completed / section.total) * 100
          
          return (
            <Card key={section.title} className="hover:shadow-lg transition-shadow bg-white/70 backdrop-blur-sm border-white/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  {section.title}
                </CardTitle>
                <Icon className="h-6 w-6 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">
                      {section.completed}/{section.total}
                    </span>
                    <Badge className={section.color}>
                      {section.status}
                    </Badge>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    {progress === 100 ? "¡Completado!" : `${Math.round(progress)}% completado`}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Próximas tareas */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Próximas tareas importantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-accent/20 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Confirmar lugar de ceremonia</p>
                <p className="text-sm text-muted-foreground">Fecha límite: En 3 días</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <Users className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium">Enviar invitaciones</p>
                <p className="text-sm text-muted-foreground">Fecha límite: En 1 semana</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
              <Palette className="h-5 w-5 text-pink-600" />
              <div>
                <p className="font-medium">Seleccionar arreglos florales</p>
                <p className="text-sm text-muted-foreground">Fecha límite: En 2 semanas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
