import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecommendations } from '../services/gptService';
import './Home.styles.css'; 

export interface Product {
  id: number;
  name: string;
  description: string;
  // Add other product properties as needed
}

export const Home = () => {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      const userPreferences = 'customer interested in tech gadgets minimum 5 datasets in a data object containing id, name, description without any extra text'; // Example user preferences
      const recommendations = await getRecommendations(userPreferences);
      console.log('Recommended Products:', recommendations);  // Log the recommendations
      setRecommendedProducts(recommendations);
      setLoading(false);
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  return (
    <div className="product-list">
      <h1>Recommended Products</h1>
      <div className="products">
        {recommendedProducts.length > 0 ? (
          recommendedProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image">
                  <img src={`https://via.placeholder.com/150`} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <button className="view-button">View Details</button>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>
    </div>
  );
};
