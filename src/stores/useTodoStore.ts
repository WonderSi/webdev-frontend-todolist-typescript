import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/useUserStore'

export interface Task {
    id: string;
    text: string;
    completed: boolean;
    userId: string;
}

type FilterType = 'all' | 'complete' | 'incomplete'

export const useTodoStore = defineStore('todo', () => {
    const userStore = useUserStore()

    const allTasks = ref<Record<string, Task[]>>({})
    const searchQuery = ref<string>('')
    const currentFilter = ref<FilterType>('all')

    const tasks = computed<Task[]>(() => {
        if (!userStore.currentUser) return []
        const userId = userStore.currentUser.id
        return allTasks.value[userId] || []
    })

    const filteredTasks = computed<Task[]>(() => {
        return tasks.value.filter(taskItem => {
            const matchSearch = searchQuery.value
                ? taskItem.text.toLowerCase().includes(searchQuery.value.toLowerCase())
                : true

            let matcheFilter = false
            switch(currentFilter.value) {
                case 'all':
                    matcheFilter = true
                    break
                case 'complete':
                    matcheFilter = taskItem.completed
                    break
                case 'incomplete':
                    matcheFilter = !taskItem.completed
            }

        return matchSearch && matcheFilter
        })
    })

    const totalTasks = computed<number>(() => tasks.value.length)
    const completedTasks = computed<number>(() => tasks.value.filter(t => t.completed).length)
    const incompletedTasks = computed<number>(() => tasks.value.filter(t => !t.completed).length)

    function addTask(text: string) {
        if(!userStore.currentUser) return 

        const userId = userStore.currentUser.id

        if (!allTasks.value[userId]) {
            allTasks.value[userId] = []
        }

        const newTask = {
            id: 'task-' + Date.now(),
            text: text,
            completed: false,
            userId: userId
        }
        allTasks.value[userId].push(newTask)
    }

    function toggleTask(taskId: string) {
        const task = tasks.value.find(t => t.id === taskId)
        if (task) {
            task.completed = !task.completed
        }
    }

    function deleteTask(taskId: string) {
        if(!userStore.currentUser) return 

        const userId = userStore.currentUser.id
        const index = allTasks.value[userId].findIndex(t => t.id === taskId)

        if (index !== -1) {
            allTasks.value[userId].splice(index, 1)
        }
    }

    function editTask(taskId: string, newText: string) {
        const task = tasks.value.find(t => t.id === taskId)
        if (task) {
            task.text = newText
        }
    }

    function setSearchQuery(query: string) {
        searchQuery.value = query
    }

    function setFilter(filter: FilterType) {
        currentFilter.value = filter
    }

    return {
        allTasks,
        tasks,
        searchQuery,
        currentFilter,
        filteredTasks,
        totalTasks,
        completedTasks,
        incompletedTasks,
        addTask,
        toggleTask,
        deleteTask,
        editTask,
        setSearchQuery,
        setFilter
    }
}, {
    persist: {
        key: 'todo-app-tasks',
        pick: ['allTasks'],
    }
})
