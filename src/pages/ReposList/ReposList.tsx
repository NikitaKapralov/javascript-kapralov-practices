import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { getOrgRepos, type Repo } from '../../api/github'
import { useState } from 'react'

export const ReposList = () => {
  const [orgName, setOrgName] = useState('facebook')
  
  const { data: repos, isLoading, error } = useQuery({
    queryKey: ['repos', orgName],
    queryFn: () => getOrgRepos(orgName),
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const search = formData.get('org') as string
    if (search.trim()) {
      setOrgName(search.trim())
    }
  }

  if (isLoading) return <div style={{ padding: 20, textAlign: 'center' }}>Загрузка...</div>
  if (error) return <div style={{ padding: 20, color: 'red' }}>Ошибка загрузки: {(error as Error).message}</div>

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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {repos?.map((repo: Repo) => (
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
              <div>
                <h3 style={{ margin: 0 }}>{repo.name}</h3>
                <p style={{ margin: '5px 0', color: '#6e7681', fontSize: '14px' }}>
                  {repo.description || 'Нет описания'}
                </p>
                <div style={{ fontSize: '12px', color: '#6e7681' }}>
                  ⭐ {repo.stargazers_count} • 🔄 {new Date(repo.updated_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}