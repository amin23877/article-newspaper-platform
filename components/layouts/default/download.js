import Button from "components/common/button";

import styles from 'styles/components/layouts/default/Download.module.scss'
import classNames from "classnames";

export default function Download(props) {
    return (
        <Button classes={classNames(styles.downloadButton, props.classes)} variant='outline'>
            {props.children}
        </Button>
    )
}
