export interface Task {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export interface EditPayload {
  id: string
  newText: string
}

export type FilterType = 'all' | 'complete' | 'incomplete'
