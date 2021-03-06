import { useParams } from 'react-router-dom';
import styles from './ProductDetails.module.css';
import { products } from '../../data/products';
import getObjectIndex from '../../utils/getObjectIndex';
import Wrapper from '../Wrapper/Wrapper';
import NotFound from '../NotFound/NotFound';

export default function ProductDetails({module}) {
  const params = useParams();

  const productIndex = products.findIndex(
    (product) => 
      (product.id === Number(params.id)) 
        && (product.category === params.category)
  );

  const product = products[productIndex];
  
  return ((productIndex > -1)
    ?
      <div className={styles.productDiv}>
        <Wrapper>
          <div className={styles.imgContainer}>
          <img 
              alt={product.name}
              src={product.src}
              className={styles.img}
            />
          </div>
          <div className={styles.detailsDiv}>
            <h2>{product.name}</h2>
            <p className={styles.priceNStock}>
              <strong>{`$${product.price}`}</strong>&nbsp;| &nbsp;
              <span>
                {(product.stocks > 0)
                  ?
                    ((product.stocks > 1)
                      ? `Stocks: ${product.stocks}`
                      : `Stock: ${product.stocks}`
                    )
                  : 'OUT OF STOCK'
                }
              </span>
            </p>
            <p className={styles.type}>
              Type: {product.category.replace(/-/g, ' ')}
            </p>
            <p>Size: {product.size}</p>
            {product.color &&
              <p>Color: {product.color}</p>
            }
            {(product.stocks > 0) &&
              <div className={styles.buttonsContainer}>
                <button 
                  className={styles.button}
                  onClick={() => module.add({
                    id: product.id,
                    category: product.category,
                    name: product.name,
                    src: product.src,
                    price: product.price,
                    quantity: 1
                  })}
                >
                  {
                    (getObjectIndex(
                      JSON.parse(localStorage.getItem('localCartData')),
                      product
                    ) > -1 )
                    ? 'Add More' : 'Add to Cart'
                  }
                </button>
                <button className={styles.button}>
                  buy now
                </button>
              </div>
            }
          </div>
        </Wrapper>
      </div>
    : <NotFound subject='product' />
  );
};
