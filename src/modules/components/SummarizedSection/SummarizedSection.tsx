import React from 'react';
import { Typography } from '@deliveryhero/armor';
import { DatabaseIllustration } from '@deliveryhero/armor-illustrations';

import styles from './SummarizedSection.module.css';

interface ICardSectionProps {
    ordersTotalCount: number | null | undefined;
    ordersFailedPercentage: number | null | undefined;
    ordersSentCount: number | null | undefined;
}

const SummarizedSection: React.FC<ICardSectionProps> = ({ ordersTotalCount, ordersFailedPercentage, ordersSentCount }) => {
    const [selectedCard, setSelectedCard] = React.useState();

    return (
        <div className={styles.summarizedSection}>
            <div className={styles.cardSection}>
                <div className={styles.cardContainer}>
                    <Typography className={styles.cardLabel} label medium>Orders in Billing</Typography>
                    <div className={styles.cardDataSet}>
                        <Typography pageTitle>{ordersTotalCount}</Typography>
                    </div>
                </div>
                <div className={styles.cardContainer}>
                    <Typography className={styles.cardLabel} label medium>Orders Failed to Be Sent to SAP</Typography>
                    <div className={styles.cardDataSet}>
                        <Typography pageTitle>{ordersFailedPercentage}</Typography>
                        <Typography sectionTitle>%</Typography>
                    </div>
                </div>
                <div className={styles.cardContainer}>
                    <Typography className={styles.cardLabel} label medium>Orders Sent to SAP</Typography>
                    <div className={styles.cardDataSet}>
                        <Typography pageTitle>{ordersSentCount}</Typography>
                    </div>
                </div>
            </div>

            <div className={styles.informationSection}>
                <DatabaseIllustration width='150px' marginRight={10} />
                {/* <Typography paragraph>Select the data tiles to apply specific filters</Typography> */}
            </div>
        </div>
    );
}

export default SummarizedSection;