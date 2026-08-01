import { BarChart3, BookOpen, FilePlus2, Home, Layers3, Settings } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

const navigation = [
  { to: '/', label: '首页', icon: Home, end: true },
  { to: '/study', label: '学习', icon: BookOpen },
  { to: '/deck', label: '牌组', icon: Layers3 },
  { to: '/stats', label: '统计', icon: BarChart3 },
  { to: '/settings', label: '设置', icon: Settings },
  { to: '/import', label: '拆卡', icon: FilePlus2 }
]

export function AppShell() {
  return (
    <div className="app-shell">
      <aside className="side-rail">
        <NavLink className="brand" to="/" aria-label="RecallStack 首页">
          <span className="brand-mark">R</span>
          <span>
            <strong>RecallStack</strong>
            <small>Java memory lab</small>
          </span>
        </NavLink>
        <nav className="side-nav" aria-label="主导航">
          {navigation.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="rail-note">
          <span>LOCAL FIRST</span>
          <p>学习记录只保存在当前浏览器。</p>
        </div>
      </aside>
      <main className="main-content"><Outlet /></main>
      <nav className="bottom-nav" aria-label="移动端主导航">
        {navigation.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => isActive ? 'bottom-nav-item active' : 'bottom-nav-item'}>
            <Icon size={20} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
