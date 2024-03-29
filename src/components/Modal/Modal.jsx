import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

import styles from "./modal.module.css"

const modalRoot = document.getElementById("modal-root");

const Modal = ({ close, children }) => {
    const closeModal = useCallback(
        ({ target, currentTarget, code }) => {
            if (target === currentTarget || code === "Escape") {
                close()
            }
        }, [close]
    );

    useEffect(() => {
        document.addEventListener("keydown", closeModal);

        return () => document.removeEventListener("keydown", closeModal);
    }, [closeModal]);

    return createPortal(
            (<div className={styles.overlay} onClick={closeModal}>
                <div className={styles.modal} >                    
                    {children}
                </div>
            </div>),
        modalRoot)
}


export default Modal;