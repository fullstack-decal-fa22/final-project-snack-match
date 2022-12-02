import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import styles from './Filters.module.css'

function DistanceFilter() {

    return (
        <DropdownButton className={styles['filter']} title="Select Distance">
            <Dropdown.Item className={styles['filter-item']}>1 mile</Dropdown.Item>
            <Dropdown.Item className={styles['filter-item']}>3 miles</Dropdown.Item>
            <Dropdown.Item className={styles['filter-item']}>5 miles</Dropdown.Item>
        </DropdownButton>
    );
}

export default DistanceFilter;