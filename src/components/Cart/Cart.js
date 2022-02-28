import styles from './Cart.module.css';

export default function Cart({data, module}) {
  return (
    <div className={styles.cartDiv}>
      <div className={styles.wrapper}>
        <h2 className={styles.h2}>Cart</h2>
        {(data.length > 0)
          ?<>
            <div className={styles.itemContainer}>
              {data.map((item, itemIndex) =>
                <div 
                  key={`${item.category}${item.id}`}
                  className={styles.item}
                >
                  <div className={styles.imgContainer}>
                    <img
                      alt={item.name}
                      src={item.src}
                      className={styles.img}
                    />
                  </div>
                  <div className={styles.paraContainer}>
                    <p><strong>{item.name}</strong></p>
                    <p>Unit price: {`$${item.price}`}</p>
                  </div>
                  <p className={styles.quantity}>
                    <span>x&nbsp;{item.quantity}</span>
                  </p>
                  <div className={styles.itemBtnContainer}>
                    <button
                      onClick={() => module.decrement(itemIndex)}
                    >-</button>
                    <button
                      onClick={() => module.increment(itemIndex)}
                    >+</button>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.checkoutDiv}>
              <p className={styles.total}>Total Items</p>
              <p className={styles.totalData}>
                {data.reduce(
                  (prev, curr) => prev + curr.quantity, 0
                )}
              </p>
              <p className={styles.total}>Total Payment</p>
              <p className={styles.totalData}>
                {data.reduce(
                  (prev, curr) => (
                    prev + (curr.quantity * curr.price)
                  ), 0
                )}
              </p>
              <div className={styles.checkoutButtons}>
                <button className={styles.button}>Checkout</button>
                <button 
                  className={styles.button}
                  onClick={() => module.clear()}
                >
                  Clear
                </button>
              </div>
            </div>
          </>
          : 'empty'
        }
      </div>
    </div>
  );
};
