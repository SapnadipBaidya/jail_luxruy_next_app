export default function ProductPage({ params }) {
    const { category, productId } = params;
  
    return (
      <div>
        <h1>Category: {category}</h1>
        <h2>Product ID: {productId}</h2>
      </div>
    );
  }