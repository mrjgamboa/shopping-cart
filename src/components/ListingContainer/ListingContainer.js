import { Link } from 'react-router-dom';
import styles from './ListingContainer.module.css';
import Wrapper from '../Wrapper/Wrapper';

export default function ListingContainer({data}) {
  return (
    <div className={styles.listingContainerDiv}>
      <h1>Hello from Listing</h1>
      <Wrapper>
      </Wrapper>
    </div>
  );
};
