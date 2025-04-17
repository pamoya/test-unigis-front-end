import React from 'react'
import Menu from '../Menu'

export const Layout = (props) => {
    return (
        <div>
            <div>
                <Menu />
            </div>
            <div>
                {props.children}
            </div>
        </div>
    )
}