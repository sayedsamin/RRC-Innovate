import { createFileRoute } from '@tanstack/react-router'
import AIPicksPage from '../features/ai-picks/AIPicksPage'

export const Route = createFileRoute('/ai-picks')({
  component: AIPicksPage,
})
