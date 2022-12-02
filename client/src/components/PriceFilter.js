import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import styles from './Filters.module.css'

function PriceFilter() {
    return (
        <div>
        <DropdownButton className={styles['filter']} id="dropdown-basic-button" title="Select Price">
            <Dropdown.Item className={styles['filter-item']}>$</Dropdown.Item>
            <Dropdown.Item className={styles['filter-item']}>$$</Dropdown.Item>
            <Dropdown.Item className={styles['filter-item']}>$$$</Dropdown.Item>
            <Dropdown.Item className={styles['filter-item']}>$$$$</Dropdown.Item>
        </DropdownButton>
        </div>
    );
}

export default PriceFilter;