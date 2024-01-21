import { Component } from "react";

import styles from "./searchbar.module.css"

class Searchbar extends Component {
    state = {
        search: ""
    }

    handleChange = ({ target }) => {
        const {name, value} = target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({...this.state});
        this.setState({
            search: ""
        })
    }

    render() {
        const { handleChange, handleSubmit } = this;
        const {search} = this.state;

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
                        value={search}
                    />
                </form>
            </header>
        )
    }
}

export default Searchbar;