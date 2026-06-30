import { useState, useEffect, useCallback } from 'react'
import { getAll, update, remove } from '../../services/flowerService'
import { addFlower } from '../../services/adminService'
import { getAll as getCategories } from '../../services/categoryService'
import AdminTable from '../../components/admin/AdminTable'
import Modal from '../../components/common/Modal'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Toast from '../../components/common/Toast'
import './admin.css'

const EMPTY_FORM = {
  name: '', description: '', price: '',
  stockQuantity: '', imageUrl: '', categoryId: '',
}

function FlowerForm({ form, categories, saving, onChange, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="admin-form">
      <Input label="Name" name="name" value={form.name} onChange={onChange} required />
      <Input label="Description" name="description" value={form.description} onChange={onChange} />
      <Input label="Price ($)" type="number" name="price" value={form.price} onChange={onChange} required />
      <Input label="Stock Quantity" type="number" name="stockQuantity" value={form.stockQuantity} onChange={onChange} required />
      <Input label="Image URL" name="imageUrl" value={form.imageUrl} onChange={onChange} />
      <div>
        <label className="admin-form__label">Category</label>
        <select name="categoryId" value={form.categoryId} onChange={onChange}>
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className="admin-form__actions">
        <Button variant="secondary" type="button" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" type="submit" loading={saving}>Save</Button>
      </div>
    </form>
  )
}

function AdminFlowersPage() {
  const [flowers,     setFlowers]     = useState([])
  const [categories,  setCategories]  = useState([])
  const [loading,     setLoading]     = useState(true)
  const [toast,       setToast]       = useState(null)
  const [showAdd,     setShowAdd]     = useState(false)
  const [showEdit,    setShowEdit]    = useState(false)
  const [editTarget,  setEditTarget]  = useState(null)
  const [confirmId,   setConfirmId]   = useState(null)
  const [form,        setForm]        = useState(EMPTY_FORM)
  const [saving,      setSaving]      = useState(false)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  const load = useCallback(() => {
    setLoading(true)
    Promise.all([getAll(), getCategories()])
      .then(([f, c]) => { setFlowers(f); setCategories(c) })
      .catch(() => showToast('Failed to load data.', 'error'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  const handleField = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const openAdd = () => { setForm(EMPTY_FORM); setShowAdd(true) }

  const openEdit = (flower) => {
    setEditTarget(flower)
    setForm({
      name: flower.name,
      description: flower.description ?? '',
      price: flower.price,
      stockQuantity: flower.stockQuantity,
      imageUrl: flower.imageUrl ?? '',
      categoryId: flower.category?.id ?? '',
    })
    setShowEdit(true)
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await addFlower({ ...form, price: Number(form.price), stockQuantity: Number(form.stockQuantity) })
      setShowAdd(false)
      showToast('Flower added successfully.')
      load()
    } catch (err) {
      showToast(err.message || 'Failed to add flower.', 'error')
    } finally { setSaving(false) }
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await update(editTarget.id, { ...form, price: Number(form.price), stockQuantity: Number(form.stockQuantity) })
      setShowEdit(false)
      showToast('Flower updated successfully.')
      load()
    } catch (err) {
      showToast(err.message || 'Failed to update flower.', 'error')
    } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    try {
      await remove(confirmId)
      setConfirmId(null)
      showToast('Flower deleted.')
      load()
    } catch (err) {
      showToast(err.message || 'Failed to delete.', 'error')
      setConfirmId(null)
    }
  }

  const columns = [
    { key: 'id',    label: 'ID',    width: '60px' },
    {
      key: 'imageUrl',
      label: 'Image',
      width: '80px',
      render: (val, row) => (
        <img
          src={val || '/placeholder-flower.jpg'}
          alt={row.name}
          className="admin-table__thumb"
        />
      ),
    },
    { key: 'name',          label: 'Name',     sortable: true },
    { key: 'category',      label: 'Category', render: (val) => val?.name ?? '—' },
    { key: 'price',         label: 'Price',    sortable: true, render: (val) => `$${Number(val).toFixed(2)}` },
    { key: 'stockQuantity', label: 'Stock',    sortable: true },
    {
      key: '_actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="admin-table__actions">
          <Button variant="secondary" size="sm" onClick={() => openEdit(row)}>Edit</Button>
          <Button variant="danger"    size="sm" onClick={() => setConfirmId(row.id)}>Delete</Button>
        </div>
      ),
    },
  ]

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Manage Flowers</h1>
        <Button variant="primary" onClick={openAdd}>+ Add Flower</Button>
      </div>

      <AdminTable
        columns={columns}
        rows={flowers}
        loading={loading}
        emptyMessage="No flowers found. Add your first flower!"
        defaultSort={{ key: 'id', asc: true }}
      />

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add Flower">
        <FlowerForm form={form} categories={categories} saving={saving}
          onChange={handleField} onSubmit={handleAdd} onCancel={() => setShowAdd(false)} />
      </Modal>

      <Modal isOpen={showEdit} onClose={() => setShowEdit(false)} title="Edit Flower">
        <FlowerForm form={form} categories={categories} saving={saving}
          onChange={handleField} onSubmit={handleEdit} onCancel={() => setShowEdit(false)} />
      </Modal>

      <ConfirmDialog
        isOpen={!!confirmId}
        message="Are you sure you want to delete this flower? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setConfirmId(null)}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default AdminFlowersPage
