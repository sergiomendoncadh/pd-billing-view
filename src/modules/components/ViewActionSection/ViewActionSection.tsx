import React from 'react';
import { Button } from '@deliveryhero/armor';
import { FileCSVIcon, FilterIcon, NavigateIcon } from '@deliveryhero/armor-icons';

import styles from './ViewActionSection.module.css';

// TODO: extend functionality of action buttons
const ViewActionSection: React.FC = () => {
    return (
        <div className={styles.viewActionSection}>
            <Button small disabled marginRight={2}>
                <FilterIcon large />
            </Button>
            <Button small disabled marginRight={2}>
                <NavigateIcon large />
            </Button>
            <Button small disabled>
                <FileCSVIcon large />
            </Button>
        </div>
    );
}

export default ViewActionSection;
