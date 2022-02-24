import { Link } from 'react-router-dom';
import Wrapper from './Wrapper3x3/Wrapper3x3';
import Product from './Product/Product';

export default function ListingContainer({data, message}) {
  return (
    <div>
      {message &&
        <p style={{textAlign: 'center', padding: '2rem 1rem 1rem 1rem'}}>
          <strong>{message}</strong>
        </p>
      }
      <Wrapper>
        {data.map((product) => {
          return (
            <Link 
              to={`/shop/${product.category}/${product.id}`}
              key={`${product.category}${product.id}`}
            >
              <Product 
                product={product}
              />
            </Link>
          );
        })}
      </Wrapper>
    </div>
  );
};
