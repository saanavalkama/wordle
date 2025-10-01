import type { ReactNode } from "react"

type gameProps = {
    children: ReactNode
}

export default function Game({children}: gameProps){
    return(
        <div className="game-screen">
            {children}
        </div>
    )
}