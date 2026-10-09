import { Col, Row, Tag, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { cheatsheets } from '@/data/cheatsheets'
import './ContentList.scss'

export function CheatsheetsPage() {
  return (
    <div className="page fade-up">
      <header className="content-head">
        <h1 className="section-title">Шпаргалки</h1>
        <p className="section-lead">
          Интерактивные песочницы: крутите свойства и сразу видите результат. Без длинных лекций.
        </p>
      </header>

      <Row gutter={[16, 16]}>
        {cheatsheets.map((sheet) => (
          <Col xs={24} md={12} key={sheet.id}>
            <Link to={`/cheatsheets/${sheet.id}`} className="content-card">
              <div className="content-card__tags" style={{ marginBottom: 10 }}>
                {sheet.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <h2>{sheet.title}</h2>
              <p>{sheet.description}</p>
              <Typography.Text type="secondary">Открыть песочницу →</Typography.Text>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  )
}
