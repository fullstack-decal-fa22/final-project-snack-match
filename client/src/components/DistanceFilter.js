import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import styles from './Filters.module.css'

function DistanceFilter() {

    return (
        <div>
        <DropdownButton className={styles['filter']} color='gray'id="dropdown-basic-button" title="Select Distance">
            <Dropdown.Item className={styles['filter-item']}>1 mile</Dropdown.Item>
            <Dropdown.Item className={styles['filter-item']}>3 miles</Dropdown.Item>
            <Dropdown.Item className={styles['filter-item']}>5 miles</Dropdown.Item>
        </DropdownButton>
        </div>
    );
}

export default DistanceFilter;