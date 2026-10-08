import { ExpandOutlined } from '@ant-design/icons'
import { Image } from 'antd'
import type { CSSProperties } from 'react'
import './LightboxImage.scss'

interface LightboxImageProps {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
}

export function LightboxImage({ src, alt, className, style }: LightboxImageProps) {
  return (
    <div className={`lightbox-image${className ? ` ${className}` : ''}`} style={style}>
      <Image
        src={src}
        alt={alt}
        className="lightbox-image__thumb"
        preview={{
          mask: (
            <span className="lightbox-image__mask">
              <ExpandOutlined />
              Увеличить
            </span>
          ),
        }}
      />
    </div>
  )
}
