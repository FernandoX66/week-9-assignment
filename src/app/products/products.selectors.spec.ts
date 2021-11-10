import { productsSelector } from './products.selectors';

const mockInitialState = {
  products: [
    {
      id: 1,
      slug: 'cavendish-harvey-tin',
      name: 'Cavendish & Harvey Tin',
      description: 'Hard Candy',
      active: '1',
      likes_count: '1',
      likes_up_count: '1',
      likes_down_count: '0',
      published_at: '2020-08-12T17:21:50.878Z',
      master: {
        id: '13',
        sku: '654321',
        price: '10.75',
        promotional_price: '0.0',
        stock: '42',
        weight: '',
        height: '',
        width: '',
        depth: '',
        is_master: '1',
        position: '0',
      },
      category: {
        id: '9',
        slug: 'industrial-1597252906',
        name: 'Industrial',
      },
      image: {
        id: '13',
        url: 'https://trainee-program-api.applaudostudios.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBFZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c1837ccf582e609c976ae8a3b223620167619e03/Cavendish%20_%20Harvey.jpg',
      },
    },
  ],
};

describe('Products selectors', () => {
  it('should select products', () => {
    const result = productsSelector.projector(mockInitialState);
    expect(result[0]).toBe(mockInitialState.products[0]);
  });
});
