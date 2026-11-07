import { useEffect, useState, type FormEvent } from 'react'
import { Activity, ArrowUpRight, Bot, Boxes, CalendarDays, ChartNoAxesCombined, CircleHelp, Command, LayoutDashboard, LockKeyhole, Mail, MessageSquareText, Package, Plus, Settings2, ShieldCheck, Users, Wallet, Eye, EyeOff, LogOut } from 'lucide-react'
import { auth } from './lib/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth'
import DemoWorkspace from './DemoWorkspace'

type AuthMode = 'login' | 'signup'

function AuthScreen({ onDemo }: { onDemo: () => void }) {
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const configured = Boolean(auth)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    setError('')
    if (!auth) {
      setError('A conexão com o Firebase ainda não foi configurada. Siga as instruções de configuração do Auci AI.')
      return
    }
    setBusy(true)
    try {
      if (mode === 'signup') {
        await createUserWithEmailAndPassword(auth, email.trim(), password)
        setMessage('Conta criada com sucesso. Agora vamos preparar sua empresa.')
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password)
      }
    } catch (err) {
      const code = typeof err === 'object' && err && 'code' in err ? String(err.code) : ''
      const friendlyErrors: Record<string, string> = {
        'auth/email-already-in-use': 'Este e-mail já possui uma conta. Entre ou use outro e-mail.',
        'auth/invalid-email': 'Digite um endereço de e-mail válido.',
        'auth/weak-password': 'A senha é muito fraca. Use pelo menos 8 caracteres.',
        'auth/invalid-credential': 'E-mail ou senha incorretos.',
        'auth/user-not-found': 'Não encontramos uma conta com esse e-mail.',
        'auth/wrong-password': 'Senha incorreta. Confira e tente novamente.',
        'auth/too-many-requests': 'Muitas tentativas. Aguarde um pouco e tente novamente.',
        'auth/network-request-failed': 'Falha de conexão. Verifique sua internet e tente novamente.',
        'auth/operation-not-allowed': 'O acesso por e-mail e senha ainda não foi ativado no Firebase.'
      }
      setError(friendlyErrors[code] ?? (err instanceof Error ? err.message : 'Não foi possível concluir. Tente novamente.'))
    } finally {
      setBusy(false)
    }
  }

  return <main className="auth-shell">
    <div className="auth-decoration"><div className="auth-orbit auth-orbit-a"/><div className="auth-orbit auth-orbit-b"/><div className="auth-brand-mark"><Bot size={36}/></div><span className="auth-star star-a">✦</span><span className="auth-star star-b">✳</span></div>
    <section className="auth-card">
      <div className="auth-brand"><div className="auth-mini-mark"><Bot size={20}/></div><div><strong>auci<span>ai</span></strong><small>FUNCIONÁRIO VIRTUAL</small></div></div>
      <div className="auth-heading"><div className="eyebrow">SEU NEGÓCIO, MAIS ORGANIZADO</div><h1>{mode === 'login' ? 'Bem-vindo de volta.' : 'Comece com a Auci.'}</h1><p>{mode === 'login' ? 'Entre na sua conta para continuar cuidando da empresa.' : 'Crie sua conta para preparar o espaço de trabalho da sua empresa.'}</p></div>
      <div className="auth-tabs"><button className={mode === 'login' ? 'selected' : ''} onClick={() => { setMode('login'); setError(''); setMessage('') }}>Entrar</button><button className={mode === 'signup' ? 'selected' : ''} onClick={() => { setMode('signup'); setError(''); setMessage('') }}>Criar conta</button></div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label><div className="auth-input"><Mail size={17}/><input id="email" type="email" autoComplete="email" placeholder="voce@empresa.com.br" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
        <label htmlFor="password">Senha</label><div className="auth-input"><LockKeyhole size={17}/><input id="password" type={showPassword ? 'text' : 'password'} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} placeholder="Mínimo de 8 caracteres" minLength={8} value={password} onChange={e=>setPassword(e.target.value)} required/><button type="button" className="password-toggle" onClick={()=>setShowPassword(v=>!v)} aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div>
        {error && <div className="auth-alert error">{error}</div>}
        {message && <div className="auth-alert success">{message}</div>}
        {!configured && <div className="auth-note"><ShieldCheck size={16}/><span>Ambiente em preparação. Nenhum dado será enviado até a conexão segura ser configurada.</span></div>}
        <button className="auth-submit" type="submit" disabled={busy}>{busy ? 'Aguarde...' : mode === 'login' ? 'Entrar na minha conta' : 'Criar minha conta'} <ArrowUpRight size={17}/></button>
        <button className="demo-entry-button" type="button" onClick={onDemo}>Explorar demonstração sem criar conta</button>
      </form>
      <div className="auth-foot"><ShieldCheck size={14}/> Acesso protegido · Seus dados pertencem à sua empresa</div>
    </section>
  </main>
}

const nav = [
  { label: 'Visão geral', icon: LayoutDashboard, active: true },
  { label: 'Funcionário virtual', icon: Bot },
  { label: 'Clientes', icon: Users },
  { label: 'Vendas', icon: Wallet },
  { label: 'Produtos e estoque', icon: Package },
  { label: 'Agenda e tarefas', icon: CalendarDays },
  { label: 'Relatórios', icon: ChartNoAxesCombined },
]

