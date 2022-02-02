import EditContainer from 'components/manageAccount/editContainer';
import { useState } from 'react';
import styles from 'styles/components/manageAccount/PersonalInfo.module.scss';

export default function PersonalInfo () {

    const [providerType, setProviderType] = useState('ناشر حقیقی')

    const changeType = (e) => {
        setProviderType(e.currentTarget.value)
    }

    return (
        <div>
            <div className={styles.radioButtons}>
                <div className={styles.realLabel}>
                    ناشر حقیقی
                <label><input type="radio" id="haghighi" name="type" value="ناشر حقیقی"
                        checked={providerType === 'ناشر حقیقی'} onChange={(e) => changeType(e)}/>
                
                <span></span>
                </label>
                </div>

                <div className={styles.realLabel}>
                    ناشر حقوقی
                <label><input type="radio" id="hoghughi" name="type" value="ناشر حقوقی"
                checked={providerType === 'ناشر حقوقی'}
                onChange={(e) => changeType(e)}
                />
                <span></span>
                </label>
                </div>
            </div>
            {providerType}
            <EditContainer />
        </div>
    )
}