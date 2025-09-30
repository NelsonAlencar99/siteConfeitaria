import React, { useState } from 'react';
import { X, Plus, CreditCard as Edit2, Trash2, Package, Users, Settings, LogOut, FolderOpen } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Order, Product, Category, ShopSettings } from '../types';
import { products as initialProducts, categories as initialCategories } from '../data/products';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useLocalStorage<Order[]>('ge-bolos-orders', []);
  const [deletedOrders, setDeletedOrders] = useLocalStorage<Order[]>('ge-bolos-deleted-orders', []);
  const [products, setProducts] = useLocalStorage<Product[]>('ge-bolos-products', initialProducts);
  const [categories, setCategories] = useLocalStorage<Category[]>('ge-bolos-categories', initialCategories);
  const [settings, setSettings] = useLocalStorage<ShopSettings>('ge-bolos-settings', {
    phone: '+55 85 8412-8195',
    instagram: 'https://www.instagram.com/gebolosgoumet?igsh=ejBwNnp4ejhpMnd5',
    logoUrl: '',
    shopName: 'Ge Bolos Gourmet'
  });
  
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'categories' | 'settings' | 'deleted'>('orders');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  if (!isOpen) return null;

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const deleteOrder = (orderId: string) => {
    const orderToDelete = orders.find(order => order.id === orderId);
    if (orderToDelete) {
      setDeletedOrders(prev => [...prev, orderToDelete]);
      setOrders(prev => prev.filter(order => order.id !== orderId));
    }
  };

  const permanentlyDeleteOrder = (orderId: string) => {
    setDeletedOrders(prev => prev.filter(order => order.id !== orderId));
  };

  const restoreOrder = (orderId: string) => {
    const orderToRestore = deletedOrders.find(order => order.id === orderId);
    if (orderToRestore) {
      setOrders(prev => [...prev, orderToRestore]);
      setDeletedOrders(prev => prev.filter(order => order.id !== orderId));
    }
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (productId: string, updatedProduct: Omit<Product, 'id'>) => {
    setProducts(prev => prev.map(product =>
      product.id === productId ? { ...updatedProduct, id: productId } : product
    ));
  };

  const deleteCategory = (categoryId: string) => {
    setCategories(prev => prev.filter(category => category.id !== categoryId));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString()
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (categoryId: string, updatedCategory: Omit<Category, 'id'>) => {
    setCategories(prev => prev.map(category =>
      category.id === categoryId ? { ...updatedCategory, id: categoryId } : category
    ));
  };

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      delivering: 'bg-orange-100 text-orange-800',
      delivered: 'bg-green-100 text-green-800'
    };
    return colors[status];
  };

  const getStatusText = (status: Order['status']) => {
    const texts = {
      pending: 'Pendente',
      accepted: 'Aceito',
      preparing: 'Preparando',
      delivering: 'Entregando',
      delivered: 'Entregue'
    };
    return texts[status];
  };

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeTab === 'orders' ? 'bg-pink-600' : 'hover:bg-gray-700'
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Pedidos</span>
            </button>
            
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeTab === 'products' ? 'bg-pink-600' : 'hover:bg-gray-700'
              }`}
            >
              <Package className="h-5 w-5" />
              <span>Produtos</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeTab === 'categories' ? 'bg-pink-600' : 'hover:bg-gray-700'
              }`}
            >
              <Edit2 className="h-5 w-5" />
              <span>Categorias</span>
            </button>

            <button
              onClick={() => setActiveTab('deleted')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeTab === 'deleted' ? 'bg-pink-600' : 'hover:bg-gray-700'
              }`}
            >
              <FolderOpen className="h-5 w-5" />
              <span>Pedidos Excluídos</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeTab === 'settings' ? 'bg-pink-600' : 'hover:bg-gray-700'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Configurações</span>
            </button>
          </nav>

          <button
            onClick={onClose}
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors mt-auto absolute bottom-6 left-6 right-6"
          >
            <LogOut className="h-5 w-5" />
            <span>Sair</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Gerenciar Pedidos</h1>
                <span className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full font-semibold">
                  {orders.length} pedidos
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {orders.map(order => (
                  <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">{order.customerName}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <p><strong>Email:</strong> {order.email}</p>
                      <p><strong>Telefone:</strong> {order.phone}</p>
                      <p><strong>Endereço:</strong> {order.address}</p>
                      <p><strong>Total:</strong> <span className="text-pink-500 font-bold">R$ {order.total.toFixed(2)}</span></p>
                      <p><strong>Data:</strong> {new Date(order.createdAt).toLocaleDateString('pt-BR')}</p>
                    </div>

                    <div className="mb-4">
                      <p className="font-semibold text-sm mb-2">Itens:</p>
                      <div className="space-y-1">
                        {order.items.map(item => (
                          <div key={item.id} className="text-sm text-gray-600">
                            {item.quantity}x {item.name} - R$ {(item.price * item.quantity).toFixed(2)}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'accepted')}
                          className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full hover:bg-blue-600 transition-colors"
                        >
                          Aceitar
                        </button>
                      )}
                      {order.status === 'accepted' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                          className="px-3 py-1 bg-purple-500 text-white text-xs rounded-full hover:bg-purple-600 transition-colors"
                        >
                          Preparando
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'delivering')}
                          className="px-3 py-1 bg-orange-500 text-white text-xs rounded-full hover:bg-orange-600 transition-colors"
                        >
                          Saiu para Entrega
                        </button>
                      )}
                      {order.status === 'delivering' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="px-3 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600 transition-colors"
                        >
                          Entregue
                        </button>
                      )}
                      <button
                        onClick={() => deleteOrder(order.id)}
                        className="px-3 py-1 bg-red-500 text-white text-xs rounded-full hover:bg-red-600 transition-colors"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {orders.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Nenhum pedido encontrado</p>
                </div>
              )}
            </div>
          )}

          {/* Deleted Orders Tab */}
          {activeTab === 'deleted' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Pedidos Excluídos</h1>
                <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full font-semibold">
                  {deletedOrders.length} pedidos excluídos
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {deletedOrders.map(order => (
                  <div key={order.id} className="bg-red-50 border border-red-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">{order.customerName}</h3>
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                        Excluído
                      </span>
                    </div>

                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <p><strong>Email:</strong> {order.email}</p>
                      <p><strong>Telefone:</strong> {order.phone}</p>
                      <p><strong>Endereço:</strong> {order.address}</p>
                      <p><strong>Total:</strong> <span className="text-pink-500 font-bold">R$ {order.total.toFixed(2)}</span></p>
                      <p><strong>Data:</strong> {new Date(order.createdAt).toLocaleDateString('pt-BR')}</p>
                    </div>

                    <div className="mb-4">
                      <p className="font-semibold text-sm mb-2">Itens:</p>
                      <div className="space-y-1">
                        {order.items.map(item => (
                          <div key={item.id} className="text-sm text-gray-600">
                            {item.quantity}x {item.name} - R$ {(item.price * item.quantity).toFixed(2)}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => restoreOrder(order.id)}
                        className="px-3 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600 transition-colors"
                      >
                        Restaurar
                      </button>
                      <button
                        onClick={() => permanentlyDeleteOrder(order.id)}
                        className="px-3 py-1 bg-red-600 text-white text-xs rounded-full hover:bg-red-700 transition-colors"
                      >
                        Excluir Permanentemente
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {deletedOrders.length === 0 && (
                <div className="text-center py-12">
                  <FolderOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Nenhum pedido excluído</p>
                </div>
              )}
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Gerenciar Produtos</h1>
                <button
                  onClick={() => setShowAddProduct(true)}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  <span>Adicionar Produto</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                      <p className="text-pink-500 font-bold text-xl mb-2">R$ {product.price.toFixed(2)}</p>
                      <p className="text-gray-500 text-sm mb-4">{product.category}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setShowAddProduct(true);
                          }}
                          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                          <span>Editar</span>
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Excluir</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Gerenciar Categorias</h1>
                <button
                  onClick={() => setShowAddCategory(true)}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  <span>Adicionar Categoria</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(category => (
                  <div key={category.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-4">{category.name}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingCategory(category);
                            setShowAddCategory(true);
                          }}
                          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                          <span>Editar</span>
                        </button>
                        <button
                          onClick={() => deleteCategory(category.id)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Excluir</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add/Edit Product Modal */}
          {showAddProduct && (
            <ProductModal
              isOpen={showAddProduct}
              onClose={() => {
                setShowAddProduct(false);
                setEditingProduct(null);
              }}
              onSave={(product) => {
                if (editingProduct) {
                  updateProduct(editingProduct.id, product);
                } else {
                  addProduct(product);
                }
                setShowAddProduct(false);
                setEditingProduct(null);
              }}
              product={editingProduct}
              categories={categories}
            />
          )}

          {/* Add/Edit Category Modal */}
          {showAddCategory && (
            <CategoryModal
              isOpen={showAddCategory}
              onClose={() => {
                setShowAddCategory(false);
                setEditingCategory(null);
              }}
              onSave={(category) => {
                if (editingCategory) {
                  updateCategory(editingCategory.id, category);
                } else {
                  addCategory(category);
                }
                setShowAddCategory(false);
                setEditingCategory(null);
              }}
              category={editingCategory}
            />
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-8">Configurações da Loja</h1>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Informações da Loja</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Nome da Loja</label>
                    <input
                      type="text"
                      value={settings.shopName}
                      onChange={(e) => setSettings(prev => ({ ...prev, shopName: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Telefone</label>
                    <input
                      type="tel"
                      value={settings.phone}
                      onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Instagram</label>
                    <input
                      type="url"
                      value={settings.instagram}
                      onChange={(e) => setSettings(prev => ({ ...prev, instagram: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">URL da Logo</label>
                    <input
                      type="url"
                      value={settings.logoUrl}
                      onChange={(e) => setSettings(prev => ({ ...prev, logoUrl: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="URL da imagem da logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Product Modal Component
interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'>) => void;
  product: Product | null;
  categories: Category[];
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSave, product, categories }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    image: product?.image || '',
    category: product?.category || categories[0]?.name || ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-8 rounded-2xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {product ? 'Editar Produto' : 'Adicionar Produto'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Descrição</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Preço</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">URL da Imagem</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Categoria</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            {product ? 'Atualizar' : 'Adicionar'} Produto
          </button>
        </form>
      </div>
    </div>
  );
};

// Category Modal Component
interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Omit<Category, 'id'>) => void;
  category: Category | null;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, onSave, category }) => {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    image: category?.image || ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-8 rounded-2xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {category ? 'Editar Categoria' : 'Adicionar Categoria'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Nome da Categoria</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">URL da Imagem</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            {category ? 'Atualizar' : 'Adicionar'} Categoria
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;