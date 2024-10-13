import { useDroppable } from '@dnd-kit/core'
import { FC } from 'react'

interface Props {
    status: string
}

const DropTask: FC<Props> = ({ status }) => {


    const { isOver, setNodeRef } = useDroppable({
        id: status

    });

    const styles = {
        opacity: isOver ? 0.4 : undefined
    };
    
    return (
        <div
            style={styles}
            ref={setNodeRef}
            className="text-xs font-semibold uppercase p-2 border border-dashed border-slate-500 mt-5 grid place-content-center text-slate-500  ">
            Drop here
        </div>
    )
}

export default DropTask
