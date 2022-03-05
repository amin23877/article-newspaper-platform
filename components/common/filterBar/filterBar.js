import styles from 'styles/common/FilterBar.module.scss'
import Magnifier from "assets/svg/common/magnifier-grey.svg";
import ChevronDown from "assets/svg/common/chevron-down.svg";
import Image from "next/image";
import FilterBarPanel from "components/common/filterBar/filterBarPanel";
import {useState} from "react";

const filters = {
    access: [
        {name: 'همه', value: 'all'},
        {name: 'رایگان', value: 'free'},
        {name: 'اشتراک VIP', value: 'vip'}
    ],
    type: [
        {name: 'مقاله', value: 'article'},
        {name: 'ویدیو', value: 'video'},
        {name: 'پادکست', value: 'podcast'}
    ],
    label: [
        {name: 'آموزشی', value: 'educational'},
        {name: 'هنری', value: 'art'},
        {name: 'سلامت', value: 'health'},
    ]
}

export default function FilterBar(props) {
    const [activePanel, setActivePanel] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({ access: [], label: [], type: [] })

    const closePanel = () => setActivePanel(null);

    const handleSelect = (name, value, action) => {
        let updater;

        switch (action) {
            case 'select':
                updater = (p) => [...p, value];
                break;
            case 'unselect':
                updater = (p) => p.filter(item => item !== value);
        }

        setSelectedFilters(p => ({
            ...p,
            [name]: updater(p[name])
        }))
    }

    return (
        <div className={styles.filterBarContainer}>
            <div className={styles.title}>فیلتر</div>
            <div className={styles.optionsContainer}>
                <div onClick={() => setActivePanel('time')} className={styles.optionItem}>
                    <div className={styles.text}>
                        زمان
                    </div>
                    <div className={styles.icon}>
                        <Image src={ChevronDown} alt=""/>
                    </div>
                </div>

                <div onClick={() => setActivePanel('access')} className={styles.optionItem}>
                    <div className={styles.text}>
                        دسترسی
                    </div>
                    <div className={styles.icon}>
                        <Image src={ChevronDown} alt=""/>
                    </div>

                    <FilterBarPanel
                        name='access'
                        activePanel={activePanel}
                        filters={filters.access}
                        onClose={closePanel}
                        selected={selectedFilters.access}
                        onSelect={handleSelect}
                    />
                </div>

                <div onClick={() => setActivePanel('type')} className={styles.optionItem}>
                    <div className={styles.text}>
                        نوع محتوا
                    </div>
                    <div className={styles.icon}>
                        <Image src={ChevronDown} alt=""/>
                    </div>

                    <FilterBarPanel
                        name='type'
                        activePanel={activePanel}
                        filters={filters.type}
                        onClose={closePanel}
                        selected={selectedFilters.type}
                        onSelect={handleSelect}
                    />
                </div>

                <div onClick={() => setActivePanel('label')} className={styles.optionItem}>
                    <div className={styles.text}>
                        برچسب
                    </div>
                    <div className={styles.icon}>
                        <Image src={ChevronDown} alt=""/>
                    </div>

                    <FilterBarPanel
                        name='label'
                        activePanel={activePanel}
                        filters={filters.label}
                        onClose={closePanel}
                        selected={selectedFilters.label}
                        onSelect={handleSelect}
                    />
                </div>
            </div>

            <div className={styles.searchContainer}>
                <input type="text" placeholder='جستجو'/>
                <span className={styles.iconContainer}>
                    <Image src={Magnifier} alt=""/>
                </span>
            </div>
        </div>
    )
}
