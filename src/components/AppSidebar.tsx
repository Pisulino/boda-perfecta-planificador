
import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { 
  Users, 
  Calendar, 
  User, 
  Utensils, 
  Image, 
  Music, 
  UserCheck,
  MapPin,
  Palette,
  Home
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Invitados", url: "/invitados", icon: Users },
  { title: "Lugar", url: "/lugar", icon: MapPin },
  { title: "Flores", url: "/flores", icon: Palette },
  { title: "Comida", url: "/comida", icon: Utensils },
  { title: "Fotografía", url: "/fotografia", icon: Image },
  { title: "Música", url: "/musica", icon: Music },
  { title: "Estilistas", url: "/estilistas", icon: User },
  { title: "Cronograma", url: "/cronograma", icon: Calendar },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-primary font-medium" : "hover:bg-sidebar-accent/50"

  return (
    <Sidebar
      collapsible="icon"
    >
      <div className="p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-sidebar-primary">
              Mi Boda
            </h1>
            <p className="text-sm text-sidebar-foreground/70 mt-1">
              Organizador de eventos
            </p>
          </div>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-primary font-medium">
            Planificación
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
