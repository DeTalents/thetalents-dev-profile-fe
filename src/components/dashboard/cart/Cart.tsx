'use client';

import CartItem from './CartItem';

const Cart = ({ cart, onRemoveTalent }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Talent Cart</h1>
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">Created</span>
          <span className="font-medium">{formatDate(cart.createdAt)}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{cart.name}</h2>
            <p className="text-sm text-gray-500">
              {cart.items.length} talents added
            </p>
          </div>
          <div className="flex items-center">
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                cart.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {cart.status === 'active' ? 'Active' : cart.status}
            </span>
          </div>
        </div>
      </div>

      {cart.items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">No talents added to this cart yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cart.items.map((item) => (
            <CartItem key={item.id} item={item} onRemove={onRemoveTalent} />
          ))}
        </div>
      )}

      {cart.items.length > 0 && (
        <div className="mt-8 flex justify-end">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
            Proceed To Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
