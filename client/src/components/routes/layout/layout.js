import React, { useEffect } from "react";
import css from "./layout.module.css";

const Layout = (props) => {
    return (
        <div className={css.conteiner}>
            <div className={css.header}>
                <h1>Pokemon</h1>
            </div>
            <div className={css.conteinerChildren}>
                {props.children}
            </div>
        </div>
    )



}



export default Layout;