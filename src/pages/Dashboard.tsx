
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

const Dashboard = () => {
  const sections = [
    { 
      title: "Invitados", 
      icon: Users, 
      completed: 5, 
      total: 100, 
      status: "En progreso",
      color: "bg-pink-100 text-pink-700"
    },
    { 
      title: "Lugar", 
      icon: MapPin, 
      completed: 1, 
      total: 1, 
      status: "Completado",
      color: "bg-green-100 text-green-700"
    },
    { 
      title: "Flores", 
      icon: Palette, 
      completed: 0, 
      total: 3, 
      status: "Pendiente",
      color: "bg-gray-100 text-gray-700"
    },
    { 
      title: "Comida", 
      icon: Utensils, 
      completed: 2, 
      total: 5, 
      status: "En progreso",
      color: "bg-yellow-100 text-yellow-700"
    },
    { 
      title: "Fotografía", 
      icon: Image, 
      completed: 1, 
      total: 2, 
      status: "En progreso",
      color: "bg-blue-100 text-blue-700"
    },
    { 
      title: "Música", 
      icon: Music, 
      completed: 0, 
      total: 2, 
      status: "Pendiente",
      color: "bg-purple-100 text-purple-700"
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
