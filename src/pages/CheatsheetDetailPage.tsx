import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { ColorsCheatsheet } from '@/components/cheatsheets/ColorsCheatsheet'
import { FlexboxCheatsheet } from '@/components/cheatsheets/FlexboxCheatsheet'
import { GridCheatsheet } from '@/components/cheatsheets/GridCheatsheet'
import { NthChildCheatsheet } from '@/components/cheatsheets/NthChildCheatsheet'
import { UnitsCheatsheet } from '@/components/cheatsheets/UnitsCheatsheet'
import { getCheatsheetById } from '@/data/cheatsheets'
import './CheatsheetDetailPage.scss'

export function CheatsheetDetailPage() {
  const { sheetId } = useParams()
  const sheet = sheetId ? getCheatsheetById(sheetId) : undefined

  if (!sheet) {
    return (
      <div className="page">
        <Typography.Title level={2}>Шпаргалка не найдена</Typography.Title>
        <Link to="/cheatsheets">
          <Button icon={<ArrowLeftOutlined />}>К списку</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="page cheatsheet-detail fade-up">
      <header className="cheatsheet-detail__head">
        <Link to="/cheatsheets" className="cheatsheet-detail__back">
          <ArrowLeftOutlined /> Шпаргалки
        </Link>
        <h1>{sheet.title}</h1>
        <p>{sheet.description}</p>
      </header>

      {sheet.id === 'flexbox' && <FlexboxCheatsheet />}
      {sheet.id === 'grid' && <GridCheatsheet />}
      {sheet.id === 'units' && <UnitsCheatsheet />}
      {sheet.id === 'nth-child' && <NthChildCheatsheet />}
      {sheet.id === 'colors' && <ColorsCheatsheet />}
    </div>
  )
}
