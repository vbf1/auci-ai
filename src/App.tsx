import { Activity, ArrowUpRight, Bot, Boxes, CalendarDays, ChartNoAxesCombined, CircleHelp, Command, LayoutDashboard, MessageSquareText, Package, Plus, Search, Settings2, ShieldCheck, Users, Wallet } from 'lucide-react'

const nav = [
  { label: 'Visão geral', icon: LayoutDashboard, active: true },
  { label: 'Funcionário virtual', icon: Bot },
  { label: 'Clientes', icon: Users },
  { label: 'Vendas', icon: Wallet },
  { label: 'Produtos e estoque', icon: Package },
  { label: 'Agenda e tarefas', icon: CalendarDays },
  { label: 'Relatórios', icon: ChartNoAxesCombined },
]

function App() {
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Bot size={21}/></div><div><strong>auci<span>ai</span></strong><small>FUNCIONÁRIO VIRTUAL</small></div></div>
      <div className="workspace"><div className="workspace-avatar">E</div><div><strong>Minha empresa</strong><small>Plano inicial</small></div><span className="chevron">⌄</span></div>
      <div className="nav-caption">ESPAÇO DE TRABALHO</div>
      <nav>{nav.map(({label,icon:Icon,active})=><a className={active?'nav-link active':'nav-link'} href="#" key={label}><Icon size={18}/><span>{label}</span>{label==='Funcionário virtual'&&<i className="new-dot"/>}</a>)}</nav>
      <div className="sidebar-bottom"><a className="nav-link" href="#"><Activity size={18}/><span>Atividade da IA</span></a><a className="nav-link" href="#"><ShieldCheck size={18}/><span>Equipe e permissões</span></a><a className="nav-link" href="#"><Settings2 size={18}/><span>Configurações</span></a><div className="profile"><div className="profile-avatar">U</div><div><strong>Seu perfil</strong><small>Administrador</small></div><CircleHelp size={17}/></div></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><div className="breadcrumb">Auci AI <span>/</span> Visão geral</div><div className="top-actions"><button className="icon-button" aria-label="Ajuda"><CircleHelp size={18}/></button><div className="user-pill"><div className="profile-avatar small">U</div><span>Administrador</span></div></div></header>
      <section className="page-content">
        <div className="welcome-row"><div><div className="eyebrow">QUARTA-FEIRA · SEU PAINEL</div><h1>Olá! Vamos cuidar da sua empresa?</h1><p>Seu espaço de trabalho está sendo preparado. Comece conversando com seu funcionário virtual.</p></div><button className="primary-button"><Plus size={17}/> Nova ação</button></div>
        <div className="assistant-banner"><div className="assistant-icon"><Bot size={27}/></div><div className="assistant-copy"><div className="assistant-label"><span className="status-dot"/> FUNCIONÁRIO VIRTUAL</div><h2>Seu negócio, com um assistente sempre pronto.</h2><p>Peça para consultar informações, organizar tarefas e preparar operações. Ações importantes pedirão sua confirmação.</p><button className="banner-button">Conversar com Auci <ArrowUpRight size={16}/></button></div><div className="banner-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="bot-glow"><Bot size={66}/></div><span className="sparkle s1">✳</span><span className="sparkle s2">✦</span></div></div>
        <div className="section-heading"><div><h3>Visão geral</h3><p>Os indicadores aparecerão aqui quando seus dados estiverem conectados.</p></div><span className="period-chip">Este mês <span>⌄</span></span></div>
        <div className="stats-grid"><div className="stat-card"><div className="stat-top"><span>Vendas</span><Wallet size={18}/></div><strong>—</strong><small>Sem dados registrados</small></div><div className="stat-card"><div className="stat-top"><span>Clientes</span><Users size={18}/></div><strong>—</strong><small>Cadastre seus primeiros clientes</small></div><div className="stat-card"><div className="stat-top"><span>Produtos</span><Boxes size={18}/></div><strong>—</strong><small>Seu estoque aparecerá aqui</small></div><div className="stat-card"><div className="stat-top"><span>Tarefas pendentes</span><CalendarDays size={18}/></div><strong>—</strong><small>Organize sua rotina</small></div></div>
        <div className="lower-grid"><div className="panel"><div className="panel-heading"><div><h3>Comece por aqui</h3><p>Prepare seu espaço de trabalho</p></div><Command size={18}/></div><div className="setup-list"><div className="setup-item"><div className="setup-number">1</div><div><strong>Configure sua empresa</strong><small>Adicione os dados básicos do negócio.</small></div><ArrowUpRight size={16}/></div><div className="setup-item"><div className="setup-number">2</div><div><strong>Cadastre seus clientes</strong><small>Organize seus contatos em um só lugar.</small></div><ArrowUpRight size={16}/></div><div className="setup-item"><div className="setup-number">3</div><div><strong>Conheça seu funcionário virtual</strong><small>Veja como a Auci poderá ajudar no dia a dia.</small></div><ArrowUpRight size={16}/></div></div></div><div className="panel activity-panel"><div className="panel-heading"><div><h3>Atividade recente</h3><p>Acompanhe o que acontece na sua empresa</p></div><Activity size={18}/></div><div className="empty-state"><div className="empty-icon"><MessageSquareText size={22}/></div><strong>Nenhuma atividade por enquanto</strong><small>Quando você começar a usar a Auci, suas atividades aparecerão aqui.</small></div></div></div>
        <footer>AUCI AI <span>·</span> Seu funcionário virtual, sob seu comando.</footer>
      </section>
    </main>
  </div>
}

export default App
