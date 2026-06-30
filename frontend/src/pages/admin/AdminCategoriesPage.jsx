import { useState, useEffect, useCallback } from 'react'
import { getAll, update, remove } from '../../services/categoryService'
import { addCategory } from '../../services/adminService'
import AdminTable from '../../components/admin/AdminTable'
import Modal from '../../components/common/Modal'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Toast from '../../components/common/Toast'
import './admin.css'

const EMPTY_FORM = { name: '', description: '' }

function CategoryForm({ form, saving, onChange, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="admin-form">
      <Input label="Name" name="name" value={form.name} onChange={onChange} required />
      <Input label="Description" name="description" value={form.description} onChange={onChange} />
      <div className="admin-form__actions">
        <Button variant="secondary" type="button" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" type="submit" loading={saving}>Save</Button>
      </div>
    </form>
  )
}

function AdminCategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [toast,      setToast]      = useState(null)
  const [showAdd,    setShowAdd]    = useState(false)
  const [showEdit,   setShowEdit]   = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [confirmId,  setConfirmId]  = useState(null)
  const [form,       setForm]       = useState(EMPTY_FORM)
  const [saving,     setSaving]     = useState(false)

  const showToast = (message, type = 'success') => setToast({ message, type })

  const load = useCallback(() => {
    setLoading(true)
    getAll()
      .then(setCategories)
      .catch(() => showToast('Failed to load categories.', 'error'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  const handleField = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const openAdd = () => { setForm(EMPTY_FORM); setShowAdd(true) }

  const openEdit = (cat) => {
    setEditTarget(cat)
    setForm({ name: cat.name, description: cat.description ?? '' })
    setShowEdit(true)
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await addCategory(form)
      setShowAdd(false)
      showToast('Category added.')
      load()
    } catch (err) {
      showToast(err.message || 'Failed to add category.', 'error')
    } finally { setSaving(false) }
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await update(editTarget.id, form)
      setShowEdit(false)
      showToast('Category updated.')
      load()
    } catch (err) {
      showToast(err.message || 'Failed to update category.', 'error')
    } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    try {
      await remove(confirmId)
      setConfirmId(null)
      showToast('Category deleted.')
      load()
    } catch (err) {
      showToast(err.message || 'Failed to delete.', 'error')
      setConfirmId(null)
    }
  }

  const columns = [
    { key: 'id',          label: 'ID',          width: '60px' },
    { key: 'name',        label: 'Name',        sortable: true },
    { key: 'description', label: 'Description', render: (v) => v ?? '—' },
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
        <h1 className="admin-page__title">Manage Categories</h1>
        <Button variant="primary" onClick={openAdd}>+ Add Category</Button>
      </div>

      <AdminTable
        columns={columns}
        rows={categories}
        loading={loading}
        emptyMessage="No categories found."
        defaultSort={{ key: 'id', asc: true }}
      />

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add Category">
        <CategoryForm form={form} saving={saving} onChange={handleField}
          onSubmit={handleAdd} onCancel={() => setShowAdd(false)} />
      </Modal>

      <Modal isOpen={showEdit} onClose={() => setShowEdit(false)} title="Edit Category">
        <CategoryForm form={form} saving={saving} onChange={handleField}
          onSubmit={handleEdit} onCancel={() => setShowEdit(false)} />
      </Modal>

      <ConfirmDialog
        isOpen={!!confirmId}
        message="Delete this category? Flowers in this category may be affected."
        onConfirm={handleDelete}
        onCancel={() => setConfirmId(null)}
      />

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  )
}

export default AdminCategoriesPage
