import React from 'react'

function SidebarItems(props) {
    return (
        <div className='program-design' onClick={props.onClick}>
            <div className='program-icon'>
                <div className='program-icon-design'>{props.items.name[0]+props.items.name[1]}</div>
            </div>
            <div className='program-name-date'>
                <div className='program-name'>{props.items.name}</div>
                <div>Last Modified: 6/12/2023</div>
            </div>
        </div>
    )
}

export default SidebarItems