import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from '@tanstack/react-router'
import { getRepoDetails, getContributors, getCommitActivity } from '../../api/github'

export const RepoDetails = () => {
  const { owner, name } = useParams({ strict: false })

  const { data: repo, isLoading: repoLoading, error: repoError } = useQuery({
    queryKey: ['repo', owner, name],
    queryFn: () => getRepoDetails(owner, name),
  })

  const { data: contributors } = useQuery({
    queryKey: ['contributors', owner, name],
    queryFn: () => getContributors(owner, name),
    enabled: !!repo,
  })

  const { data: activity } = useQuery({
    queryKey: ['activity', owner, name],
    queryFn: () => getCommitActivity(owner, name),
    enabled: !!repo,
  })

  if (repoLoading) return <div style={{ padding: 20, textAlign: 'center' }}>Загрузка...</div>
  if (repoError) return <div style={{ padding: 20, color: 'red' }}>Ошибка: {(repoError as Error).message}</div>
  if (!repo) return null

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <Link 
        to="/" 
        style={{ display: 'inline-block', marginBottom: '20px', textDecoration: 'none', color: '#0969da' }}
      >
        ← Назад к списку
      </Link>

      {/* Заголовок */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
        <img 
          src={repo.owner.avatar_url} 
          alt={repo.name} 
          style={{ width: '64px', height: '64px', borderRadius: '50%' }} 
        />
        <div>
          <h1 style={{ margin: 0 }}>{repo.name}</h1>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ color: '#6e7681', fontSize: '14px' }}>
            {repo.html_url}
          </a>
        </div>
      </div>

      {/* Описание */}
      <p style={{ marginBottom: '30px', fontSize: '16px', lineHeight: '1.5', color: '#57606a' }}>
        {repo.description || 'Нет описания'}
      </p>

      {/* Статистика - 4 параметра */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '30px' }}>
        <div style={{ padding: '15px', background: '#f6f8fa', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#24292f' }}>{repo.stargazers_count}</div>
          <div style={{ fontSize: '12px', color: '#57606a' }}>⭐ Stars</div>
        </div>
        <div style={{ padding: '15px', background: '#f6f8fa', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#24292f' }}>{repo.watchers_count}</div>
          <div style={{ fontSize: '12px', color: '#57606a' }}>👁️ Watchers</div>
        </div>
        <div style={{ padding: '15px', background: '#f6f8fa', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#24292f' }}>{repo.forks_count}</div>
          <div style={{ fontSize: '12px', color: '#57606a' }}>🍴 Forks</div>
        </div>
        <div style={{ padding: '15px', background: '#f6f8fa', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#24292f' }}>{repo.open_issues_count}</div>
          <div style={{ fontSize: '12px', color: '#57606a' }}>❗ Issues</div>
        </div>
      </div>

      {/* Branches */}
      <h3 style={{ marginBottom: '15px', borderBottom: '2px solid #d0d7de', paddingBottom: '10px' }}>Branches</h3>
      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
        {repo.branches.slice(0, 5).map((branch) => (
          <li key={branch.name} style={{ padding: '10px', borderBottom: '1px solid #eaecef', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#238636' }}>🌿</span>
            <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>{branch.name}</span>
          </li>
        ))}
      </ul>

      {/* Contributors */}
      {contributors && contributors.length > 0 && (
        <>
          <h3 style={{ marginBottom: '15px', borderBottom: '2px solid #d0d7de', paddingBottom: '10px' }}>
            Contributors ({contributors.length})
          </h3>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
            {contributors.slice(0, 10).map((contributor) => (
              <div key={contributor.login} style={{ textAlign: 'center' }}>
                <img 
                  src={contributor.avatar_url} 
                  alt={contributor.login}
                  style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #eaecef' }}
                />
                <div style={{ fontSize: '12px', marginTop: '8px', fontWeight: 500 }}>{contributor.login}</div>
                <div style={{ fontSize: '11px', color: '#57606a' }}>{contributor.contributions} commits</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Commit Activity */}
      {activity && activity.length > 0 && (
        <>
          <h3 style={{ marginBottom: '15px', borderBottom: '2px solid #d0d7de', paddingBottom: '10px' }}>
            Commit Activity (Last Year)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activity.slice(-12).map((week, index) => {
              const maxCommits = Math.max(...activity.map(w => w.total))
              const percentage = maxCommits > 0 ? (week.total / maxCommits) * 100 : 0
              
              return (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '80px', fontSize: '12px', color: '#57606a' }}>
                    Week {activity.length - 12 + index + 1}
                  </div>
                  <div style={{ flex: 1, height: '24px', background: '#eaecef', borderRadius: '4px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: `${percentage}%`, 
                        height: '100%', 
                        background: percentage > 0 ? '#238636' : '#d0d7de',
                        transition: 'width 0.3s'
                      }}
                    />
                  </div>
                  <div style={{ width: '40px', fontSize: '12px', textAlign: 'right', fontWeight: 500 }}>
                    {week.total}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}