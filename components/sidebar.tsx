"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import styles from './sidebar.module.scss'

type SidebarItem = {
  title: string
  href: string
  icon?: React.ReactNode
  submenu?: SidebarItem[]
}

const sidebarItems: SidebarItem[] = [
  { title: 'Dashboard', href: '/', icon: <Menu /> },
  { title: 'Players', href: '/players', icon: <Menu /> },
  { 
    title: 'Games', 
    href: '/games', 
    icon: <Menu />,
    submenu: [
      { title: 'Recent Games', href: '/games/recent' },
      { title: 'Game Stats', href: '/games/stats' },
    ]
  },
  { title: 'Tournaments', href: '/tournaments', icon: <Menu /> },
  { title: 'Clubs', href: '/clubs', icon: <Menu /> },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => setIsOpen(!isOpen)

  const SidebarItem = ({ item, depth = 0 }: { item: SidebarItem, depth?: number }) => {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
    const isActive = pathname === item.href

    return (
      <div className={styles.sidebarItem}>
        <Link 
          href={item.href}
          className={cn(
            styles.sidebarLink,
            isActive && styles.active,
            `pl-${depth * 4 + 4}`
          )}
          onClick={() => item.submenu && setIsSubmenuOpen(!isSubmenuOpen)}
        >
          {item.icon}
          <span>{item.title}</span>
          {item.submenu && (
            isSubmenuOpen ? <ChevronDown className={styles.submenuIcon} /> : <ChevronRight className={styles.submenuIcon} />
          )}
        </Link>
        {item.submenu && isSubmenuOpen && (
          <div className={styles.submenu}>
            {item.submenu.map((subItem) => (
              <SidebarItem key={subItem.href} item={subItem} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <button onClick={toggleSidebar} className={styles.toggleButton}>
        <Menu />
      </button>
      <div className={cn(styles.sidebar, isOpen && styles.open)}>
        <button onClick={toggleSidebar} className={styles.closeButton}>
          <X />
        </button>
        <div className={styles.sidebarContent}>
          {sidebarItems.map((item) => (
            <SidebarItem key={item.href} item={item} />
          ))}
        </div>
      </div>
    </>
  )
}

