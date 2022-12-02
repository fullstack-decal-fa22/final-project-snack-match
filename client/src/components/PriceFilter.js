import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import styles from './Filters.module.css'

function PriceFilter() {
    return (
        <DropdownButton className={styles['filter']} title="Select Price">
            <Dropdown.Item className={styles['filter-item']}>$</Dropdown.Item>
            <Dropdown.Item className={styles['filter-item']}>$$</Dropdown.Item>
            <Dropdown.Item className={styles['filter-item']}>$$$</Dropdown.Item>
            <Dropdown.Item className={styles['filter-item']}>$$$$</Dropdown.Item>
        </DropdownButton>
    );
}

export default PriceFilter;