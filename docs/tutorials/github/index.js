import React from 'react'
import { kea, useActions, useValues } from 'kea'

const API_URL = 'https://api.github.com'

const logic = kea({
  actions: () => ({
    setUsername: (username) => ({ username }),
    setRepositories: (repositories) => ({ repositories }),
    setFetchError: (message) => ({ message })
  }),

  reducers: ({ actions }) => ({
    username: ['keajs', {
      [actions.setUsername]: (_, payload) => payload.username
    }],
    repositories: [[], {
      [actions.setUsername]: () => [],
      [actions.setRepositories]: (_, payload) => payload.repositories
    }],
    isLoading: [true, {
      [actions.setUsername]: () => true,
      [actions.setRepositories]: () => false,
      [actions.setFetchError]: () => false
    }],
    error: [null, {
      [actions.setUsername]: () => null,
      [actions.setFetchError]: (_, payload) => payload.message
    }]
  }),

  selectors: ({ selectors }) => ({
    sortedRepositories: [
      () => [selectors.repositories],
      (repositories) => repositories.sort(
        (a, b) => b.stargazers_count - a.stargazers_count)
    ]
  }),

  events: ({ actions, values }) => ({
    afterMount: () => {
      actions.setUsername(values.username)
    }
  }),

  listeners: ({ actions }) => ({
    [actions.setUsername]: async ({ username }, breakpoint) => {
      await breakpoint(300) // debounce for 300ms

      const url = `${API_URL}/users/${username}/repos?per_page=250`
      const response = await window.fetch(url)

      // break if the same action was dispatched again while we were fetching for fetch
      breakpoint()

      const json = await response.json()

      if (response.status === 200) {
        actions.setRepositories(json)         // <-- new
      } else {
        actions.setFetchError(json.message)   // <-- new
      }
    }
  })
})

export function GithubScene () {
  const { username, isLoading, repositories,
    sortedRepositories, error } = useValues(logic)
  const { setUsername } = useActions(logic)

  return (
    <div className='example-github-scene'>
      <div style={{marginBottom: 20}}>
        <h1>Search for a github user</h1>
        <input value={username}
               type='text'
               onChange={e => setUsername(e.target.value)} />
      </div>
      {isLoading ? (
        <div>
          Loading...
        </div>
      ) : repositories.length > 0 ? (
        <div>
          Found {repositories.length} repositories for user {username}!
          {sortedRepositories.map(repo => (
            <div key={repo.id}>
              <a href={repo.html_url} target='_blank'>{repo.full_name}</a>
              {' - '}{repo.stargazers_count} stars, {repo.forks} forks.
            </div>
          ))}
        </div>
      ) : (
        <div>
          {error ? `Error: ${error}` : 'No repositories found'}
        </div>
      )}
    </div>
  )
}