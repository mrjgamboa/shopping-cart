import { useParams } from 'react-router-dom';
import styles from './ProductDetails.module.css';

export default function ProductDetails() {
  const params = useParams();
  console.log(params);
  return (
    <div>
      {params.id}, {params.category}
    </div>
  );
};
