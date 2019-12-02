import { useEffect } from 'react';
import { navigate } from 'gatsby';

const IndexPage = () => {
  useEffect(() => {
    navigate('/wiki');
  });
  return null;
};

export default IndexPage;
