import { InfoCircleOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import type { ReactNode } from 'react'
import './PropLabel.scss'

interface PropLabelProps {
  tip: string
  children: ReactNode
}

export function PropLabel({ tip, children }: PropLabelProps) {
  return (
    <span className="prop-label">
      <span className="prop-label__text">{children}</span>
      <Tooltip title={tip} placement="topLeft" mouseEnterDelay={0.15}>
        <button
          type="button"
          className="prop-label__hint"
          aria-label="Что делает это свойство"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
          }}
          onMouseDown={(event) => event.preventDefault()}
        >
          <InfoCircleOutlined />
        </button>
      </Tooltip>
    </span>
  )
}
