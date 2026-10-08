import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Space, Tag, Typography } from 'antd'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getArticleById } from '@/data/articles'
import { markArticleReadAtom } from '@/store/progressAtom'
import './ArticleDetailPage.scss'

export function ArticleDetailPage() {
  const { articleId } = useParams()
  const article = articleId ? getArticleById(articleId) : undefined
  const [, markRead] = useAtom(markArticleReadAtom)

  useEffect(() => {
    if (article) markRead(article.id)
  }, [article, markRead])

  if (!article) {
    return (
      <div className="page">
        <Typography.Title level={2}>Статья не найдена</Typography.Title>
        <Link to="/articles">
          <Button icon={<ArrowLeftOutlined />}>К списку</Button>
        </Link>
      </div>
    )
  }

  return (
    <article className="page fade-up article-page">
      <Space direction="vertical" size={8} style={{ marginBottom: 28 }}>
        <Link to="/articles">
          <Button type="link" icon={<ArrowLeftOutlined />} style={{ paddingInline: 0 }}>
            Все статьи
          </Button>
        </Link>
        <Space wrap>
          <Tag color="blue">{article.readingMinutes} мин чтения</Tag>
          {article.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>
        <Typography.Title level={1} style={{ margin: 0, fontFamily: 'var(--font-display)' }}>
          {article.title}
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ fontSize: '1.05rem' }}>
          {article.excerpt}
        </Typography.Paragraph>
      </Space>

      <div className="article-body">
        {article.content.map((paragraph) => (
          <Typography.Paragraph key={paragraph.slice(0, 24)}>{paragraph}</Typography.Paragraph>
        ))}
      </div>
    </article>
  )
}
