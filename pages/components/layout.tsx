import { ReactNode } from "react";
import styles from './sideBar.module.css'
import SideBar from "./sideBar";

interface layoutProps {
    children: ReactNode;
  }

export default function Layout ({children}: layoutProps) {
    return(
        <div>

        <div className={styles.sideBar}>
            <SideBar />
        </div>
        {children}

        </div>
    )
}