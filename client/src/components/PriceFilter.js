import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import styles from './Filters.module.css'

function PriceFilter({ setPrice }) {

    const handleSelect = (selection) => {
        var priceList = [];
        for (let i = 1; i <= parseInt(selection); i++) {
            priceList.push(i);
        }
        setPrice(priceList);
    }

    return (
        <div>
        <DropdownButton 
            className={styles['filter']} 
            id="dropdown-basic-button" 
            title="Select Price"
            onSelect={handleSelect}
        >
            <Dropdown.Item eventKey="1" className={styles['filter-item']}>$</Dropdown.Item>
            <Dropdown.Item eventKey="2" className={styles['filter-item']}>$$</Dropdown.Item>
            <Dropdown.Item eventKey="3" className={styles['filter-item']}>$$$</Dropdown.Item>
            <Dropdown.Item eventKey="4" className={styles['filter-item']}>$$$$</Dropdown.Item>
        </DropdownButton>
        </div>
    );
}

export default PriceFilter;