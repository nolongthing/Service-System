import React, { useEffect } from 'react'
import { useDispatch } from 'umi';

export default function My() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'appSet/setHeader',
      payload: '我的'
    })
  }, [])
  return (
    <div>
      this  is my.
    </div>
  )
}
