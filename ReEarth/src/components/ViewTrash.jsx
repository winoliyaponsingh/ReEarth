import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Recycle,
  Weight,
  MapPin,
  Truck,
  Image as ImageIcon,
  Building2,
  X,
  Filter,
  Check,
  X as XIcon,
  Search,
  ChevronDown
} from 'lucide-react';
import Navbar from './Navbar';
import { collection, getDocs, doc, updateDoc, getFirestore } from 'firebase/firestore';

function ViewTrash() {
  const [showForm, setShowForm] = useState(false);
  const [showPast, setShowPast] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterMethod, setFilterMethod] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    businessEmail: '',
    wasteType: '',
    wasteWeight: 0,
    collectionMethod: 'pickup',
  });
  const [wasteItems, setWasteItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateMessage, setUpdateMessage] = useState('');

  const db = getFirestore();

  useEffect(() => {
    const fetchWasteData = async () => {
      try {
        setLoading(true);
        const snapshot = await getDocs(collection(db, "UserUploadTrash"));
        setWasteItems(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWasteData();
  }, [db]);

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "UserUploadTrash", id), {
        status,
        vendorEmail: localStorage.getItem('email')
      });
      setWasteItems(items =>
        items.map(i => i.id === id ? { ...i, status } : i)
      );
      setUpdateMessage(`Request ${status}`);
    } catch {
      setUpdateMessage('Failed to update');
    } finally {
      setTimeout(() => setUpdateMessage(''), 3000);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);
    alert('Request submitted!');
    setShowForm(false);
  };

  const getCategoryColor = c => {
    if (!c) return 'bg-teal-600';
    switch (c.toLowerCase()) {
      case 'recyclable': return 'bg-emerald-600';
      case 'compostable': return 'bg-green-600';
      case 'hazardous': return 'bg-amber-600';
      default: return 'bg-teal-600';
    }
  };
  const getStatusColor = s => {
    if (!s) return 'bg-gray-500';
    switch (s.toLowerCase()) {
      case 'approved': return 'bg-green-600';
      case 'rejected': return 'bg-red-600';
      case 'pending': return 'bg-yellow-600';
      default: return 'bg-gray-500';
    }
  };

  // Data segmentation + filtering
  const pending = wasteItems.filter(i => i.status?.toLowerCase() === 'pending');
  const past    = wasteItems.filter(i => i.status && i.status.toLowerCase() !== 'pending');

  const applyFilters = items => items.filter(i => {
    const matchesSearch =
      i.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategory ? i.wasteCategory === filterCategory : true;
    const matchesMet = filterMethod   ? i.method === filterMethod       : true;
    return matchesSearch && matchesCat && matchesMet;
  });

  const renderCard = w => (
    <div
      key={w.id}
      className="group rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 overflow-hidden border border-gray-200"
    >
      <div className="relative">
        <div className="aspect-video w-full">
          <img
            src={w.imageUrl || "/api/placeholder/400/250"}
            alt="Waste"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className={`px-2 py-1 ${getCategoryColor(w.wasteCategory)} text-white text-xs font-semibold rounded`}>
            {w.wasteCategory}
          </span>
          <span className={`px-2 py-1 ${getStatusColor(w.status)} text-white text-xs font-semibold rounded`}>
            {w.status}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-3 bg-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-gray-800">{w.name}</h3>
          </div>
          <span className="text-sm text-gray-500">{w.weight} kg</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Recycle className="w-4 h-4 text-emerald-600" />
            <span className="truncate">{w.wasteType}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span className="capitalize truncate">{w.method}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Mail className="w-4 h-4 text-emerald-600" />
            <span className="truncate text-xs">{w.email}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span className="truncate text-xs">{w.location}</span>
          </div>
        </div>
        {w.status.toLowerCase() === 'pending' ? (
          <div className="flex space-x-2">
            <button
              onClick={() => handleUpdateStatus(w.id, 'approved')}
              className="flex-1 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition"
            >
              <Check className="inline-block w-4 h-4 mr-1" /> Approve
            </button>
            <button
              onClick={() => handleUpdateStatus(w.id, 'rejected')}
              className="flex-1 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
            >
              <XIcon className="inline-block w-4 h-4 mr-1" /> Reject
            </button>
          </div>
        ) : (
          <div className={`py-2 text-white font-medium rounded-lg text-center ${
            w.status.toLowerCase() === 'approved' ? 'bg-green-600' : 'bg-red-600'
          }`}>
            {w.status.charAt(0).toUpperCase() + w.status.slice(1)}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        {/* Header + Search + Filter */}
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
          <h1 className="text-3xl font-bold text-gray-800">Waste Collection</h1>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search business or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilter(true)}
              className="p-2 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <Filter className="w-5 h-5 text-emerald-600" />
            </button>
          </div>
        </div>

        {/* Update toast */}
        {updateMessage && (
          <div className="mb-4 p-3 bg-emerald-100 text-emerald-800 rounded-lg">
            {updateMessage}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center py-10 text-emerald-600">Loading…</div>
        ) : (
          <>
            {/* Pending */}
            {applyFilters(pending).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {applyFilters(pending).map(renderCard)}
              </div>
            ) : (
              <p className="text-gray-500">No pending requests.</p>
            )}

            {/* Past Requests */}
            <section className="mt-10">
              <button
                onClick={() => setShowPast(!showPast)}
                className="w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition"
              >
                <span className="font-medium text-gray-800">Past Requests</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transform transition-transform ${
                    showPast ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  showPast ? 'max-h-screen mt-4' : 'max-h-0'
                }`}
              >
                {applyFilters(past).length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {applyFilters(past).map(renderCard)}
                  </div>
                ) : (
                  <p className="mt-4 text-gray-500">No past requests.</p>
                )}
              </div>
            </section>
          </>
        )}

        {/* Filter Slide-over */}
        {showFilter && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
              onClick={() => setShowFilter(false)}
            />
            <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button onClick={() => setShowFilter(false)}>
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={filterCategory}
                    onChange={e => setFilterCategory(e.target.value)}
                    className="w-full py-2 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value="">All</option>
                    <option>Recyclable</option>
                    <option>Compostable</option>
                    <option>Hazardous</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Method
                  </label>
                  <select
                    value={filterMethod}
                    onChange={e => setFilterMethod(e.target.value)}
                    className="w-full py-2 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value="">All</option>
                    <option value="pickup">Pick Up</option>
                    <option value="dropoff">Drop Off</option>
                  </select>
                </div>
                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => {
                      setFilterCategory('');
                      setFilterMethod('');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setShowFilter(false)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Waste Collection Request
                </h2>
                <button onClick={() => setShowForm(false)}>
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400"
                    value={formData.businessName}
                    onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400"
                    value={formData.businessEmail}
                    onChange={e => setFormData({ ...formData, businessEmail: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type of Waste
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400"
                      value={formData.wasteType}
                      onChange={e => setFormData({ ...formData, wasteType: e.target.value })}
                    >
                      <option value="">Select type</option>
                      <option>Electronic Waste</option>
                      <option>Plastic</option>
                      <option>Paper</option>
                      <option>Metal</option>
                      <option>Glass</option>
                      <option>Organic</option>
                      <option>Chemical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400"
                      value={formData.wasteWeight}
                      onChange={e => setFormData({ ...formData, wasteWeight: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Collection Method
                  </label>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="collectionMethod"
                        value="pickup"
                        checked={formData.collectionMethod === 'pickup'}
                        onChange={e => setFormData({ ...formData, collectionMethod: e.target.value })}
                        className="text-emerald-600 focus:ring-emerald-400"
                      />
                      <span className="ml-2">Pick Up</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="collectionMethod"
                        value="dropoff"
                        checked={formData.collectionMethod === 'dropoff'}
                        onChange={e => setFormData({ ...formData, collectionMethod: e.target.value })}
                        className="text-emerald-600 focus:ring-emerald-400"
                      />
                      <span className="ml-2">Drop Off</span>
                    </label>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewTrash;
