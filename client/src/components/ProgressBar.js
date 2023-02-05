import React from 'react'

function ProgressBar({progress}) {
  return (
    <div className='progress-outer'>
      <div className='progress-inner' style={{width: `${progress}%`, backgroundColor:"black"}}></div>
      <div className='progress-value'>{progress}%</div>
    </div>
  )
}

export default ProgressBar