function Dashboard({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Bot size={21}/></div><div><strong>auci<span>ai</span></strong><small>FUNCIONÁRIO VIRTUAL</small></div></div>
      <div className="workspace"><div className="workspace-avatar">A</div><div><strong>Minha empresa</strong><small>Configuração inicial</small></div><span className="chevron">⌄</span></div>
      <div className="nav-caption">ESPAÇO DE TRABALHO</div>
      <nav>{nav.map(({label,icon:Icon,active})=><a className={active?'nav-link active':'nav-link'} href="#" key={label}><Icon size={18}/><span>{label}</span>{label==='Funcionário virtual'&&<i className="new-dot"/>}</a>)}</nav>
      <div className="sidebar-bottom"><a className="nav-link" href="#"><Activity size={18}/><span>Atividade da IA</span></a><a className="nav-link" href="#"><ShieldCheck size={18}/><span>Equipe e permissões</span></a><a className="nav-link" href="#"><Settings2 size={18}/><span>Configurações</span></a><div className="profile"><div className="profile-avatar">U</div><div className="profile-email"><strong>{email}</strong><small>Conta autenticada</small></div><button className="signout-button" onClick={onSignOut} title="Sair"><LogOut size={17}/></button></div></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><div className="breadcrumb">Auci AI <span>/</span> Visão geral</div><div className="top-actions"><button className="icon-button" aria-label="Ajuda"><CircleHelp size={18}/></button><div className="user-pill"><div className="profile-avatar small">U</div><span>Minha conta</span></div></div></header>
      <section className="page-content">
        <div className="welcome-row"><div><div className="eyebrow">SEU PAINEL DE CONTROLE</div><h1>Olá! Vamos cuidar da sua empresa?</h1><p>Sua conta está autenticada. Agora vamos configurar o espaço da sua empresa.</p></div><button className="primary-button"><Plus size={17}/> Configurar empresa</button></div>
        <div className="assistant-banner"><div className="assistant-icon"><Bot size={27}/></div><div className="assistant-copy"><div className="assistant-label"><span className="status-dot"/> FUNCIONÁRIO VIRTUAL</div><h2>Seu negócio, com um assistente sempre pronto.</h2><p>Peça para consultar informações, organizar tarefas e preparar operações. Ações importantes pedirão sua confirmação.</p><button className="banner-button">Conhecer a Auci <ArrowUpRight size={16}/></button></div><div className="banner-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="bot-glow"><Bot size={66}/></div><span className="sparkle s1">✳</span><span className="sparkle s2">✦</span></div></div>
        <div className="section-heading"><div><h3>Visão geral</h3><p>Os indicadores aparecerão aqui quando seus dados estiverem conectados.</p></div><span className="period-chip">Este mês <span>⌄</span></span></div>
        <div className="stats-grid"><div className="stat-card"><div className="stat-top"><span>Vendas</span><Wallet size={18}/></div><strong>—</strong><small>Sem dados registrados</small></div><div className="stat-card"><div className="stat-top"><span>Clientes</span><Users size={18}/></div><strong>—</strong><small>Cadastre seus primeiros clientes</small></div><div className="stat-card"><div className="stat-top"><span>Produtos</span><Boxes size={18}/></div><strong>—</strong><small>Seu estoque aparecerá aqui</small></div><div className="stat-card"><div className="stat-top"><span>Tarefas pendentes</span><CalendarDays size={18}/></div><strong>—</strong><small>Organize sua rotina</small></div></div>
        <div className="lower-grid"><div className="panel"><div className="panel-heading"><div><h3>Próxima etapa</h3><p>Prepare seu espaço de trabalho</p></div><Command size={18}/></div><div className="setup-list"><div className="setup-item"><div className="setup-number">1</div><div><strong>Configure sua empresa</strong><small>Adicione os dados básicos do negócio.</small></div><ArrowUpRight size={16}/></div><div className="setup-item"><div className="setup-number">2</div><div><strong>Convide sua equipe</strong><small>Defina quem pode acessar cada informação.</small></div><ArrowUpRight size={16}/></div><div className="setup-item"><div className="setup-number">3</div><div><strong>Conheça seu funcionário virtual</strong><small>Veja como a Auci poderá ajudar no dia a dia.</small></div><ArrowUpRight size={16}/></div></div></div><div className="panel activity-panel"><div className="panel-heading"><div><h3>Atividade recente</h3><p>Acompanhe o que acontece na sua empresa</p></div><Activity size={18}/></div><div className="empty-state"><div className="empty-icon"><MessageSquareText size={22}/></div><strong>Nenhuma atividade por enquanto</strong><small>Quando você começar a usar a Auci, suas atividades aparecerão aqui.</small></div></div></div>
        <footer>AUCI AI <span>·</span> Seu funcionário virtual, sob seu comando.</footer>
      </section>
    </main>
  </div>
}

function App() {
  const [demoMode, setDemoMode] = useState(false)
  const [session, setSession] = useState<{ user: { email?: string } } | null>(null)
  const [checking, setChecking] = useState(Boolean(auth))
  useEffect(() => {
    if (!auth) return
    return onAuthStateChanged(auth, (user) => {
      setSession(user ? { user: { email: user.email ?? undefined } } : null)
      setChecking(false)
    })
  }, [])
  async function signOut() {
    if (auth) await firebaseSignOut(auth)
    setSession(null)
  }
  if (demoMode) return <DemoWorkspace onExit={() => setDemoMode(false)} />
  if (checking) return <div className="loading-screen"><div className="brand-mark"><Bot size={23}/></div><span>Preparando seu espaço seguro...</span></div>
  if (!session) return <AuthScreen onDemo={() => setDemoMode(true)} />
  return <Dashboard email={session.user.email ?? 'Usuário'} onSignOut={signOut}/>
}
export default App
