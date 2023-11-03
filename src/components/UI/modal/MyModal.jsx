import cl from './MyModal.module.css'

const MyModal = ({active, setActive, children}) => {
    const rootClasses = [cl.myModal]

    if (active) {
        rootClasses.push(cl.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setActive(false)}>
            <div className={cl.myModalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;
