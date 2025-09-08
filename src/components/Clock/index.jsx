import { useState, useEffect } from "react";
import styles from "./Clock.module.css";

function Relogio (){
    const [horaAtual, setHoraAtual] = useState(new Date());

    useEffect(() => {
        const intervalo = setInterval(() => {
            setHoraAtual(new Date());
        }, 1000);

        return () => clearInterval(intervalo);
    }, []);

    return (
        <div className={styles.relogioContainer}>
            
            <span className={styles.hora}>{horaAtual.toLocaleTimeString()}</span>

            <span className={styles.data}>{horaAtual.toLocaleDateString()}</span>
        </div>
    );
}

export default Relogio;