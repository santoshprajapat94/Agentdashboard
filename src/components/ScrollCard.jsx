import React from 'react'
import { ScrollWrapper } from './ScrollWrapper'

function ScrollCard({ className, children, ref, style, normal = false, ...other }) {
  return (
    <div className={`row ${className}`}>
      <div className='table_wrap grid-margin stretch-card'>
        <div className='card' id='scroll__card_all'>
          {normal ? (
            <div ref={ref} {...other} style={{ padding: '1rem', ...style }}>
              {children}
            </div>
          ) : (
            <ScrollWrapper ref={ref} {...other} style={{ padding: '1rem', ...style }}>
              {children}
            </ScrollWrapper>
          )}
        </div>
      </div>
    </div>
  )
}

export default ScrollCard
