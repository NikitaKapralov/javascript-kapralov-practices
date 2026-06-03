import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from '@tanstack/react-router'
import { getRepoDetails } from '../../api/github'

export const RepoDetails = () => {
  const { owner, name } = useParams({ strict: false })

  const { data, isLoading, error } = useQuery({
    queryKey: ['repo', owner, name],
    queryFn: () => getRepoDetails(owner, name),
  })

  if (isLoading) return <div style={{ padding: 20, textAlign: 'center' }}>Загрузка...</div>
  if (error) return <div style={{ padding: 20, color: 'red' }}>Ошибка: {(error as Error).message}</div>
  if (!data) return null

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <Link 
        to="/" 
        style={{ display: 'inline-block', marginBottom: '20px', textDecoration: 'none', color: '#0969da' }}
      >
        ← Назад к списку
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
        <img 
          src={data.owner.avatar_url} 
          alt={data.name} 
          style={{ width: '64px', height: '64px', borderRadius: '50%' }} 
        />
        <div>
          <h1 style={{ margin: 0 }}>{data.name}</h1>
          <a href={data.html_url} target="_blank" style={{ color: '#6e7681', fontSize: '14px' }}>
            {data.html_url}
          </a>
        </div>
      </div>

      <p style={{ marginBottom: '30px', fontSize: '16px', lineHeight: '1.5' }}>
        {data.description || 'Нет описания'}
      </p>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', padding: '15px', background: '#f6f8fa', borderRadius: '8px' }}>
        <span>⭐ <b>{data.stargazers_count}</b> stars</span>
        <span>🍴 <b>{data.forks_count}</b> forks</span>
        <span> Updated: {new Date(data.updated_at).toLocaleDateString()}</span>
      </div>

      <h3>Branches</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data.branches.slice(0, 5).map((branch) => (
          <li key={branch.name} style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
            🌿 {branch.name}
          </li>
        ))}
      </ul>
    </div>
  )
}