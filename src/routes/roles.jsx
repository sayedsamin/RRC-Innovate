import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/roles')({
  component: Roles,
})

function Roles() {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Roles Management</h1>
      <p className="text-gray-600 dark:text-gray-300">
        Manage user roles and permissions here. This feature is currently under development.
      </p>
    </div>
  )
}
