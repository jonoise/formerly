type BuilderOptions = {
  type:
    | 'form'
    | 'page'
    | 'list'
    | 'table'
    | 'tree'
    | 'chart'
    | 'dashboard'
    | 'report'
    | 'workflow'
    | 'api'
    | 'plugin'
    | 'other'
  name: string
  title: string
  description: string
  icon: string
  color: string
  tags: string[]
  template: string
  data: any
  schema: any
  layout: any
  script: string
  style: string
  settings: any
  actions: any
  events: any
  hooks: any
  dependencies: any
  repository: string
  license: string
}

export const useBuilder = (options: BuilderOptions) => {
  return {}
}
