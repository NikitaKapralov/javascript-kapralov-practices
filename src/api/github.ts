import axios from 'axios'

const API_URL = 'https://api.github.com'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28'
  }
})

export type Repo = {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  updated_at: string
  forks_count: number
  language: string | null
  owner: {
    login: string
    avatar_url: string
  }
}

export type Branch = {
  name: string
  commit: {
    sha: string
    url: string
  }
}

export type RepoDetails = Repo & {
  branches: Branch[]
}

export const getOrgRepos = async (orgName: string, page = 1): Promise<Repo[]> => {
  const response = await apiClient.get<Repo[]>(`/orgs/${orgName}/repos`, {
    params: {
      per_page: 30,  
      page,
      sort: 'updated',
      direction: 'desc'
    }
  })
  return response.data
}

export const getRepoDetails = async (owner: string, repoName: string): Promise<RepoDetails> => {
  const [repoRes, branchesRes] = await Promise.all([
    apiClient.get<Repo>(`/repos/${owner}/${repoName}`),
    apiClient.get<Branch[]>(`/repos/${owner}/${repoName}/branches`)
  ])

  return {
    ...repoRes.data,
    branches: branchesRes.data
  }
}

export const searchRepos = async (query: string): Promise<Repo[]> => {
  const response = await apiClient.get<{ items: Repo[] }>('/search/repositories', {
    params: {
      q: query,
      per_page: 30
    }
  })
  return response.data.items
}