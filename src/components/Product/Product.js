import styles from './Product.module.css';

export default function Product({product}) {
  return (
    <div className={styles.productDiv}>
      <div className={styles.imgContainer}>
        <img 
          alt={product.name} 
          src={product.src}
          className={styles.img}
        />
      </div>
      <p>{product.name}</p>
      <p>
        {(product.stocks > 0)
          ? `$${product.price}`
          : 'OUT OF STOCK'
        }
      </p>
    </div>
  );
};
