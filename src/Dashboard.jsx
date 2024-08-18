import React, { useState } from 'react';
import DonutChart from './DonutChart'; 
import ProgressBar from './ProgressBar';
import Drawer from './Drawer'; 
import './Dashboard.css';
import myImage from './assets/graphimage.png';
import TopNav from './TopNav';
const initialData = {
  categories: [
    {
      name: "CSPM Executive Dashboard",
      widgets: [
        { id: 1, name: "Cloud Accounts", content: "" },
        { id: 2, name: "Cloud Account Risk Assessment", content: "" }
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
        { id: 5, name: "Image Risk Assessment", content: "" },
        { id: 6, name: "Image Security Issues", content: "" }
      ]
    }
  ]
};

function Dashboard() {
  const [data, setData] = useState(initialData);
  const [newWidget, setNewWidget] = useState({ name: '', content: '' });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [addingWidgetCategory, setAddingWidgetCategory] = useState(null);

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
    setIsDrawerOpen(false);
    setAddingWidgetCategory(null);
  };

  const handleConfirmClick = () => {
    addWidget();
  };

  const handleCancelClick = () => {
    setIsDrawerOpen(false);
    setAddingWidgetCategory(null);
  };

  const handleAddWidgetClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setIsDrawerOpen(true);
    setAddingWidgetCategory(categoryName);
  };

  const filteredWidgets = searchTerm
    ? data.categories.map(category => ({
        ...category,
        widgets: category.widgets.filter(widget =>
          widget.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }))
    : data.categories;

  const getChartDataFromContent = (content) => {
    const totalMatch = content.match(/(\d+) Total/);
    const failedMatch = content.match(/Failed \((\d+)\)/);
    const warningMatch = content.match(/Warning \((\d+)\)/);
    const notAvailableMatch = content.match(/Not available \((\d+)\)/);
    const passedMatch = content.match(/Passed \((\d+)\)/);

    if (totalMatch && failedMatch && warningMatch && notAvailableMatch && passedMatch) {
      const total = parseInt(totalMatch[1]);
      const failed = parseInt(failedMatch[1]);
      const warning = parseInt(warningMatch[1]);
      const notAvailable = parseInt(notAvailableMatch[1]);
      const passed = parseInt(passedMatch[1]);

      return {
        total,
        dataValues: [failed, warning, notAvailable, passed],
      };
    }

    return null;
  };

  return (
    <div className="dashboard">
      <input
        type="text"
        placeholder="Search widgets..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setIsDrawerOpen(true)}>+ Add Widget</button>

      {data.categories.map((category, index) => (
        <div key={index} className="category">
          <h2 style={{ margin: '5px 0' }}>{category.name}</h2>
          <div className="widgets">
            {category.widgets.map(widget => (
              <div key={widget.id} className="widget" style={{ position: 'relative' }}>
                <h3 style={{ position: 'absolute', top: '0', left: '0', margin: '0', padding: '10px' }}>{widget.name}</h3>
                {widget.id === 1 && (
                  <DonutChart
                    dataValues={[2, 2]}
                    total={2}
                    labels={['Connected', 'Not Connected']}
                    backgroundColors={['#C0C0C0', '#1986b3']}
                  />
                )}
                {widget.id === 2 && (
                  <DonutChart
                    dataValues={[7253, 36, 681, 1689]}
                    total={9659}
                    labels={['Failed', 'Warning', 'Not Available', 'Passed']}
                    backgroundColors={['#206308', '#e3eddf', '#eded09', '#ed1c09']}
                  />
                )}
                {widget.id === 5 && (
                  <div>
                    <ProgressBar
                      total={1470}
                      data={[
                        { label: 'Critical', value: 9, color: '#B22222' },
                        { label: 'High', value: 735, color: '#FF6347' },
                      ]}
                    />
                    <p>{widget.content}</p>
                  </div>
                )}
                {widget.id === 6 && (
                  <div>
                    <ProgressBar
                      total={2}
                      data={[
                        { label: 'Critical', value: 2, color: '#B22222' },
                        { label: 'High', value: 2, color: '#FFA500' },
                      ]}
                    />
                    <p>{widget.content}</p>
                  </div>
                )}
                {(widget.id === 3 || widget.id === 4) && (
                  <div>
                  <img src={myImage} alt='Description' 
                   style={{ width: '20%', marginBottom: '0px' }} />
                  <p>{widget.content}</p>
                </div>
                )}
              </div>
            ))}
            {/* Add Widget Box */}
            <div className="widget add-widget" onClick={() => handleAddWidgetClick(category.name)} style={addWidgetBoxStyle}>
              <p>+ Add Widget</p>
            </div>
          </div>
        </div>
      ))}

      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCancelClick}
        onConfirm={handleConfirmClick}
      />
    </div>
  );
}

// Style for the Add Widget box
const addWidgetBoxStyle = {
  border: '1px solid #ccc',
  padding: '20px',
  width: '100px',
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: '#f0f0f0',
};

export default Dashboard;
