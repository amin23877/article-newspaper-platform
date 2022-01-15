
import styles from 'styles/components/signup/Stepper.module.scss'

/* It's just a stepper, it doesn't render any component inside of it  */

export default function Stepper ({steps = [{}], activeStep}) {
    return (
        <div className={styles.stepperContainer}>
            <div className={styles.hr}/>
            <div className={styles.stepsContainer}>
                {steps.map((step, index) => {
                    return (
                        <div
                            key={index}
                            className={`${styles.stepItem} ${activeStep >= step.id ? styles.active : ''}`}
                            style={{width: `${100 / steps.length}%`}}
                        >
                            <div className={styles.circle}>
                                {index + 1}
                            </div>
                            <div className={styles.text}>
                                {step.text}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
