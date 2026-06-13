import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newToy = {
      name: formData.name,
      image: formData.image,
      likes: 0,
    };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((createdToy) => {
        onAddToy(createdToy);
        setFormData({ name: "", image: "" });
      });
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>

        <input
          className="input-text"
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          value={formData.name}
          onChange={handleChange}
        />

        <br />

        <input
          className="input-text"
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          value={formData.image}
          onChange={handleChange}
        />

        <br />

        <input
          className="submit"
          type="submit"
          name="submit"
          value="Create New Toy"
        />
      </form>
    </div>
  );
}

export default ToyForm;