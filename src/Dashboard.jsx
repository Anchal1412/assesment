import React, { useState } from 'react';

const initialData = {
  categories: [
    {
      name: "CSPM Executive Dashboard",
      widgets: [
        { id: 1, name: "Cloud Accounts", content: "2 Total\nConnected (2)\nNot Connected (2)" },
        { id: 2, name: "Cloud Account Risk Assessment", content: "9659 Total\nFailed (1689)\nWarning (681)\nNot available (36)\nPassed (7253)" }
      ]
    },
    {
      name: "CWPP Dashboard",
      widgets: [
        { id: 3, name: "Top 5 Namespace Specific Alerts", content: "No Graph data available!" },
        { id: 4, name: "Workload Alerts", content: "No Graph data available!" }
      ]
    },
    {
      name: "Registry Scan",
      widgets: [
        { id: 5, name: "Image Risk Assessment", content: "1470 Total Vulnerabilities\nCritical (9)\nHigh (150)\nMedium (1100)\nLow (211)" },
        { id: 6, name: "Image Security Issues", content: "2 Total Images\nCritical (2)\nHigh (2)" }
      ]
    }
  ]
};

function Dashboard() {
  const [data, setData] = useState(initialData);
  const [newWidget, setNewWidget] = useState({ name: '', content: '' });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [addingWidget, setAddingWidget] = useState(false);

  const addWidget = () => {
    if (!selectedCategory || !newWidget.name || !newWidget.content) return;

    setData(prevData => {
      const updatedCategories = prevData.categories.map(category => {
        if (category.name === selectedCategory) {
          const newId = Math.max(...category.widgets.map(w => w.id)) + 1;
          category.widgets.push({ id: newId, name: newWidget.name, content: newWidget.content });
        }
        return category;
      });

      return { ...prevData, categories: updatedCategories };
    });

    setNewWidget({ name: '', content: '' });
    setAddingWidget(false);
  };

  const removeWidget = (categoryName, widgetId) => {
    setData(prevData => {
      const updatedCategories = prevData.categories.map(category => {
        if (category.name === categoryName) {
          category.widgets = category.widgets.filter(w => w.id !== widgetId);
        }
        return category;
      });

      return { ...prevData, categories: updatedCategories };
    });
  };

  const filteredWidgets = searchTerm
    ? data.categories.map(category => ({
        ...category,
        widgets: category.widgets.filter(widget =>
          widget.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }))
    : data.categories;

  return (
    <div className="dashboard">
      <input
        type="text"
        placeholder="Search widgets..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setAddingWidget(true)}>+ Add Widget</button>

      {filteredWidgets.map((category, index) => (
        <div key={index} className="category">
          <h2>{category.name}</h2>
          <div className="widgets">
            {category.widgets.map(widget => (
              <div key={widget.id} className="widget">
                <h3>{widget.name}</h3>
                <p>{widget.content}</p>
                <button onClick={() => removeWidget(category.name, widget.id)}>Remove Widget</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {addingWidget && (
        <div className="add-widget-form">
          <h3>Add New Widget</h3>
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            <option value="">Select Category</option>
            {data.categories.map((category, index) => (
              <option key={index} value={category.name}>{category.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Widget Name"
            value={newWidget.name}
            onChange={e => setNewWidget({ ...newWidget, name: e.target.value })}
          />
          <textarea
            placeholder="Widget Content"
            value={newWidget.content}
            onChange={e => setNewWidget({ ...newWidget, content: e.target.value })}
          />
          <button onClick={addWidget}>Add Widget</button>
          <button onClick={() => setAddingWidget(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;