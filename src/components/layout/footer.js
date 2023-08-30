import React from 'react'


const Footer = () => {

  // * REVEAL FOOTER INFO ON CLICK
  const footerReveal = () => {
    let footer = document.getElementById('footer')
    footer.classList.toggle('active')
  }

  return (
    <div id='footer' className='footer'>
      <h3 className='footer-title' onClick={footerReveal}>This is a Footer - click me to find out more</h3>
      <p className='mt-30 pl-30'>Footer's are dead simple. This little bit of code will stick it to the bottom in spite of scrolling <span className='code-text'>'width: 100%; position: fixed; left: 0; bottom: 0;'</span></p>
      <p className='pl-30'>You can put me back down now... Thank you</p>
    </div>
  )
}

export default Footer