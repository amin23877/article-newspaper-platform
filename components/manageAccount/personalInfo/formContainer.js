import React from 'react';
import Paper from "components/common/paper";
import Text from "components/common/text";

import styles from 'styles/components/manageAccount/PersonalInfo.module.scss'
import Button from "components/common/button";

function FormContainer({title, onSubmit, children}) {
    return (
        <Paper>
            <form onSubmit={onSubmit}>
                <div className={styles.formContainerHeader}>
                    <Text style={{margin: 0}} size='l' weight='bold' color='black'>{title}</Text>
                    <Button type='submit'>ویرایش</Button>
                </div>

                <div className={styles.formContainerBody}>
                    {children}
                </div>
            </form>
        </Paper>
    );
}

export default FormContainer;