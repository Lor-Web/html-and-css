import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { ArticleDetailPage } from '@/pages/ArticleDetailPage'
import { ArticlesPage } from '@/pages/ArticlesPage'
import { CheatsheetDetailPage } from '@/pages/CheatsheetDetailPage'
import { CheatsheetsPage } from '@/pages/CheatsheetsPage'
import { HomePage } from '@/pages/HomePage'
import { QuizDetailPage } from '@/pages/QuizDetailPage'
import { QuizzesPage } from '@/pages/QuizzesPage'
import { TaskDetailPage } from '@/pages/TaskDetailPage'
import { TasksPage } from '@/pages/TasksPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="tasks/:taskId" element={<TaskDetailPage />} />
          <Route path="quizzes" element={<QuizzesPage />} />
          <Route path="quizzes/:quizId" element={<QuizDetailPage />} />
          <Route path="cheatsheets" element={<CheatsheetsPage />} />
          <Route path="cheatsheets/:sheetId" element={<CheatsheetDetailPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:articleId" element={<ArticleDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
