import React from 'react'

interface IProps {
  children: []
}

export default function Layout({ children }: IProps) {
  return (
    <div>
      this is Layout!
      {children}
    </div>
  )
}
