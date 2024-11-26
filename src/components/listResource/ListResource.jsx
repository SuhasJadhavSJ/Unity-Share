import React, { useState } from 'react';
import './ListResources.css'; // Create appropriate styles

const ListResource = () => {
  const [resourceName, setResourceName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      setError('You can only upload up to 5 images.');
      return;
    }
    const uploadedImages = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...uploadedImages]);
    setError('');
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Additional validation if necessary
    if (!resourceName || !quantity || !category || !description || !location) {
      setError('Please fill in all the required fields.');
      return;
    }

    const formData = {
      resourceName,
      quantity,
      category: category === 'others' ? customCategory : category,
      description,
      location,
      images,
    };
    console.log('Form submitted:', formData);
    // Logic to send form data to backend

    // Reset form after submission
    setResourceName('');
    setQuantity('');
    setCategory('');
    setCustomCategory('');
    setDescription('');
    setLocation('');
    setImages([]);
    setError('');
  };

  return (
    <div className="donate-resource-container">
      <h2>Donate Resource</h2>
      <form className="donate-resource-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="resourceName">Resource Name</label>
          <input
            type="text"
            id="resourceName"
            className="input"
            value={resourceName}
            onChange={(e) => setResourceName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            className="input"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="1" // Ensure quantity is a positive number
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="food">Food</option>
            <option value="clothes">Clothes</option>
            <option value="education">Education</option>
            <option value="others">Others</option>
          </select>
        </div>

        {category === 'others' && (
          <div className="form-group">
            <label htmlFor="customCategory">Custom Category</label>
            <input
              type="text"
              id="customCategory"
              className="input"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            className="input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="form-group image-upload">
          <label htmlFor="images">Upload Images (Max 5)</label>
          <input
            type="file"
            id="images"
            className="input"
            multiple
            onChange={handleImageUpload}
            accept="image/*"
          />
        </div>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Image preview section */}
        {images.length > 0 && (
          <div className="image-preview-container">
            {images.map((image, index) => (
              <div key={index} className="image-preview">
                <img src={image} alt={`Preview ${index}`} />
                <button type="button" className="remove-image-btn" onClick={() => handleRemoveImage(index)}>
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ListResource;
