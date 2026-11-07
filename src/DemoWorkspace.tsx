import { useState, type FormEvent } from 'react'
import { Activity, ArrowLeft, Bot, Building2, CalendarDays, ChartNoAxesCombined, Check, ChevronDown, CircleHelp, LayoutDashboard, LogOut, MessageSquareText, Package, Plus, Send, Settings2, ShieldCheck, Users, Wallet } from 'lucide-react'

type Page = 'overview' | 'assistant' | 'company' | 'team' | 'permissions' | 'activity'
type Member = { name: string; email: string; role: 'admin' | 'manager' | 'staff' }

const menu: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Visão geral', icon: LayoutDashboard },
  { id: 'assistant', label: 'Funcionário virtual', icon: Bot },
  { id: 'company', label: 'Minha empresa', icon: Building2 },
  { id: 'team', label: 'Funcionários', icon: Users },
  { id: 'permissions', label: 'Permissões', icon: ShieldCheck },
  { id: 'activity', label: 'Atividade da IA', icon: Activity },
]

export default function DemoWorkspace({ onExit }: { onExit: () => void }) {
  const [page, setPage] = useState<Page>('overview')
  const [company, setCompany] = useState('Minha empresa')
  const [companyDraft, setCompanyDraft] = useState(company)
  const [savedCompany, setSavedCompany] = useState(false)
  const [members, setMembers] = useState<Member[]>([])
  const [memberName, setMemberName] = useState('')
  const [memberEmail, setMemberEmail] = useState('')
  const [memberRole, setMemberRole] = useState<Member['role']>('staff')
  const [inviteNotice, setInviteNotice] = useState('')
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState<{ from: 'you' | 'auci'; text: string }[]>([
    { from: 'auci', text: 'Olá! Estou em modo de demonstração. Você pode explorar como será a conversa com seu funcionário virtual. Nenhuma operação real será executada.' },
  ])

  function saveCompany(event: FormEvent) {
    event.preventDefault()
    if (!companyDraft.trim()) return
    setCompany(companyDraft.trim())
    setSavedCompany(true)
  }
  function addMember(event: FormEvent) {
    event.preventDefault()
    if (!memberName.trim() || !memberEmail.trim()) return
    setMembers(current => [...current, { name: memberName.trim(), email: memberEmail.trim(), role: memberRole }])
    setMemberName('')
    setMemberEmail('')
    setInviteNotice('Convite simulado criado. Nenhum e-mail foi enviado.')
  }
  function sendMessage(event: FormEvent) {
    event.preventDefault()
    if (!message.trim()) return
    const question = message.trim()
    setChat(current => [...current, { from: 'you', text: question }, { from: 'auci', text: 'Entendi! No produto conectado, vou interpretar seu pedido, verificar suas permissões e, quando necessário, pedir confirmação antes de executar. Nesta demonstração, não tenho acesso a dados reais nem executo operações.' }])
    setMessage('')
  }

  return <div className="app-shell demo-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Bot size={21}/></div><div><strong>auci<span>ai</span></strong><small>FUNCIONÁRIO VIRTUAL</small></div></div>
      <div className="workspace"><div className="workspace-avatar">{company.slice(0,1).toUpperCase()}</div><div><strong>{company}</strong><small>Ambiente demonstrativo</small></div><ChevronDown size={15} className="chevron"/></div>
      <div className="nav-caption">ESPAÇO DE TRABALHO</div>
      <nav>{menu.map(({id,label,icon:Icon})=><button key={id} className={page===id?'nav-link active':'nav-link'} onClick={()=>setPage(id)}><Icon size={18}/><span>{label}</span></button>)}</nav>
      <div className="sidebar-bottom"><div className="demo-sidebar-note">MODO DE DEMONSTRAÇÃO<br/>Dados temporários nesta sessão</div><button className="nav-link" onClick={onExit}><LogOut size={18}/><span>Sair da demonstração</span></button></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><div className="breadcrumb">Auci AI <span>/</span> {menu.find(item=>item.id===page)?.label}</div><div className="top-actions"><span className="demo-pill">DEMONSTRAÇÃO</span><button className="icon-button" aria-label="Ajuda"><CircleHelp size={18}/></button></div></header>
      <section className="page-content demo-content">
        {page==='overview' && <>
          <div className="welcome-row"><div><div className="eyebrow">AMBIENTE DE TESTE</div><h1>Bem-vindo ao Auci AI.</h1><p>Explore a estrutura do funcionário virtual e as ferramentas de gestão.</p></div><button className="primary-button" onClick={()=>setPage('company')}><Plus size={17}/> Configurar empresa</button></div>
          <div className="demo-warning"><ShieldCheck size={18}/><div><strong>Você está em modo de demonstração</strong><p>Os cadastros e mensagens abaixo são temporários. Login real, banco de dados e execução de ações serão habilitados após a conexão segura.</p></div></div>
          <div className="assistant-banner"><div className="assistant-icon"><Bot size={27}/></div><div className="assistant-copy"><div className="assistant-label"><span className="status-dot"/> FUNCIONÁRIO VIRTUAL</div><h2>Seu negócio, com um assistente sempre pronto.</h2><p>Converse, consulte informações e prepare tarefas. Operações importantes sempre respeitarão suas permissões e confirmações.</p><button className="banner-button" onClick={()=>setPage('assistant')}>Conversar com a Auci <Send size={15}/></button></div><div className="banner-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="bot-glow"><Bot size={66}/></div><span className="sparkle s1">✳</span><span className="sparkle s2">✦</span></div></div>
          <div className="section-heading"><div><h3>Seu espaço de trabalho</h3><p>Indicadores reais serão exibidos quando o banco estiver conectado.</p></div></div>
          <div className="stats-grid">{[{label:'Vendas',icon:Wallet},{label:'Clientes',icon:Users},{label:'Produtos',icon:Package},{label:'Tarefas',icon:CalendarDays}].map(({label,icon:Icon})=><div className="stat-card" key={label}><div className="stat-top"><span>{label}</span><Icon size={18}/></div><strong>—</strong><small>Aguardando conexão dos dados</small></div>)}</div>
          <div className="lower-grid"><div className="panel"><div className="panel-heading"><div><h3>Primeiros passos</h3><p>Configure a estrutura inicial</p></div><Settings2 size={18}/></div><div className="setup-list">{[{n:'1',title:'Cadastrar empresa',desc:'Defina o nome do negócio.',id:'company' as Page},{n:'2',title:'Adicionar funcionários',desc:'Prepare os convites da equipe.',id:'team' as Page},{n:'3',title:'Revisar permissões',desc:'Entenda os níveis de acesso.',id:'permissions' as Page}].map(item=><button className="setup-item setup-button" key={item.n} onClick={()=>setPage(item.id)}><span className="setup-number">{item.n}</span><span className="setup-item-copy"><strong>{item.title}</strong><small>{item.desc}</small></span><ArrowLeft size={16}/></button>)}</div></div><div className="panel activity-panel"><div className="panel-heading"><div><h3>Atividade recente</h3><p>Histórico da demonstração</p></div><Activity size={18}/></div><div className="empty-state"><div className="empty-icon"><MessageSquareText size={22}/></div><strong>Nenhuma operação real registrada</strong><small>As ações serão registradas aqui quando a integração estiver ativa.</small></div></div></div>
        </>}
        {page==='company' && <div className="content-narrow"><div className="eyebrow">CONFIGURAÇÃO</div><h1 className="page-title">Minha empresa</h1><p className="page-subtitle">Defina a identificação do espaço de trabalho.</p><div className="panel form-panel"><div className="form-icon"><Building2 size={22}/></div><h3>Dados básicos</h3><p>Este cadastro é apenas demonstrativo e não será enviado ao banco.</p><form onSubmit={saveCompany} className="demo-form"><label htmlFor="company-name">Nome da empresa</label><input id="company-name" value={companyDraft} onChange={e=>{setCompanyDraft(e.target.value);setSavedCompany(false)}} placeholder="Ex.: Minha Empresa" required/><button className="primary-button" type="submit"><Check size={16}/> Salvar demonstração</button>{savedCompany&&<span className="inline-success">Nome atualizado nesta sessão.</span>}</form></div><div className="demo-info"><ShieldCheck size={17}/> Na versão conectada, a empresa terá um identificador próprio e seus dados ficarão isolados dos demais clientes.</div></div>}
        {page==='team' && <div className="content-narrow"><div className="eyebrow">GESTÃO DE ACESSO</div><h1 className="page-title">Funcionários</h1><p className="page-subtitle">Prepare convites e escolha a função de cada pessoa.</p><div className="panel form-panel"><h3>Adicionar funcionário</h3><p>O envio de convite ainda não está ativo no modo de demonstração.</p><form className="demo-form" onSubmit={addMember}><label htmlFor="member-name">Nome</label><input id="member-name" value={memberName} onChange={e=>setMemberName(e.target.value)} placeholder="Nome do funcionário" required/><label htmlFor="member-email">E-mail</label><input id="member-email" type="email" value={memberEmail} onChange={e=>setMemberEmail(e.target.value)} placeholder="pessoa@empresa.com.br" required/><label htmlFor="member-role">Função</label><select id="member-role" value={memberRole} onChange={e=>setMemberRole(e.target.value as Member['role'])}><option value="admin">Administrador</option><option value="manager">Gerente</option><option value="staff">Funcionário</option></select><button className="primary-button" type="submit"><Plus size={16}/> Adicionar à demonstração</button>{inviteNotice&&<span className="inline-success">{inviteNotice}</span>}</form></div><div className="panel member-list"><div className="panel-heading"><div><h3>Equipe desta sessão</h3><p>{members.length} funcionário(s) adicionado(s)</p></div><Users size={18}/></div>{members.length===0?<div className="empty-state"><strong>Nenhum funcionário adicionado</strong><small>Use o formulário para testar o cadastro.</small></div>:members.map((member,i)=><div className="member-row" key={member.email}><div className="member-avatar">{member.name.slice(0,1).toUpperCase()}</div><div><strong>{member.name}</strong><small>{member.email}</small></div><span className="role-chip">{member.role==='admin'?'Administrador':member.role==='manager'?'Gerente':'Funcionário'}</span></div>)}</div></div>}
        {page==='permissions' && <div className="content-narrow"><div className="eyebrow">SEGURANÇA</div><h1 className="page-title">Funções e permissões</h1><p className="page-subtitle">Referência visual dos níveis de acesso planejados.</p><div className="panel permission-panel"><h3>Matriz de permissões</h3><p>Modelo inicial. As permissões reais serão validadas no servidor.</p><div className="permission-table"><div className="permission-row permission-head"><span>Ação</span><span>Proprietário</span><span>Admin</span><span>Gerente</span><span>Equipe</span></div>{[['Ver dados da empresa','✓','✓','✓','Limitado'],['Gerenciar funcionários','✓','✓','Limitado','—'],['Registrar operações','✓','✓','✓','✓'],['Alterar configurações','✓','✓','Limitado','—'],['Excluir dados','✓','Confirmação','—','—'],['Consultar histórico da IA','✓','✓','Limitado','Próprio']].map(row=><div className="permission-row" key={row[0]}>{row.map((cell,i)=><span key={i} className={i>0&&cell==='✓'?'permission-yes':''}>{cell}</span>)}</div>)}</div><div className="demo-info"><ShieldCheck size={17}/> A matriz é ilustrativa. Nenhuma autorização real é concedida por esta tela.</div></div></div>}
        {page==='assistant' && <div className="content-narrow chat-page"><div className="eyebrow">SEU FUNCIONÁRIO VIRTUAL</div><h1 className="page-title">Converse com a Auci</h1><p className="page-subtitle">Teste a experiência de conversa. As respostas são demonstrativas.</p><div className="panel chat-panel"><div className="chat-top"><div className="assistant-icon"><Bot size={22}/></div><div><strong>Auci AI</strong><small><span className="status-dot"/> Modo de demonstração</small></div></div><div className="chat-messages">{chat.map((item,i)=><div key={i} className={item.from==='you'?'chat-message user-message':'chat-message ai-message'}><span>{item.from==='you'?'Você':'Auci'}</span><p>{item.text}</p></div>)}</div><form className="chat-compose" onSubmit={sendMessage}><input value={message} onChange={e=>setMessage(e.target.value)} placeholder="Ex.: Quero organizar minhas tarefas..." aria-label="Mensagem para Auci"/><button type="submit" aria-label="Enviar mensagem" disabled={!message.trim()}><Send size={17}/></button></form><div className="chat-disclaimer">Demonstração: a IA ainda não está conectada e não executa operações.</div></div></div>}
        {page==='activity' && <div className="content-narrow"><div className="eyebrow">TRANSPARÊNCIA</div><h1 className="page-title">Atividade da IA</h1><p className="page-subtitle">Acompanhe consultas, preparações e operações realizadas pelo assistente.</p><div className="panel"><div className="empty-state"><div className="empty-icon"><Activity size={22}/></div><strong>Nenhuma atividade registrada</strong><small>O histórico será preenchido quando o assistente estiver conectado ao backend.</small></div></div></div>}
        <footer>AUCI AI <span>·</span> Seu funcionário virtual, sob seu comando.</footer>
      </section>
    </main>
  </div>
}
