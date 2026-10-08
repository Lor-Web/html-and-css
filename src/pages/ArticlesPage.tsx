import { CheckCircleFilled } from '@ant-design/icons'
import { Col, Row, Space, Tag, Typography } from 'antd'
import { useAtomValue } from 'jotai'
import { Link } from 'react-router-dom'
import { articles } from '@/data/articles'
import { progressAtom } from '@/store/progressAtom'
import './ContentList.scss'

export function ArticlesPage() {
  const progress = useAtomValue(progressAtom)

  return (
    <div className="page fade-up">
      <header className="content-head">
        <h1 className="section-title">Статьи</h1>
        <p className="section-lead">Короткие тексты по HTML и CSS — без воды, с практическим уклоном.</p>
      </header>

      <Row gutter={[16, 16]}>
        {articles.map((article) => {
          const read = progress.readArticles.includes(article.id)
          return (
            <Col xs={24} md={12} lg={8} key={article.id}>
              <Link to={`/articles/${article.id}`} className="content-card">
                <Space style={{ marginBottom: 10 }}>
                  <Tag color="blue">{article.readingMinutes} мин</Tag>
                  {read && (
                    <Typography.Text type="success">
                      <CheckCircleFilled /> Прочитано
                    </Typography.Text>
                  )}
                </Space>
                <h2>{article.title}</h2>
                <p>{article.excerpt}</p>
                <div className="content-card__tags">
                  {article.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </Link>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
