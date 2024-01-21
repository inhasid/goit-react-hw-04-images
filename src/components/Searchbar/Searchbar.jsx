import { useState, useRef, useEffect } from "react";

import styles from "./searchbar.module.css"

const Searchbar = ({ onSubmit }) => {
    const [state, setState] = useState({
        search: ""
    });

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    const handleChange = ({ target }) => {
        const {name, value} = target;
        setState({
            ...state,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({...state});
        reset();
    }

    const reset = () => {
        setState({
            search: ""
        });
    }

    return (
            <header className={styles.searchbar}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <button type="submit" className={styles.button}>
                        <span className={styles.label}>Search</span>
                    </button>
                    <input
                        name="search"
                        className={styles.input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={handleChange}
                        ref={inputRef}
                        value={state.search}
                    />
                </form>
            </header>
        )
}

export default Searchbar;