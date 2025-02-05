import useMutateTask from '@/hooks/useMutateTask'
import useStore from '@/store'
import { List } from '@mantine/core'
import { FC } from 'react'
import { Task } from '@prisma/client'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

export const TaskItem: FC<Omit<Task, 'createdAt' | 'updatedAt' | 'userId'>> = ({
  id,
  title,
  description,
}) => {
  const update = useStore((state) => state.updateEditedTask)
  const { deleteTaskMutation } = useMutateTask()

  return (
    <List.Item>
      <div className="float-left mr-10">
        <PencilAltIcon
          className="mx-0 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            update({
              id,
              title,
              description,
            })
          }}
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            deleteTaskMutation.mutate(id)
          }}
        />
      </div>
      <span>{title}</span>
    </List.Item>
  )
}
