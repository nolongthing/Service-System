import React from 'react'

export interface IMessage {
  content: string,
  c_from: 0 | 1,
  date: string,
  isRead: 0 | 1,
  userId: number,
  customerId: number
}

export default function Chat() {
  
  return (
    <div>
      this is chat
    </div>
  )
}
