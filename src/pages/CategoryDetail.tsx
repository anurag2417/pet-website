// src/pages/CategoryDetail.tsx
import { useParams, Link } from 'react-router-dom';
import { getPetsByCategory, getCategoryName } from '../data/petData';

const CategoryDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const pets = getPetsByCategory(categoryId || '');
  const categoryName = getCategoryName(categoryId || '');

  console.log('Category ID:', categoryId);
  console.log('Pets found:', pets);

  if (!pets || pets.length === 0) {
    return (
      <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
        <h2>No pets found in this category</h2>
        <Link to="/categories" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Browse All Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <h1 className="section-title">{categoryName}</h1>
      <p style={{ 
        fontSize: '1.2rem', 
        color: 'var(--text-secondary)', 
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto 3rem'
      }}>
        Explore our comprehensive guides for {categoryName.toLowerCase()}
      </p>
      
      <div className="category-grid">
        {pets.map((pet) => {
          console.log('Pet:', pet.id, pet.name, 'URL:', `/pet/${pet.category}/${pet.id}`);
          return (
            <Link
              key={pet.id}
              to={`/pet/${pet.category}/${pet.id}`}
              className="category-card"
            >
              <img src={pet.image} alt={pet.name} className="category-image" />
              <div className="category-content">
                <h3 className="category-title">{pet.name}</h3>
                <p className="category-description">{pet.summary}</p>
                <span className="btn btn-secondary">View Profile →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryDetail;