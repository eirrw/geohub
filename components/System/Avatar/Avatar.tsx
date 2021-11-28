import { FC, useState, useEffect } from 'react'
import { StyledAvatar } from '.'
import Image from 'next/image'

type Props = {
  url: string
  size?: number
  alt?: string
  onClick?: any
  userId?: string
  outline?: boolean
}

const Avatar: FC<Props> = ({ url, size, alt, onClick, userId, outline }) => {
  const [currSrc, setCurrSrc] = useState(url || '')
  const fallback = '/images/avatars/fallback.png'

  useEffect(() => {
    setCurrSrc(url)
  }, [url])

  return (
    <StyledAvatar size={size} outline={outline}>
      <Image 
        src={currSrc || fallback} 
        height={size || 32} 
        width={size || 32} 
        alt={alt} 
        onError={() => setCurrSrc(fallback)}
      />
    </StyledAvatar>
  )
}

export default Avatar