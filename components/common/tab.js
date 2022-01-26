
import {useState} from 'react'

import styles from 'styles/common/Tab.module.scss'

export default function Tab({ items = [{name: ''}], ...rest }) {

    const [activeTab, setActiveTab] = useState(items[0].name)

    return (
        <div className={styles.tabsContainer}>
            <div className={styles.tabs}>
                {items.map((item, itemIndex) => {
                    return (
                        <div
                            key={itemIndex}
                            className={`${styles.tabItem} ${activeTab === item.name ? styles.active : ''}`}
                            onClick={() => setActiveTab(item.name)}
                        >
                            {item.text}
                        </div>
                    )
                })}
            </div>
            <div className={styles.contents}>
                {items.map((item, itemIndex) => {
                    return (
                        <div key={itemIndex} className={styles.contentContainer}>
                            {activeTab === item.name ? item.content(item.props || '') : ''}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
