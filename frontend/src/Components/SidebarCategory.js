import React from 'react'

function SidebarCategory(props) {
  // console.log(props.items)
  return (
    <div className='domain-icons-design-icons' onClick={()=>props.val(props.items)}>
        {props.items}
    </div>
  )
}

export default SidebarCategory