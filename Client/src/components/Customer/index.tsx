import React, { useEffect } from 'react'
import { useDispatch } from 'umi';

export default function Customer() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'appSet/setHeader',
      payload: '客服列表'
    })
  }, [])
  return (
    <div>
      this is customer.
    </div>
  )
}
