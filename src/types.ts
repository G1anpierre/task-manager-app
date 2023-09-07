import {z} from 'zod'

export type Task = z.infer<typeof taskSchema>

export const StateList = z.enum(['PLANNED', 'DOING', 'COMPLETED'])
export type State = z.infer<typeof StateList>

export const taskSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  title: z.string(),
  description: z.string(),
  status: StateList,
  userId: z.string(),
})

export const tasksSchema = z.array(taskSchema)

export type Tasks = z.infer<typeof tasksSchema>

const createTask = taskSchema.pick({
  title: true,
  description: true,
  status: true,
})

const deleteTask = taskSchema.pick({
  id: true,
  status: true,
})
export type CreateTaskRequestType = z.infer<typeof createTask>
export type DeleteTaskRequestType = z.infer<typeof deleteTask>

// * To be Removed

export type Card = {
  id: string
  title: string
  description: string
  state: State
}

export type Store = {
  cards: Card[]
  removeCard: (id: string) => void
  addCard: (title: string, description: string, state: State) => void
  draggedTaskId: string | null
  setDraggedTaskId: (title: string) => void
  moveTask: (title: string, state: State) => void
}
