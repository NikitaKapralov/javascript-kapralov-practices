import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { getOrgRepos, type Repo } from '../../api/github'
import { useState, useMemo } from 'react'

const MultiDropdown = ({ 
  label, 
  options, 
  placeholder = 'Select options...',
  value,
  onChange 
}: { 
  label?: string
  options: string[]
  placeholder?: string
  value: string[]
  onChange: (value: string[]) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(item => item !== option))
    } else {
      onChange([...value, option])
    }
  }

  const displayValue = value.length > 0 ? value.join(', ') : placeholder

  return (
    <div style={{ position: 'relative', marginBottom: '20px' }}>
      {label && <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>{label}</label>}
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '8px 12px',
          border: '1px solid #d0d7de',
          borderRadius: '6px',
          background: '#fff',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {displayValue}
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '4px',
          background: '#fff',
          border: '1px solid #d0d7de',
          borderRadius: '6px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 10,
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
          {options.map(option => (
            <div
              key={option}
              onClick={() => toggleOption(option)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: value.includes(option) ? '#f6f8fa' : 'transparent'
              }}
            >
              <span style={{
                width: '16px',
                height: '16px',
                border: '1px solid #d0d7de',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                backgroundColor: value.includes(option) ? '#238636' : 'transparent',
                color: 'white'
              }}>
                {value.includes(option) ? '✓' : ''}
              </span>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const ReposList = () => {
  const [orgName, setOrgName] = useState('facebook')
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  
  const { data: repos, isLoading, error } = useQuery({
    queryKey: ['repos', orgName],
    queryFn: () => getOrgRepos(orgName),
  })

  const languages = useMemo(() => {
    if (!repos) return []
    const langs = repos.map(repo => repo.language).filter(Boolean) as string[]
    return [...new Set(langs)].sort()
  }, [repos])

  const filteredRepos = useMemo(() => {
    if (!repos) return []
    if (selectedLanguages.length === 0) return repos
    return repos.filter(repo => repo.language && selectedLanguages.includes(repo.language))
  }, [repos, selectedLanguages])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const search = formData.get('org') as string
    if (search.trim()) {
      setOrgName(search.trim())
      setSelectedLanguages([])
    }
  }

  if (isLoading) return <div style={{ padding: 20, textAlign: 'center' }}>Загрузка...</div>
  if (error) return <div style={{ padding: 20, color: 'red' }}>Ошибка: {(error as Error).message}</div>

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Репозитории организации</h1>
      
      <form onSubmit={handleSearch} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          name="org"
          placeholder="Введите название организации"
          defaultValue={orgName}
          style={{
            padding: '8px 12px',
            border: '1px solid #d0d7de',
            borderRadius: '6px',
            fontSize: '14px',
            flex: 1,
          }}
        />
        <button type="submit" style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#238636', color: 'white', cursor: 'pointer' }}>
          Найти
        </button>
      </form>

      <MultiDropdown
        label="Фильтр по языкам"
        options={languages}
        placeholder="Все языки"
        value={selectedLanguages}
        onChange={setSelectedLanguages}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredRepos.map((repo: Repo) => (
          <Link 
            key={repo.id}
            to="/repo/$owner/$name"
            params={{ owner: repo.owner.login, name: repo.name }}
            style={{
              padding: '15px',
              border: '1px solid #d0d7de',
              borderRadius: '6px',
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img 
                src={repo.owner.avatar_url} 
                alt={repo.owner.login}
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0 }}>{repo.name}</h3>
                <p style={{ margin: '5px 0', color: '#6e7681', fontSize: '14px' }}>
                  {repo.description || 'Нет описания'}
                </p>
                <div style={{ fontSize: '12px', color: '#6e7681', display: 'flex', gap: '15px' }}>
                  <span>⭐ {repo.stargazers_count}</span>
                  {repo.language && <span>📦 {repo.language}</span>}
                  <span>🔄 {new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}