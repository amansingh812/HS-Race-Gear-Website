'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parent: '',
    order: 0,
    isActive: true,
    isVisible: true,
    isFeatured: false
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories?tree=true');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingCategory 
        ? `/api/categories/${editingCategory._id}`
        : '/api/categories';
      
      const method = editingCategory ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          parent: formData.parent || null
        })
      });
      
      if (response.ok) {
        setShowModal(false);
        setEditingCategory(null);
        setFormData({
          name: '',
          slug: '',
          description: '',
          parent: '',
          order: 0,
          isActive: true,
          isVisible: true,
          isFeatured: false
        });
        fetchCategories();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to save category');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      parent: category.parent?._id || '',
      order: category.order || 0,
      isActive: category.isActive,
      isVisible: category.isVisible,
      isFeatured: category.isFeatured
    });
    setShowModal(true);
  };

  const handleDelete = async (categoryId, categoryName) => {
    if (!confirm(`Are you sure you want to delete "${categoryName}"?`)) return;
    
    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchCategories();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category');
    }
  };

  const renderCategory = (category, level = 0) => (
    <React.Fragment key={category._id}>
      <tr>
        <td style={{ paddingLeft: `${level * 30 + 15}px` }}>
          {level > 0 && <span className="text-muted me-2">└</span>}
          <strong>{category.name}</strong>
          <br />
          <small className="text-muted">{category.slug}</small>
        </td>
        <td>
          <span className={`badge ${category.isActive ? 'bg-success' : 'bg-secondary'}`}>
            {category.isActive ? 'Active' : 'Inactive'}
          </span>
        </td>
        <td>
          {category.isFeatured && (
            <span className="badge bg-warning">Featured</span>
          )}
        </td>
        <td>{category.productCount || 0}</td>
        <td>{category.order}</td>
        <td>
          <div className="btn-group btn-group-sm">
            <button
              className="btn btn-outline-primary"
              onClick={() => handleEdit(category)}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => handleDelete(category._id, category.name)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
      {category.children?.map(child => renderCategory(child, level + 1))}
    </React.Fragment>
  );

  // Get flat list of main categories for parent select
  const getMainCategories = () => {
    return categories.filter(cat => !cat.parent);
  };

  return (
    <div className="admin-categories">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 mb-0">Categories</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingCategory(null);
            setFormData({
              name: '',
              slug: '',
              description: '',
              parent: '',
              order: 0,
              isActive: true,
              isVisible: true,
              isFeatured: false
            });
            setShowModal(true);
          }}
        >
          <i className="icon-plus me-2" />
          Add New Category
        </button>
      </div>

      {/* Categories Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="d-flex justify-content-center p-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Featured</th>
                    <th>Products</th>
                    <th>Order</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-5 text-muted">
                        No categories found
                      </td>
                    </tr>
                  ) : (
                    categories.map(category => renderCategory(category))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          name: e.target.value,
                          slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                        }));
                      }}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Slug</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Parent Category</label>
                    <select
                      className="form-select"
                      value={formData.parent}
                      onChange={(e) => setFormData(prev => ({ ...prev, parent: e.target.value }))}
                    >
                      <option value="">None (Main Category)</option>
                      {getMainCategories()
                        .filter(cat => cat._id !== editingCategory?._id)
                        .map(cat => (
                          <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))
                      }
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Order</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.order}
                      onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  
                  <div className="row">
                    <div className="col-4">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="isActive"
                          checked={formData.isActive}
                          onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                        />
                        <label className="form-check-label" htmlFor="isActive">Active</label>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="isVisible"
                          checked={formData.isVisible}
                          onChange={(e) => setFormData(prev => ({ ...prev, isVisible: e.target.checked }))}
                        />
                        <label className="form-check-label" htmlFor="isVisible">Visible</label>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="isFeatured"
                          checked={formData.isFeatured}
                          onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                        />
                        <label className="form-check-label" htmlFor="isFeatured">Featured</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingCategory ? 'Update Category' : 'Create Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
