import React, { useEffect } from 'react';
import { useDispatch } from 'umi';

export default function Index() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'appSet/setHeader',
      payload: '404'
    })
  }, [])
  return (
    <div>
      404 NOT MATCH!
    </div>
  )
}
